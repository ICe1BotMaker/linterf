const { CLIApplication, CLITextbox, CLILabel } = require(`../`);

const app = new CLIApplication();

const label = new CLILabel({ text: "sansdance" });
const textbox = new CLITextbox({ placeholder: "i'm stupit!", styles: { y: 2 } });

app.append(label, textbox);
app.show(30);