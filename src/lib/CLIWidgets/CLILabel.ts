import chalk from "chalk";
import * as app from "../CLIApplication";

export class CLILabel {
    public data: app.Idata = {
        "type": "label",
        "properties": {
            "text": "lorem ipsum",
            "accepts": ["paths", "styles", "text", "global"],
            "paths": [],
            "global": "",
            "styles": {
                "x": 1,
                "y": 1,
                "text-color": "#ffffff",
                "visible": true
            },
            "events": {},
            "defaultEvents": {}
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    public prerun(widgets: Array<app.Iwidget>, widget: app.Iwidget, func: Function, focus: string) {
        const { styles, text } = widget.data.properties;

        let isOverLapping: boolean = false;
        widgets.forEach((_widget: app.Iwidget) => {
            if (func(_widget, styles)) {
                isOverLapping = true;
                
                process.stdout.write(`\x1b[${styles.y};${styles.x}H`);

                const backgroundColor = _widget.data.properties.styles["background-color"] || `#000000`;
                const textColor = styles["text-color"] || _widget.data.properties.styles["text-color"] || `#ffffff`;

                console.log(focus + chalk.bgHex(backgroundColor)(chalk.hex(textColor)(text)));
            }
        });

        if (!isOverLapping) {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);

            const backgroundColor = `#000000`;
            const textColor = styles["text-color"] || `#ffffff`;

            console.log(focus + chalk.bgHex(backgroundColor)(chalk.hex(textColor)(text)));
        }
    }
}