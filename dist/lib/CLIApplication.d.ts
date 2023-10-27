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
export declare class CLIApplication {
    private components;
    constructor(option?: object);
    append(widgets: Iattributes): void;
    do(frame: number): void;
}
export declare function attr(get_attributes: Iattributes, origin_attributes: Iattributes): Iattributes;
