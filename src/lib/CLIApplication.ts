export interface Iattributes {
    accepts: Array<string>;
    paths: Array<string>;
    [styles: string]: object;
    events: object;
}

export class CLIApplication {
    private components: Array<Iattributes> = [];
    
    public constructor(option?: object) {
        // option
    }

    public append(widgets: Iattributes) {
        this.components = [...this.components, widgets];
    }
}