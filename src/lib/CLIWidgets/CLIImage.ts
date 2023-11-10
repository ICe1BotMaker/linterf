import imageToAscii  from 'image-to-ascii';
import * as app from "../CLIApplication";

export class CLIImage {
    private text: string = ``;
    private doing: boolean = false;

    public data: app.Idata = {
        "type": "image",
        "properties": {
            "accepts": ["paths", "styles", "global"],
            "paths": [],
            "global": "",
            "styles": {
                "x": 1,
                "y": 1,
                "width": 50,
                "height": 50,
                "visible": true,
                "img": "",
                "img-pixels": " "
            },
            "events": {},
            "defaultEvents": {}
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    public prerun(widget: app.Iwidget) {
        const { styles } = widget.data.properties;

        if (this.text !== ``) {
            this.text.split(`\n`).forEach((line: string, idx: number) => {
                process.stdout.write(`\x1b[${styles.y + idx};${styles.x}H`);
                console.log(line);
            })
        } else if (!this.doing) {
            this.doing = true;
            imageToAscii(styles.img, {
                size: {
                    width: styles.width,
                    height: styles.height
                },
                bg: true,
                fg: false,
                pixels: styles["img-pixels"]
            }, (err: string, converted: string) => {
                if (err) throw new Error(err);
                this.text = converted;
            });
        }
    }
}