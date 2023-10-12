import { Vector2d } from "./vector";

export function sleep(ms: number) {
    return new Promise(r => { setTimeout(r, ms) });
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomFloat(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomSign(): number {
    return Math.random() > 0.5 ? -1 : 1;
}

export function getRandomUnsignedIntVector(minX: number, maxX: number, minY: number, maxY: number): Vector2d {
    return new Vector2d(getRandomInt(minX, maxX), getRandomInt(minY, maxY));
}

export function getRandomSignedFloatVector(minX: number, maxX: number, minY: number, maxY: number) {
    return new Vector2d(
        getRandomSign() * getRandomFloat(minX, maxX),
        getRandomSign() * getRandomFloat(minY, maxY)
    );
}