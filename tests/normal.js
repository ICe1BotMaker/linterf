const chalk = require("chalk");
const { CLIApplication, CLITextbox, CLILabel, CLICustom } = require(`../`);

const app = new CLIApplication();

const custom = new CLICustom({
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
});

custom.prerun = (widget, focus, widgets, func, object) => {
    const { styles, text } = widget.data.properties;

    let isOverLapping = false;
    widgets.forEach((_widget) => {
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

app.append(custom);
app.show(30);