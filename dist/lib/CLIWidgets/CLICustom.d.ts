import * as app from "../CLIApplication";
export declare class CLICustom {
    data: app.Idata;
    constructor(props?: app.Iproperties);
    prerun(widget: app.Iwidget, focus: string, widgets: Array<app.Iwidget>, func: Function, object: any): void;
}
