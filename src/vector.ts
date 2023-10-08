export class Vector2d {
    x: number;
    y: number;
    
    constructor();
    constructor(v: Vector2d);
    constructor(x: number, y: number);
    constructor(xOrV: Vector2d | number = 0, y: number = 0) {
        if (typeof xOrV === 'number') {
            this.x = xOrV;
            this.y = y;
        } else if (xOrV instanceof Vector2d) {
            this.x = xOrV.x;
            this.y = xOrV.y;
        } else {
            throw new Error('Wrong set of arguments for vector object');
        }
    }

    static add(v1: Vector2d, v2: Vector2d): Vector2d {
        return new Vector2d(v1.x + v2.x, v1.y + v2.y);
    }

    static sub(v1: Vector2d, v2: Vector2d): Vector2d {
        return new Vector2d(v1.x - v2.x, v1.y - v2.y);
    }

    static dot(v1: Vector2d, v2: Vector2d): number {
        return v1.x * v2.x + v1.y + v2.y;
    }

    static mag(v: Vector2d): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    static angle(v1: Vector2d, v2: Vector2d): number {
        return Vector2d.mag(v1) * Vector2d.mag(v2) === 0 ? 0 : Math.acos(Vector2d.dot(v1, v2) / (Vector2d.mag(v1) * Vector2d.mag(v2)));
    }

    static rotateClockwise(v: Vector2d, a: number) {
        return new Vector2d(v.x * Math.cos(a) + v.y * Math.sin(a), -v.x * Math.sin(a) + v.y * Math.cos(a));
    }

    static rotateCounterClockwise(v: Vector2d, a: number): Vector2d {
        return new Vector2d(v.x * Math.cos(a) - v.y * Math.sin(a), v.x * Math.sin(a) + v.y * Math.cos(a));
    }
}