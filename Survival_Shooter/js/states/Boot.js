class Boot extends Phaser.Scene {
  constructor() {super("bootGame");}

  preload()
  {
    // console.log("Boot State Started");
    var dir = "assets/sprites/";

    this.load.image('menuImage', dir + 'menu.png');
    this.load.image('creditsImage', dir + 'spr_credits.png');
    this.load.image("background",  dir + 'backgrounds/bg_level_1.png');
    this.load.image('crosshair',  dir + 'spr_crosshair.png');
    this.load.image('mask', dir + 'mask1.png');
    this.load.image('character_mask', dir + 'mask.png');
    this.load.image('shadow', dir + 'shadow.png');
    this.load.image('level1_atlas',dir + 'tilemaps/level1_atlas.png');
    this.load.image('level2_atlas',dir + 'tilemaps/level2_atlas.png');

    this.load.spritesheet('player', dir + 'zoey2.png',{frameWidth: 53, frameHeight: 53});
    this.load.spritesheet('player_tom', dir + 'spr_tom.png',{frameWidth: 53, frameHeight: 53});
    this.load.spritesheet('player_harry', dir + 'spr_player_harry.png',{frameWidth: 53, frameHeight: 53});
    this.load.spritesheet('buttons', dir + 'buttons.png',{frameWidth: 736, frameHeight: 276});
    this.load.spritesheet('backButtons', dir + 'back_button.png',{frameWidth: 55, frameHeight: 24});
    this.load.spritesheet('continueButton', dir + 'continue_button.png',{frameWidth: 195, frameHeight: 66});
    this.load.spritesheet('continueStoryButton', dir + 'continueStoryButton.png',{frameWidth: 84, frameHeight: 24});
    this.load.spritesheet('beam', dir + 'beam.png',{frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('health_pickUp', dir + 'spr_health_pickup.png',{frameWidth: 43, frameHeight: 67});

    this.load.audio('titleMusic', ['assets/sounds/music/mus_title.ogg']);
    this.load.audio('level1Music', ['assets/sounds/music/mus_level_1.ogg']);
    this.load.audio('confirmSound', ['assets/sounds/sound effects/snd_confirm.ogg']);

    this.load.tilemapTiledJSON('level1', 'assets/maps/level1.json');
    this.load.tilemapTiledJSON('level2', 'assets/maps/level2.json');

    

  }
  create() {
    this.add.text(20, 20, "The game is loading");
    music = this.sound.add('titleMusic');
    music.loop = true;
    music.play();
    
    this.anims.create({
      key: "tom_run_right",
      frames: this.anims.generateFrameNumbers("player_tom", {
        start: 23,
        end: 0
      }),
      frameRate: 30,
      repeat: 1
    });
    this.anims.create({
      key: "tom_run_down",
      frames: this.anims.generateFrameNumbers("player_tom", {
        start: 47,
        end: 24
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "tom_run_left",
      frames: this.anims.generateFrameNumbers("player_tom", {
        start: 71,
        end: 48
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "tom_run_up",
      frames: this.anims.generateFrameNumbers("player_tom", {
        start: 95,
        end: 72
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "tom_run_up_right",
      frames: this.anims.generateFrameNumbers("player_tom", {
        start:119,
        end: 96
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "tom_run_down_right",
      frames: this.anims.generateFrameNumbers("player_tom", {
        start:143,
        end: 120
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "tom_run_down_left",
      frames: this.anims.generateFrameNumbers("player_tom", {
        start:167,
        end: 144
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "tom_run_up_left",
      frames: this.anims.generateFrameNumbers("player_tom", {
        start:190,
        end: 168
      }),
      frameRate: 30,
      repeat: -1
    });

    this.anims.create({
      key: "zoey_run_right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 23
      }),
      frameRate: 30,
      repeat: 1
    });
    this.anims.create({
      key: "zoey_run_down",
      frames: this.anims.generateFrameNumbers("player", {
        start: 24,
        end: 47
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "zoey_run_left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 48,
        end: 71
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "zoey_run_up",
      frames: this.anims.generateFrameNumbers("player", {
        start: 72,
        end: 95
      }),
      frameRate: 30,
      repeat: -1
    });

    this.anims.create({
      key: "harry_run_right",
      frames: this.anims.generateFrameNumbers("player_harry", {
        start: 48,
        end: 63
      }),
      frameRate: 30,
      repeat: 1
    });
    this.anims.create({
      key: "harry_run_down",
      frames: this.anims.generateFrameNumbers("player_harry", {
        start: 80,
        end: 95
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "harry_run_left",
      frames: this.anims.generateFrameNumbers("player_harry", {
        start: 64,
        end: 79
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "harry_run_up",
      frames: this.anims.generateFrameNumbers("player_harry", {
        start: 32,
        end: 47
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "harry_run_up_right",
      frames: this.anims.generateFrameNumbers("player_harry", {
        start:16,
        end: 31
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "harry_run_down_right",
      frames: this.anims.generateFrameNumbers("player_harry", {
        start:112,
        end: 127
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "harry_run_down_left",
      frames: this.anims.generateFrameNumbers("player_harry", {
        start:96,
        end: 111
      }),
      frameRate: 30,
      repeat: -1
    });
    this.anims.create({
      key: "harry_run_up_left",
      frames: this.anims.generateFrameNumbers("player_harry", {
        start:0,
        end: 15
      }),
      frameRate: 30,
      repeat: -1
    });
    
    this.anims.create({
      key: "health_pu",
      frames: this.anims.generateFrameNumbers("health_pickUp", {
        start:0,
        end: 4
      }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });
    if (quickStart) this.scene.start("sp_house2");
    else this.scene.start("mainMenu");

  }
  update () {

  }
}
