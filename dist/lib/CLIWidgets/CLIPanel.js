"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIPanel = void 0;
const CLIApplication_1 = require("../CLIApplication");
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
            this.attributes = (0, CLIApplication_1.attr)(attributes, this.attributes);
    }
}
exports.CLIPanel = CLIPanel;
