const lineObject = {
    x: 10, y: 5,
    toX: 20, toY: 11,
    box: `█`
};

function line(object) {
    console.clear();

    const deltaX = object.toX - object.x;
    const deltaY = object.toY - object.y;
    const steps = Math.max(Math.abs(deltaX), Math.abs(deltaY));

    for (let i = 0; i <= steps; i++) {
        let x, y;

        if (deltaX >= 0 && deltaY >= 0) {
            x = Math.round(object.x + (i / steps) * Math.abs(deltaX));
            y = Math.round(object.y + (i / steps) * Math.abs(deltaY));
        } else if (deltaX < 0 && deltaY >= 0) {
            x = Math.round(object.x - (i / steps) * Math.abs(deltaX));
            y = Math.round(object.y + (i / steps) * Math.abs(deltaY));
        } else if (deltaX >= 0 && deltaY < 0) {
            x = Math.round(object.x + (i / steps) * Math.abs(deltaX));
            y = Math.round(object.y - (i / steps) * Math.abs(deltaY));
        } else { // deltaX < 0 && deltaY < 0
            x = Math.round(object.x - (i / steps) * Math.abs(deltaX));
            y = Math.round(object.y - (i / steps) * Math.abs(deltaY));
        }

        process.stdout.write(`\x1b[${y};${x}H`);
        console.log(object.box);
    }
}

const circleObject = {
    centerX: 20, centerY: 12,
    radius: 11,
    box: `█`
};

function circle(object) {
    console.clear();

    for (let y = object.centerY - object.radius; y <= object.centerY + object.radius; y++) {
        for (let x = object.centerX - object.radius; x <= object.centerX + object.radius; x++) {
            const distance = Math.sqrt((x - object.centerX) ** 2 + (y - object.centerY) ** 2);

            if (distance <= object.radius) {
                process.stdout.write(`\x1b[${y};${x}H`);
                console.log(object.box);
            }
        }
    }
}

const rectangleObject = {
    x: 5, y: 5,
    width: 10, height: 6,
    box: `█`
};

function rectangle(object) {
    console.clear();

    for (let i = object.y; i < object.y + object.height; i++) {
        for (let j = object.x; j < object.x + object.width; j++) {
            process.stdout.write(`\x1b[${i};${j}H`);
            console.log(object.box);
        }
    }
}

process.stdout.write(`\x1b[${process.stdout.rows - 1};${process.stdout.columns}H`);