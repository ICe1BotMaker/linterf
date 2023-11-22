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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLICanvas = void 0;
const app = __importStar(require("../CLIApplication"));
class CLICanvas {
    line(object) {
        if (!object.toX || !object.toY)
            return;
        let result = [];
        const deltaX = object.toX - object.x;
        const deltaY = object.toY - object.y;
        const steps = Math.max(Math.abs(deltaX), Math.abs(deltaY));
        for (let i = 0; i <= steps; i++) {
            let x, y;
            if (deltaX >= 0 && deltaY >= 0) {
                x = Math.round(object.x + (i / steps) * Math.abs(deltaX));
                y = Math.round(object.y + (i / steps) * Math.abs(deltaY));
            }
            else if (deltaX < 0 && deltaY >= 0) {
                x = Math.round(object.x - (i / steps) * Math.abs(deltaX));
                y = Math.round(object.y + (i / steps) * Math.abs(deltaY));
            }
            else if (deltaX >= 0 && deltaY < 0) {
                x = Math.round(object.x + (i / steps) * Math.abs(deltaX));
                y = Math.round(object.y - (i / steps) * Math.abs(deltaY));
            }
            else { // deltaX < 0 && deltaY < 0
                x = Math.round(object.x - (i / steps) * Math.abs(deltaX));
                y = Math.round(object.y - (i / steps) * Math.abs(deltaY));
            }
            process.stdout.write(`\x1b[${y};${x}H`);
            console.log(object.fill);
            result.push({ fill: object.fill, x: x, y: y });
        }
        return result;
    }
    circle(object) {
        if (!object.centerX || !object.centerY || !object.radius)
            return;
        let result = [];
        for (let y = object.centerY - object.radius; y <= object.centerY + object.radius; y++) {
            for (let x = object.centerX - object.radius; x <= object.centerX + object.radius; x++) {
                const distance = Math.sqrt((x - object.centerX) ** 2 + (y - object.centerY) ** 2);
                if (distance <= object.radius) {
                    process.stdout.write(`\x1b[${y};${x}H`);
                    console.log(object.fill);
                    result.push({ fill: object.fill, x: x, y: y });
                }
            }
        }
        return result;
    }
    rectangle(object) {
        if (!object.height || !object.width)
            return;
        let result = [];
        for (let i = object.y; i < object.y + object.height; i++) {
            for (let j = object.x; j < object.x + object.width; j++) {
                process.stdout.write(`\x1b[${i};${j}H`);
                console.log(object.fill);
                result.push({ fill: object.fill, x: j, y: i });
            }
        }
        return result;
    }
    constructor(props) {
        this.lines = [];
        this.circles = [];
        this.rectangles = [];
        this.data = {
            "type": "canvas",
            "properties": {
                "canvasChilds": [],
                "accepts": ["paths", "global", "styles", "events", "defaultEvents", "canvasChilds"],
                "paths": [],
                "global": "",
                "styles": {
                    "x": 1,
                    "y": 1,
                    "width": 20,
                    "height": 10,
                    "visible": true
                },
                "events": {},
                "defaultEvents": {}
            }
        };
        if (props)
            this.data.properties = app.setProps(props, this.data.properties);
    }
    prerun(widget) {
        var _a;
        (_a = widget.data.properties.canvasChilds) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
            var _a, _b, _c;
            if (child.type === `line`) {
                if (this.lines.includes(child)) {
                    const idx = this.lines.findIndex(e => e === child);
                    (_a = this.lines[idx].private) === null || _a === void 0 ? void 0 : _a.forEach(_private => {
                        if (!_private.x || !_private.y)
                            return;
                        process.stdout.write(`\x1b[${_private.y};${_private.x}H`);
                        console.log(_private.fill);
                    });
                }
                else {
                    child.private = this.line(child);
                    this.lines.push(child);
                }
            }
            else if (child.type === `rectangle`) {
                if (this.rectangles.includes(child)) {
                    const idx = this.rectangles.findIndex(e => e === child);
                    (_b = this.rectangles[idx].private) === null || _b === void 0 ? void 0 : _b.forEach(_private => {
                        if (!_private.x || !_private.y)
                            return;
                        process.stdout.write(`\x1b[${_private.y};${_private.x}H`);
                        console.log(_private.fill);
                    });
                }
                else {
                    child.private = this.rectangle(child);
                    this.rectangles.push(child);
                }
            }
            else if (child.type === `circle`) {
                if (this.circles.includes(child)) {
                    const idx = this.circles.findIndex(e => e === child);
                    (_c = this.circles[idx].private) === null || _c === void 0 ? void 0 : _c.forEach(_private => {
                        if (!_private.x || !_private.y)
                            return;
                        process.stdout.write(`\x1b[${_private.y};${_private.x}H`);
                        console.log(_private.fill);
                    });
                }
                else {
                    child.private = this.circle(child);
                    this.circles.push(child);
                }
            }
        });
    }
}
exports.CLICanvas = CLICanvas;
