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
export declare class CLIApplication {
    private widgets;
    private curlocs;
    constructor(option?: object);
    append(...widgets: Array<Iwidget>): void;
    show(frame: number): void;
}
export declare function setProps(get: Iproperties, origin: Iproperties): Iproperties;
