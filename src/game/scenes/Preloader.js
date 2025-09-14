import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.game.globals = this.game.globals || {};
    this.game.globals.center = {
      x: this.game.config.width / 2,
      y: this.game.config.height / 2,
    };

    const center = this.game.globals;

    // Marco de la barra
    this.add
      .rectangle(center.x, center.y, 468, 32)
      .setStrokeStyle(1, 0x701705);

    // Barra de progreso
    const bar = this.add.rectangle(
      center.x - 230,
      center.y,
      4,
      28,
      0x701705
    );

    this.load.on("progress", (progress) => {
      // 464 px de ancho máximo → escala según el % de progreso
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    // Carpeta base
    this.load.setPath("assets");

    // Fondo y escenario
    this.load.image("background", "background.png");
    this.load.image("platform", "enviroment/platform.png");
    this.load.image("forest", "enviroment/forest.png");

    // Idle (10 frames)
    for (let i = 1; i <= 10; i++) {
      this.load.image(`idle${i}`, `char/idle/Idle${i}.png`);
    }

    // Run (8 frames)
    for (let i = 1; i <= 8; i++) {
      this.load.image(`run${i}`, `char/run/Run${i}.png`);
    }

    // Jump (10 frames)
    for (let i = 1; i <= 10; i++) {
      this.load.image(`jump${i}`, `char/jump/Jump${i}.png`);
    }
  }

  create() {
    // Pasamos a la escena principal
    this.scene.start("Game");
  }
}
