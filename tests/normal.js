const { CLIApplication, CLICanvas } = require(`../`);

const app = new CLIApplication();

const canvas = new CLICanvas({
    canvasChilds: [
        {
            type: `rectangle`,
            x: 1,
            y: 1,
            width: 10,
            height: 5,
            fill: `█`
        },
        {
            type: `circle`,
            centerX: 20,
            centerY: 6,
            radius: 5,
            fill: `█`
        },
        {
            type: `line`,
            x: 1,
            y: 7,
            toX: 10,
            toY: 11,
            fill: `█`
        }
    ]
});

app.append(canvas);
app.show(30);