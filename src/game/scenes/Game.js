import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  init() {
    console.log("iniciando");
  }

  create() {
    // Fondo
    const center = this.game.globals.center;
    this.add
      .image(center.x, center.y, "background")
      .setAlpha(0.5)
      .setScale(1.5);

    // Árbol decorativo
    this.add.image(center.x, center.y, "forest").setOrigin(0.5);

    // Plataforma (estática)
    const platform = this.physics.add.staticImage(
      center.x,
      center.y + 310,
      "platform"
    );
    platform.setScale(1.5).refreshBody();

    // Jugador
    this.player = this.physics.add.sprite(20, center.y - 500, "idle1");
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2);

    // Colisiones
    this.physics.add.collider(this.player, platform);

    // Animaciones
    this.anims.create({
      key: "idle",
      frames: Array.from({ length: 10 }, (_, i) => ({ key: `idle${i + 1}` })),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: Array.from({ length: 8 }, (_, i) => ({ key: `run${i + 1}` })),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: Array.from({ length: 10 }, (_, i) => ({ key: `jump${i + 1}` })),
      frameRate: 15,
      repeat: 0, // se ejecuta una sola vez
    });

    this.player.play("idle");

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 160;
    const player = this.player;
    const isOnGround = player.body.touching.down;

    if (this.cursors.left.isDown) {
      player.setVelocityX(-speed);
      player.setFlipX(true);
      if (isOnGround && player.anims.currentAnim?.key !== "run") {
        player.play("run");
      }
    } else if (this.cursors.right.isDown) {
      player.setVelocityX(speed);
      player.setFlipX(false);
      if (isOnGround && player.anims.currentAnim?.key !== "run") {
        player.play("run");
      }
    } else {
      player.setVelocityX(0);
      if (isOnGround && player.anims.currentAnim?.key !== "idle") {
        player.play("idle");
      }
    }

    // Salto
    if (this.cursors.up.isDown && isOnGround) {
      player.setVelocityY(-300);
      player.play("jump", true);
    }

    // En el aire → mantener último frame de jump
    if (!isOnGround && player.anims.currentAnim?.key !== "jump") {
      player.anims.stop();
    }
  }
}
