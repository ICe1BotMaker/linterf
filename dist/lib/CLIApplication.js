"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attr = exports.CLIApplication = void 0;
class CLIApplication {
    constructor(option) {
        this.components = [];
        // option
    }
    append(widgets) {
        this.components = [...this.components, widgets];
    }
    do(frame) {
        process.stdin.setRawMode(true);
        process.stdin.setEncoding(`utf-8`);
        process.stdin.on(`data`, (key) => {
            if (key === `\u0003`) {
                console.clear();
                process.stdout.write(`\x1B[?25h`);
                process.exit();
            }
        });
        process.stdout.write(`\x1B[?25l`);
        setInterval(() => {
            console.clear();
            this.components.forEach((component) => {
                console.log(component);
            });
        }, 1000 / frame);
    }
}
exports.CLIApplication = CLIApplication;
function attr(get_attributes, origin_attributes) {
    if (get_attributes)
        Object.keys(get_attributes).forEach((attribute) => {
            if (!origin_attributes.accepts.includes(attribute) && origin_attributes.accepts.length !== 0)
                return;
            const value = get_attributes[attribute];
            origin_attributes[attribute] = value;
        });
    return origin_attributes;
}
exports.attr = attr;
