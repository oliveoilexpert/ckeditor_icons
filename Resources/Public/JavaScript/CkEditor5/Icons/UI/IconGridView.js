import { View, ButtonView, addKeyboardHandlingForGrid } from "@ckeditor/ckeditor5-ui";
import { FocusTracker, KeystrokeHandler, global } from "@ckeditor/ckeditor5-utils";

export default class IconGridView extends View {
    constructor(locale) {
        super(locale);
        this.tiles = this.createCollection();
        this.setTemplate({
            tag: 'div',
            children: [
                {
                    tag: 'div',
                    attributes: {
                        class: [
                            'ck',
                            'ck-icon-grid__tiles'
                        ]
                    },
                    children: this.tiles
                }
            ],
            attributes: {
                class: [
                    'ck',
                    'ck-icon-grid'
                ]
            }
        });
        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();
        addKeyboardHandlingForGrid({
            keystrokeHandler: this.keystrokes,
            focusTracker: this.focusTracker,
            gridItems: this.tiles,
            numberOfColumns: () => global.window
                .getComputedStyle(this.element.firstChild) // Responsive .ck-character-grid__tiles
                .getPropertyValue('grid-template-columns')
                .split(' ')
                .length,
            uiLanguageDirection: this.locale && this.locale.uiLanguageDirection
        });
    }

    createTile(icon) {
        const tile = new ButtonView(this.locale);
        tile.set({
            label: '',
            withText: false,
            ariaLabel: icon.title,
            class: `ck-icon-grid__tile`
        });
        // Labels are vital for the users to understand what character they're looking at.
        // For now we're using native title attribute for that, see #5817.
        tile.extendTemplate({
            attributes: {
                title: icon.title
            },
            on: {
                mouseover: tile.bindTemplate.to('mouseover'),
                focus: tile.bindTemplate.to('focus')
            }
        });
        tile.on('render', () => {
            tile.element.innerHTML += `<span class="ck-reset_all-excluded"><i class="${icon.baseClass} ${icon.keyClassPrefix}${icon.keyClass}"></i></span>`;
        });
        tile.on('mouseover', () => {
            this.fire('tileHover', icon );
        });
        tile.on('focus', () => {
            this.fire('tileFocus', icon );
        });
        tile.on('execute', () => {
            this.fire('execute', icon );
        });
        return tile;
    }

    render() {
        super.render();
        for (const item of this.tiles) {
            this.focusTracker.add(item.element);
        }
        this.tiles.on('change', (eventInfo, { added, removed }) => {
            if (added.length > 0) {
                for (const item of added) {
                    this.focusTracker.add(item.element);
                }
            }
            if (removed.length > 0) {
                for (const item of removed) {
                    this.focusTracker.remove(item.element);
                }
            }
        });
        this.keystrokes.listenTo(this.element);
    }

    destroy() {
        super.destroy();
        this.keystrokes.destroy();
    }

    focus() {
        this.tiles.first.focus();
    }
}