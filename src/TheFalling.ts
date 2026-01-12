import Game from './Game.js';

import CanvasRenderer from './CanvasRenderer.js';

import Player from './Player.js';
import MouseListener from './MouseListener.js';

export default class TheFalling extends Game {
  private canvas: HTMLCanvasElement;

  private mouseListener: MouseListener;

  private player: Player;

  private lightforce: number;

  private timeToNextLightforceDrop: number;

  private monstersCaught: number;

  private timeToNextItem: number;

  private cloakActive: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.mouseListener = new MouseListener(canvas);

    this.player = new Player(this.canvas.width);

    this.timeToNextItem = (Math.random() * 300) + 500;

    this.lightforce = 10;
    this.timeToNextLightforceDrop = 1000;
    this.monstersCaught = 0;

    this.cloakActive = 0;
  }

  /**
   * Process the input from the user
   */
  public processInput(): void {
    this.player.move (this.mouseListener.getMousePosition().x);
  }

  private spawnNewItem(elapsed: number): void {
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem < 0) {
      const random: number = Math.random();
      this.timeToNextItem = (Math.random() * 300) + 300;
    }
  }


  /**
   * Update state of the game
   *
   * @param delta milliseconds since last update
   * @returns whether the game is still running
   */
  public update(delta: number): boolean {
    ///this.player.update(delta);

    return true;
  }

  private gameOver(): boolean {
    return (this.lightforce < 0 || this.monstersCaught >= 10);
  }

  /**
   * Render the game
   */
  public render(): void {
    CanvasRenderer.clearCanvas(this.canvas);

    this.player.render(this.canvas);

    if (this.cloakActive > 0) {
      CanvasRenderer.writeText(this.canvas, `Cloak Time: ${Math.round(this.cloakActive / 1000)}`, 10, 110, 'left', 'Arial', 30, 'cyan');
    }
    CanvasRenderer.writeText(this.canvas, `LightForce: ${this.lightforce}`, 10, 30, 'left', 'Arial', 30, 'cyan');
    CanvasRenderer.writeText(this.canvas, `Monsters: ${this.monstersCaught}`, 10, 70, 'left', 'Arial', 30, 'cyan');
    if (this.gameOver()) {
      CanvasRenderer.writeText(this.canvas, 'GAME OVER', this.canvas.width / 2, this.canvas.height / 2, 'center', 'Arial', 50, 'cyan');
    }
  }
}
