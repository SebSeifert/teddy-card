# TeddyCloud Toniebox Card

[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/rknall/teddy-card.svg)](https://github.com/rknall/teddy-card/releases)
[![License](https://img.shields.io/github/license/rknall/teddy-card.svg)](LICENSE.md)

A smart Home Assistant card for TeddyCloud Toniebox integration with **automatic device discovery**, **visual entity selection**, and **intelligent configuration**. No more manual ID entry required!

## Screenshots

### Card Overview
![TeddyCloud Card](https://via.placeholder.com/600x400/03a9f4/ffffff?text=TeddyCloud+Toniebox+Card)
*Example of the TeddyCloud Toniebox Card showing content, status, and controls*

### Smart Visual Editor  
![Smart Visual Editor](https://via.placeholder.com/600x300/4caf50/ffffff?text=Smart+Visual+Editor)
*Auto-discovery mode: Just select any Toniebox entity for instant configuration*

### Manual Configuration Mode
![Manual Configuration](https://via.placeholder.com/600x300/ff5722/ffffff?text=Manual+Configuration)
*Traditional mode: Enter Toniebox ID and name manually (backward compatible)*

### Mobile View
![Mobile Responsive](https://via.placeholder.com/300x600/ff9800/ffffff?text=Mobile+View)
*Responsive design that works perfectly on mobile devices*

This card integrates with the [TeddyCloud Add-on](https://github.com/mrueg/addon-teddycloud) to provide a comprehensive overview of your Toniebox status, content, and server settings.

## ✨ Key Features

### 🧠 Smart Configuration (v1.1.0+)
- **🔍 Auto-Discovery**: Automatically finds all TeddyCloud devices in your Home Assistant
- **🎯 Entity Picker**: Select any Toniebox entity for instant configuration
- **⚡ One-Click Setup**: No more guessing Toniebox IDs or manual entry
- **✅ Real-Time Validation**: Shows which entities are available vs. missing
- **🔄 Mode Toggle**: Switch between automatic and manual configuration

### 📱 Card Features
- **🎵 Content Display**: Current Tonie picture and title
- **📊 Status Information**: Battery, charging, volume levels, and controls
- **👆 Interactive Elements**: Click entities for detailed information
- **📱 Responsive Design**: Perfect on desktop and mobile devices
- **🌍 Multi-Language**: Full English and German support

### 🛠️ Technical Features
- **⚙️ Visual Editor**: Professional configuration interface with live validation
- **🔄 Backward Compatible**: Existing configurations continue to work
- **🎯 HACS Ready**: Easy installation and updates
- **⚡ Performance Optimized**: Fast loading and smooth interactions

## Prerequisites

- Home Assistant 2024.4.1 or newer
- [HACS](https://hacs.xyz/) installed
- [TeddyCloud Add-on](https://github.com/mrueg/addon-teddycloud) running and configured
- TeddyCloud entities available in Home Assistant

## Installation

### Via HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Navigate to "Frontend" section
3. Click the three dots menu and select "Custom repositories"
4. Add this repository URL: `https://github.com/rknall/teddy-card`
5. Select "Dashboard" as the category
6. Click "Add"
7. Find "TeddyCloud Toniebox Card" in the HACS frontend list
8. Click "Install"
9. Restart Home Assistant

### Manual Installation

1. Download the latest `teddy-card.js` file from the [releases page](https://github.com/rknall/teddy-card/releases)
2. Copy the file to your `config/www` directory
3. Add the following to your `ui-lovelace.yaml` or through the UI:

```yaml
resources:
  - url: /local/teddy-card.js
    type: module
```

4. Restart Home Assistant

## 🔧 Configuration

### 🚀 Setup

1. **Add the Card**: Dashboard → Edit → Add Card → "TeddyCloud Toniebox Card"
2. **Select Entity**: Choose any Toniebox entity from the dropdown - the Toniebox ID
   and name are derived from it
3. **Pick the sections**: toggle the TeddyCloud server block and the extra details
4. **Validate**: the editor lists every entity it discovered for that Toniebox

### 📝 YAML Configuration

```yaml
type: custom:teddy-card
entity_source: "sensor.teddycloud_box_12345678_tag_valid"  # Any Toniebox entity
language: "de"        # Optional: 'en' or 'de'
show_server: true     # Optional: TeddyCloud server section (default: true)
show_details: false   # Optional: tag UID, audio ID, ear buttons (default: false)

# Without an entity picker (backward compatible)
type: custom:teddy-card
toniebox_id: "12345678"
toniebox_name: "My Toniebox"
language: "en"
```

| Option | Default | Description |
|--------|---------|-------------|
| `entity_source` | – | Any Toniebox entity; the Toniebox ID is derived from it |
| `toniebox_id` | – | Manual alternative to `entity_source` |
| `toniebox_name` | auto | Card headline; auto-detected from the entity |
| `language` | `en` | `en` or `de` |
| `show_server` | `true` | Render the TeddyCloud server section |
| `show_details` | `false` | Render tag UID, audio ID, ear buttons and last seen |

### 🔄 Upgrading from v1.0.x

Existing configurations **work automatically** - no changes needed! 
- Your cards continue using manual mode
- Switch to auto mode anytime for easier management

## Entities

Since v0.4.0 the card **discovers** the entities of the selected Toniebox instead of
relying on fixed entity IDs. Everything named `teddycloud_box_[ID]_*` is scanned and
mapped onto the roles below, so extra sensors your TeddyCloud version provides are
picked up automatically. Anything that is missing is simply left out of the card.

### Toniebox roles

| Role | Matched by | Shown as |
|------|-----------|----------|
| Cover | `image.*content_picture` (or any box image) | Hero artwork + blurred backdrop |
| Title | `sensor.*content_title` | Hero headline |
| Chapter | `sensor.*chapter` / `*track` / `*episode`, or a `chapter`/`track` attribute on the title sensor | Line below the title |
| Battery | `sensor.*battery*` | Battery tile incl. progress bar |
| Charging | `binary_sensor.*charger*` | Header pill + battery tile |
| Volume | `sensor.*volume_level` and `sensor.*volume_db` | Volume tile with level bars |
| Tag UID / Audio ID / Ears / Last seen | `*tag*`, `*audio_id*`, `event.*volume_up`/`_down`, `*last_seen*` | Only with `show_details: true` |

### Server entities

Every `teddycloud_server_*` entity is used:

- `switch.*` / `input_boolean.*` become toggles you can flip directly from the card
- `sensor.*`, `binary_sensor.*` and `update.*` become status tiles (version, cached
  content, connection state, …), collapsed to 6 tiles with a *Show all* link

## Card Layout

1. **Header**: Toniebox name and a charging pill
2. **Hero**: cover artwork, title and current chapter
3. **Tiles**: battery / charging state and volume level (incl. dB)
4. **Details** (optional): tag UID, audio ID, ear buttons, last seen
5. **TeddyCloud Server** (optional): status tiles and switches

## Language Support

The card supports two languages:

- **English** (`en`) - Default
- **German** (`de`)

Language can be set during configuration or changed later through the visual editor.

### German Translations

| English | German |
|---------|---------|
| Title | Titel |
| Charging Station | Ladestation |
| Small Ear (quieter) | kleines Ohr (leiser) |
| Big Ear (louder) | großes Ohr (lauter) |
| Cache Cloud Content | Cloud-Inhalte zwischenspeichern |
| Enable Cloud Operation | Cloud-Betrieb aktivieren |

## 🔧 Troubleshooting

### 🚀 Quick Fixes (Try These First!)

**No TeddyCloud devices found in auto mode?**
- ✅ Ensure [TeddyCloud Add-on](https://github.com/mrueg/addon-teddycloud) is running
- ✅ Check Developer Tools → States for entities starting with `teddycloud_box_`
- ✅ Switch to Manual Mode temporarily if needed

**Card not appearing in dashboard editor?**
- ✅ Restart Home Assistant after HACS installation
- ✅ Clear browser cache (Ctrl+F5)
- ✅ Check if card appears in HACS → Frontend section

### 📊 Entity Validation Issues

The v1.1.0+ editor shows **real-time entity validation**:

- **🟢 Green**: All entities found - perfect setup!
- **🟡 Yellow**: Some entities missing - partial functionality
- **🔴 Red**: Many entities missing - check TeddyCloud integration

**Common solutions:**
1. **TeddyCloud not running**: Start the add-on
2. **Wrong Toniebox ID**: Use auto-discovery mode instead
3. **Integration issues**: Restart TeddyCloud add-on

### ⚙️ Configuration Problems

**Auto-discovery mode issues:**
- Use any TeddyCloud entity (sensor, binary_sensor, image, etc.)
- The card extracts the Toniebox ID automatically
- Switch modes if auto-detection fails

**Manual mode issues:**
- **Toniebox ID**: Find it in entity names (e.g., `teddycloud_box_12345678_*`)
- **Entity format**: Must match exactly what TeddyCloud creates
- **Case sensitive**: Use exact entity IDs from Developer Tools

### 🎛️ Visual Editor Issues

**Editor not loading:**
1. Update to Home Assistant 2024.4.1+
2. Clear browser cache completely
3. Disable browser extensions temporarily
4. Check browser console for errors (F12)

**Toggle switch not working:**
- Requires TeddyCloud entities to be detected
- Try manual mode if auto-discovery fails
- Refresh the page and try again

### 🔄 Migration from v1.0.x

**Existing cards not working after update:**
- Cards should work automatically (backward compatible)
- If issues occur, edit the card and save (no changes needed)
- Check the validation section for any missing entities

### 📱 Mobile Issues

**Card not responsive on mobile:**
- Update to latest version (v1.1.0+)
- Clear mobile browser cache
- Try landscape orientation for better entity validation view

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/rknall/teddy-card.git
cd teddy-card

# Install dependencies
npm install

# Build the card
npm run build

# Watch for changes during development
npm run watch
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/rknall/teddy-card/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/rknall/teddy-card/issues)
- 📖 **Documentation**: [Wiki](https://github.com/rknall/teddy-card/wiki)

## Related Projects

- [TeddyCloud Add-on](https://github.com/mrueg/addon-teddycloud) - The TeddyCloud Home Assistant Add-on that provides the entities for this card
- [HACS](https://hacs.xyz/) - Home Assistant Community Store

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📅 Changelog

### v1.1.0 - Smart Entity Selection System (2025-01-XX)
🎯 **Major Enhancement**: Transforms configuration from manual ID entry to intelligent device discovery!

**🧠 New Smart Features:**
- **🔍 Auto-Discovery**: Automatically finds all TeddyCloud devices in Home Assistant
- **🎛️ Visual Entity Picker**: Select any Toniebox entity for instant configuration  
- **⚡ One-Click Setup**: No more guessing Toniebox IDs
- **🔄 Mode Toggle**: Switch between automatic and manual configuration
- **✅ Real-Time Validation**: Shows which entities are available vs. missing with visual indicators

**🎨 Enhanced User Experience:**
- **🎯 Smart Editor**: Professional interface with live validation and entity counts
- **📱 Improved Mobile**: Better responsive design for configuration on phones
- **🌐 Extended Translations**: New German/English translations for all new features
- **🚨 Better Error Messages**: Clear feedback for troubleshooting

**🔧 Technical Improvements:**
- **📦 New Architecture**: Modular utility functions for entity discovery and validation
- **🔄 Backward Compatibility**: All existing configurations continue to work seamlessly
- **⚡ Performance**: Optimized entity discovery and validation algorithms
- **🛠️ Developer Experience**: Enhanced debugging and error handling

**🎖️ Migration-Friendly:**
- Zero breaking changes - existing cards work automatically
- Optional upgrade to smart mode when editing cards
- Fallback mechanisms for all edge cases

### v1.0.0 - Initial Release (2024-XX-XX)
- 🚀 Initial release with manual configuration
- 🎵 Support for all TeddyCloud entities (content, status, controls)
- ⚙️ Visual editor with basic configuration
- 🌍 Multi-language support (English/German)
- 🎯 HACS compatibility and validation

---