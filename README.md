# CKEditor 5: Custom Icons Plugin (TYPO3 Extension)
Adds an icon dropdown for custom icon fonts to CKEditor in TYPO3. 

Out of the box Font Awesome Free icons are available.

Extendable with any custom icon font!
## Installation

Perform the following steps:

1. Load and install the extension
2. Extend your CKEditor configuration (see below)

### CKEditor configuration

```yaml
editor:
  config:
    # 1. Import the plugin:
    importModules:
      - '@ubos/ckeditor-icons'
      # 2. If you want to use Font Awesome Free icons, also include
      - '@ubos/ckeditor-fontawesome-icons'

    toolbar:
      items:
        # 3. Add the button to your existing list of toolbar items:
        - Icons
```

## Adding icons

The idea is that any extension can provide an icon font and they are all displayed in one dropdown.

To add icons in your extension, perform the following steps:
1. Create a CKEditor plugin in your extension that adds icons to the `Icons` plugin
2. Register the Plugin JavaScript file in your extension's `JavaScriptModules.php` file
3. Add the plugin to the CKEditor configuration
4. Add styles to the CKEditor view so the icons are displayed correctly

#### 1. Create a CKEditor plugin JavaScript class in your extension
Note: this is just an example. All that is really mandatory is that you call the `addItems` method of the `Icons` plugin.
```javascript
import { Plugin } from "@ckeditor/ckeditor5-core";

const iconGroupName = 'Ext';
const icons = {
    { key: 'arrow-up' },
    { key: 'arrow-down' },
    { key: 'arrow-left' },
    { key: 'arrow-right' }
};

export default class ExtIcons extends Plugin {

    static pluginName = 'ExtIcons';
    
    init() {
        this.addIcons(icons);
    }
    
    addIcons(icons) {
        const plugin = this.editor.plugins.get( 'Icons' );
        plugin.addItems( iconGroupName, [
            ...icons,
        ], { label: iconGroupName } );
    }

}
```
While every item in the `icons` array is an object, the only mandatory property is `key`.

In this more advanced example, the icons are imported from a data file (generated by your icon font build process, for example), and then mapped to use all the available icon options.
```javascript
import { Plugin } from "@ckeditor/ckeditor5-core";
import ICONS_CODEPOINTS from '../Fonts/Icons/icons.js';

const iconGroupName = 'Ext';
const baseClass = 'char-icon';
const keyClassPrefix = 'icon--';

export default class ExtIcons extends Plugin {

    static pluginName = 'ExtIcons';
    
    init() {
        this.addIcons(this.mapIconData(ICONS_CODEPOINTS));
    }
    addIcons(icons) {
        const plugin = this.editor.plugins.get( 'Icons' );
        plugin.addItems(
            iconGroupName,
            [...icons],
            { label: iconGroupName }
        );
    }
    mapIconData(data) {
        return Object.keys(data).map(key => {
            return {
                key,
                title: key.replaceAll('-', ' '),
                baseClass: baseClass,
                keyClassPrefix: keyClassPrefix,
            }
        });
    }
}
```
Icon tags are rendered as follows:
```javascript
const iconTag = `<i class="${icon.baseClass} ${icon.keyClassPrefix}${icon.key}"></i>`;
```

#### 2. Register the JavaScript file in your extension's "JavaScriptModules.php" file
```php
<?php
return [
    'dependencies' => ['backend'],
    'tags' => [
        'backend.form',
    ],
    'imports' => [
        '@vendor/ckeditor-icons-ext' => 'EXT:ext/Resources/Public/JavaScript/Plugin/ExtIcons.js',
    ],
];
```
#### 3. Add the plugin to the CKEditor configuration
```yaml
editor:
  config:
    importModules:
      - '@ubos/ckeditor-icons'
      - '@vendor/ckeditor-icons-ext'
```
#### 4. Add styles to the CKEditor view so the icons are displayed correctly
Whatever styling is necessary to display the icons correctly in the frontend also needs to be added to the CKEditor view.

In `ext_localconf.php`:
```php
$GLOBALS['TYPO3_CONF_VARS']['BE']['stylesheets']['ext_icon_font'] = 'EXT:ext/Resources/Public/Css/icon-font.css';
```