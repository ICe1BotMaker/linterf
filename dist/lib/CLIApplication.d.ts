export interface Iwidget {
    data: Idata;
    prerun: Function;
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
}
export declare class CLIApplication {
    private debug;
    private widgets;
    private Vwidgets;
    private curlocs;
    constructor(option?: any);
    append(...widgets: Array<Iwidget>): void;
    private event;
    isOverLapping(widget: Iwidget, props: Istyles): boolean | "" | 0 | undefined;
    hexbn(hex: string, brightness: number): string;
    show(frame: number): void;
    find(path: string): Iwidget | undefined;
    modify(path: string, props: Iproperties): void;
}
export declare function setProps(get: Iproperties, origin: Iproperties): Iproperties;
