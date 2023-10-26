"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIApplication = void 0;
class CLIApplication {
    constructor(option) {
        this.components = [];
        // option
    }
    append(widgets) {
        this.components = [...this.components, widgets];
    }
}
exports.CLIApplication = CLIApplication;
