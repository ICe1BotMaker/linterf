import * as app from "../CLIApplication";
export declare class CLILabel {
    data: app.Idata;
    constructor(props?: app.Iproperties);
    prerun(widgets: Array<app.Iwidget>, widget: app.Iwidget, func: Function, focus: string): void;
}
