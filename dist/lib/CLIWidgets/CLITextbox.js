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
exports.CLITextbox = void 0;
const chalk_1 = __importDefault(require("chalk"));
const app = __importStar(require("../CLIApplication"));
class CLITextbox {
    constructor(props) {
        this.isTyping = false;
        this.data = {
            "type": "textbox",
            "properties": {
                "text": "",
                "placeholder": "",
                "accepts": ["paths", "styles", "global", "text", "placeholder", "events"],
                "paths": [],
                "global": "",
                "styles": {
                    "x": 1,
                    "y": 1,
                    "background-color": "#ffffff",
                    "placeholder-color": "#777777",
                    "text-color": "#000000",
                    "visible": true
                },
                "events": {},
                "defaultEvents": {
                    "onEnter": () => {
                        this.isTyping = !this.isTyping;
                    }
                }
            }
        };
        if (props)
            this.data.properties = app.setProps(props, this.data.properties);
    }
    prerun(widget, focus, textloc) {
        const { styles, text, placeholder } = widget.data.properties;
        if (this.isTyping) {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
            const backgroundColor = styles["background-color"] || `#ffffff`;
            const placeholderColor = styles["placeholder-color"] || `#777777`;
            const textColor = styles["text-color"] || `#000000`;
            console.log(focus + (text === `` ? chalk_1.default.bgHex(backgroundColor)(chalk_1.default.hex(placeholderColor)(placeholder)) : chalk_1.default.bgHex(backgroundColor)(chalk_1.default.hex(textColor)(`${text === null || text === void 0 ? void 0 : text.substring(0, textloc)}|${text === null || text === void 0 ? void 0 : text.substring(textloc, text.length)}`))));
        }
        else {
            process.stdout.write(`\x1b[${styles.y};${styles.x}H`);
            const backgroundColor = styles["background-color"] || `#ffffff`;
            const textColor = styles["text-color"] || `#000000`;
            console.log(focus + chalk_1.default.bgHex(backgroundColor)(chalk_1.default.hex(textColor)(text)));
        }
    }
}
exports.CLITextbox = CLITextbox;
