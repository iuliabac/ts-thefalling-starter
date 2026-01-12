import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Player extends CanvasItem {
  private maxX: number;

  public constructor(maxX: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/player.png');
    this.maxX = maxX;
  }

  /**
   *sdfsdfsdfds
   * @param delta tfyifdt
   */
  public move(posX: number): void {
    this.posX = posX;

    if (this.posX <= 0) {
      this.posX = 0;
    }

    if (this.posX + this.image.width > this.maxX) {
      this.posX = this.image.width - this.maxX;
    }
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
