import CanvasRenderer from './CanvasRenderer.js';

export default abstract class CanvasItem {
  protected image: HTMLImageElement;

  protected posX: number;

  protected posY: number;

  public constructor() {
    this.posX = 0;
    this.posY = 0;
    this.image = new Image();
  }

  public getPosX(): number {
    return this.posX;
  }

  public getPosY(): number {
    return this.posY;
  }

  public getHeight(): number {
    return this.image.height;
  }

  public getWidth(): number {
    return this.image.width;
  }

  /**
   * aukjstfdyafsdyufa
   * @param canvas asjygfduasftgdwqa
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }
}
