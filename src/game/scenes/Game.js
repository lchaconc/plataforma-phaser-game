import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // Fondo
    this.load.image("background", "/assets/background.png");
    this.load.image("plataforma", "/assets/plataforma.png");

    // Cargar cada frame del idle
    for (let i = 1; i <= 10; i++) {
      this.load.image(`idle${i}`, `/assets/char/idle/Idle${i}.png`);
    }

    // Animación Run (8 frames)
    for (let i = 1; i <= 8; i++) {
      this.load.image(`run${i}`, `/assets/char/run/Run${i}.png`);
    }

    // Animación Jump (10 frames)
    for (let i = 1; i <= 10; i++) {
      this.load.image(`jump${i}`, `/assets/char/jump/Jump${i}.png`);
    }
  }

  create() {
    // Fondo
    this.add.image(512, 384, "background").setAlpha(0.5);

    // Plataforma estática con físicas
    const plataforma = this.physics.add.staticImage(512, 900, "plataforma");
    plataforma.setScale(2).refreshBody();

    // Crear el personaje (usamos frame inicial idle1)
    this.player = this.physics.add.sprite(512, 100, "idle1");
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2,0.2);

    // Colisiones
    this.physics.add.collider(this.player, plataforma);

    // Crear animación idle
    this.anims.create({
      key: "idle",
      frames: Array.from({ length: 10 }, (_, i) => ({
        key: `idle${i + 1}`,
      })),
      frameRate: 10,
      repeat: -1,
    });

    // Animación Run
    this.anims.create({
      key: "run",
      frames: Array.from({ length: 8 }, (_, i) => ({
        key: `run${i + 1}`,
      })),
      frameRate: 12, // más rápido que idle
      repeat: -1,
    });

    // Animación Run
    this.anims.create({
      key: "jump",
      frames: Array.from({ length: 10 }, (_, i) => ({
        key: `jump${i + 1}`,
      })),
      frameRate: 12, // más rápido que idle
      repeat: -1,
    });

    this.player.play("idle");

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  

  update() {
  const speed = 160;
  const player = this.player;

  // Estado: ¿está en el aire?
  const isOnGround = player.body.touching.down;

  if (this.cursors.left.isDown) {
    player.setVelocityX(-speed);
    player.setFlipX(true);

    if (isOnGround) {
      if (player.anims.currentAnim?.key !== "run") {
        player.play("run");
      }
    }

  } else if (this.cursors.right.isDown) {
    player.setVelocityX(speed);
    player.setFlipX(false);

    if (isOnGround) {
      if (player.anims.currentAnim?.key !== "run") {
        player.play("run");
      }
    }

  } else {
    player.setVelocityX(0);

    if (isOnGround) {
      if (player.anims.currentAnim?.key !== "idle") {
        player.play("idle");
      }
    }
  }

  // Salto (solo inicia si está en el suelo)
  if (this.cursors.up.isDown && isOnGround) {
    player.setVelocityY(-300);
  }

  // Si no está en el suelo → reproducir jump
  if (!isOnGround) {
    if (player.anims.currentAnim?.key !== "jump") {
      player.play("jump");
    }
  }
}













}
