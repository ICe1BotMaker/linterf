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
exports.CLIPanel = void 0;
const chalk_1 = __importDefault(require("chalk"));
const app = __importStar(require("../CLIApplication"));
class CLIPanel {
    constructor(props) {
        this.data = {
            "type": "panel",
            "properties": {
                "accepts": ["paths", "styles", "global"],
                "paths": [],
                "global": "",
                "styles": {
                    "x": 0,
                    "y": 0,
                    "width": process.stdout.columns,
                    "height": process.stdout.rows,
                    "fill": "█",
                    "background-color": "#000000",
                    "text-color": "#ffffff",
                    "visible": true
                },
                "events": {},
                "defaultEvents": {}
            }
        };
        if (props)
            this.data.properties = app.setProps(props, this.data.properties);
    }
    prerun(widget, focus) {
        const { styles } = widget.data.properties;
        if (!styles.fill)
            styles.fill = `█`;
        process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
        if (styles.width)
            console.log(focus + chalk_1.default.hex(styles[`background-color`] ? styles[`background-color`] : `#ffffff`)(styles.fill.repeat(styles.width)));
        if (styles.height)
            for (let i = 0; i < styles.height; i++) {
                process.stdout.write(`\x1b[${styles.y + i};${styles.x}H`);
                if (styles.width)
                    console.log(focus + chalk_1.default.hex(styles[`background-color`] ? styles[`background-color`] : `#ffffff`)(styles.fill.repeat(styles.width)));
            }
    }
}
exports.CLIPanel = CLIPanel;
