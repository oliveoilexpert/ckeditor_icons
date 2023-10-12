import { View } from "@ckeditor/ckeditor5-ui";

export default class IconInfoView extends View {
    constructor(locale) {
        super(locale);
        const bind = this.bindTemplate;
        this.set('title', null);
        this.set('key', null);
        this.set('group', null);
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
                            text: bind.to('title', title => title ? title : '\u200B')
                        }
                    ]
                },
                {
                    tag: 'span',
                    attributes: {
                        class: [
                            'ck-icon-info__group'
                        ]
                    },
                    children: [
                        {
                            // Note: ZWSP to prevent vertical collapsing.
                            text: bind.to('group', group => group ? group : '\u200B')
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