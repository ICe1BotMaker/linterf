<img src="imgs/video.gif" style="width: 100%">

# 💫 linterf

> ***install `GraphicsMagick`***
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

##### When running tcg, use the program below to run it.
- [**Windows Terminal**](https://apps.microsoft.com/detail/9N0DX20HK701?hl=ko-kr&gl=US)

<img src="imgs/tcg.gif" style="width: 100%">

```jsx
const { CLIApplication } = require(`linterf`);
const global = require(`linterf/dist/scripts/global`);

const app = new CLIApplication();

const tcg = new global.TCG([
    {
        id: `cube`,
        center: { x: .5, y: .8, z: .5 },
        rotation: { x: .5, y: .5, z: 0 },
        vertices: [
            { x: 0, y: .7, z: 0 },
            { x: 1, y: .7, z: 0 },
            { x: 0, y: 1.3, z: 0 },
            { x: 1, y: 1.3, z: 0 },
            { x: 0, y: .7, z: 1 },
            { x: 1, y: .7, z: 1 },
            { x: 0, y: 1.3, z: 1 },
            { x: 1, y: 1.3, z: 1 },
        ]
    }
], { events: {
    onFrame: (objects, camera) => {
        if (objects[0].vertices[0].x >= 5) {
            objects[0].center.x = .5;
            objects[0].vertices.map((e, idx) => e.x = (((idx + 1) % 2) === 0));
        }

        objects[0].center.x += .15;
        objects[0].rotation.y += .2;
        objects[0].vertices.map(e => e.x += .15);
    }
} });

app.append(tcg);
app.show(24);
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