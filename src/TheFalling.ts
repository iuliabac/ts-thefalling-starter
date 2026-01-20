import Game from './Game.js';

import CanvasRenderer from './CanvasRenderer.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
import LightItem from './LightItem.js';
import Orb from './Orb.js'; // this should be correct despite the error
import Monster from './Monster.js';

export default class TheFalling extends Game {
  private canvas: HTMLCanvasElement;

  private keyListener: KeyListener;

  private player: Player;

  private lightforce: number;

  private timeToNextLightforceDrop: number;

  private monstersCaught: number;

  private lightItems: LightItem[] = [];

  private timeToNextItem: number;

  private cloakActive: number;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();

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
    if (this.keyListener.isKeyDown('ArrowLeft')) {
      this.player.moveLeft();
    }

    if (this.keyListener.isKeyDown('ArrowRight')) {
      this.player.moveRight();
    }
  }

  private spawnNewItem(elapsed: number): void {
    this.timeToNextItem -= elapsed;
    if (this.timeToNextItem < 0) {
      const random: number = Math.random();
      if (random > 0.3) {
        this.lightItems.push(new Orb(this.canvas.width, this.canvas.height));
      } else {
        this.lightItems.push(new Monster(this.canvas.width, this.canvas.height));
      }
    }
  }


  /**
   * Update state of the game
   *
   * @param delta milliseconds since last update
   * @returns whether the game is still running
   */
  public update(delta: number): boolean {
    this.player.update(delta); // updates the player

    for (const item of this.lightItems) {
      item.update(delta);
    }

    this.timeToNextLightforceDrop -= delta;
    if (this.timeToNextLightforceDrop < 0) {
      this.lightforce -= 1;
      this.timeToNextLightforceDrop = 1000;
    }

    this.spawnNewItem(delta);

    for (let i: number = this.lightItems.length - 1; i >= 0; i -= 1) {
      const item: LightItem = this.lightItems[i];

      if (this.player.collidesWithItem(item)) {
        this.lightforce += item.getLightForce();
        this.lightItems.splice(i, 1);
      }

      if (item.getPosY() + item.getHeight() < 0) {
        this.lightItems.splice(i, 1);
      }
    }

    return !this.gameOver();
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
    this.lightItems.forEach((item: LightItem) => item.render(this.canvas));

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
