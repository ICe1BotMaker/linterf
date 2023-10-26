import { Iattributes } from "../CLIApplication";

export class CLIPanel {
    public attributes: Iattributes = {
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

    public constructor(attributes?: Iattributes) {
        if (attributes) Object.keys(attributes).forEach((attribute) => {
            if (!this.attributes.accepts.includes(attribute) && this.attributes.accepts.length !== 0) return;
            const value = attributes[attribute];
            this.attributes[attribute] = value;
        });
    }
}