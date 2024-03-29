import { ViewModel, FormHeaderView, createDropdown, addListToDropdown } from "@ckeditor/ckeditor5-ui";
import { Collection } from "@ckeditor/ckeditor5-utils";

export default class IconsNavigationView extends FormHeaderView {

    constructor(locale, groupNames) {
        super(locale);
        const t = locale.t;
        this.set('class', 'ck-icons-navigation');
        this.groupDropdownView = this._createGroupDropdown(groupNames);
        this.groupDropdownView.panelPosition = locale.uiLanguageDirection === 'rtl' ? 'se' : 'sw';
        this.label = 'Icons';
        this.children.add(this.groupDropdownView);
    }

    get currentGroupName() {
        return this.groupDropdownView.value;
    }

    focus() {
        this.groupDropdownView.focus();
    }

    _createGroupDropdown(groupNames) {
        const locale = this.locale;
        const t = locale.t;
        const dropdown = createDropdown(locale);
        const groupDefinitions = this._geIconGroupListItemDefinitions(dropdown, groupNames);
        const accessibleLabel = 'Icon categories';
        dropdown.set('value', groupDefinitions.first.model.name);
        dropdown.buttonView.bind('label').to(dropdown, 'value', value => groupNames.get(value));
        dropdown.buttonView.set({
            isOn: false,
            withText: true,
            tooltip: accessibleLabel,
            class: ['ck-dropdown__button_label-width_auto'],
            ariaLabel: accessibleLabel,
            ariaLabelledBy: undefined
        });
        dropdown.on('execute', evt => {
            dropdown.value = evt.source.name;
        });
        dropdown.delegate('execute').to(this);
        addListToDropdown(dropdown, groupDefinitions, {
            ariaLabel: accessibleLabel,
            role: 'menu'
        });
        return dropdown;
    }

    _geIconGroupListItemDefinitions(dropdown, groupNames) {
        const groupDefs = new Collection();
        for (const [name, label] of groupNames) {
            const model = new ViewModel({
                name,
                label,
                withText: true,
                role: 'menuitemradio'
            });
            model.bind('isOn').to(dropdown, 'value', value => value === model.name);
            groupDefs.add({ type: 'button', model });
        }
        return groupDefs;
    }
}