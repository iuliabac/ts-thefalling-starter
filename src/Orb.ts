import CanvasRenderer from './CanvasRenderer.js';
import LightItem from './LightItem.js';

export default class Orb extends LightItem {
  public constructor(maxX: number, maxY: number) {
    super();
    const random: number = Math.random();
    if (random < 0.5) {
      this.image = CanvasRenderer.loadNewImage('assets/orb1.png');
      this.lightForce = 1;
    } else if (random < 0.8) {
      this.image = CanvasRenderer.loadNewImage('assets/orb2.png');
      this.lightForce = 3;
    } else {
      this.image = CanvasRenderer.loadNewImage('assets/orb3.png');
      this.lightForce = 5;
    }

    this.posX = Math.random() * maxX;
    this.posY = maxY;
    this.speed = 0.2;
  }
}
