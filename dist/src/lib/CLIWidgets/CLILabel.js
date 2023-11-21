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
exports.CLILabel = void 0;
const chalk_1 = __importDefault(require("chalk"));
const app = __importStar(require("../CLIApplication"));
class CLILabel {
    constructor(props) {
        this.data = {
            "type": "label",
            "properties": {
                "text": "lorem ipsum",
                "accepts": ["paths", "styles", "text", "global"],
                "paths": [],
                "global": "",
                "styles": {
                    "x": 1,
                    "y": 1,
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
    prerun(widgets, widget, func, focus) {
        const { styles, text } = widget.data.properties;
        let isOverLapping = false;
        widgets.forEach((_widget) => {
            if (func(_widget, styles)) {
                isOverLapping = true;
                process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
                const backgroundColor = _widget.data.properties.styles["background-color"] || `#000000`;
                const textColor = styles["text-color"] || _widget.data.properties.styles["text-color"] || `#ffffff`;
                console.log(focus + chalk_1.default.bgHex(backgroundColor)(chalk_1.default.hex(textColor)(text)));
            }
        });
        if (!isOverLapping) {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
            const backgroundColor = `#000000`;
            const textColor = styles["text-color"] || `#ffffff`;
            console.log(focus + chalk_1.default.bgHex(backgroundColor)(chalk_1.default.hex(textColor)(text)));
        }
    }
}
exports.CLILabel = CLILabel;
