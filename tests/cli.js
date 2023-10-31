const { CLIApplication, CLIPanel, CLILabel, CLIButton } = require(`../`);

const app = new CLIApplication();

const background = new CLIPanel({"paths": ["/root/background"], "styles": {"background-color": "#1F1717"}});
const panel1 = new CLIPanel({"paths": ["/root/panel1"], "styles": {"x": 3, "y": 2, "width": 16, "height": 2, "background-color": "#CE5A67"}});
const label1 = new CLILabel({"text": "lorem ipsum", "styles":{"x": 5, "y": 3}});
const button1 = new CLIButton({
    "text": " exit",
    "styles": {
        "width": 16,
        "height": 0,
        "x": 3,
        "y": 6,
        "background-color": "#F4BF96"
    },
    "events": {
        "onclick": () => {
            process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);
            process.exit();
        }
    }
});

app.append(background, panel1, label1, button1);

app.show(30);