import chalk from "chalk";
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

export class TCG {
    public data: app.Idata = {
        "type": "tcg",
        "properties": {
            "accepts": ["accepts", "paths", "global", "styles", "events", "defaultEvents", "text", "placeholder", "checked"],
            "paths": [],
            "global": "",
            "styles": {
                "x": 1,
                "y": 1,
                "visible": true
            },
            "events": {},
            "defaultEvents": {}
        }
    };

    private buffer1 = [];
    private buffer2 = [];
    private buffer3 = [];
    private currentBuffer = this.buffer1;

    public camera: Iposition = { x: 1, y: -1, z: 0 };
    public objects: Iobject[] = [];

    private rotateX(point: Iposition, angle: number, center: Iposition): Iposition {
        const y = (point.y - center.y) * Math.cos(angle) - (point.z - center.z) * Math.sin(angle) + center.y;
        const z = (point.y - center.y) * Math.sin(angle) + (point.z - center.z) * Math.cos(angle) + center.z;
        return { ...point, y, z };
    }
    
    private rotateY(point: Iposition, angle: number, center: Iposition): Iposition {
        const x = (point.x - center.x) * Math.cos(angle) + (point.z - center.z) * Math.sin(angle) + center.x;
        const z = -(point.x - center.x) * Math.sin(angle) + (point.z - center.z) * Math.cos(angle) + center.z;
        return { ...point, x, z };
    }
    
    private rotateZ(point: Iposition, angle: number, center: Iposition): Iposition {
        const x = (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle) + center.x;
        const y = (point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle) + center.y;
        return { ...point, x, y };
    }

    private drawToBuffer(buffer: any[], x: number, y: number, char: any) {
        if (!buffer[y]) buffer[y] = [];
        buffer[y][x] = char;
    }
    
    private swapBuffers() {
        if (this.currentBuffer === this.buffer1) {
            this.currentBuffer = this.buffer2;
        } else if (this.currentBuffer === this.buffer2) {
            this.currentBuffer = this.buffer3;
        } else {
            this.currentBuffer = this.buffer1;
        }
    }
    
    private drawBufferToConsole(buffer: any[]) {
        for (let row of buffer) if (row) process.stdout.write(row.join('') + '\n');
    }
    
    private clearBuffer(buffer: any[]) {
        for (let i = 0; i < buffer.length; i++) buffer[i] = [];
    }

    public constructor(objects: Iobject[], props?: app.Iproperties) {
        this.objects = this.objects.concat(objects);

        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    private draw() {
        this.clearBuffer(this.currentBuffer);
        process.stdout.write('\x1Bc');
    
        this.objects.forEach(object => {
            let rotatedVertices = object.vertices.map(point =>
                this.rotateX(this.rotateY(this.rotateZ(point, object.rotation.z, object.center), object.rotation.y, object.center), object.rotation.x, object.center)
            );
    
            let translatedVertices = rotatedVertices.map(point => ({
                x: point.x - this.camera.x,
                y: point.y - this.camera.y,
                z: point.z - this.camera.z
            }));
    
            this.connectAndDraw([0, 1, 3, 2], translatedVertices);
            this.connectAndDraw([4, 5, 7, 6], translatedVertices);
            this.connectAndDraw([0, 1, 5, 4], translatedVertices);
            this.connectAndDraw([2, 3, 7, 6], translatedVertices);
            this.connectAndDraw([0, 2, 6, 4], translatedVertices);
            this.connectAndDraw([1, 3, 7, 5], translatedVertices);
        });
    
        this.swapBuffers();
        this.drawBufferToConsole(this.currentBuffer);
    }

    private connectAndDraw(faceVertices: any, vertices: any) {
        for (let i = 0; i < faceVertices.length; i++) {
            const start = faceVertices[i];
            const end = faceVertices[(i + 1) % faceVertices.length];
    
            const startPoint = vertices[start];
            const endPoint = vertices[end];
    
            const startScreenX = Math.round(startPoint.x * 10) + 40;
            const startScreenY = Math.round(startPoint.y * 10) + 5;
            const endScreenX = Math.round(endPoint.x * 10) + 40;
            const endScreenY = Math.round(endPoint.y * 10) + 5;
    
            this.drawLine(startScreenX, startScreenY, endScreenX, endScreenY);
        }
    }
    
    private drawLine(x0: number, y0: number, x1: number, y1: number) {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;
    
        while (true) {
            process.stdout.cursorTo(x0 - 20, y0 - 10);
            process.stdout.write(chalk.white('█'));
    
            if (x0 === x1 && y0 === y1) break;
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }

    public prerun(widget: app.Iwidget) {
        const { events } = widget.data.properties;
        events.onFrame?.(this.objects, this.camera);
        this.draw();
    }
}