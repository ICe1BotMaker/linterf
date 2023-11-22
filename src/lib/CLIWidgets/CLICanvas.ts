import * as app from "../CLIApplication";

export class CLICanvas {
    private lines: app.IcanvasChild[] = [];
    private circles: app.IcanvasChild[] = [];
    private rectangles: app.IcanvasChild[] = [];

    private line(object: app.IcanvasChild): (app.Iresult[] | undefined) {
        if (!object.toX || !object.toY) return;

        let result: app.Iresult[] = [];

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

            result.push({ fill: object.fill, x: x, y: y });
        }

        return result;
    }
    
    private circle(object: app.IcanvasChild): (app.Iresult[] | undefined) {
        if (!object.centerX || !object.centerY || !object.radius) return;
        
        let result: app.Iresult[] = [];

        for (let y = object.centerY - object.radius; y <= object.centerY + object.radius; y++) {
            for (let x = object.centerX - object.radius; x <= object.centerX + object.radius; x++) {
                const distance = Math.sqrt((x - object.centerX) ** 2 + (y - object.centerY) ** 2);

                if (distance <= object.radius) {
                    process.stdout.write(`\x1b[${y};${x}H`);
                    console.log(object.fill);

                    result.push({ fill: object.fill, x: x, y: y });
                }
            }
        }

        return result;
    }

    private rectangle(object: app.IcanvasChild): (app.Iresult[] | undefined) {
        if (!object.height || !object.width) return;
        
        let result: app.Iresult[] = [];

        for (let i = object.y; i < object.y + object.height; i++) {
            for (let j = object.x; j < object.x + object.width; j++) {
                process.stdout.write(`\x1b[${i};${j}H`);
                console.log(object.fill);

                result.push({ fill: object.fill, x: j, y: i });
            }
        }

        return result;
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
            if (child.type === `line`) {
                if (this.lines.includes(child)) {
                    const idx = this.lines.findIndex(e => e === child);

                    this.lines[idx].private?.forEach(_private => {
                        if (!_private.x || !_private.y) return;
                        process.stdout.write(`\x1b[${_private.y};${_private.x}H`);
                        console.log(_private.fill);
                    });
                } else {
                    child.private = this.line(child);
                    this.lines.push(child);
                }
            } else if (child.type === `rectangle`) {
                if (this.rectangles.includes(child)) {
                    const idx = this.rectangles.findIndex(e => e === child);
                    
                    this.rectangles[idx].private?.forEach(_private => {
                        if (!_private.x || !_private.y) return;
                        process.stdout.write(`\x1b[${_private.y};${_private.x}H`);
                        console.log(_private.fill);
                    });
                } else {
                    child.private = this.rectangle(child);
                    this.rectangles.push(child);
                }
            } else if (child.type === `circle`) {
                if (this.circles.includes(child)) {
                    const idx = this.circles.findIndex(e => e === child);
                    
                    this.circles[idx].private?.forEach(_private => {
                        if (!_private.x || !_private.y) return;
                        process.stdout.write(`\x1b[${_private.y};${_private.x}H`);
                        console.log(_private.fill);
                    });
                } else {
                    child.private = this.circle(child);
                    this.circles.push(child);
                }
            }
        });
    }
}