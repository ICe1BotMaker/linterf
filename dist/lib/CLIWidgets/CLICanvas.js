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
        }
    }
    circle(object) {
        if (!object.centerX || !object.centerY || !object.radius)
            return;
        for (let y = object.centerY - object.radius; y <= object.centerY + object.radius; y++) {
            for (let x = object.centerX - object.radius; x <= object.centerX + object.radius; x++) {
                const distance = Math.sqrt((x - object.centerX) ** 2 + (y - object.centerY) ** 2);
                if (distance <= object.radius) {
                    process.stdout.write(`\x1b[${y};${x}H`);
                    console.log(object.fill);
                }
            }
        }
    }
    rectangle(object) {
        if (!object.height || !object.width)
            return;
        for (let i = object.y; i < object.y + object.height; i++) {
            for (let j = object.x; j < object.x + object.width; j++) {
                process.stdout.write(`\x1b[${i};${j}H`);
                console.log(object.fill);
            }
        }
    }
    constructor(props) {
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
            if (child.type === `line`)
                this.line(child);
            if (child.type === `rectangle`)
                this.rectangle(child);
            if (child.type === `circle`)
                this.circle(child);
        });
    }
}
exports.CLICanvas = CLICanvas;
