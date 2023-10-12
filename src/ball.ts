import styles from './geometry.module.css';
import { Vector2d } from './vector';

export class Ball {
    element: HTMLElement;
    pos: Vector2d; // px
    vel: Vector2d; // px/second
    acceleration: Vector2d; // px/second^2
    radius: number;

    constructor();
    constructor(ball: Ball);
    constructor(radius: number, pos?: Vector2d, vel?: Vector2d, accel?: Vector2d);
    constructor(radiusOrBall: Ball | number = 10, pos?: Vector2d, vel?: Vector2d, accel?: Vector2d) {
        this.element = document.createElement('div');
        this.element.className = styles.ball;
        if (typeof radiusOrBall === 'number') {
            this.radius = radiusOrBall;
        } else if (radiusOrBall instanceof Ball) {
            this.radius = radiusOrBall.radius;
        } else {
            throw new Error('Wrong set of arguments for ball object');
        }
        this.element.style.width = `${2 * this.radius}px`;
        this.element.style.height = `${2 * this.radius}px`;
        this.pos = pos ? new Vector2d(pos) : new Vector2d;
        this.vel = vel ? new Vector2d(vel) : new Vector2d(
            Math.pow(-1, Math.floor(Math.random() * 10)) * (Math.floor(Math.random() * this.radius / 5)),
            Math.pow(-1, Math.floor(Math.random() * 10)) * (Math.floor(Math.random() * this.radius / 5))
        );
        this.acceleration = accel ? new Vector2d(accel) : new Vector2d; 
        this.render();
    }

    move(dt: number) {
        this.vel = Vector2d.add(this.vel, Vector2d.scale(this.acceleration, dt));
        this.pos = Vector2d.add(this.pos, Vector2d.scale(this.vel, dt));
    }

    render() {
        this.element.style.left = `${this.pos.x}px`;
        this.element.style.top = `${this.pos.y}px`;
    }

    getWidth(): number {
        return this.element.getBoundingClientRect().width;
    }

    getDistance(ball: Ball): number {
        let dx = (ball.pos.x - this.pos.x);
        let dy = (ball.pos.y - this.pos.y);
        return Math.sqrt(dx * dx + dy * dy);
    }
}