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
exports.CLIRadio = void 0;
const chalk_1 = __importDefault(require("chalk"));
const app = __importStar(require("../CLIApplication"));
class CLIRadio {
    constructor(props) {
        this.widgets = [];
        this.data = {
            "type": "radio",
            "properties": {
                "text": "lorem ipsum",
                "checked": false,
                "accepts": ["paths", "styles", "text", "events", "checked", "global"],
                "paths": [],
                "global": "default",
                "styles": {
                    "x": 1,
                    "y": 1,
                    "text-color": "#ffffff",
                    "visible": true,
                    "check": ["⚪ ", "⚫ "]
                },
                "events": {},
                "defaultEvents": {
                    "onEnter": () => {
                        this.widgets.map((e) => e.data.properties.checked = e.data.properties.global === this.data.properties.global ? false : e.data.properties.checked);
                        this.data.properties.checked = !this.data.properties.checked;
                        return this.widgets;
                    }
                }
            }
        };
        if (props)
            this.data.properties = app.setProps(props, this.data.properties);
    }
    prerun(widgets, widget, func, focus) {
        var _a, _b;
        const { styles, text } = widget.data.properties;
        this.widgets = widgets;
        let bwidget = false;
        widgets.forEach((_widget) => {
            var _a, _b;
            if (func(_widget, styles)) {
                bwidget = true;
                process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
                const backgroundColor = _widget.data.properties.styles["background-color"] || `#000000`;
                const textColor = styles["text-color"] || _widget.data.properties.styles["text-color"] || `#ffffff`;
                console.log(focus + (this.data.properties.checked ? (_a = styles.check) === null || _a === void 0 ? void 0 : _a[0] : (_b = styles.check) === null || _b === void 0 ? void 0 : _b[1]) + chalk_1.default.bgHex(backgroundColor)(chalk_1.default.hex(textColor)(text)));
            }
        });
        if (!bwidget) {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
            const backgroundColor = `#000000`;
            const textColor = styles["text-color"] || `#ffffff`;
            console.log(focus + (this.data.properties.checked ? (_a = styles.check) === null || _a === void 0 ? void 0 : _a[0] : (_b = styles.check) === null || _b === void 0 ? void 0 : _b[1]) + chalk_1.default.bgHex(backgroundColor)(chalk_1.default.hex(textColor)(text)));
        }
    }
}
exports.CLIRadio = CLIRadio;
