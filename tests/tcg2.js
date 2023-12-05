const { CLIApplication } = require(`../`);
const global = require(`../dist/scripts/TCG`);

const app = new CLIApplication({ debug: true });

const tcg = new global.TCG([
    {
        id: `cube`,
        center: { x: 1, y: 1, z: 1 },
        rotation: { x: 0, y: 0, z: 0 },
        vertices: [
            { x: 0, y: 0, z: 0 },
            { x: 2, y: 0, z: 0 },
            { x: 0, y: 2, z: 0 },
            { x: 2, y: 2, z: 0 },
            { x: 0, y: 0, z: 2 },
            { x: 2, y: 0, z: 2 },
            { x: 0, y: 2, z: 2 },
            { x: 2, y: 2, z: 2 },
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