import chalk from "chalk";
import * as app from "../CLIApplication";

export class CLIPanel {
    public data: app.Idata = {
        "type": "panel",
        "properties": {
            "accepts": ["paths", "styles", "global"],
            "paths": [],
            "global": "",
            "styles": {
                "x": 0,
                "y": 0,
                "width": process.stdout.columns,
                "height": process.stdout.rows,
                "fill": " ",
                "background-color": "#000000",
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

    public prerun(widget: app.Iwidget, focus: string) {
        const { styles } = widget.data.properties;

        if (!styles.fill) styles.fill = ` `;

        process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
        if (styles.width) console.log(focus + chalk.hex(styles[`background-color`] ? styles[`background-color`] : `#ffffff`)(styles.fill.repeat(styles.width)));
        
        if (styles.height) for (let i = 0; i < styles.height; i++) {
            process.stdout.write(`\x1b[${styles.y + i};${styles.x}H`);
            if (styles.width) console.log(focus + chalk.hex(styles[`background-color`] ? styles[`background-color`] : `#ffffff`)(styles.fill.repeat(styles.width)));
        }
    }
}
