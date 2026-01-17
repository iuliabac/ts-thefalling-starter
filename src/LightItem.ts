import CanvasItem from './CanvasItem.js';

export default abstract class LightItem extends CanvasItem {
  protected lightForce: number;

  protected speed: number;

  public constructor() {
    super();
    this.lightForce = 0;
    this.speed = 1;
  }

  public getLightForce(): number {
    return this.lightForce;
  }
  
  /**
   * akshyfgdjkafgsdjkagsdjhagjkdgh
   * @param delta aghsdhjagsdgasghjd
   */
  public update(delta: number): void {
    this.posY -= this.speed * delta;
  }
}
