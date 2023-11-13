import * as app from "../CLIApplication";
export declare class CLIWebview {
    private text;
    private isDoing;
    data: app.Idata;
    constructor(props?: app.Iproperties);
    prerun(widget: app.Iwidget): void;
}
