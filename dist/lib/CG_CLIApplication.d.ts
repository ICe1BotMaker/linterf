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
    private debug;
    private widgets;
    private tabCount;
    constructor(option?: any);
    append(...widgets: Iwidget[]): void;
    show(frame: number): void;
    private setupInputListener;
    private hideCursor;
    private clearConsole;
    private drawPanel;
    private drawLabel;
    private isLabelOverlapping;
    private drawLabelAtPosition;
    private drawButton;
    private showDebugInfo;
    private exitApplication;
}
export declare function setProps(newProperties: Iproperties, originalProperties: Iproperties): Iproperties;
