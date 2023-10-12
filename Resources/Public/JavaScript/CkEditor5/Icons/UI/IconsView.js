import { View, FocusCycler } from "@ckeditor/ckeditor5-ui";
import { FocusTracker, KeystrokeHandler } from "@ckeditor/ckeditor5-utils";

export default class IconsView extends View {

    constructor(locale, navigationView, searchView, gridView, infoView) {
        super(locale);
        this.navigationView = navigationView;
        this.searchView = searchView;
        this.gridView = gridView;
        this.infoView = infoView;
        this.items = this.createCollection();
        this.focusTracker = new FocusTracker();
        this.keystrokes = new KeystrokeHandler();
        this._focusCycler = new FocusCycler({
            focusables: this.items,
            focusTracker: this.focusTracker,
            keystrokeHandler: this.keystrokes,
            actions: {
                focusPrevious: 'shift + tab',
                focusNext: 'tab'
            }
        });
        this.setTemplate({
            tag: 'div',
            children: [
                this.navigationView,
                this.searchView,
                this.gridView,
                this.infoView
            ],
            attributes: {
                tabindex: '-1'
            }
        });
        this.items.add(this.navigationView.groupDropdownView.buttonView);
        this.items.add(this.gridView);
    }

    render() {
        super.render();
        this.focusTracker.add(this.navigationView.groupDropdownView.buttonView.element);
        this.focusTracker.add(this.gridView.element);
        this.keystrokes.listenTo(this.element);
    }

    destroy() {
        super.destroy();
        this.focusTracker.destroy();
        this.keystrokes.destroy();
    }
    focus() {
        this.searchView.focus();
    }
}