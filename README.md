<img src="imgs/video.gif" style="width: 100%">

# 💫 linterf

> ***use `GraphicsMagick`***
> 
> Be sure to watch [DETAIL.md](https://github.com/ICe1BotMaker/linterf/blob/master/DETAIL.md) before using it!

### 💬 An advanced version of nodecli-gui

- **Widgets**: Panel, Button, Label, Checkbox, Radio, Image, Textbox, Webview, Custom
- **Presets**: Modal (create-later)
- **Functions**: TCG (3D CLI Graphic)

<!-- #### 🎬 **Webview ?**
- Use the Web-related node.js library to take screenshots over the Internet and convert them into text to display -->

#### 🆕 **TCG ?**
- A 3D engine using cli, and text is drawn on the screen using location and size data.

<img src="imgs/tcg.gif" style="width: 100%">

```jsx
const { CLIApplication } = require(`linterf`);
const global = require(`linterf/dist/scripts/TCG`);

const app = new CLIApplication();

const tcg = new global.TCG([
    {
        id: `cube`,
        center: { x: 0.5, y: 0.5, z: 0.5 },
        rotation: { x: 0, y: 0, z: 0 },
        vertices: [
            { x: 0, y: 0, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: 1, z: 0 },
            { x: 1, y: 1, z: 0 },
            { x: 0, y: 0, z: 1 },
            { x: 1, y: 0, z: 1 },
            { x: 0, y: 1, z: 1 },
            { x: 1, y: 1, z: 1 },
        ]
    }
], { events: {
    onFrame: (objects, camera) => {
        objects[0].rotation.x += .1;
        objects[0].rotation.y += .1;
        objects[0].rotation.z += .1;
    }
} });

app.append(tcg);
app.show(30);
```

### 💾 Installation

```bash
$ npm install linterf
```

### 💾 Usage

```jsx
const { CLIApplication, CLILabel } = require(`linterf`);

const app = new CLIApplication();

const title = <CLILabel text="title" styles={{ "text-color": "#222831", y: 2 }} />;

app.append(title);
app.show(30); // frame: 30
```

### 🎥 Run

```bash
$ npx linterf-scripts
```