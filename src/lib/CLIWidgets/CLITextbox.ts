import chalk from "chalk";
import * as app from "../CLIApplication";

export class CLITextbox {
    public isTyping: boolean = false;

    public data: app.Idata = {
        "type": "textbox",
        "properties": {
            "text": "",
            "placeholder": "",
            "accepts": ["paths", "styles", "global", "text", "placeholder", "events"],
            "paths": [],
            "global": "",
            "styles": {
                "x": 1,
                "y": 1,
                "background-color": "#ffffff",
                "placeholder-color": "#777777",
                "text-color": "#000000",
                "visible": true
            },
            "events": {},
            "defaultEvents": {
                "onEnter": () => {
                    this.isTyping = !this.isTyping;
                }
            }
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    public prerun(widget: app.Iwidget, focus: string, textloc: number) {
        const { styles, text, placeholder } = widget.data.properties;

        const backgroundColor = styles["background-color"] || `#ffffff`;
        const placeholderColor = styles["placeholder-color"] || `#777777`;
        const textColor = styles["text-color"] || `#000000`;

        if (this.isTyping) {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
            console.log(focus + (text === `` ? chalk.bgHex(backgroundColor)(chalk.hex(placeholderColor)(placeholder)) : chalk.bgHex(backgroundColor)(chalk.hex(textColor)(`${text?.substring(0, textloc)}|${text?.substring(textloc, text.length)}`))));
        } else {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
            console.log(focus + (text === `` ? chalk.bgHex(backgroundColor)(chalk.hex(placeholderColor)(placeholder)) : chalk.bgHex(backgroundColor)(chalk.hex(textColor)(text))));
        }
    }
}