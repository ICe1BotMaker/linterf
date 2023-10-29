const { CLIApplication, CLIPanel } = require(`../`);

const app = new CLIApplication();

const background = new CLIPanel({"paths": ["/root/background"]});
const panel1 = new CLIPanel({
    "paths": ["/root/panel1"],
    "styles": {
        "x": 3,
        "y": 2,
        "width": 10,
        "height": 5,
        "background-color": "#ff0000",
    }
});

app.append(background, panel1);

app.show(30);