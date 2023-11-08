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
        this.Vwidgets = [];
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
        let exists = [];
        widgets.forEach(widget => {
            widget.data.properties.paths.forEach(path => {
                if (exists.includes(path))
                    throw new Error(`[unique.path] ${path} is already exists`);
                exists.push(path);
                if (this.find(path)) {
                    throw new Error(`[unique.path] ${path} is already exists`);
                }
            });
        });
        this.widgets = this.widgets.concat(widgets);
    }
    event() {
        process.stdin.setRawMode(true);
        process.stdin.setEncoding(`utf-8`);
        process.stdin.on(`data`, (key) => {
            var _a, _b, _c, _d, _e, _f;
            if (key === `\u0003`) {
                process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);
                process.exit();
            }
            if (key === `\u001b[C` || key === `\u001b[D`)
                (_b = (_a = this.Vwidgets[this.curlocs.tab].data.properties.events) === null || _a === void 0 ? void 0 : _a.onLeave) === null || _b === void 0 ? void 0 : _b.call(_a);
            if (key === `\u001b[C`)
                this.curlocs.tab += 1;
            if (key === `\u001b[D`)
                this.curlocs.tab -= 1;
            if (key === `\r` || key === `\n`) {
                (_d = (_c = this.Vwidgets[this.curlocs.tab].data.properties.events) === null || _c === void 0 ? void 0 : _c.onEnter) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
            if (this.curlocs.tab >= this.Vwidgets.length)
                this.curlocs.tab = this.Vwidgets.length - 1;
            if (this.curlocs.tab < 0)
                this.curlocs.tab = 0;
            if (this.Vwidgets[this.curlocs.tab].data.properties.styles.height !== process.stdout.rows) {
                (_f = (_e = this.Vwidgets[this.curlocs.tab].data.properties.events) === null || _e === void 0 ? void 0 : _e.onPut) === null || _f === void 0 ? void 0 : _f.call(_e);
            }
        });
        process.stdout.write(`\x1B[?25l`);
    }
    isOverLapping(widget, props) {
        const { styles } = widget.data.properties;
        return ((styles === null || styles === void 0 ? void 0 : styles.width) &&
            (styles === null || styles === void 0 ? void 0 : styles.height) &&
            (styles === null || styles === void 0 ? void 0 : styles["background-color"]) &&
            (props.x >= styles.x && props.x <= styles.x + styles.width) &&
            (props.y >= styles.y && props.y <= styles.y + styles.height));
    }
    hexbn(hex, brightness) {
        hex = hex.replace(/^#/, ``);
        if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex))
            return ``;
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        r -= brightness;
        g -= brightness;
        b -= brightness;
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        const hexR = r.toString(16).padStart(2, `0`);
        const hexG = g.toString(16).padStart(2, `0`);
        const hexB = b.toString(16).padStart(2, `0`);
        const hexColor = `#${hexR}${hexG}${hexB}`;
        return hexColor;
    }
    show(frame) {
        this.event();
        setInterval(() => {
            console.clear();
            if (this.curlocs.tab >= this.Vwidgets.length)
                this.curlocs.tab = this.Vwidgets.length - 1;
            if (this.curlocs.tab < 0)
                this.curlocs.tab = 0;
            this.Vwidgets = this.widgets.filter(e => e.data.properties.styles.visible);
            this.Vwidgets.forEach((widget, idx) => {
                const { type } = widget.data;
                const { styles } = widget.data.properties;
                let focus = ``;
                if (styles.height !== process.stdout.rows && this.curlocs.tab === idx)
                    focus = chalk_1.default.bgHex(this.hexbn(styles[`background-color`] || styles[`text-color`] || `#ffffff`, 25))(` `);
                if (styles.visible && type === `panel`)
                    widget.prerun(widget, focus);
                if (styles.visible && type === `label`)
                    widget.prerun(this.widgets, widget, this.isOverLapping, focus);
                if (styles.visible && type === `button`)
                    widget.prerun(widget, focus);
                if (styles.visible && type === `checkbox`)
                    widget.prerun(this.widgets, widget, this.isOverLapping, focus);
            });
            if (this.debug) {
                process.stdout.write(`\x1b[1;1H`);
                console.log(this.curlocs.tab);
            }
        }, 1000 / frame);
    }
    find(path) {
        return this.widgets.find(value => value.data.properties.paths.includes(path));
    }
    modify(path, props) {
        const widgetIdx = this.widgets.findIndex(value => value.data.properties.paths.includes(path));
        this.widgets[widgetIdx].data.properties = setProps(props, this.widgets[widgetIdx].data.properties);
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
