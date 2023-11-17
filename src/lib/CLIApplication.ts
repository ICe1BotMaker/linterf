import chalk from 'chalk';

export interface Iwidget {
    data: Idata;
    prerun: Function;
    isTyping?: boolean;
}

export interface Idata {
    type: string;
    properties: Iproperties;
}

export interface Iproperties {
    accepts: Array<string>;
    paths: Array<string>;
    global: string;
    styles: Istyles;
    events: Ievents;
    defaultEvents: Ievents;

    text?: string;
    placeholder?: string;

    checked?: boolean;

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
    "placeholder-color"?: string;

    visible: boolean;

    check?: Array<string>;

    img?: string;
    page?: string;
    "img-pixels"?: (string | Array<string>);
}

export interface Ievents {
    onEnter?: Function;
    onPut?: Function;
    onLeave?: Function;
    onChange?: Function;
}

export class CLIApplication {
    private debug: boolean = false;
    private widgets: Array<Iwidget> = [];
    private Vwidgets: Array<Iwidget> = [];
    private curlocs = {
        tab: 0,
        textloc: 0
    };
    
    public constructor(option?: any) {
        this.widgets = [];
        this.curlocs = {
            tab: 0,
            textloc: 0
        };

        if (option?.debug) this.debug = true;
    }

    public append(...widgets: Array<Iwidget>) {
        let exists: Array<string> = [];

        widgets.forEach((widget: Iwidget) => {
            widget.data.properties.paths.forEach((path: string) => {
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

            const selected = this.Vwidgets[this.curlocs.tab];

            if (selected.isTyping && selected.data.type === `textbox`) {
                if (selected.data.properties.text && (this.curlocs.textloc < selected.data.properties.text.length) && key === `\u001b[C`) this.curlocs.textloc += 1;
                if (this.curlocs.textloc !> 0 && key === `\u001b[D`) this.curlocs.textloc -= 1;
                
                if (![`\u001b[D`, `\u001b[C`, `\u0008`, `\r`, `\n`].includes(key)) {
                    selected.data.properties.text = `${selected.data.properties.text?.substring(0, this.curlocs.textloc)}${key}${selected.data.properties.text?.substring(this.curlocs.textloc, selected.data.properties.text.length)}`;
                    this.curlocs.textloc += 1;
                }

                if (key === `\r` || key === `\n`) {
                    selected.data.properties.defaultEvents?.onEnter?.();
                    selected.data.properties.events?.onEnter?.();

                    selected.data.properties.defaultEvents.onChange?.();
                    selected.data.properties.events.onChange?.();
                }

                if (key === `\u0008` && this.curlocs.textloc > 0) {
                    selected.data.properties.text = `${selected.data.properties.text?.substring(0, this.curlocs.textloc - 1)}${selected.data.properties.text?.substring(this.curlocs.textloc, selected.data.properties.text.length)}`;
                    this.curlocs.textloc -= 1;
                }
            } else {
                if (key === `\u001b[C`) this.curlocs.tab += 1;
                if (key === `\u001b[D`) this.curlocs.tab -= 1;

                if (key === `\u001b[C` || key === `\u001b[D`) {
                    this.curlocs.textloc = 0;
                    selected.data.properties.events?.onLeave?.();
                    selected.data.properties.defaultEvents?.onLeave?.();
                }

                if (key === `\r` || key === `\n`) {
                    this.curlocs.textloc = selected.data.properties.text ? selected.data.properties.text.length : 0;
                    
                    let result = selected.data.properties.defaultEvents?.onEnter?.();
                    selected.data.properties.events?.onEnter?.();
    
                    if (selected.data.type === `radio`) this.widgets = result;
                }
            }

            if (this.curlocs.tab >= this.Vwidgets.length) this.curlocs.tab = this.Vwidgets.length - 1;
            if (this.curlocs.tab < 0) this.curlocs.tab = 0;
            
            if (selected.data.properties.styles.height !== process.stdout.rows) {
                selected.data.properties.events?.onPut?.();
                selected.data.properties.defaultEvents?.onPut?.();
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
        let rgb = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
        rgb = rgb.map(e => e -= brightness);
        rgb = rgb.map(e => Math.max(0, Math.min(255, e)));
        let res = rgb.map(e => e.toString(16).padStart(2, `0`));
        const hexColor = `#${res.join(``)}`;
        return hexColor;
    }

    public show(frame: number) {
        this.event();

        setInterval(() => {
            console.clear();

            if (this.curlocs.tab >= this.Vwidgets.length) this.curlocs.tab = this.Vwidgets.length - 1;
            if (this.curlocs.tab < 0) this.curlocs.tab = 0;

            this.Vwidgets = this.widgets.filter(e => e.data.properties.styles.visible);

            this.Vwidgets.forEach((widget: Iwidget, idx: number) => {
                const { type } = widget.data;
                const { styles } = widget.data.properties;
                
                let focus: string = ``;
                if (styles.height !== process.stdout.rows && this.curlocs.tab === idx) focus = chalk.bgHex(this.hexbn(styles[`background-color`] || styles[`text-color`] || `#ffffff`, 25))(` `);

                if (styles.visible && type === `panel`) widget.prerun(widget, focus);
                if (styles.visible && type === `label`) widget.prerun(this.widgets, widget, this.isOverLapping, focus);
                if (styles.visible && type === `button`) widget.prerun(widget, focus);
                if (styles.visible && type === `checkbox`) widget.prerun(this.widgets, widget, this.isOverLapping, focus);
                if (styles.visible && type === `radio`) widget.prerun(this.widgets, widget, this.isOverLapping, focus);
                if (styles.visible && type === `image`) widget.prerun(widget);
                if (styles.visible && type === `textbox`) widget.prerun(widget, focus, this.curlocs.textloc);
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
