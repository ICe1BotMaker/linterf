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
    private debug: boolean = false;
    private widgets: Array<Iwidget> = [];
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

            if (key === '\u001b[C') this.curlocs.tab += 1;
            if (key === '\u001b[D') this.curlocs.tab -= 1;
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
                    this.widgets.forEach((_widget: Iwidget) => {
                        if (
                            _widget.data.properties.styles?.width && 
                            _widget.data.properties.styles?.height && 
                            _widget.data.properties.styles?.['background-color'] && 
                            (widget.data.properties.styles.x >= _widget.data.properties.styles.x && widget.data.properties.styles.x <= _widget.data.properties.styles.x + _widget.data.properties.styles.width) && 
                            (widget.data.properties.styles.y >= _widget.data.properties.styles.y && widget.data.properties.styles.y <= _widget.data.properties.styles.y + _widget.data.properties.styles.height)) {
                            process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                            
                            if (widget.data.properties.styles?.['text-color']) {
                                console.log(chalk.hex(widget.data.properties.styles['text-color']).bgHex(_widget.data.properties.styles['background-color'])(widget.data.properties.text));
                            } else {
                                console.log(chalk.bgHex(_widget.data.properties.styles['background-color'])(widget.data.properties.text));
                            }
                        }
                    });
                }

                if ([`button`].includes(widget.data.type)) {
                    /* width & height */
                    if (!widget.data.properties.styles.fill) widget.data.properties.styles.fill = `█`;

                    process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                    if (widget.data.properties.styles.width) console.log(chalk.hex(widget.data.properties.styles['background-color'] ? widget.data.properties.styles['background-color'] : `#ffffff`)(widget.data.properties.styles.fill.repeat(widget.data.properties.styles.width)));
                    
                    if (widget.data.properties.styles.height) for (let i = 0; i <= widget.data.properties.styles.height; i++) {
                        process.stdout.write(`\x1b[${widget.data.properties.styles.y + i};${widget.data.properties.styles.x}H`);
                        if (widget.data.properties.styles.width) console.log(chalk.hex(widget.data.properties.styles['background-color'] ? widget.data.properties.styles['background-color'] : `#ffffff`)(widget.data.properties.styles.fill.repeat(widget.data.properties.styles.width)));
                    }

                    process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                    console.log(chalk.bgHex(widget.data.properties.styles?.['background-color'] ? widget.data.properties.styles['background-color'] : `#000000`).hex(widget.data.properties.styles?.['text-color'] ? widget.data.properties.styles['text-color'] : `#ffffff`)(widget.data.properties.text));
                }
            });

            if (this.debug) {
                process.stdout.write(`\x1b[1;1H`);
                console.log(this.curlocs.tab);
            }
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
