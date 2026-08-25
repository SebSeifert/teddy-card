/**
 * Utility functions for TeddyCloud entity discovery and management
 */

const BOX_PREFIX = 'teddycloud_box_';

/**
 * Extract Toniebox ID from an entity ID
 * @param {string} entityId - The entity ID to parse
 * @returns {string|null} The extracted Toniebox ID or null if not found
 */
export function extractBoxIdFromEntity(entityId) {
  if (!entityId || typeof entityId !== 'string') {
    return null;
  }

  const match = entityId.match(/teddycloud_box_([^_]+)_/);
  return match ? match[1] : null;
}

/**
 * Split an entity id into its domain and object id
 * @param {string} entityId
 * @returns {{domain: string, objectId: string}}
 */
export function splitEntityId(entityId) {
  const idx = (entityId || '').indexOf('.');
  if (idx < 0) {
    return { domain: '', objectId: entityId || '' };
  }
  return { domain: entityId.slice(0, idx), objectId: entityId.slice(idx + 1) };
}

/**
 * Check if an entity ID is a TeddyCloud box entity
 */
export function isTeddyCloudEntity(entityId) {
  return Boolean(entityId) && entityId.includes(BOX_PREFIX);
}

/**
 * Extract friendly device name from entity attributes
 * @param {object} entity - The Home Assistant entity object
 * @param {string} boxId - The box ID for fallback naming
 * @returns {string} A friendly device name
 */
export function extractDeviceName(entity, boxId) {
  if (!entity?.attributes) {
    return `Toniebox ${boxId}`;
  }

  const friendlyName = entity.attributes.friendly_name;
  const name = entity.attributes.name;
  const deviceName = entity.attributes.device_name;

  if (friendlyName) {
    return friendlyName
      .replace(/^TeddyCloud Box \w+ /, '')
      .replace(/^Toniebox /, '')
      .replace(/^Box /, '') || `Toniebox ${boxId}`;
  }

  if (deviceName) {
    return deviceName;
  }

  if (name) {
    return name;
  }

  return `Toniebox ${boxId}`;
}

/**
 * Discover all TeddyCloud devices and their entities from Home Assistant state
 * @param {object} hass - Home Assistant object
 * @returns {Map} Map of box ID to device information
 */
export function findTeddyCloudDevices(hass) {
  const devices = new Map();

  if (!hass?.states) {
    return devices;
  }

  Object.keys(hass.states).forEach(entityId => {
    if (!isTeddyCloudEntity(entityId)) {
      return;
    }
    const boxId = extractBoxIdFromEntity(entityId);
    if (!boxId) {
      return;
    }
    if (!devices.has(boxId)) {
      devices.set(boxId, {
        id: boxId,
        entities: [],
        name: null,
        sampleEntity: entityId
      });
    }
    devices.get(boxId).entities.push(entityId);
  });

  devices.forEach((device, boxId) => {
    const sampleEntity = hass.states[device.sampleEntity];
    device.name = extractDeviceName(sampleEntity, boxId);
  });

  return devices;
}

/**
 * Collect every entity that belongs to one Toniebox, keyed by the suffix
 * following `teddycloud_box_<id>_`.
 * @param {object} hass
 * @param {string} boxId
 * @returns {Array<{entityId: string, domain: string, suffix: string}>}
 */
export function getBoxEntities(hass, boxId) {
  if (!hass?.states || !boxId) {
    return [];
  }

  const marker = `${BOX_PREFIX}${boxId}_`;

  return Object.keys(hass.states)
    .filter(entityId => entityId.includes(marker))
    .map(entityId => {
      const { domain, objectId } = splitEntityId(entityId);
      return {
        entityId,
        domain,
        suffix: objectId.slice(objectId.indexOf(marker) + marker.length)
      };
    });
}

/**
 * Find the first entity whose suffix matches one of the given patterns.
 * Patterns are tried in order, so put the most specific one first.
 * @param {Array} entities - result of getBoxEntities
 * @param {Array<RegExp>} patterns
 * @param {Array<string>} [domains] - optional domain allow list
 * @returns {string|null} entity id
 */
export function matchEntity(entities, patterns, domains = null) {
  for (const pattern of patterns) {
    const hit = entities.find(entity =>
      pattern.test(entity.suffix) && (!domains || domains.includes(entity.domain))
    );
    if (hit) {
      return hit.entityId;
    }
  }
  return null;
}

/**
 * Resolve the entities the card actually renders, using discovery first and
 * the historic naming scheme as a fallback.
 * @param {object} hass
 * @param {string} boxId
 * @returns {object} map of role -> entity id (or null)
 */
export function resolveBoxEntities(hass, boxId) {
  const found = getBoxEntities(hass, boxId);
  const fallback = getExpectedEntities(boxId);

  const pick = (patterns, domains, fallbackKey) =>
    matchEntity(found, patterns, domains) ||
    (hass?.states?.[fallback[fallbackKey]] ? fallback[fallbackKey] : null);

  return {
    contentPicture: pick([/^content_picture$/, /picture|image|cover/], ['image'], 'contentPicture'),
    contentTitle: pick([/^content_title$/, /content.*title/, /title/], ['sensor'], 'contentTitle'),
    chapter: matchEntity(found, [/chapter/, /track/, /episode/], ['sensor']),
    contentSeries: matchEntity(found, [/series/, /^content_source$/], ['sensor']),
    battery: matchEntity(found, [/battery_level/, /battery_percent/, /^battery$/, /battery/], ['sensor']),
    charger: pick([/^charger$/, /charg/], ['binary_sensor'], 'charger'),
    volumeLevel: pick([/^volume_level$/, /volume_level/], ['sensor', 'number'], 'volumeLevel'),
    volumeDb: pick([/^volume_db$/, /volume_db/], ['sensor'], 'volumeDb'),
    volumeLimit: matchEntity(found, [/volume_limit/, /max_volume/, /limit.*speaker/, /speaker.*limit/], ['number', 'select', 'sensor']),
    tagValid: pick([/^tag_valid$/, /tag/], ['sensor', 'binary_sensor'], 'tagValid'),
    contentAudioId: pick([/^content_audio_id$/, /audio_id/], ['sensor'], 'contentAudioId'),
    volumeDown: pick([/^volume_down$/], ['event'], 'volumeDown'),
    volumeUp: pick([/^volume_up$/], ['event'], 'volumeUp'),
    lastSeen: matchEntity(found, [/last_seen/, /last_online/, /last_contact/], ['sensor']),
    all: found
  };
}

/**
 * Get all expected entity IDs for a specific Toniebox (legacy naming scheme).
 * Kept as a fallback for installations the discovery cannot resolve.
 * @param {string} boxId - The Toniebox ID
 * @returns {object} Object with all expected entity IDs
 */
export function getExpectedEntities(boxId) {
  return {
    contentPicture: `image.${BOX_PREFIX}${boxId}_content_picture`,
    contentTitle: `sensor.${BOX_PREFIX}${boxId}_content_title`,
    tagValid: `sensor.${BOX_PREFIX}${boxId}_tag_valid`,
    volumeDb: `sensor.${BOX_PREFIX}${boxId}_volume_db`,
    volumeLevel: `sensor.${BOX_PREFIX}${boxId}_volume_level`,
    contentAudioId: `sensor.${BOX_PREFIX}${boxId}_content_audio_id`,
    charger: `binary_sensor.${BOX_PREFIX}${boxId}_charger`,
    volumeDown: `event.${BOX_PREFIX}${boxId}_volume_down`,
    volumeUp: `event.${BOX_PREFIX}${boxId}_volume_up`
  };
}

/**
 * Validate that the entities the card needs exist for a Toniebox
 * @param {object} hass - Home Assistant object
 * @param {string} boxId - The Toniebox ID to validate
 * @returns {object} Validation result with missing entities
 */
export function validateTonieboxEntities(hass, boxId) {
  const required = ['contentPicture', 'contentTitle', 'charger', 'volumeLevel'];
  const resolved = resolveBoxEntities(hass, boxId);
  const legacy = getExpectedEntities(boxId);
  const missing = [];
  const available = [];

  required.forEach(key => {
    if (resolved[key]) {
      available.push({ key, entityId: resolved[key] });
    } else {
      missing.push({ key, entityId: legacy[key] || key });
    }
  });

  return {
    valid: missing.length === 0,
    missing,
    available,
    discovered: resolved.all,
    totalExpected: required.length,
    foundCount: available.length
  };
}

/**
 * Get suggested entities for entity picker (entities that likely belong to TeddyCloud)
 * @param {object} hass - Home Assistant object
 * @returns {Array} Array of entity objects suitable for entity picker
 */
export function getSuggestedEntities(hass) {
  if (!hass?.states) {
    return [];
  }

  return Object.keys(hass.states)
    .filter(entityId => isTeddyCloudEntity(entityId))
    .map(entityId => {
      const entity = hass.states[entityId];
      const boxId = extractBoxIdFromEntity(entityId);
      return {
        value: entityId,
        label: `${extractDeviceName(entity, boxId)} (${entity.attributes?.friendly_name || entityId})`,
        boxId
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Create a configuration object from a selected entity
 * @param {object} hass - Home Assistant object
 * @param {string} entityId - The selected entity ID
 * @returns {object} Partial configuration object
 */
export function createConfigFromEntity(hass, entityId) {
  const boxId = extractBoxIdFromEntity(entityId);
  if (!boxId) {
    throw new Error('Invalid entity selected - cannot extract Toniebox ID');
  }

  const entity = hass.states[entityId];
  const deviceName = extractDeviceName(entity, boxId);

  return {
    entity_source: entityId,
    toniebox_id: boxId,
    toniebox_name: deviceName
  };
}
