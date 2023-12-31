import chalk from "chalk";
import * as app from "../CLIApplication";

export class CLIRadio {
    private widgets: Array<app.Iwidget> = [];

    public data: app.Idata = {
        "type": "radio",
        "properties": {
            "text": "lorem ipsum",
            "checked": false,
            "accepts": ["paths", "styles", "text", "events", "checked", "global"],
            "paths": [],
            "global": "default",
            "styles": {
                "x": 1,
                "y": 1,
                "text-color": "#ffffff",
                "visible": true,
                "check": ["⚪ ", "⚫ "]
            },
            "events": {},
            "defaultEvents": {
                "onEnter": () => {
                    this.widgets.map((e: app.Iwidget) => e.data.properties.checked = e.data.properties.global === this.data.properties.global ? false : e.data.properties.checked);
                    this.data.properties.checked = !this.data.properties.checked;

                    return this.widgets;
                }
            }
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    public prerun(widgets: Array<app.Iwidget>, widget: app.Iwidget, func: Function, focus: string) {
        const { styles, text } = widget.data.properties;

        this.widgets = widgets;

        let isOverLapping: boolean = false;
        widgets.forEach((_widget: app.Iwidget) => {
            if (func(_widget, styles)) {
                isOverLapping = true;

                process.stdout.write(`\x1b[${styles.y};${styles.x}H`);

                const backgroundColor = _widget.data.properties.styles["background-color"] || `#000000`;
                const textColor = styles["text-color"] || _widget.data.properties.styles["text-color"] || `#ffffff`;

                console.log(focus + (this.data.properties.checked ? styles.check?.[0] : styles.check?.[1]) + chalk.bgHex(backgroundColor)(chalk.hex(textColor)(text)));
            }
        });

        if (!isOverLapping) {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);

            const backgroundColor = `#000000`;
            const textColor = styles["text-color"] || `#ffffff`;

            console.log(focus + (this.data.properties.checked ? styles.check?.[0] : styles.check?.[1]) + chalk.bgHex(backgroundColor)(chalk.hex(textColor)(text)));
        }
    }
}