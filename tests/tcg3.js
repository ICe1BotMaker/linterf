const { CLIApplication } = require(`../`);
const global = require(`../dist/scripts/global`);

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