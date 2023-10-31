import * as app from "../CLIApplication";

export class CLIButton {
    public data: app.Idata = {
        "type": "button",
        "properties": {
            "text": "lorem ipsum",
            "accepts": ["paths", "styles", "events", "text"],
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