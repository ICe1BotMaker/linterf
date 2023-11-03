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
        this.tabCount = 0;
        this.widgets = [];
        this.tabCount = 0;
        if (option === null || option === void 0 ? void 0 : option.debug) {
            this.debug = true;
        }
    }
    append(...widgets) {
        this.widgets = this.widgets.concat(widgets);
    }
    show(frame) {
        this.setupInputListener();
        this.hideCursor();
        setInterval(() => {
            this.clearConsole();
            this.widgets.forEach((widget) => {
                if (widget.data.type === 'panel') {
                    this.drawPanel(widget.data);
                }
                else if (widget.data.type === 'label') {
                    this.drawLabel(widget.data);
                }
                else if (widget.data.type === 'button') {
                    this.drawButton(widget.data);
                }
            });
            if (this.debug) {
                this.showDebugInfo();
            }
        }, 1000 / frame);
    }
    setupInputListener() {
        process.stdin.setRawMode(true);
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', (key) => {
            if (key === '\u0003') {
                this.exitApplication();
            }
            if (key === '\u001b[C') {
                this.tabCount += 1;
            }
            if (key === '\u001b[D') {
                this.tabCount -= 1;
            }
        });
    }
    hideCursor() {
        process.stdout.write('\x1B[?25l');
    }
    clearConsole() {
        console.clear();
    }
    drawPanel(data) {
        const properties = data.properties.styles;
        if (!properties.fill) {
            properties.fill = '█';
        }
        const backgroundColor = properties["background-color"] || '#ffffff';
        process.stdout.write(`\x1b[${properties.y};${properties.x}H`);
        if (properties.width) {
            console.log(chalk_1.default.hex(backgroundColor)(properties.fill.repeat(properties.width)));
        }
        if (properties.height) {
            for (let i = 0; i <= properties.height; i++) {
                process.stdout.write(`\x1b[${properties.y + i};${properties.x}H`);
                if (properties.width) {
                    console.log(chalk_1.default.hex(backgroundColor)(properties.fill.repeat(properties.width)));
                }
            }
        }
    }
    drawLabel(data) {
        const properties = data.properties.styles;
        this.widgets.forEach((_widget) => {
            if (this.isLabelOverlapping(_widget, properties)) {
                this.drawLabelAtPosition(data, _widget);
            }
        });
    }
    isLabelOverlapping(widget, labelProperties) {
        const Istyles = widget.data.properties.styles;
        return ((Istyles === null || Istyles === void 0 ? void 0 : Istyles.width) &&
            (Istyles === null || Istyles === void 0 ? void 0 : Istyles.height) &&
            (Istyles === null || Istyles === void 0 ? void 0 : Istyles["background-color"]) &&
            (labelProperties.x >= Istyles.x &&
                labelProperties.x <= Istyles.x + Istyles.width) &&
            (labelProperties.y >= Istyles.y &&
                labelProperties.y <= Istyles.y + Istyles.height));
    }
    drawLabelAtPosition(data, widget) {
        const properties = data.properties.styles;
        const Istyles = widget.data.properties.styles;
        process.stdout.write(`\x1b[${properties.y};${properties.x}H`);
        const backgroundColor = Istyles["background-color"] || `#000000`;
        const textColor = properties["text-color"] || Istyles["text-color"] || `#ffffff`;
        console.log(chalk_1.default.bgHex(backgroundColor)(chalk_1.default.hex(textColor)(data.properties.text)));
    }
    drawButton(data) {
        const properties = data.properties.styles;
        if (!properties.fill) {
            properties.fill = '█';
        }
        const backgroundColor = properties["background-color"] || '#000000';
        const textColor = properties["text-color"] || '#ffffff';
        process.stdout.write(`\x1b[${properties.y};${properties.x}H`);
        if (properties.width) {
            console.log(chalk_1.default.bgHex(backgroundColor).hex(textColor)(data.properties.text));
        }
    }
    showDebugInfo() {
        process.stdout.write(`\x1b[1;1H`);
        console.log(this.tabCount);
    }
    exitApplication() {
        process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);
        process.exit();
    }
}
exports.CLIApplication = CLIApplication;
function setProps(newProperties, originalProperties) {
    if (newProperties) {
        Object.keys(newProperties).forEach((prop) => {
            if ((originalProperties === null || originalProperties === void 0 ? void 0 : originalProperties.accepts) &&
                !originalProperties.accepts.includes(prop) &&
                originalProperties.accepts.length !== 0) {
                return;
            }
            if (!Array.isArray(originalProperties[prop]) && typeof originalProperties[prop] === 'object') {
                originalProperties[prop] = setProps(newProperties[prop], originalProperties[prop]);
            }
            else {
                const value = newProperties[prop];
                originalProperties[prop] = value;
            }
        });
    }
    return originalProperties;
}
exports.setProps = setProps;
