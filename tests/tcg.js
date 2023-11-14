const camera = {
    x: 0,
    y: 0,
    z: 0
};

const object_square = {
    x: 0,
    y: 5,
    z: 0,
    w: 11,
    h: 5,
    d: 5
};

console.clear();

if (camera.z === object_square.z) {
    for (let i = 0; i < object_square.d; i++) {
        process.stdout.write(`\x1b[${i + 1};1H`);
        console.log(`█`.repeat(object_square.w));
    }
}

process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);