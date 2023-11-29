const { CLIApplication } = require(`../`);
const global = require(`../dist/scripts/global`);

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