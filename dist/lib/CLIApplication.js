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
            tab: 0,
            textloc: 0
        };
        this.widgets = [];
        this.curlocs = {
            tab: 0,
            textloc: 0
        };
        if (option === null || option === void 0 ? void 0 : option.debug)
            this.debug = true;
    }
    append(...widgets) {
        let exists = [];
        widgets.forEach((widget) => {
            widget.data.properties.paths.forEach((path) => {
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
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            if (key === `\u0003`) {
                process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);
                process.exit();
            }
            const selected = this.Vwidgets[this.curlocs.tab];
            if (selected.isTyping && selected.data.type === `textbox`) {
                if (selected.data.properties.text && (this.curlocs.textloc < selected.data.properties.text.length) && key === `\u001b[C`)
                    this.curlocs.textloc += 1;
                if (this.curlocs.textloc > 0 && key === `\u001b[D`)
                    this.curlocs.textloc -= 1;
                if (![`\u001b[D`, `\u001b[C`, `\u0008`, `\r`, `\n`].includes(key)) {
                    selected.data.properties.text = `${(_a = selected.data.properties.text) === null || _a === void 0 ? void 0 : _a.substring(0, this.curlocs.textloc)}${key}${(_b = selected.data.properties.text) === null || _b === void 0 ? void 0 : _b.substring(this.curlocs.textloc, selected.data.properties.text.length)}`;
                    this.curlocs.textloc += 1;
                }
                if (key === `\r` || key === `\n`) {
                    let result = (_d = (_c = selected.data.properties.defaultEvents) === null || _c === void 0 ? void 0 : _c.onEnter) === null || _d === void 0 ? void 0 : _d.call(_c);
                    (_f = (_e = selected.data.properties.events) === null || _e === void 0 ? void 0 : _e.onEnter) === null || _f === void 0 ? void 0 : _f.call(_e);
                }
                if (key === `\u0008` && this.curlocs.textloc > 0) {
                    selected.data.properties.text = `${(_g = selected.data.properties.text) === null || _g === void 0 ? void 0 : _g.substring(0, this.curlocs.textloc - 1)}${(_h = selected.data.properties.text) === null || _h === void 0 ? void 0 : _h.substring(this.curlocs.textloc, selected.data.properties.text.length)}`;
                    this.curlocs.textloc -= 1;
                }
            }
            else {
                if (key === `\u001b[C`)
                    this.curlocs.tab += 1;
                if (key === `\u001b[D`)
                    this.curlocs.tab -= 1;
                if (key === `\u001b[C` || key === `\u001b[D`) {
                    this.curlocs.textloc = 0;
                    (_k = (_j = selected.data.properties.events) === null || _j === void 0 ? void 0 : _j.onLeave) === null || _k === void 0 ? void 0 : _k.call(_j);
                    (_m = (_l = selected.data.properties.defaultEvents) === null || _l === void 0 ? void 0 : _l.onLeave) === null || _m === void 0 ? void 0 : _m.call(_l);
                }
                if (key === `\r` || key === `\n`) {
                    this.curlocs.textloc = selected.data.properties.text ? selected.data.properties.text.length : 0;
                    let result = (_p = (_o = selected.data.properties.defaultEvents) === null || _o === void 0 ? void 0 : _o.onEnter) === null || _p === void 0 ? void 0 : _p.call(_o);
                    (_r = (_q = selected.data.properties.events) === null || _q === void 0 ? void 0 : _q.onEnter) === null || _r === void 0 ? void 0 : _r.call(_q);
                    if (selected.data.type === `radio`)
                        this.widgets = result;
                }
            }
            if (this.curlocs.tab >= this.Vwidgets.length)
                this.curlocs.tab = this.Vwidgets.length - 1;
            if (this.curlocs.tab < 0)
                this.curlocs.tab = 0;
            if (selected.data.properties.styles.height !== process.stdout.rows) {
                (_t = (_s = selected.data.properties.events) === null || _s === void 0 ? void 0 : _s.onPut) === null || _t === void 0 ? void 0 : _t.call(_s);
                (_v = (_u = selected.data.properties.defaultEvents) === null || _u === void 0 ? void 0 : _u.onPut) === null || _v === void 0 ? void 0 : _v.call(_u);
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
        let rgb = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
        rgb = rgb.map(e => e -= brightness);
        rgb = rgb.map(e => Math.max(0, Math.min(255, e)));
        let res = rgb.map(e => e.toString(16).padStart(2, `0`));
        const hexColor = `#${res.join(``)}`;
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
                if (styles.visible && type === `radio`)
                    widget.prerun(this.widgets, widget, this.isOverLapping, focus);
                if (styles.visible && type === `image`)
                    widget.prerun(widget);
                if (styles.visible && type === `textbox`)
                    widget.prerun(widget, focus, this.curlocs.textloc);
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
