import { LitElement, html, css } from 'lit';
import { localize } from './localize.js';
import {
  extractBoxIdFromEntity,
  extractDeviceName,
  resolveBoxEntities,
  resolveServerEntities
} from './utils.js';
import './editor.js';

const CARD_VERSION = '0.4.0';
const SERVER_INFO_COLLAPSED = 6;

console.info(
  `%c TEDDY-CARD %c v${CARD_VERSION} `,
  'color: white; font-weight: bold; background: #03a9f4',
  'color: white; font-weight: bold; background: #606060'
);

export class TeddyCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _serverExpanded: { state: true },
      _failedImageUrl: { state: true }
    };
  }

  constructor() {
    super();
    this.config = {
      language: 'en',
      entity_source: '',
      toniebox_id: '',
      toniebox_name: '',
      show_server: true,
      show_details: false
    };
    this._serverExpanded = false;
    this._failedImageUrl = null;
  }

  static getConfigElement() {
    return document.createElement('teddy-card-editor');
  }

  static getStubConfig() {
    return {
      entity_source: '',
      language: 'en',
      show_server: true,
      show_details: false
    };
  }

  setConfig(config) {
    const normalizedConfig = { ...config };

    if (normalizedConfig.entity_source) {
      const boxId = extractBoxIdFromEntity(normalizedConfig.entity_source);
      if (boxId) {
        normalizedConfig.toniebox_id = boxId;
      }
    }

    if (!normalizedConfig.entity_source && !normalizedConfig.toniebox_id) {
      console.log('Card needs configuration - please select an entity or enter Toniebox ID');
    }

    this.config = {
      language: 'en',
      show_server: true,
      show_details: false,
      ...normalizedConfig
    };

    this._updateAutoDetectedName();
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('hass')) {
      this._updateAutoDetectedName();
    }
  }

  _updateAutoDetectedName() {
    if (!this.hass || !this.config?.entity_source || this.config.toniebox_name) {
      return;
    }

    const entity = this.hass.states[this.config.entity_source];
    if (!entity) {
      return;
    }

    const name = extractDeviceName(entity, this.config.toniebox_id);
    if (name !== this.config.toniebox_name) {
      this.config = { ...this.config, toniebox_name: name };
      this.requestUpdate();
    }
  }

  getCardSize() {
    return this.config?.show_server ? 8 : 5;
  }

  get _lang() {
    return this.config?.language || 'en';
  }

  _state(entityId) {
    return entityId ? this.hass.states[entityId] : undefined;
  }

  /** Human readable state, using HA's own formatter when available. */
  _format(entity) {
    if (!entity) {
      return null;
    }
    if (['unknown', 'unavailable', 'none', ''].includes(entity.state)) {
      return null;
    }
    if (typeof this.hass.formatEntityState === 'function') {
      try {
        return this.hass.formatEntityState(entity);
      } catch (err) {
        // fall through to the manual formatting below
      }
    }
    const unit = entity.attributes?.unit_of_measurement;
    return unit ? `${entity.state} ${unit}` : entity.state;
  }

  /** Strip the integration prefixes from a friendly name. */
  _label(entity, suffix) {
    const friendly = entity?.attributes?.friendly_name;
    if (friendly) {
      const cleaned = friendly
        .replace(/^TeddyCloud Server\s*/i, '')
        .replace(/^TeddyCloud Box \w+\s*/i, '')
        .replace(/^TeddyCloud\s*/i, '')
        .trim();
      if (cleaned) {
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
      }
    }
    const words = (suffix || '').replace(/_/g, ' ').trim();
    return words ? words.charAt(0).toUpperCase() + words.slice(1) : suffix;
  }

  _showMoreInfo(entityId) {
    if (!entityId) {
      return;
    }
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  _toggle(entityId, ev) {
    ev?.stopPropagation();
    const domain = entityId.split('.')[0];
    this.hass.callService(domain, 'toggle', { entity_id: entityId });
  }

  // ---------------------------------------------------------------- content

  /** The chapter can come from its own entity or from a title attribute. */
  _chapterText(entities) {
    const chapterEntity = this._state(entities.chapter);
    const fromEntity = this._format(chapterEntity);
    if (fromEntity) {
      return fromEntity;
    }

    const attrs = this._state(entities.contentTitle)?.attributes || {};
    const candidates = [
      attrs.chapter_title,
      attrs.chapter,
      attrs.current_chapter,
      attrs.track_title,
      attrs.track,
      attrs.episode
    ];
    const value = candidates.find(candidate => candidate !== undefined && candidate !== null && candidate !== '');
    if (value === undefined) {
      return null;
    }

    const total = attrs.chapter_count ?? attrs.chapters_total ??
      (Array.isArray(attrs.chapters) ? attrs.chapters.length : undefined);

    if (typeof value === 'number' && total) {
      return `${value} / ${total}`;
    }
    return String(value);
  }

  _renderCover(entities) {
    const pictureEntity = this._state(entities.contentPicture);
    const imageUrl = pictureEntity?.attributes?.entity_picture;

    if (!imageUrl || this._failedImageUrl === imageUrl) {
      return html`
        <div class="cover cover-empty">
          <ha-icon icon="mdi:teddy-bear"></ha-icon>
        </div>
      `;
    }

    return html`
      <div class="cover">
        <img
          src="${imageUrl}"
          alt=""
          @error=${() => { this._failedImageUrl = imageUrl; }}
        />
      </div>
    `;
  }

  _renderHero(entities) {
    const lang = this._lang;
    const titleEntity = this._state(entities.contentTitle);
    const title = this._format(titleEntity);
    const chapter = this._chapterText(entities);
    const series = this._format(this._state(entities.contentSeries));
    const pictureEntity = this._state(entities.contentPicture);
    const picture = pictureEntity?.attributes?.entity_picture;
    const backdrop = picture && this._failedImageUrl !== picture ? picture : null;

    return html`
      <div class="hero">
        ${backdrop ? html`<div class="hero-backdrop" style="background-image:url('${backdrop}')"></div>` : ''}
        <div class="hero-inner">
          ${this._renderCover(entities)}
          <div class="now" @click=${() => this._showMoreInfo(entities.contentTitle)}>
            <div class="eyebrow">${series || localize(title ? 'now_playing' : 'no_content', lang)}</div>
            <div class="now-title">${title || localize('no_content', lang)}</div>
            ${chapter ? html`
              <div class="now-chapter">
                <ha-icon icon="mdi:playlist-music"></ha-icon>
                <span>${localize('chapter', lang)} · ${chapter}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------ stats

  _renderBattery(entities) {
    const lang = this._lang;
    const batteryEntity = this._state(entities.battery);
    const chargerEntity = this._state(entities.charger);
    const charging = chargerEntity?.state === 'on';

    const raw = Number(batteryEntity?.state);
    const isPercent = Number.isFinite(raw) && batteryEntity?.attributes?.unit_of_measurement === '%';
    const percent = isPercent ? Math.max(0, Math.min(100, raw)) : null;

    let tone = 'ok';
    if (charging) {
      tone = 'charging';
    } else if (percent !== null && percent <= 20) {
      tone = 'low';
    } else if (percent !== null && percent <= 40) {
      tone = 'warn';
    }

    const icon = charging
      ? 'mdi:battery-charging'
      : percent === null
        ? 'mdi:battery-unknown'
        : `mdi:battery${percent >= 95 ? '' : `-${Math.max(1, Math.round(percent / 10)) * 10}`}`;

    const value = this._format(batteryEntity) ||
      localize(charging ? 'on_charger' : 'off_charger', lang);
    const caption = charging
      ? localize('charging', lang)
      : localize(batteryEntity ? 'battery' : 'charging_station', lang);

    return html`
      <div
        class="stat stat-${tone}"
        @click=${() => this._showMoreInfo(entities.battery || entities.charger)}
      >
        <ha-icon icon="${icon}"></ha-icon>
        <div class="stat-body">
          <span class="stat-value">${value}</span>
          <span class="stat-caption">${caption}</span>
        </div>
        ${percent !== null ? html`
          <div class="stat-bar"><span style="width:${percent}%"></span></div>
        ` : ''}
      </div>
    `;
  }

  _renderVolume(entities) {
    const lang = this._lang;
    const levelEntity = this._state(entities.volumeLevel);
    const dbEntity = this._state(entities.volumeDb);

    const level = Number(levelEntity?.state);
    const min = Number(levelEntity?.attributes?.min ?? 0);
    const max = Number(levelEntity?.attributes?.max ?? 3);
    const steps = Number.isFinite(max) && max > min ? max - min + 1 : 4;
    const active = Number.isFinite(level) ? level - min + 1 : 0;

    const db = this._format(dbEntity);
    const value = Number.isFinite(level) ? `${level}${Number.isFinite(max) ? ` / ${max}` : ''}` : '–';

    return html`
      <div class="stat" @click=${() => this._showMoreInfo(entities.volumeLevel || entities.volumeDb)}>
        <ha-icon icon="${active <= 1 ? 'mdi:volume-low' : active >= steps ? 'mdi:volume-high' : 'mdi:volume-medium'}"></ha-icon>
        <div class="stat-body">
          <span class="stat-value">${value}${db ? html` <em>${db}</em>` : ''}</span>
          <span class="stat-caption">${localize('volume', lang)}</span>
        </div>
        <div class="steps">
          ${Array.from({ length: steps }, (_, index) => html`
            <span class="${index < active ? 'on' : ''}"></span>
          `)}
        </div>
      </div>
    `;
  }

  _renderDetailRow(entityId, fallbackLabel, icon) {
    const entity = this._state(entityId);
    if (!entity) {
      return '';
    }

    return html`
      <div class="detail-row" @click=${() => this._showMoreInfo(entityId)}>
        <ha-icon icon="${icon}"></ha-icon>
        <span class="detail-name">${fallbackLabel}</span>
        <span class="detail-state">${this._format(entity) ?? '–'}</span>
      </div>
    `;
  }

  _renderDetails(entities) {
    if (!this.config?.show_details) {
      return '';
    }

    const lang = this._lang;
    return html`
      <div class="details">
        ${this._renderDetailRow(entities.tagValid, localize('tag_uid', lang), 'mdi:tag')}
        ${this._renderDetailRow(entities.contentAudioId, localize('content_audio_id', lang), 'mdi:identifier')}
        ${this._renderDetailRow(entities.volumeDown, localize('small_ear_quieter', lang), 'mdi:ear-hearing-off')}
        ${this._renderDetailRow(entities.volumeUp, localize('big_ear_louder', lang), 'mdi:ear-hearing')}
        ${this._renderDetailRow(entities.lastSeen, 'Last seen', 'mdi:clock-outline')}
      </div>
    `;
  }

  // ----------------------------------------------------------------- server

  _renderServerControl(item) {
    const entity = this._state(item.entityId);
    if (!entity) {
      return '';
    }

    const isToggle = ['switch', 'input_boolean'].includes(item.domain);

    return html`
      <div class="server-control" @click=${() => this._showMoreInfo(item.entityId)}>
        <span class="server-control-name">${this._label(entity, item.suffix)}</span>
        ${isToggle ? html`
          <ha-switch
            .checked=${entity.state === 'on'}
            @click=${ev => this._toggle(item.entityId, ev)}
          ></ha-switch>
        ` : html`<span class="detail-state">${this._format(entity) ?? '–'}</span>`}
      </div>
    `;
  }

  _renderServerInfo(item) {
    const entity = this._state(item.entityId);
    if (!entity) {
      return '';
    }

    const value = item.domain === 'binary_sensor'
      ? (entity.state === 'on' ? localize('server.online', this._lang) : localize('server.offline', this._lang))
      : (this._format(entity) ?? '–');

    return html`
      <div class="server-tile" @click=${() => this._showMoreInfo(item.entityId)}>
        <span class="tile-label">${this._label(entity, item.suffix)}</span>
        <span class="tile-value">${value}</span>
      </div>
    `;
  }

  _renderServer() {
    if (!this.config?.show_server) {
      return '';
    }

    const lang = this._lang;
    const { controls, info } = resolveServerEntities(this.hass);

    if (!controls.length && !info.length) {
      return html`
        <div class="section">
          <h3>${localize('server.heading', lang)}</h3>
          <div class="empty">${localize('server.no_entities', lang)}</div>
        </div>
      `;
    }

    const visibleInfo = this._serverExpanded ? info : info.slice(0, SERVER_INFO_COLLAPSED);

    return html`
      <div class="section">
        <h3>
          <ha-icon icon="mdi:server-network"></ha-icon>
          ${localize('server.heading', lang)}
        </h3>

        ${info.length ? html`
          <div class="server-grid">
            ${visibleInfo.map(item => this._renderServerInfo(item))}
          </div>
          ${info.length > SERVER_INFO_COLLAPSED ? html`
            <button class="link-button" @click=${() => { this._serverExpanded = !this._serverExpanded; }}>
              ${localize(this._serverExpanded ? 'server.show_less' : 'server.show_all', lang)}
              (${info.length})
            </button>
          ` : ''}
        ` : ''}

        ${controls.length ? html`
          <div class="server-controls">
            ${controls.map(item => this._renderServerControl(item))}
          </div>
        ` : ''}
      </div>
    `;
  }

  // ----------------------------------------------------------------- render

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const lang = this._lang;

    if (!this.config.toniebox_id) {
      return html`
        <ha-card>
          <div class="setup">
            <ha-icon icon="mdi:teddy-bear"></ha-icon>
            <div>
              <h3>TeddyCloud</h3>
              <p>${localize('errors.not_configured', lang)}</p>
            </div>
          </div>
        </ha-card>
      `;
    }

    const entities = resolveBoxEntities(this.hass, this.config.toniebox_id);
    const chargerEntity = this._state(entities.charger);
    const charging = chargerEntity?.state === 'on';

    return html`
      <ha-card>
        <div class="header">
          <span class="box-name">${this.config.toniebox_name || `Toniebox ${this.config.toniebox_id}`}</span>
          ${chargerEntity ? html`
            <span class="pill ${charging ? 'pill-charging' : ''}">
              <ha-icon icon="${charging ? 'mdi:power-plug' : 'mdi:power-plug-off'}"></ha-icon>
              ${localize(charging ? 'on_charger' : 'off_charger', lang)}
            </span>
          ` : ''}
        </div>

        ${this._renderHero(entities)}

        <div class="stats">
          ${this._renderBattery(entities)}
          ${this._renderVolume(entities)}
        </div>

        ${this._renderDetails(entities)}
        ${this._renderServer()}
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --teddy-radius: 16px;
        --teddy-gap: 12px;
      }

      ha-card {
        overflow: hidden;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: var(--teddy-gap);
      }

      /* ---------------------------------------------------------- header */

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .box-name {
        font-size: 20px;
        font-weight: 600;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        background: var(--divider-color);
      }

      .pill-charging {
        color: var(--success-color, #4caf50);
        background: color-mix(in srgb, var(--success-color, #4caf50) 18%, transparent);
      }

      .pill ha-icon {
        --mdc-icon-size: 15px;
      }

      /* ------------------------------------------------------------ hero */

      .hero {
        position: relative;
        border-radius: var(--teddy-radius);
        overflow: hidden;
        background: var(--secondary-background-color);
        isolation: isolate;
      }

      .hero-backdrop {
        position: absolute;
        inset: -20%;
        background-size: cover;
        background-position: center;
        filter: blur(28px) saturate(1.4);
        opacity: 0.55;
        z-index: -1;
      }

      .hero-inner {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: linear-gradient(
          100deg,
          color-mix(in srgb, var(--card-background-color) 82%, transparent),
          color-mix(in srgb, var(--card-background-color) 55%, transparent)
        );
      }

      .cover {
        flex-shrink: 0;
        width: 96px;
        height: 96px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
        background: var(--divider-color);
      }

      .cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .cover-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-text-color);
      }

      .cover-empty ha-icon {
        --mdc-icon-size: 44px;
      }

      .now {
        min-width: 0;
        cursor: pointer;
      }

      .eyebrow {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .now-title {
        margin-top: 2px;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.25;
        color: var(--primary-text-color);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .now-chapter {
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .now-chapter ha-icon {
        --mdc-icon-size: 16px;
      }

      /* ----------------------------------------------------------- stats */

      .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--teddy-gap);
      }

      .stat {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: var(--teddy-radius);
        background: var(--secondary-background-color);
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .stat:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      }

      .stat ha-icon {
        --mdc-icon-size: 24px;
        color: var(--state-icon-color, var(--primary-text-color));
      }

      .stat-charging ha-icon { color: var(--success-color, #4caf50); }
      .stat-warn ha-icon { color: var(--warning-color, #ff9800); }
      .stat-low ha-icon { color: var(--error-color, #f44336); }

      .stat-body {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .stat-value {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
      }

      .stat-value em {
        font-style: normal;
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .stat-caption {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .stat-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 3px;
        width: 100%;
        background: var(--divider-color);
      }

      .stat-bar span {
        display: block;
        height: 100%;
        background: var(--success-color, #4caf50);
      }

      .stat-warn .stat-bar span { background: var(--warning-color, #ff9800); }
      .stat-low .stat-bar span { background: var(--error-color, #f44336); }

      .steps {
        margin-left: auto;
        display: flex;
        align-items: flex-end;
        gap: 3px;
        height: 22px;
      }

      .steps span {
        width: 5px;
        border-radius: 2px;
        background: var(--divider-color);
        height: 40%;
      }

      .steps span:nth-child(2) { height: 60%; }
      .steps span:nth-child(3) { height: 80%; }
      .steps span:nth-child(n+4) { height: 100%; }

      .steps span.on {
        background: var(--primary-color);
      }

      /* --------------------------------------------------------- details */

      .details {
        display: flex;
        flex-direction: column;
      }

      .detail-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color);
        cursor: pointer;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .detail-row ha-icon {
        --mdc-icon-size: 18px;
        color: var(--state-icon-color, var(--secondary-text-color));
      }

      .detail-name {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .detail-state {
        font-size: 14px;
        color: var(--secondary-text-color);
        text-align: right;
      }

      /* ---------------------------------------------------------- server */

      .section {
        border-top: 1px solid var(--divider-color);
        padding-top: var(--teddy-gap);
      }

      .section h3 {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0 0 10px 0;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .section h3 ha-icon {
        --mdc-icon-size: 18px;
      }

      .server-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 8px;
      }

      .server-tile {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 10px;
        border-radius: 12px;
        background: var(--secondary-background-color);
        cursor: pointer;
        min-width: 0;
      }

      .tile-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tile-value {
        font-size: 15px;
        font-weight: 600;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .server-controls {
        margin-top: 10px;
      }

      .server-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 6px 4px;
        border-bottom: 1px solid var(--divider-color);
        cursor: pointer;
      }

      .server-control:last-child {
        border-bottom: none;
      }

      .server-control-name {
        font-size: 14px;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .link-button {
        margin-top: 8px;
        padding: 0;
        border: none;
        background: none;
        font: inherit;
        font-size: 13px;
        color: var(--primary-color);
        cursor: pointer;
      }

      .empty {
        font-size: 14px;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      /* ----------------------------------------------------------- setup */

      .setup {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .setup ha-icon {
        --mdc-icon-size: 40px;
        color: var(--primary-color);
      }

      .setup h3 {
        margin: 0 0 4px 0;
        color: var(--primary-text-color);
      }

      .setup p {
        margin: 0;
        color: var(--secondary-text-color);
      }

      @media (max-width: 480px) {
        .stats {
          grid-template-columns: 1fr;
        }

        .cover {
          width: 76px;
          height: 76px;
        }
      }
    `;
  }
}

customElements.define('teddy-card', TeddyCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'teddy-card',
  name: 'TeddyCloud Toniebox Card',
  description: 'A custom card for displaying TeddyCloud Toniebox information',
  version: CARD_VERSION
});
