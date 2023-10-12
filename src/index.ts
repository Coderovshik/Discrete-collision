import './index.css';
import { Vector2d } from './vector';
import { sleep } from './util';
import { Simulation } from './simulation';
import { Ball } from './ball';
import { Box } from './box';

const root = document.getElementById('root');
const sim = new Simulation(root, 25 /*new Ball(10, new Vector2d(250, 250), new Vector2d(0.1, -0.3))*/, new Box({ w: 500, h: 500 }));
sim.start(60);