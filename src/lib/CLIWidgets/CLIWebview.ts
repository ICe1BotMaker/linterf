import puppeteer from 'puppeteer';
import imageToAscii  from 'image-to-ascii';
import * as app from "../CLIApplication";

export class CLIWebview {
    private text: string = ``;
    private isDoing: boolean = false;

    public data: app.Idata = {
        "type": "image",
        "properties": {
            "accepts": ["paths", "styles", "global"],
            "paths": [],
            "global": "",
            "styles": {
                "x": 1,
                "y": 1,
                "visible": true,
                "img": "",
                "img-pixels": " ",
                "page": "https://www.google.com"
            },
            "events": {},
            "defaultEvents": {}
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    public prerun(widget: app.Iwidget) {
        const { styles, events } = widget.data.properties;

        if (this.text !== ``) {
            this.text.split(`\n`).forEach((line: string, idx: number) => {
                process.stdout.write(`\x1b[${styles.y + idx};${styles.x}H`);
                console.log(line);
            });
        } else if (!this.isDoing) {
            this.isDoing = true;

            const browser = puppeteer.launch();
            const page = browser.then(value => value.newPage());

            page.then(value => {
                if (typeof events.onConnect === `function`) events.onConnect?.(value, () => {
                    if (this.text === ``) {
                        value.waitForTimeout(2000).then(() => {
                            value.screenshot({ path: `browse.png` }).then(() => {
                                styles.img = `browse.png`;
                
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
                            });
                        });
                    }
                });
                
                // if (styles.page) value.goto(styles.page).then(() => {
                //     value.type(`textarea[type="search"]`, `sans`).then(() => {
                //         value.click(`body > div > div > form > div:nth-child(1) > div > div > center > input`).then(() => {
                //             value.waitForTimeout(2000).then(() => {
                //                 value.screenshot({ path: `browse.png` }).then(() => {
                //                     styles.img = `browse.png`;
                    
                //                     imageToAscii(styles.img, {
                //                         size: {
                //                             width: styles.width,
                //                             height: styles.height
                //                         },
                //                         bg: true,
                //                         fg: false,
                //                         pixels: styles["img-pixels"]
                //                     }, (err: string, converted: string) => {
                //                         if (err) throw new Error(err);
                //                         this.text = converted;
                //                     });
                //                 });
                //             });
                //         });
                //     });
                // });
            });
        }
    }
}