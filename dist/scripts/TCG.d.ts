import * as app from '../src/lib/CLIApplication';
export interface Iobject {
    id: string;
    center: Iposition;
    rotation: Iposition;
    vertices: Iposition[];
}
export interface Iposition {
    x: number;
    y: number;
    z: number;
}
export declare class TCG {
    data: app.Idata;
    private buffer1;
    private buffer2;
    private buffer3;
    private currentBuffer;
    camera: Iposition;
    objects: Iobject[];
    private rotateX;
    private rotateY;
    private rotateZ;
    private drawToBuffer;
    private swapBuffers;
    private drawBufferToConsole;
    private clearBuffer;
    constructor(objects: Iobject[], props?: app.Iproperties);
    private draw;
    private connectAndDraw;
    private drawLine;
    prerun(widget: app.Iwidget): void;
}
