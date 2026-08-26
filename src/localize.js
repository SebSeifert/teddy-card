const translations = {
  en: {
    title: 'Title',
    now_playing: 'Now playing',
    chapter: 'Chapter',
    battery: 'Battery',
    charging: 'Charging',
    on_charger: 'On charger',
    off_charger: 'Off charger',
    volume: 'Volume',
    volume_db: 'Volume dB',
    volume_limit: 'Volume limit',
    unknown: 'Unknown',
    no_content: 'No Tonie on the box',
    unknown_title: 'Unknown content',
    tag_uid: 'Tag UID',
    charging_station: 'Charging Station',
    volume_level: 'Volume Level',
    small_ear_quieter: 'Small Ear (quieter)',
    big_ear_louder: 'Big Ear (louder)',
    content_audio_id: 'Content Audio ID',
    cache_cloud_content: 'Cache Cloud Content',
    enable_cloud_operation: 'Enable Cloud Operation',
    config: {
      toniebox_id: 'Toniebox ID',
      toniebox_name: 'Toniebox Name',
      language: 'Language',
      entity_source: 'Select Toniebox Entity',
      toniebox_id_description: 'The ID of your Toniebox (used in entity names)',
      toniebox_name_description: 'Display name for your Toniebox',
      language_description: 'Language for the card interface',
      entity_source_description: 'Select any entity from your Toniebox to auto-configure',
      show_details: 'Show extra details',
      show_details_description: 'Adds tag UID, audio ID and ear buttons to the card',
      no_devices_found: 'No TeddyCloud devices found',
      devices_found: 'Found {count} TeddyCloud device(s)',
      entity_validation: 'Detected entities',
      entities_missing: '{count} of {total} entities missing',
      entities_all_found: 'All entities found'
    },
    errors: {
      missing_toniebox_id: 'Toniebox ID is required',
      missing_toniebox_name: 'Toniebox Name is required',
      entity_not_found: 'Entity not found',
      not_configured: 'Select a Toniebox entity in the card editor.'
    }
  },
  de: {
    title: 'Titel',
    now_playing: 'Läuft gerade',
    chapter: 'Kapitel',
    battery: 'Akku',
    charging: 'Lädt',
    on_charger: 'In Ladestation',
    off_charger: 'Nicht am Laden',
    volume: 'Lautstärke',
    volume_db: 'Lautstärke dB',
    volume_limit: 'Lautstärke-Begrenzung',
    unknown: 'Unbekannt',
    no_content: 'Kein Tonie auf der Box',
    unknown_title: 'Unbekannter Inhalt',
    tag_uid: 'Tag UID',
    charging_station: 'Ladestation',
    volume_level: 'Lautstärke Level',
    small_ear_quieter: 'kleines Ohr (leiser)',
    big_ear_louder: 'großes Ohr (lauter)',
    content_audio_id: 'Content Audio ID',
    cache_cloud_content: 'Cloud-Inhalte zwischenspeichern',
    enable_cloud_operation: 'Cloud-Betrieb aktivieren',
    config: {
      toniebox_id: 'Toniebox ID',
      toniebox_name: 'Toniebox Name',
      language: 'Sprache',
      entity_source: 'Toniebox Entity auswählen',
      toniebox_id_description: 'Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)',
      toniebox_name_description: 'Anzeigename für Ihre Toniebox',
      language_description: 'Sprache für die Karten-Oberfläche',
      entity_source_description: 'Wählen Sie eine Entity Ihrer Toniebox zur automatischen Konfiguration',
      show_details: 'Zusatzinfos anzeigen',
      show_details_description: 'Ergänzt Tag UID, Audio ID und Ohr-Tasten auf der Karte',
      no_devices_found: 'Keine TeddyCloud Geräte gefunden',
      devices_found: '{count} TeddyCloud Gerät(e) gefunden',
      entity_validation: 'Erkannte Entities',
      entities_missing: '{count} von {total} Entities fehlen',
      entities_all_found: 'Alle Entities gefunden'
    },
    errors: {
      missing_toniebox_id: 'Toniebox ID ist erforderlich',
      missing_toniebox_name: 'Toniebox Name ist erforderlich',
      entity_not_found: 'Entity nicht gefunden',
      not_configured: 'Bitte im Karten-Editor eine Toniebox-Entity auswählen.'
    }
  }
};

export function localize(key, language = 'en', replacements = {}) {
  const keys = key.split('.');
  let value = translations[language] || translations.en;
  let fallback = translations.en;

  for (const k of keys) {
    value = value?.[k];
    fallback = fallback?.[k];
  }

  const resolved = value ?? fallback;
  if (typeof resolved !== 'string') {
    return key;
  }

  let result = resolved;
  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    result = result.split('{' + placeholder + '}').join(String(replacement));
  });

  return result;
}
