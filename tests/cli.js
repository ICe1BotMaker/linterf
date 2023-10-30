const { CLIApplication, CLIPanel, CLILabel } = require(`../`);

const app = new CLIApplication();

const background = new CLIPanel({"paths": ["/root/background"]});
const panel1 = new CLIPanel({
    "paths": ["/root/panel1"],
    "styles": {
        "x": 3,
        "y": 2,
        "width": 15,
        "height": 5,
        "background-color": "#ff0000",
    }
});
const label1 = new CLILabel({"paths": ["/root/label1"]});

app.append(background, panel1, label1);

app.show(30);