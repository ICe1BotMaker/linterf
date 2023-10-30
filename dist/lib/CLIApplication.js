"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProps = exports.CLIApplication = void 0;
const chalk_1 = __importDefault(require("chalk"));
class CLIApplication {
    constructor(option) {
        this.widgets = [];
        this.curlocs = {};
        this.widgets = [];
        this.curlocs = {
            tab: 0
        };
        // option
    }
    append(...widgets) {
        this.widgets = this.widgets.concat(widgets);
    }
    show(frame) {
        process.stdin.setRawMode(true);
        process.stdin.setEncoding(`utf-8`);
        process.stdin.on(`data`, (key) => {
            if (key === `\u0003`) {
                process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);
                process.exit();
            }
        });
        process.stdout.write(`\x1B[?25l`);
        setInterval(() => {
            console.clear();
            this.widgets.forEach((widget) => {
                if ([`panel`].includes(widget.data.type)) {
                    /* width & height */
                    if (!widget.data.properties.styles.fill)
                        widget.data.properties.styles.fill = `█`;
                    process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                    if (widget.data.properties.styles.width)
                        console.log(chalk_1.default.hex(widget.data.properties.styles['background-color'] ? widget.data.properties.styles['background-color'] : `#ffffff`)(widget.data.properties.styles.fill.repeat(widget.data.properties.styles.width)));
                    if (widget.data.properties.styles.height)
                        for (let i = 0; i <= widget.data.properties.styles.height; i++) {
                            process.stdout.write(`\x1b[${widget.data.properties.styles.y + i};${widget.data.properties.styles.x}H`);
                            if (widget.data.properties.styles.width)
                                console.log(chalk_1.default.hex(widget.data.properties.styles['background-color'] ? widget.data.properties.styles['background-color'] : `#ffffff`)(widget.data.properties.styles.fill.repeat(widget.data.properties.styles.width)));
                        }
                }
                if ([`label`].includes(widget.data.type)) {
                    process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                    console.log(widget.data.properties.text);
                }
            });
        }, 1000 / frame);
    }
}
exports.CLIApplication = CLIApplication;
function setProps(get, origin) {
    if (get)
        Object.keys(get).forEach((prop) => {
            if ((origin === null || origin === void 0 ? void 0 : origin.accepts) && !origin.accepts.includes(prop) && origin.accepts.length !== 0)
                return;
            if (!Array.isArray(origin[prop]) && typeof origin[prop] === `object`) {
                origin[prop] = setProps(get[prop], origin[prop]);
            }
            else {
                const value = get[prop];
                origin[prop] = value;
            }
        });
    return origin;
}
exports.setProps = setProps;
