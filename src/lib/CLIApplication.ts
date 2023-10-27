export interface Iattributes {
    accepts: Array<string>;
    paths: Array<string>;
    styles: Istyles;
    events: object;

    [key: string]: any;
}

export interface Istyles {
    width?: number;
    height?: number;
    "background-color"?: string;
    "text-color"?: string;
}

export class CLIApplication {
    private components: Array<Iattributes> = [];
    
    public constructor(option?: object) {
        // option
    }

    public append(widgets: Iattributes) {
        this.components = [...this.components, widgets];
    }

    public do(frame: number) {
        process.stdin.setRawMode(true);
        process.stdin.setEncoding(`utf-8`);

        process.stdin.on(`data`, (key: string) => {
            if (key === `\u0003`) {
                console.clear();
                process.stdout.write(`\x1B[?25h`);
                process.exit();
            }
        });

        process.stdout.write(`\x1B[?25l`);

        setInterval(() => {
            console.clear();

            this.components.forEach((component: Iattributes) => {
                console.log(component);
            });
        }, 1000 / frame);
    }
}

export function attr(get_attributes: Iattributes, origin_attributes: Iattributes): Iattributes {
    if (get_attributes) Object.keys(get_attributes).forEach((attribute: string) => {
        if (!origin_attributes.accepts.includes(attribute) && origin_attributes.accepts.length !== 0) return;

        const value = get_attributes[attribute];
        origin_attributes[attribute] = value;
    });

    return origin_attributes;
}
