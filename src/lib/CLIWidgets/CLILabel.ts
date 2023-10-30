import * as app from "../CLIApplication";

export class CLILabel {
    public data: app.Idata = {
        "type": "label",
        "properties": {
            "text": "lorem ipsum",
            "accepts": ["paths", "styles", "events"],
            "paths": [],
            "styles": {
                "x": 4,
                "y": 3,
                "text-color": "#ffffff"
            },
            "events": {}
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }
}