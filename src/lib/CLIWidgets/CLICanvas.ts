import * as app from "../CLIApplication";

export class CLICanvas {
    private line(object: app.IcanvasChild) {
        if (!object.toX || !object.toY) return;

        const deltaX = object.toX - object.x;
        const deltaY = object.toY - object.y;
        const steps = Math.max(Math.abs(deltaX), Math.abs(deltaY));

        for (let i = 0; i <= steps; i++) {
            let x: number, y: number;

            if (deltaX >= 0 && deltaY >= 0) {
                x = Math.round(object.x + (i / steps) * Math.abs(deltaX));
                y = Math.round(object.y + (i / steps) * Math.abs(deltaY));
            } else if (deltaX < 0 && deltaY >= 0) {
                x = Math.round(object.x - (i / steps) * Math.abs(deltaX));
                y = Math.round(object.y + (i / steps) * Math.abs(deltaY));
            } else if (deltaX >= 0 && deltaY < 0) {
                x = Math.round(object.x + (i / steps) * Math.abs(deltaX));
                y = Math.round(object.y - (i / steps) * Math.abs(deltaY));
            } else { // deltaX < 0 && deltaY < 0
                x = Math.round(object.x - (i / steps) * Math.abs(deltaX));
                y = Math.round(object.y - (i / steps) * Math.abs(deltaY));
            }

            process.stdout.write(`\x1b[${y};${x}H`);
            console.log(object.fill);
        }
    }
    
    private circle(object: app.IcanvasChild) {
        if (!object.centerX || !object.centerY || !object.radius) return;

        for (let y = object.centerY - object.radius; y <= object.centerY + object.radius; y++) {
            for (let x = object.centerX - object.radius; x <= object.centerX + object.radius; x++) {
                const distance = Math.sqrt((x - object.centerX) ** 2 + (y - object.centerY) ** 2);

                if (distance <= object.radius) {
                    process.stdout.write(`\x1b[${y};${x}H`);
                    console.log(object.fill);
                }
            }
        }
    }

    private rectangle(object: app.IcanvasChild) {
        if (!object.height || !object.width) return;

        for (let i = object.y; i < object.y + object.height; i++) {
            for (let j = object.x; j < object.x + object.width; j++) {
                process.stdout.write(`\x1b[${i};${j}H`);
                console.log(object.fill);
            }
        }
    }

    public data: app.Idata = {
        "type": "canvas",
        "properties": {
            "canvasChilds": [],
            "accepts": ["paths", "global", "styles", "events", "defaultEvents", "canvasChilds"],
            "paths": [],
            "global": "",
            "styles": {
                "x": 1,
                "y": 1,
                "width": 20,
                "height": 10,
                "visible": true
            },
            "events": {},
            "defaultEvents": {}
        }
    };

    public constructor(props?: app.Iproperties) {
        if (props) this.data.properties = app.setProps(props, this.data.properties);
    }

    public prerun(widget: app.Iwidget) {
        widget.data.properties.canvasChilds?.forEach((child: app.IcanvasChild) => {
            if (child.type === `line`) this.line(child);
            if (child.type === `rectangle`) this.rectangle(child);
            if (child.type === `circle`) this.circle(child);
        });
    }
}