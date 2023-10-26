"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIPanel = void 0;
class CLIPanel {
    constructor(attributes) {
        this.attributes = {
            "accepts": ["paths", "styles"],
            "paths": [],
            "styles": {
                "width": 10,
                "height": 5,
                "background-color": "white",
                "text-color": "black"
            },
            "events": {}
        };
        if (attributes)
            Object.keys(attributes).forEach((attribute) => {
                if (!this.attributes.accepts.includes(attribute) && this.attributes.accepts.length !== 0)
                    return;
                const value = attributes[attribute];
                this.attributes[attribute] = value;
            });
    }
}
exports.CLIPanel = CLIPanel;
