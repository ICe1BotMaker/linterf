import * as app from "../CLIApplication";

export class CLIPanel {
    public data: app.Idata = {
        "type": "panel",
        "properties": {
            "accepts": ["paths", "styles"],
            "paths": [],
            "styles": {
                "x": 0,
                "y": 0,
                "width": process.stdout.columns,
                "height": process.stdout.rows,
                "fill": "█",
                "background-color": "#000000",
                "text-color": "#ffffff",
                "visible": true
            },
            "events": {}
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }
}