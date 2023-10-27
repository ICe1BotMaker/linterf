import { Iattributes, attr } from "../CLIApplication";

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
        if (attributes) this.attributes = attr(attributes, this.attributes);
    }
}