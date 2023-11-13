import * as app from "../CLIApplication";
export declare class CLITextbox {
    isTyping: boolean;
    data: app.Idata;
    constructor(props?: app.Iproperties);
    prerun(widget: app.Iwidget, focus: string, textloc: number): void;
}
