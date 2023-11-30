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
        if (objects[0].vertices[1].x * 10 >= process.stdout.columns) {
            const idx = tcg.objects.findIndex(e => e.id.includes(`pyramid`));
            if (idx !== -1) tcg.objects.splice(idx, 1);
            createObstacles();

            objects[0].center.x = .5;
            objects[0].center.z = .5;
            objects[0].rotation.y = .5;
            objects[0].vertices.forEach((e, idx) => e.x = (idx + 1) % 2 === 0 ? 1 : 0);
            objects[0].vertices.forEach((e, idx) => e.z = idx >= 4 ? 1 : 0);
        }

        objects[0].center.x += .05 + .1;
        objects[0].rotation.y += .1 + .1;
        objects[0].vertices.map(e => e.x += .05 + .1);
    }
} });

const createObstacles = () => {
    const location = { x: Math.floor(Math.random() * 5) + 4, y: Math.floor(Math.random() * 2) };

    tcg.objects.push({
        id: `pyramid-${Math.random().toString(36).substring(2)}`,
        center: { x: .5 + location.x, y: .5 + location.y, z: .5 },
        rotation: { x: -.5, y: .5, z: 0 },
        vertices: [
            { x: 0 + location.x, y: 0 + location.y, z: 0 },
            { x: 1 + location.x, y: 0 + location.y, z: 0 },
            { x: 0 + location.x, y: 1 + location.y, z: 0 },
            { x: 1 + location.x, y: 1 + location.y, z: 0 },
            { x: .5 + location.x, y: .5 + location.y, z: 1 },
            { x: .5 + location.x, y: .5 + location.y, z: 1 },
            { x: .5 + location.x, y: .5 + location.y, z: 1 },
            { x: .5 + location.x, y: .5 + location.y, z: 1 },
        ]
    });
}

process.stdin.on(`data`, key => {
    if (key === `w`) {
        tcg.objects[0].vertices.map(e => e.y -= .1);
        tcg.objects[0].center.y -= .1;
    }
    
    if (key === `s`) {
        tcg.objects[0].vertices.map(e => e.y += .1);
        tcg.objects[0].center.y += .1;
    }

    if (key === ` `) {
        tcg.objects[0].center.z += .5;
        tcg.objects[0].vertices.map(e => e.z += .1);
    }
});

app.append(tcg);
app.show(24);