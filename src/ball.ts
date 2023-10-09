import styles from './geometry.module.css';
import { Vector2d } from './vector';

export class Ball {
    element: HTMLElement;
    pos: Vector2d; // px
    vel: Vector2d; // px/second
    acceleration: Vector2d = new Vector2d(0, 0.001); // px/second^2

    constructor();
    constructor(ball: Ball);
    constructor(radius: number, pos?: Vector2d, vel?: Vector2d);
    constructor(radiusOrBall: Ball | number = 10, pos?: Vector2d, vel?: Vector2d) {
        this.element = document.createElement('div');
        this.element.className = styles.ball;
        let radius: number;
        if (typeof radiusOrBall === 'number') {
            radius = radiusOrBall;
        } else if (radiusOrBall instanceof Ball) {
            radius = radiusOrBall.element.getBoundingClientRect().width / 2;
        } else {
            throw new Error('Wrong set of arguments for ball object');
        }
        this.element.style.width = `${2 * radius}px`;
        this.element.style.height = `${2 * radius}px`;
        this.pos = pos ? new Vector2d(pos) : new Vector2d;
        this.vel = vel ? new Vector2d(vel) : new Vector2d(
            Math.pow(-1, Math.floor(Math.random() * 10)) * (Math.floor(Math.random() * radius / 5)),
            Math.pow(-1, Math.floor(Math.random() * 10)) * (Math.floor(Math.random() * radius / 5))
        );
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
}