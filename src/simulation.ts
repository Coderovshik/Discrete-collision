import { Box } from "./box";
import { Ball } from "./ball";
import { Vector2d } from "./vector";
import { getRandomInt, getRandomFloat, getRandomSign, getRandomSignedFloatVector, getRandomUnsignedIntVector } from "./util";

export class Simulation {
    private i: NodeJS.Timeout;
    private balls: Ball[]; // ahahhahahahhahahahahhah BALLS (sorry)
    private box: Box;

    constructor(root: HTMLElement);
    constructor(root: HTMLElement, ball: Ball | Ball[], box: Box);
    constructor(root: HTMLElement, particles: number, box: Box);
    constructor(root: HTMLElement, balls: Ball | Ball[] | number = new Ball, box: Box = new Box) {
        this.box = box;
        if (typeof balls === 'number') {
            this.balls = Array<Ball>(balls).fill(null).map(() => {
                const b = new Ball(
                    getRandomInt(1, 10),
                    new Vector2d(getRandomInt(0, this.box.getWidth()), getRandomInt(0, this.box.getHeight() / 2)),
                    new Vector2d(Math.random() * 0.5, Math.random() * 0.5),
                );
                return b;
            });
            console.log(this.box.getWidth());
        } else if (balls instanceof Ball) {
            this.balls = [balls];
        } else {
            this.balls = balls;
        }
        this.balls.forEach((ball) => { this.box.element.appendChild(ball.element) });
        root.appendChild(this.box.element);
    }

    processCollisions() {
        this.balls.sort((a: Ball, b: Ball) => (a.pos.x - b.pos.x));
        let active: number[] = [0];
        let potCols: [number, number][] = [];
        for (let i = 1; i < this.balls.length; i++) {
            let newActive: number[] = [];
            for (let j of active) {
                if (this.balls[i].pos.x <= this.balls[j].pos.x + this.balls[j].getWidth()) {
                    potCols.push([i, j]);
                    newActive.push(i);
                }
            }
            if (newActive.length != 0) {
                active = [...active, ...newActive];
            } else {
                active = [];
            }
        }

        potCols.forEach((col) => {
            if (this.balls[col[0]].getDistance(this.balls[col[1]]) <= this.balls[col[0]].radius + this.balls[col[1]].radius) {
                let dv1 = Vector2d.sub(this.balls[col[0]].vel, this.balls[col[1]].vel);
                let dc1 = Vector2d.sub(this.balls[col[0]].pos, this.balls[col[1]].pos);
                this.balls[col[0]].vel = Vector2d.sub(this.balls[col[0]].vel, Vector2d.scale(dc1, (Vector2d.dot(dv1, dc1) / (Vector2d.mag(dc1) * Vector2d.mag(dc1)))));

                let dv2 = Vector2d.sub(this.balls[col[1]].vel, this.balls[col[0]].vel);
                let dc2 = Vector2d.sub(this.balls[col[1]].pos, this.balls[col[0]].pos);
                this.balls[col[1]].vel = Vector2d.sub(this.balls[col[1]].vel, Vector2d.scale(dc2, (Vector2d.dot(dv2, dc2) / (Vector2d.mag(dc2) * Vector2d.mag(dc2)))));
            }
        });

        for (let ball of this.balls) {
            if (ball.pos.x + ball.getWidth() >= this.box.getWidth() || ball.pos.x < 0) {
                ball.pos.x = ball.pos.x < 0 ? 0 : this.box.getWidth() - ball.getWidth();
                ball.vel.x = -ball.vel.x;
            }

            if (ball.pos.y + ball.getWidth() >= this.box.getHeight() || ball.pos.y < 0) {
                ball.pos.y = ball.pos.y < 0 ? 0 : this.box.getHeight() - ball.getWidth();
                ball.vel.y = -ball.vel.y;
            }
        }
    }

    start(updateRate: number) {
        const dt = Math.floor(1000 / updateRate);

        this.i = setInterval(() => {
            this.processCollisions();
            this.balls.forEach((ball) => ball.move(dt));
            this.balls.forEach((ball) => ball.render());
        }, dt);
    }

    stop() {
        if (!this.i) {
            throw new Error('Simulation is not running');
        }
        clearInterval(this.i);
        this.i = null;
    }
}