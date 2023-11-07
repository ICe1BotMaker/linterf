"use strict";

var _require = require("../"),
  CLIApplication = _require.CLIApplication,
  CLIPanel = _require.CLIPanel,
  CLILabel = _require.CLILabel,
  CLIButton = _require.CLIButton;
var app = new CLIApplication();
var background = new CLIPanel({
  "styles": {
    "background-color": "#EEEEEE"
  }
});
var title = new CLILabel({
  "text": "simple-modal-app",
  "styles": {
    "text-color": "#222831",
    x: 4,
    y: 2
  }
});
var label1 = new CLILabel({
  "paths": ["root/label1"],
  "text": "open-modal",
  "styles": {
    "text-color": "#00ADB5",
    x: 4,
    y: 3,
    visible: false
  }
});
var timeout;
var button1 = new CLIButton({
  "text": " button ",
  "styles": {
    "background-color": "#222831",
    "text-color": "#EEEEEE",
    x: 4,
    y: 4,
    width: 8,
    height: 1
  },
  "events": {
    "onPut": function onPut() {
      timeout = setTimeout(function () {
        app.modify("root/label1", {
          styles: {
            visible: true
          }
        });
      }, 500);
    },
    "onLeave": function onLeave() {
      clearTimeout(timeout);
      app.modify("root/label1", {
        styles: {
          visible: false
        }
      });
    },
    "onEnter": function onEnter() {
      app.modify("root/modalp", {
        styles: {
          visible: true
        }
      });
      app.modify("root/modall", {
        styles: {
          visible: true
        }
      });
      app.modify("root/modalb", {
        styles: {
          visible: true
        }
      });
    }
  }
});
var modalPanel = new CLIPanel({
  "paths": ["root/modalp"],
  "styles": {
    "background-color": "#222831",
    "visible": false,
    x: 8,
    y: 2,
    "width": 50,
    "height": 10
  }
});
var modalLabel = new CLILabel({
  "paths": ["root/modall"],
  "text": "modal-title",
  "styles": {
    "text-color": "#EEEEEE",
    x: 12,
    y: 3,
    "visible": false
  }
});
var modalButton = new CLIButton({
  "paths": ["root/modalb"],
  "text": " close ",
  "styles": {
    "background-color": "#EEEEEE",
    "text-color": "#222831",
    x: 12,
    y: 4,
    width: 6,
    height: 1,
    visible: false
  },
  "events": {
    "onEnter": function onEnter() {
      app.modify("root/modalp", {
        styles: {
          visible: false
        }
      });
      app.modify("root/modall", {
        styles: {
          visible: false
        }
      });
      app.modify("root/modalb", {
        styles: {
          visible: false
        }
      });
    }
  }
});
app.append(background, title, label1, button1, modalPanel, modalLabel, modalButton);
app.show(30);

// const siu = <CLIPanel styles={{ "background-color": "#EEEEEE" }}>
//     <CLILabel text="simple-modal-app" styles={{ "text-color": "#222831", x: 4, y: 2 }} />

//     <CLILabel paths={["root/label1"]} text="open-modal" styles={{ "text-color": "#00ADB5", x: 4, y: 3, visible: false }} />
//     <CLIButton text=" button " styles={{ "background-color": "#222831", "text-color": "#EEEEEE", x: 4, y: 4, width: 8, height: 1 }} events={{
//         "onPut": () => {
//             timeout = setTimeout(() => {
//                 app.modify(`root/label1`, { styles: { visible: true } });
//             }, 500);
//         },
//         "onLeave": () => {
//             clearTimeout(timeout);
//             app.modify(`root/label1`, { styles: { visible: false } });
//         },
//         "onEnter": () => {
//             app.modify(`root/modalp`, { styles: { visible: true } });
//             app.modify(`root/modall`, { styles: { visible: true } });
//             app.modify(`root/modalb`, { styles: { visible: true } });
//         }
//     }} />

//     <CLIPanel paths={["root/modalp"]} styles={{ "background-color": "#222831", "visible": false, x: 8, y: 2, "width": 50, "height": 10 }}>
//         <CLILabel paths={["root/modall"]} text="modal-title" styles={{ "text-color": "#EEEEEE", x: 12, y: 3, "visible": false }} />
//         <CLIButton paths={["root/modalb"]} text=" close " styles={{ "background-color": "#EEEEEE", "text-color": "#222831", x: 12, y: 4, width: 6, height: 1, visible: false }} events={{
//             "onEnter": () => {
//                 app.modify(`root/modalp`, { styles: { visible: false } });
//                 app.modify(`root/modall`, { styles: { visible: false } });
//                 app.modify(`root/modalb`, { styles: { visible: false } });
//             }
//         }} />
//     </CLIPanel>
// </CLIPanel>;

// app.append(siu);