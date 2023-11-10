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
exports.CLIImage = void 0;
const image_to_ascii_1 = __importDefault(require("image-to-ascii"));
const app = __importStar(require("../CLIApplication"));
class CLIImage {
    constructor(props) {
        this.text = ``;
        this.doing = false;
        this.data = {
            "type": "image",
            "properties": {
                "accepts": ["paths", "styles", "global"],
                "paths": [],
                "global": "",
                "styles": {
                    "x": 1,
                    "y": 1,
                    "width": 50,
                    "height": 50,
                    "visible": true,
                    "img": "",
                    "img-pixels": " "
                },
                "events": {},
                "defaultEvents": {}
            }
        };
        if (props)
            this.data.properties = app.setProps(props, this.data.properties);
    }
    prerun(widget) {
        const { styles } = widget.data.properties;
        if (this.text !== ``) {
            this.text.split(`\n`).forEach((line, idx) => {
                process.stdout.write(`\x1b[${styles.y + idx};${styles.x}H`);
                console.log(line);
            });
        }
        else if (!this.doing) {
            this.doing = true;
            (0, image_to_ascii_1.default)(styles.img, {
                size: {
                    width: styles.width,
                    height: styles.height
                },
                bg: true,
                fg: false,
                pixels: styles["img-pixels"]
            }, (err, converted) => {
                if (err)
                    throw new Error(err);
                this.text = converted;
            });
        }
    }
}
exports.CLIImage = CLIImage;
