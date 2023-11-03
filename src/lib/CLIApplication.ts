import chalk from 'chalk';

export interface Iwidget {
    data: Idata;
}

export interface Idata {
    type: string;
    properties: Iproperties;
}

export interface Iproperties {
    accepts: Array<string>;
    paths: Array<string>;
    styles: Istyles;
    events: Ievents;

    text?: string;

    [key: string]: any;
}

export interface Istyles {
    x: number;
    y: number;

    width?: number;
    height?: number;

    fill?: string;
    "background-color"?: string;

    "text-color"?: string;

    visible: boolean;
}

export interface Ievents {
    onEnter?: Function;
    onPut?: Function;
    onLeave?: Function;
}

export class CLIApplication {
    private debug: boolean = false;
    private widgets: Array<Iwidget> = [];
    private visibleWidgets: Array<Iwidget> = [];
    private curlocs = {
        tab: 0
    };
    
    public constructor(option?: any) {
        this.widgets = [];
        this.curlocs = {
            tab: 0
        };

        if (option?.debug) this.debug = true;
    }

    public append(...widgets: Array<Iwidget>) {
        let exists: Array<string> = [];

        widgets.forEach(widget => {
            widget.data.properties.paths.forEach(path => {
                if (exists.includes(path)) throw new Error(`[unique.path] ${path} is already exists`);
                exists.push(path);

                if (this.find(path)) {
                    throw new Error(`[unique.path] ${path} is already exists`);
                }
            });
        });

        this.widgets = this.widgets.concat(widgets);
    }

    private event() {
        process.stdin.setRawMode(true);
        process.stdin.setEncoding(`utf-8`);

        process.stdin.on(`data`, (key: string) => {
            if (key === `\u0003`) {
                process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);
                process.exit();
            }

            if (key === `\u001b[C` || key === `\u001b[D`) this.visibleWidgets[this.curlocs.tab].data.properties.events?.onLeave?.();
            if (key === `\u001b[C`) this.curlocs.tab += 1;
            if (key === `\u001b[D`) this.curlocs.tab -= 1;

            if (key === `\r` || key === `\n`) {
                this.visibleWidgets[this.curlocs.tab].data.properties.events?.onEnter?.();
            }

            if (this.curlocs.tab >= this.visibleWidgets.length) this.curlocs.tab = this.visibleWidgets.length - 1;
            if (this.curlocs.tab < 0) this.curlocs.tab = 0;
            
            if (this.visibleWidgets[this.curlocs.tab].data.properties.styles.height !== process.stdout.rows) {
                this.visibleWidgets[this.curlocs.tab].data.properties.events?.onPut?.();
            }
        });

        process.stdout.write(`\x1B[?25l`);
    }

    public isOverLapping(widget: Iwidget, props: Istyles) {
        const { styles } = widget.data.properties;

        return (
            styles?.width &&
            styles?.height &&
            styles?.["background-color"] &&
            (props.x >= styles.x && props.x <= styles.x + styles.width) &&
            (props.y >= styles.y && props.y <= styles.y + styles.height)
        );
    }

    public hexbn(hex: string, brightness: number) {
        hex = hex.replace(/^#/, ``);

        if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) return ``;

        let bigint = parseInt(hex, 16);

        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;

        r -= brightness;
        g -= brightness;
        b -= brightness;

        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        const hexR = r.toString(16).padStart(2, `0`);
        const hexG = g.toString(16).padStart(2, `0`);
        const hexB = b.toString(16).padStart(2, `0`);

        const hexColor = `#${hexR}${hexG}${hexB}`;

        return hexColor;
    }

    public show(frame: number) {
        this.event();

        setInterval(() => {
            console.clear();

            if (this.curlocs.tab >= this.visibleWidgets.length) this.curlocs.tab = this.visibleWidgets.length - 1;
            if (this.curlocs.tab < 0) this.curlocs.tab = 0;

            this.visibleWidgets = this.widgets.filter(e => e.data.properties.styles.visible);

            this.visibleWidgets.forEach((widget: Iwidget, idx: number) => {
                const { type } = widget.data;
                const { styles, text } = widget.data.properties;
                
                let focus: string = ``;
                if (styles.height !== process.stdout.rows && this.curlocs.tab === idx) focus = chalk.bgHex(this.hexbn(styles[`background-color`] || styles[`text-color`] || `#ffffff`, 25))(` `);

                if (styles.visible && type === `panel`) {
                    if (!styles.fill) styles.fill = `█`;

                    process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
                    if (styles.width) console.log(focus + chalk.hex(styles[`background-color`] ? styles[`background-color`] : `#ffffff`)(styles.fill.repeat(styles.width)));
                    
                    if (styles.height) for (let i = 0; i < styles.height; i++) {
                        process.stdout.write(`\x1b[${styles.y + i};${styles.x}H`);
                        if (styles.width) console.log(focus + chalk.hex(styles[`background-color`] ? styles[`background-color`] : `#ffffff`)(styles.fill.repeat(styles.width)));
                    }
                }
                
                if (styles.visible && type === `label`) {
                    this.widgets.forEach((_widget: Iwidget) => {
                        if (this.isOverLapping(_widget, styles)) {
                            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);

                            const backgroundColor = _widget.data.properties.styles["background-color"] || `#000000`;
                            const textColor = styles["text-color"] || _widget.data.properties.styles["text-color"] || `#ffffff`;

                            console.log(focus + chalk.bgHex(backgroundColor)(chalk.hex(textColor)(text)));
                        }
                    });
                }

                if (styles.visible && type === `button`) {
                    if (!styles.fill) styles.fill = `█`;

                    process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
                    if (styles.width) console.log(focus + chalk.hex(styles[`background-color`] ? styles[`background-color`] : `#ffffff`)(styles.fill.repeat(styles.width)));
                    
                    if (styles.height) for (let i = 0; i < styles.height; i++) {
                        process.stdout.write(`\x1b[${styles.y + i};${styles.x}H`);
                        if (styles.width) console.log(focus + chalk.hex(styles[`background-color`] ? styles[`background-color`] : `#ffffff`)(styles.fill.repeat(styles.width)));
                    }

                    process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
                    console.log(focus + chalk.bgHex(styles?.[`background-color`] ? styles[`background-color`] : `#000000`).hex(styles?.[`text-color`] ? styles[`text-color`] : `#ffffff`)(text));
                }
            });

            if (this.debug) {
                process.stdout.write(`\x1b[1;1H`);
                console.log(this.curlocs.tab);
            }
        }, 1000 / frame);
    }

    public find(path: string) {
        return this.widgets.find(value => value.data.properties.paths.includes(path));
    }

    public modify(path: string, props: Iproperties) {
        const widgetIdx = this.widgets.findIndex(value => value.data.properties.paths.includes(path));
        this.widgets[widgetIdx].data.properties = setProps(props, this.widgets[widgetIdx].data.properties);
    }
}

export function setProps(get: Iproperties, origin: Iproperties): Iproperties {
    if (get) Object.keys(get).forEach((prop: string) => {
        if (origin?.accepts && !origin.accepts.includes(prop) && origin.accepts.length !== 0) return;
        
        if (!Array.isArray(origin[prop]) && typeof origin[prop] === `object`) {
            origin[prop] = setProps(get[prop], origin[prop]);
        } else {
            const value = get[prop];
            origin[prop] = value;
        }
    });

    return origin;
}