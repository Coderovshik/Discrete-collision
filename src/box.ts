import styles from './geometry.module.css';
import { Vector2d } from './vector';

type Size = { w: number, h: number };
function isSize(obj: any): obj is Size {
    return 'w' in obj && 'h' in obj;
} 

export class Box {
    element: HTMLElement;

    constructor();
    constructor(box: Box);
    constructor(size: Size);
    constructor(sizeOrBox: Box | Size = { w: 100, h: 100 }) {
        this.element = document.createElement('div');
        this.element.className = styles.box;
        let size: Size;
        if (isSize(sizeOrBox)) {
            size = { ...sizeOrBox };
        } else if (sizeOrBox instanceof Box) {
            size = { w: sizeOrBox.getWidth(), h: sizeOrBox.getHeight() };
        } else {
            throw new Error('Wrong set of arguments for box object');
        }
        this.element.style.width = `${size.w}px`;
        this.element.style.height = `${size.h}px`;
        this.element.style.borderWidth = '5px';
        console.log(this.getBorderWidth());
    }

    getWidth(): number {
        return this.element.getBoundingClientRect().width;
    }

    getHeight(): number {
        return this.element.getBoundingClientRect().height;
    }

    getX(): number {
        return this.element.getBoundingClientRect().x;
    }

    getY(): number {
        return this.element.getBoundingClientRect().y;
    }

    getBorderWidth(): number {
        return parseInt(this.element.style.borderWidth);
    }
}