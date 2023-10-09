
import { UI } from "@typo3/ckeditor5-bundle.js";

export default class CharacterInfoView extends UI.View {
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;
        this.set('icon', null);
        this.set('name', null);
        this.setTemplate({
            tag: 'div',
            children: [
                {
                    tag: 'span',
                    attributes: {
                        class: [
                            'ck-icon-info__name'
                        ]
                    },
                    children: [
                        {
                            // Note: ZWSP to prevent vertical collapsing.
                            text: bind.to('name', name => name ? name : '\u200B')
                        }
                    ]
                },
                {
                    tag: 'span',
                    attributes: {
                        class: [
                            'ck-icon-info__code'
                        ]
                    },
                    children: [
                        {
                            tag: 'span',
                            attributes: {
                                class: [
                                    'char-icon',
                                    bind.to('icon', icon => icon ? `icon--${this.icon}` : 'icon--null')
                                ]
                            }
                        }
                    ]
                }
            ],
            attributes: {
                class: [
                    'ck',
                    'ck-icon-info'
                ]
            }
        });
    }
}