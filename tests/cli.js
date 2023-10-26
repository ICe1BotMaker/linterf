const { CLIApplication, CLIPanel } = require(`../`);

const app = new CLIApplication();

const panel1 = new CLIPanel({
    "paths": ["/root/panel1"],
    "styles": {
        "width": 1,
        "height": 2,
    }
});
app.append(panel1);
console.log(panel1);