# 💫 linterf

(**under development**)

<img src="imgs/video.gif" style="width: 100%">

### 💬 An advanced version of nodecli-gui

- **Widgets**: Panel, Button, Label, Checkbox, Radio, Image, Textbox, Webview
- **Presets**: Modal, (create-later)
- **Functions**: TCG (3D CLI Graphic), (create-later)

#### 🎬 **Webview ?**
- Use the Web-related node.js library to take screenshots over the Internet and convert them into text to display

#### 🆕 **TCG ?**
- A 3D engine using cli, and text is drawn on the screen using location and size data.

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
$ npx linterf-scripts build
```