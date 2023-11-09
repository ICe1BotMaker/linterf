const { CLIApplication, CLIPanel, CLILabel, CLIButton, CLICheckbox, CLIRadio } = require(`../`);

const app = new CLIApplication();

const title = new CLILabel({ text: "💫 pay-app", styles: { y: 1 } });

const radio1 = new CLIRadio({ checked: true, paths: ["root/radio/1"], text: "small", styles: { "text-color": "#ffffff", y: 3 } });
const radio2 = new CLIRadio({ paths: ["root/radio/2"], text: "large", styles: { "text-color": "#ffffff", y: 4 } });

let toggle = false;
const checkbox = new CLICheckbox({ paths: ["root/checkbox"], text: "Do you agree to the use of personal information?", styles: { "text-color": "#ffffff", y: 6 }, events: {
    "onEnter": () => {
        toggle = !toggle;
        app.modify(`root/submit`, { styles: { "background-color": toggle ? "#ffffff" : "#aaaaaa" }, events: {
            "onEnter": () => {
                if (toggle) {
                    app.modify(`root/label`, { styles: { visible: true } });
                    setTimeout(() => app.modify(`root/label`, { styles: { visible: false } }), 1000);
                }
            }
        } });
    }
} });

const button = new CLIButton({ paths: ["root/submit"], text: " pay ", styles: { y: 7, "background-color": "#aaaaaa", "text-color": "#000000" } });

const label = new CLILabel({ text: "pay ok.", paths: ["root/label"], styles: { visible: false, x: 8, y: 7 } });

app.append(title, radio1, radio2, checkbox, button, label);
app.show(30);