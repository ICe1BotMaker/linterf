import * as app from "../CLIApplication";
export declare class CLICanvas {
    private lines;
    private circles;
    private rectangles;
    private line;
    private circle;
    private rectangle;
    data: app.Idata;
    constructor(props?: app.Iproperties);
    prerun(widget: app.Iwidget): void;
}
