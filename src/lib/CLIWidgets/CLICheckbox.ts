import chalk from "chalk";
import * as app from "../CLIApplication";

export class CLICheckbox {
    public data: app.Idata = {
        "type": "checkbox",
        "properties": {
            "text": "lorem ipsum",
            "checked": false,
            "accepts": ["paths", "styles", "text", "events", "checked"],
            "paths": [],
            "styles": {
                "x": 1,
                "y": 1,
                "text-color": "#ffffff",
                "visible": true,
                "check": ["✅ ", "❌ "]
            },
            "events": {
                "onEnter": () => {
                    this.data.properties.checked = !this.data.properties.checked;
                }
            }
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    public prerun(widgets: Array<app.Iwidget>, widget: app.Iwidget, func: Function, focus: string) {
        const { styles, text } = widget.data.properties;

        let bwidget: boolean = false;
        widgets.forEach((_widget: app.Iwidget) => {
            if (func(_widget, styles)) {
                bwidget = true;

                process.stdout.write(`\x1b[${styles.y};${styles.x}H`);

                const backgroundColor = _widget.data.properties.styles["background-color"] || `#000000`;
                const textColor = styles["text-color"] || _widget.data.properties.styles["text-color"] || `#ffffff`;

                console.log(focus + (this.data.properties.checked ? styles.check?.[0] : styles.check?.[1]) + chalk.bgHex(backgroundColor)(chalk.hex(textColor)(text)));
            }
        });

        if (!bwidget) {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);

            const backgroundColor = `#000000`;
            const textColor = styles["text-color"] || `#ffffff`;

            console.log(focus + (this.data.properties.checked ? styles.check?.[0] : styles.check?.[1]) + chalk.bgHex(backgroundColor)(chalk.hex(textColor)(text)));
        }
    }
}