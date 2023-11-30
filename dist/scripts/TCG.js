"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCG = void 0;
const chalk_1 = __importDefault(require("chalk"));
const app = __importStar(require("../src/lib/CLIApplication"));
class TCG {
    rotateX(point, angle, center) {
        const y = (point.y - center.y) * Math.cos(angle) - (point.z - center.z) * Math.sin(angle) + center.y;
        const z = (point.y - center.y) * Math.sin(angle) + (point.z - center.z) * Math.cos(angle) + center.z;
        return Object.assign(Object.assign({}, point), { y, z });
    }
    rotateY(point, angle, center) {
        const x = (point.x - center.x) * Math.cos(angle) + (point.z - center.z) * Math.sin(angle) + center.x;
        const z = -(point.x - center.x) * Math.sin(angle) + (point.z - center.z) * Math.cos(angle) + center.z;
        return Object.assign(Object.assign({}, point), { x, z });
    }
    rotateZ(point, angle, center) {
        const x = (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle) + center.x;
        const y = (point.x - center.x) * Math.sin(angle) + (point.y - center.y) * Math.cos(angle) + center.y;
        return Object.assign(Object.assign({}, point), { x, y });
    }
    drawToBuffer(buffer, x, y, char) {
        if (!buffer[y])
            buffer[y] = [];
        buffer[y][x] = char;
    }
    swapBuffers() {
        if (this.currentBuffer === this.buffer1) {
            this.currentBuffer = this.buffer2;
        }
        else if (this.currentBuffer === this.buffer2) {
            this.currentBuffer = this.buffer3;
        }
        else {
            this.currentBuffer = this.buffer1;
        }
    }
    drawBufferToConsole(buffer) {
        for (let row of buffer)
            if (row)
                process.stdout.write(row.join('') + '\n');
    }
    clearBuffer(buffer) {
        for (let i = 0; i < buffer.length; i++)
            buffer[i] = [];
    }
    constructor(objects, props) {
        this.data = {
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
        this.buffer1 = [];
        this.buffer2 = [];
        this.buffer3 = [];
        this.currentBuffer = this.buffer1;
        this.camera = { x: 1, y: -1, z: 0 };
        this.objects = [];
        this.objects = this.objects.concat(objects);
        if (props)
            this.data.properties = app.setProps(props, this.data.properties);
    }
    draw() {
        this.clearBuffer(this.currentBuffer);
        process.stdout.write('\x1Bc');
        this.objects.forEach(object => {
            let rotatedVertices = object.vertices.map(point => this.rotateX(this.rotateY(this.rotateZ(point, object.rotation.z, object.center), object.rotation.y, object.center), object.rotation.x, object.center));
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
    connectAndDraw(faceVertices, vertices) {
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
    drawLine(x0, y0, x1, y1) {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;
        while (true) {
            process.stdout.cursorTo(x0 - 20, y0 - 10);
            process.stdout.write(chalk_1.default.white('█'));
            if (x0 === x1 && y0 === y1)
                break;
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
    prerun(widget) {
        var _a;
        const { events } = widget.data.properties;
        (_a = events.onFrame) === null || _a === void 0 ? void 0 : _a.call(events, this.objects, this.camera);
        this.draw();
    }
}
exports.TCG = TCG;
