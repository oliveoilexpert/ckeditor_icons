
import {Core, UI, Utils, Widget} from "@typo3/ckeditor5-bundle.js";
import IconsView from './UI/IconsView.js';
import IconsNavigationView from './UI/IconsNavigationView.js';
import IconsSearchView from './UI/IconsSearchView.js';
import IconGridView from './UI/IconGridView.js';
import IconInfoView from './UI/IconInfoView.js';

const ALL_SPECIAL_CHARACTERS_GROUP = 'All';
const toolbarIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M473.7 4.1C493.5 .2 512 15.3 512 35.5V168h-.2c.1 1.3 .2 2.7 .2 4c0 28.7-28.7 52-64 52s-64-23.3-64-52s28.7-52 64-52c11.7 0 22.6 2.5 32 7V35.5L352 61.1V200h-.2c.1 1.3 .2 2.7 .2 4c0 28.7-28.7 52-64 52s-64-23.3-64-52s28.7-52 64-52c11.7 0 22.6 2.5 32 7V61.1c0-15.3 10.8-28.4 25.7-31.4l128-25.6zM480 172c0-3.1-1.5-7.5-6.9-11.9c-5.5-4.5-14.3-8.1-25.1-8.1s-19.5 3.6-25.1 8.1c-5.5 4.4-6.9 8.8-6.9 11.9s1.5 7.5 6.9 11.9c5.5 4.5 14.3 8.1 25.1 8.1s19.5-3.6 25.1-8.1c5.5-4.4 6.9-8.8 6.9-11.9zM320 204c0-3.1-1.5-7.5-6.9-11.9c-5.5-4.5-14.3-8.1-25.1-8.1s-19.5 3.6-25.1 8.1c-5.5 4.4-6.9 8.8-6.9 11.9s1.5 7.5 6.9 11.9c5.5 4.5 14.3 8.1 25.1 8.1s19.5-3.6 25.1-8.1c5.5-4.4 6.9-8.8 6.9-11.9zM105.4 54.6l-6-6c-9-9-21.8-13.1-34.4-11c-19 3.2-33 19.6-33 38.9v2.9c0 11.9 4.9 23.2 13.6 31.4L128 187.7l82.4-76.9c8.7-8.1 13.6-19.5 13.6-31.4V76.5c0-19.3-13.9-35.8-33-38.9c-12.6-2.1-25.4 2-34.4 11l-6 6L128 77.3 105.4 54.6zM59.7 6C82.5 2.3 105.7 9.7 122 26l0 0 6 6 6-6C150.3 9.7 173.5 2.3 196.3 6C230.7 11.8 256 41.6 256 76.5v2.9c0 20.8-8.6 40.6-23.8 54.8l-90.4 84.3c-3.8 3.5-8.7 5.5-13.8 5.5s-10.1-2-13.8-5.5L23.8 134.2C8.6 120 0 100.2 0 79.5V76.5C0 41.6 25.3 11.8 59.7 6zM72 320H48c-8.8 0-16 7.2-16 16V464c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V336c0-8.8-7.2-16-16-16H216c-12.1 0-23.2-6.8-28.6-17.7L180.2 288H107.8l-7.2 14.3C95.2 313.2 84.1 320 72 320zm136.8-46.3L216 288h24c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336c0-26.5 21.5-48 48-48H72l7.2-14.3c5.4-10.8 16.5-17.7 28.6-17.7h72.4c12.1 0 23.2 6.8 28.6 17.7zM112 392a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm32 64a64 64 0 1 1 0-128 64 64 0 1 1 0 128zM475.3 283.3L390.6 368H480c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-112 112c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L441.4 400H352c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>'

export default class Icons extends Core.Plugin {

    static get pluginName() {
        return 'Icons';
    }

    constructor(editor) {
        super(editor);
        const t = editor.t;
        this._icons = new Map();
        this._groups = new Map();
        this._allIconsGroupLabel = t('All');
    }

    init() {
        const editor = this.editor;
        const model = editor.model;
        const editing = editor.editing;
        const t = editor.t;
        const inputCommand = editor.commands.get('insertText');
        const allowAttributes = [
            ...model.schema.getDefinition('$text').allowAttributes,
            'class',
            'htmlA'
        ];
        model.schema.register('iconSpanTag', {
            allowWhere: '$text',
            isInline: true,
            isObject: true,
            allowAttributes
        });
        model.schema.extend('$text', {
            //allowAttributes
        });
        // model.schema.extend('linkHref', {
        //     allowContentOf: '$block',
        // });
        editor.conversion.for('upcast')
            .elementToElement({
                upcastAlso: 'a',
                view: {
                    name: 'span',
                    classes: [ 'char-icon' ]
                },
                model: 'iconSpanTag',
            })
            .attributeToAttribute( {
                view: 'class',
                model: 'class',
            } );
        editor.conversion.for('dataDowncast')
            .elementToElement({
                downcastAlso: 'a',
                model: 'iconSpanTag',
                view: (modelElement, {writer}) => {
                    return writer.createAttributeElement('span', {class: modelElement._attrs.get('class')} );
                },
            });
        editor.conversion.for('editingDowncast')
            .elementToElement({
                downcastAlso: 'a',
                model: 'iconSpanTag',
                view: (modelElement, {writer}) => {
                    return Widget.toWidget(
                        writer.createContainerElement(
                            'span',
                            { class: 'ck-icon-editing__widget' },
                            [writer.createRawElement(
                                'span',
                                {}, element => {
                                    return element.innerHTML = `<span class="${modelElement._attrs.get('class')}"></span>`
                                }
                                )
                            ]
                        ),
                        writer,
                        { label: 'icon widget' }
                    );

                },
            });
        editor.ui.componentFactory.add('icons', locale => {
            const dropdownView = UI.createDropdown(locale);
            let dropdownPanelContent;
            dropdownView.buttonView.set({
                label: 'Icons',
                icon: toolbarIcon,
                tooltip: true
            });

            dropdownView.bind('isEnabled').to(inputCommand);
            dropdownView.on('execute', (evt, data) => {
                model.change(writer => {
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    const classes = `char-icon icon--${data.icon}`;
                    let iconSpanTag = writer.createElement('iconSpanTag', { class: classes });
                    model.insertContent(iconSpanTag);
                    if (insertPosition.nodeBefore && insertPosition.nodeBefore.constructor.name === 'Text$1') {
                        const attrs = insertPosition.nodeBefore._attrs;
                        console.log(insertPosition.nodeBefore);
                        attrs.set('class', classes);
                        iconSpanTag = writer.createElement('iconSpanTag', attrs);
                        console.log(iconSpanTag);
                        writer.remove( insertPosition.nodeAfter );
                        model.insertContent(iconSpanTag);
                    }
                    editing.view.focus();
                    writer.setSelection(iconSpanTag, 'on');

                });
            });
            dropdownView.on('change:isOpen', () => {
                if (!dropdownPanelContent) {
                    dropdownPanelContent = this._createDropdownPanelContent(locale, dropdownView);
                    const iconsView = new IconsView(locale, dropdownPanelContent.navigationView, dropdownPanelContent.searchView, dropdownPanelContent.gridView, dropdownPanelContent.infoView);
                    dropdownView.panelView.children.add(iconsView);
                }
                dropdownPanelContent.infoView.set({
                    character: null,
                    name: null
                });
            });
            return dropdownView;
        });
    }

    addItems(groupName, items, options = { label: groupName }) {
        if (groupName === ALL_SPECIAL_CHARACTERS_GROUP) {
            throw new Utils.CKEditorError('special-character-invalid-group-name', null);
        }
        const group = this._getGroup(groupName, options.label);
        for (const item of items) {
            group.items.add(item.title);
            this._icons.set(item.title, item.icon);
        }
    }

    getGroups() {
        const groups = Array.from(this._groups.keys());
/*        const order = this.editor.config.get('icons.order') || [];
        const invalidGroup = order.find(item => !groups.includes(item));
        if (invalidGroup) {
            /!**
             * One of the special character groups in the "specialCharacters.order" configuration doesn't exist.
             *
             * @error special-character-invalid-order-group-name
             *!/
            throw new Utils.CKEditorError('special-character-invalid-order-group-name', null, { invalidGroup });
        }*/
        return new Set([
            //...order,
            ...groups.sort()
        ]);
    }

    getIconsForGroup(groupName) {
        if (groupName === ALL_SPECIAL_CHARACTERS_GROUP) {
            return new Set(this._icons.keys());
        }
        const group = this._groups.get(groupName);
        if (group) {
            return group.items;
        }
    }

    getIcon(title) {
        return this._icons.get(title);
    }

    _getGroup(groupName, label) {
        if (!this._groups.has(groupName)) {
            this._groups.set(groupName, {
                items: new Set(),
                label
            });
        }
        return this._groups.get(groupName);
    }

    _updateGrid(currentGroupName, gridView) {
        // Updating the grid starts with removing all tiles belonging to the old group.
        gridView.tiles.clear();
        const iconTiles = this.getIconsForGroup(currentGroupName);
        for (const title of iconTiles) {
            const icon = this.getIcon(title);
            gridView.tiles.add(gridView.createTile(icon, title));
        }
    }
    _filterGrid(filterString, gridView) {
        for (const tile of gridView.tiles) {
            if (tile.ariaLabel.indexOf(filterString) === -1) {
                tile.element.style.display = 'none';
            } else {
                tile.element.style.display = '';
            }
        }
    }

    _createDropdownPanelContent(locale, dropdownView) {
        const groupEntries = Array
            .from(this.getGroups())
            .map(name => ([name, this._groups.get(name).label]));
        // The map contains a name of category (an identifier) and its label (a translational string).
        const specialCharsGroups = new Map([
            // Add a special group that shows all available special characters.
            [ALL_SPECIAL_CHARACTERS_GROUP, this._allIconsGroupLabel],
            ...groupEntries
        ]);
        const navigationView = new IconsNavigationView(locale, specialCharsGroups);
        const searchView = new IconsSearchView(locale);
        const gridView = new IconGridView(locale);
        const infoView = new IconInfoView(locale);
        gridView.delegate('execute').to(dropdownView);
        gridView.on('tileHover', (evt, data) => {
            infoView.set(data);
        });
        gridView.on('tileFocus', (evt, data) => {
            infoView.set(data);
        });
        // Update the grid of special characters when a user changed the character group.
        navigationView.on('execute', () => {
            this._updateGrid(navigationView.currentGroupName, gridView);
        });
        searchView.on('change:value', evt => {
            window.requestAnimationFrame(() => {
                this._filterGrid(evt.source.value, gridView);
            });
        });
        // Set the initial content of the special characters grid.
        this._updateGrid(navigationView.currentGroupName, gridView);
        return { navigationView, searchView, gridView, infoView };
    }
}