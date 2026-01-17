import CanvasRenderer from './CanvasRenderer.js';
import LightItem from './LightItem.js';

export default class Monster extends LightItem {
  public constructor(maxX: number, maxY: number) {
    super();
    const random:number = Math.random();
    if (random < 0.5) {
      this.image = CanvasRenderer.loadNewImage('./assets/monster1.png');
      this.lightForce = -1;
    } else if (random < 0.7) {
      this.image = CanvasRenderer.loadNewImage('./assets/monster2.png');
      this.lightForce = -2;
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/monster3.png');
      this.lightForce = -3;
    }

    this.speed = 0.2;
    this.posX = Math.random() * maxX;
    this.posY = maxY;
  }
}
