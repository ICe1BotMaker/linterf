const { CLIApplication, CLICanvas, CLITextbox } = require(`../`);

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

const textbox = new CLITextbox({
    placeholder: `sans`,
    styles: {
        y: 9
    }
})

app.append(canvas, textbox);
app.show(30);