class Level_2 extends Phaser.Scene {
  spotlight;
  charLight;
  constructor() {
    super("sp_house2");
  }

  create() {
    // Create world bounds
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
      this.physics.world.setBounds(0, 0, 3200, 3200); // The world bounds
      this.background = this.add.tileSprite(0, 0, 3200, 3200, "background");
    this.background.setOrigin(0, 0);
    const map = this.make.tilemap({ key: 'level2' });
    const tileset = map.addTilesetImage('level 1 tilemap', 'level2_atlas');
    const floors = map.createStaticLayer('Floors', tileset, 0, 0);
    const walls = map.createStaticLayer('Walls', tileset, 0, 0);
    const objects = map.createStaticLayer('Objects', tileset, 0, 0);
    this.players = this.add.group();
    this.projectiles = this.add.group();
    this.pickUps = this.add.group();
    this.playerInput = [];
    this.playerInput [0] = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D,
      'attack': Phaser.Input.Keyboard.KeyCodes.SPACE,
      'special': Phaser.Input.Keyboard.KeyCodes.X
    });
    this.playerInput [1] = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
      'attack': Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO,
      'special': Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE
    });
    this.player = new Player(this,256,736,"Harry",0);
    this.player2 = new Player(this,288,736,"Tom",1);
    const platforms = map.createStaticLayer('Collisions', tileset, 0, 0);
    platforms.setCollisionByExclusion(-1, true);
    reticle = this.physics.add.sprite(this.player.x,this.player.y, 'target');
    this.cameras.main.zoom =2;
    this.cameras.main.roundPixels = true;
    reticle.visible = false;
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player2, platforms);
    this.spotlight = this.make.sprite({
      x: this.player.x,
      y: this.player.y,
      key: 'mask',
      add: false
    });
    this.charLight = this.make.sprite({
      x: this.player.x,
      y: this.player.y,
      key: 'character_mask',
      add: false
    });
    var healthPickup = new health_pickUp(this,276,584);
    floors.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);
    walls.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);
    objects.mask = new Phaser.Display.Masks.BitmapMask(this, this.spotlight);
    this.player.mask = new Phaser.Display.Masks.BitmapMask(this, this.charLight);
    this.player2.mask = new Phaser.Display.Masks.BitmapMask(this, this.charLight);
    this.player.shadow.mask = new Phaser.Display.Masks.BitmapMask(this, this.charLight);
    this.player2.shadow.mask = new Phaser.Display.Masks.BitmapMask(this, this.charLight);


// Locks pointer on mousedown
    game.canvas.addEventListener('mousedown', function () {
      game.input.mouse.requestPointerLock();
    });
    if (Phaser.Input.Keyboard.JustDown(this.pause))
    {
      this.scene.start("mainMenu");
    }

    if (music.key!== 'level1Music')
    {
      music.stop();
      music = this.sound.add('level1Music');
      music.loop = true;
      music.play();
    }
  }
  update()
  {
    this.charLight.x = this.spotlight.x;
    this.charLight.y = this.spotlight.y;
    this.cameras.main.startFollow(reticle);
    for(var i = 0; i < this.players.getChildren().length; i++)
    {
      var player = this.players.getChildren()[i];
      player.update();
    }
    for(var i = 0; i < this.projectiles.getChildren().length; i++)
    {
      var projectile= this.projectiles.getChildren()[i];
      projectile.update();
    }

    if (this.player.body.x > this.player2.body.x)
    {
      console.log(this.player.body.x + " is bigger than " + this.player2.body.x);
      var difference = (this.player.body.x + this.player2.body.x)/2;
      difference = Phaser.Math.RoundTo(difference,0);
      this.spotlight.x = difference;
      this.averagePlayerPosX = difference;
    }
    else if (this.player.body.x < this.player2.body.x)
    {
      console.log(this.player.body.x + " is smaller than " + this.player2.body.x);
      var difference = (this.player2.body.x + this.player.body.x)/2;
      difference = Phaser.Math.RoundTo(difference,0);
      this.spotlight.x = difference;
      this.averagePlayerPosX = difference;
    }
    else if (this.player.body.x === this.player2.body.x)
    {
      console.log(this.player.body.x + " is the same as " + this.player2.body.x);
      this.spotlight.x = this.player.body.x;
      this.averagePlayerPosX = this.player.body.x;
    }

    if (this.player.body.y > this.player2.body.y)
    {
      console.log(this.player.body.y + " is bigger than " + this.player2.body.y);
      var difference = (this.player.body.y + this.player2.body.y)/2;
      difference = Phaser.Math.RoundTo(difference,0);
      this.averagePlayerPosY = difference;
      this.spotlight.y = difference;
    }
    else if (this.player.body.y < this.player2.body.y)
    {
      console.log(this.player.body.y + " is smaller than " + this.player2.body.y);
      var difference = (this.player2.body.y + this.player.body.y)/2;
      difference = Phaser.Math.RoundTo(difference,0);
      this.averagePlayerPosY = difference;
      this.spotlight.y = difference;
    }
    else if (this.player.body.y === this.player2.body.y)
    {
      console.log(this.player.body.y + " is the same as " + this.player2.body.y);
      this.spotlight.y = this.player.y;
      this.averagePlayerPosY = this.player.body.y;
    }
    reticle.x = this.averagePlayerPosX;
    reticle.y = this.averagePlayerPosY;
  }
  shootBeam(x,y,direction) {
    var beam = new Beam(this,x,y,direction);
  }
}
