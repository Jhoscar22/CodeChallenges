function setup() {
    createCanvas(400, 400);
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    print() {
        console.log(`(${this.x}, ${this.y})`)
    }
}

function slope(p1, p2) {
    return (p2.y - p1.y) / (p2.x - p1.x);
}

function originY(p, m) {
    return p.y - m * p.x;
}

function yAt(x, m, b) {
    return m * x + b;
}

function interpolate(p1, p2) {
    let swap = false;
    let points = [];
    if (p2.x < p1.x) {
        const temp = p2;
        p2 = p1;
        p1 = temp;

        points.push(p1);
    } else if (p2.x == p1.x) {
        let temp = p1.x;
        p1.x = p1.y;
        p1.y = temp;
        temp = p2.x;
        p2.x = p2.y;
        p2.y = temp;
        swap = true;

        if (p2.x < p1.x) {
            const t = p2;
            p2 = p1;
            p1 = t;
        }

        points.push(new Point(p1.y, p1.x));
    } else {
        points.push(p1);
    }

    const n = 300; // 20 IS THE NUMBER OF POINTS
    const stepSize = (p2.x - p1.x) / (n - 1);
    const m = slope(p1, p2);
    const b = originY(p1, m);

    console.log(`step-size: ${stepSize}, m: ${m}, b: ${b}`)


    for (let i = 1; i < n; i++) {
        const x = Math.trunc(p1.x + stepSize * i);
        const y = Math.trunc(yAt(x, m, b));

        if (swap && (points[points.length - 1].x != y || points[points.length - 1].y != x)) {
            points.push(new Point(y, x));

        } else if (!swap && (points[points.length - 1].x != x || points[points.length - 1].y != y)) {
            points.push(new Point(x, y));

        }
    }

    return points;
}

let points1 = interpolate(new Point(1, 2), new Point(100, 20));
let points2 = interpolate(new Point(10, 200), new Point(50, 10));
let points3 = interpolate(new Point(300, 300), new Point(10, 10));
let points4 = interpolate(new Point(200, 300), new Point(250, 50));
let points5 = interpolate(new Point(350, 350), new Point(100, 300));

function draw() {
    background(220);
    for (let i = 0; i < points1.length; i++) {
        // points[i].print();
        point(points1[i].x, points1[i].y)
    }
    for (let i = 0; i < points2.length; i++) {
        // points[i].print();
        point(points2[i].x, points2[i].y)
    }
    for (let i = 0; i < points3.length; i++) {
        // points[i].print();
        point(points3[i].x, points3[i].y)
    }
    for (let i = 0; i < points4.length; i++) {
        // points[i].print();
        point(points4[i].x, points4[i].y)
    }
    for (let i = 0; i < points5.length; i++) {
        // points[i].print();
        point(points5[i].x, points5[i].y)
    }
}