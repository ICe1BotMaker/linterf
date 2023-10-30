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
    events: object;

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
}

export class CLIApplication {
    private widgets: Array<Iwidget> = [];
    private curlocs = {};
    
    public constructor(option?: object) {
        this.widgets = [];
        this.curlocs = {
            tab: 0
        };

        // option
    }

    public append(...widgets: Array<Iwidget>) {
        this.widgets = this.widgets.concat(widgets);
    }

    public show(frame: number) {
        process.stdin.setRawMode(true);
        process.stdin.setEncoding(`utf-8`);

        process.stdin.on(`data`, (key: string) => {
            if (key === `\u0003`) {
                process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);
                process.exit();
            }
        });

        process.stdout.write(`\x1B[?25l`);

        setInterval(() => {
            console.clear();

            this.widgets.forEach((widget: Iwidget) => {
                if ([`panel`].includes(widget.data.type)) {
                    /* width & height */
                    if (!widget.data.properties.styles.fill) widget.data.properties.styles.fill = `█`;

                    process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                    if (widget.data.properties.styles.width) console.log(chalk.hex(widget.data.properties.styles['background-color'] ? widget.data.properties.styles['background-color'] : `#ffffff`)(widget.data.properties.styles.fill.repeat(widget.data.properties.styles.width)));
                    
                    if (widget.data.properties.styles.height) for (let i = 0; i <= widget.data.properties.styles.height; i++) {
                        process.stdout.write(`\x1b[${widget.data.properties.styles.y + i};${widget.data.properties.styles.x}H`);
                        if (widget.data.properties.styles.width) console.log(chalk.hex(widget.data.properties.styles['background-color'] ? widget.data.properties.styles['background-color'] : `#ffffff`)(widget.data.properties.styles.fill.repeat(widget.data.properties.styles.width)));
                    }
                }
                
                if ([`label`].includes(widget.data.type)) {
                    process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                    console.log(widget.data.properties.text);
                }
            });
        }, 1000 / frame);
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
