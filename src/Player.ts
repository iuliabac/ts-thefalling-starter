import CanvasItem from './CanvasItem.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Player extends CanvasItem {
  public constructor(maxX: number, maxY: number) {
    super();
    this.image = CanvasRenderer.loadNewImage('./assets/player.png');
    this.posX = maxX/2;
    this.posY = maxY/2;
  }

  public move(posX: number, posY: number): void {
    this.posX = posX;
    this.posY = posY;
  }

  /**
   *sdfsdfsdfds
   * @param delta tfyifdt
   */


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
