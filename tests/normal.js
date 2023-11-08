const { CLIApplication, CLIPanel, CLILabel, CLIButton, CLICheckbox } = require(`../`);

const app = new CLIApplication();

const checkbox = new CLICheckbox({ text: "sans dance is best dance?", styles: { "text-color": "#ffffff" } });

app.append(checkbox);
app.show(30);