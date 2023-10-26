export interface Iattributes {
    accepts: Array<string>;
    paths: Array<string>;
    [styles: string]: object;
    events: object;
}
export declare class CLIApplication {
    private components;
    constructor(option?: object);
    append(widgets: Iattributes): void;
}
