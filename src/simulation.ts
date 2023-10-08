import { Box } from "./box";
import { Ball } from "./ball";
import { Vector2d } from "./vector";

export class Simulation {
    private i: NodeJS.Timeout;

    constructor(root: HTMLElement);
    constructor(root: HTMLElement, ball: Ball, box: Box);
    constructor(root: HTMLElement, private ball: Ball = new Ball, private box: Box = new Box) {
        this.ball = ball;
        this.box = box;
        this.box.element.appendChild(this.ball.element);
        root.appendChild(this.box.element);
    }

    processCollision() {
        if (this.ball.pos.x + this.ball.getWidth() >= this.box.getWidth() || this.ball.pos.x < 0) {
            this.ball.pos.x = this.ball.pos.x < 0 ? 0 : this.box.getWidth() - this.ball.getWidth();
            this.ball.vel.x =  -this.ball.vel.x;
        }

        if (this.ball.pos.y + this.ball.getWidth() >= this.box.getHeight() || this.ball.pos.y < 0) {
            this.ball.pos.y = this.ball.pos.y < 0 ? 0 : this.box.getHeight() - this.ball.getWidth();
            this.ball.vel.y = -this.ball.vel.y;
        }
    }

    start() {
        this.i = setInterval(() => {
            this.processCollision();
            this.ball.move();
            this.ball.render();
        }, 10);
    }

    stop() {
        clearInterval(this.i);
    }
}