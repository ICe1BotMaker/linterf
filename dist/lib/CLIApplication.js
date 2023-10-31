"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProps = exports.CLIApplication = void 0;
const chalk_1 = __importDefault(require("chalk"));
class CLIApplication {
    constructor(option) {
        this.debug = false;
        this.widgets = [];
        this.curlocs = {
            tab: 0
        };
        this.widgets = [];
        this.curlocs = {
            tab: 0
        };
        if (option === null || option === void 0 ? void 0 : option.debug)
            this.debug = true;
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
            if (key === '\u001b[C')
                this.curlocs.tab += 1;
            if (key === '\u001b[D')
                this.curlocs.tab -= 1;
        });
        process.stdout.write(`\x1B[?25l`);
        setInterval(() => {
            console.clear();
            this.widgets.forEach((widget) => {
                var _a, _b;
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
                    this.widgets.forEach((_widget) => {
                        var _a, _b, _c, _d;
                        if (((_a = _widget.data.properties.styles) === null || _a === void 0 ? void 0 : _a.width) &&
                            ((_b = _widget.data.properties.styles) === null || _b === void 0 ? void 0 : _b.height) &&
                            ((_c = _widget.data.properties.styles) === null || _c === void 0 ? void 0 : _c['background-color']) &&
                            (widget.data.properties.styles.x >= _widget.data.properties.styles.x && widget.data.properties.styles.x <= _widget.data.properties.styles.x + _widget.data.properties.styles.width) &&
                            (widget.data.properties.styles.y >= _widget.data.properties.styles.y && widget.data.properties.styles.y <= _widget.data.properties.styles.y + _widget.data.properties.styles.height)) {
                            process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                            if ((_d = widget.data.properties.styles) === null || _d === void 0 ? void 0 : _d['text-color']) {
                                console.log(chalk_1.default.hex(widget.data.properties.styles['text-color']).bgHex(_widget.data.properties.styles['background-color'])(widget.data.properties.text));
                            }
                            else {
                                console.log(chalk_1.default.bgHex(_widget.data.properties.styles['background-color'])(widget.data.properties.text));
                            }
                        }
                    });
                }
                if ([`button`].includes(widget.data.type)) {
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
                    process.stdout.write(`\x1b[${widget.data.properties.styles.y};${widget.data.properties.styles.x}H`);
                    console.log(chalk_1.default.bgHex(((_a = widget.data.properties.styles) === null || _a === void 0 ? void 0 : _a['background-color']) ? widget.data.properties.styles['background-color'] : `#000000`).hex(((_b = widget.data.properties.styles) === null || _b === void 0 ? void 0 : _b['text-color']) ? widget.data.properties.styles['text-color'] : `#ffffff`)(widget.data.properties.text));
                }
            });
            if (this.debug) {
                process.stdout.write(`\x1b[1;1H`);
                console.log(this.curlocs.tab);
            }
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
