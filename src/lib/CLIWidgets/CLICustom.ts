import * as app from "../CLIApplication";

export class CLICustom {
    public data: app.Idata = {
        "type": "custom",
        "properties": {
            "accepts": ["accepts", "paths", "global", "styles", "events", "defaultEvents", "text", "placeholder", "checked"],
            "paths": [],
            "global": "",
            "styles": {
                "x": 1,
                "y": 1,
                "visible": true
            },
            "events": {},
            "defaultEvents": {}
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    public prerun(widget: app.Iwidget, focus: string, widgets: Array<app.Iwidget>, func: Function, object: any) {}
}