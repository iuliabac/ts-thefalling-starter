import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Player extends CanvasItem {
  private maxX: number;

  private direction: number;

  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/player.png');
    this.posX = maxX/2;
    this.posY = maxY - 100;
    this.maxX = maxX;
    this.direction = 0;
  }

  /**
   * auyfdsuasgfduygf
   */
  public moveLeft(): void {
    this.direction =- 1;
  }

  /**
   * aisgduygasduyio
   */
  public moveRight(): void {
    this.direction =+ 1;
  }

  /**
   *sdfsdfsdfds
   * @param delta tfyifdt
   */
  public update(delta: number): void {
    this.posX += this.direction * delta;

    if (this.posX <= 0) {
      this.posX = 0;
    }

    if (this.posX + this.image.width > this.maxX) {
      this.posX = this.image.width - this.maxX;
    }

    this.direction = 0;
  }


  /**
   * asdasdsadsad
   * @param item uhasidyhasihd
   * @returns asdasdasd
   */
  public collidesWithItem(item: CanvasItem): boolean {
    return (
      item.getPosX() + item.getWidth() >= this.posX
      && item.getPosX() <= this.posX + this.image.width
      && item.getPosY() + item.getHeight() >= this.posY
      && item.getPosY() <= this.posY + this.image.height
    );
  }
}
