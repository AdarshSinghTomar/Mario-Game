let config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
  },
  backgroundColor: "#049cd8",
  physics: {
    default: 'arcade',
    arcade: {
      // add debugger when you think animation is doing something crazy
      // debug: true,
      gravity: {
        y: 1000,
      }
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};
let game = new Phaser.Game(config);

let game_config = {
  player_speed: 150,
  player_jumpspeed: -700,
}
// now we will create functions
// preload is used for image and animation loading
function preload() {
  this.load.image("ground", "Assets/topground.png");
  this.load.image("sky", "Assets/background.png");
  this.load.image("apple", "Assets/apple.png");
  this.load.spritesheet("hero", "Assets/hero.png", { frameWidth: 57, frameHeight: 56 });
}
// create is called once preload has completed, this includes the loading of any assets from the Loader.
//If you don't have a preload method then create is the first method called in your State.
function create() {
  W = game.config.width;
  H = game.config.height;
  // A Sprite Game Object is used for the display of both static and animated images in your game. Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled and animated.
  //  The main difference between a Sprite and an Image Game Object is that you cannot animate Images.
  // adding tilesSprites
  let ground = this.add.tileSprite(0, H - 82, W, 82, "ground");
  ground.setOrigin(0, 0);

  // adding background
  let background = this.add.sprite(0, 0, 'sky');
  background.setOrigin(0, 0);
  background.displayWidth = W;
  background.displayHeight = H;
  background.depth = -1;

  // loading player and it will also falling
  this.player = this.physics.add.sprite(100, 100, "hero", 8);
  // setting the bounce to the player
  // here .3 means there will be a loss of energy if i put it 1 it will remain bounce till iternity
  this.player.setBounce(0.3);
  // now setting the boundary so player do not go out of screen
  this.player.setCollideWorldBounds(true);
  // player animation
  this.player.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 6 }),
    frameRate: 10,
    repeat: -1
  })
  this.player.anims.create({
    key: 'center',
    frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 8 }),
    frameRate: [{ key: 'dude', frame: 5 }],
    repeat: -1
  })
  this.player.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 12 }),
    frameRate: 10,
    repeat: -1
  })
  // keyboard
  // this is standard function for creating event listener for keyboard
  this.cursors = this.input.keyboard.createCursorKeys();

  // now making player to collide in ground
  // first making ground to allow under physics
  // adding physics to the ground also making ground static
  this.physics.add.existing(ground, true);
  ground.body.allowGravity = false;
  // // making ground static
  // ground.body.immovable=true;

  // now adding group of apples which will fall to the ground
  // now we need group of fruites to fall from the sky so we can add group
  let fruits = this.physics.add.group({
    // add image id
    key: "apple",
    // how many repetitions i want
    repeat: 8,
    // reduce the size of image i have reduced it to 0.05 percent
    setScale: { x: 0.05, y: 0.05 },
    // setting the intial position of first apple and distance between apples
    setXY: { x: 10, y: 0, stepX: 100 },
  })


  // setting bouncing effect to the apples
  // we will have different bounce for every apples
  // so we have to iterate over the apples
  fruits.children.iterate((f) => {
    // here we have used phaser inbuilt method to set randome value under a range
    f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7));
  })


  // now creating more platform objects
  // this will create static group
  platforms = this.physics.add.staticGroup();
  // this will create a static platform with  factor by which
  // u wnat to change the width and height
  // but it will only scale the image not change the
  // physical object means if apple will drop it will drop only on original
  // body so we have to use another function name refreshBody it will change the
  // physical body




  platforms.create(500, 350, 'ground').setScale(1, 0.5).refreshBody();
  platforms.create(700, 200, 'ground').setScale(1, 0.5).refreshBody();
  platforms.create(100, 200, 'ground').setScale(1, 0.5).refreshBody();

  // now we don't need ground to be different entity we can add ground
  // to the platforms
  platforms.add(ground);



  // now adding collision detection which is inbuilt in this framework
  this.physics.add.collider(platforms, this.player);
  //  this.physics.add.collider(ground,fruits);
  this.physics.add.collider(platforms, fruits);


  // now using overlap function to simulate like
  // player is eating apples
  // this function take two coliding objects and a callback funciton and this as context
  this.physics.add.overlap(this.player,fruits,eatFruit,null,this)

  // create cameras
  this.cameras.main.setBounds(0,0,W,H);
  this.physics.world.setBounds(0,0,W,H);

  this.cameras.main.startFollow(this.player,true,true);
  this.cameras.main.setZoom(1.5);


}

// The update method is left empty for your own use. It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
//If is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
// This will also tell about event listeners
function update() {     // when some one has preseed the left button
  if (this.cursors.left.isDown) { // this.setVelocity will have velocity in both axis
    // but we want only x axis so
    this.player.setVelocityX(-game_config.player_speed);
    this.player.anims.play('left', true);
  }
  else if (this.cursors.right.isDown) {
    this.player.setVelocityX(game_config.player_speed);
    this.player.anims.play('right', true);
  }
  // now making jumping when up key is pressed and player is touching the ground
  else if (this.cursors.up.isDown && this.player.body.touching.down) {
    this.player.body.velocity.y = game_config.player_jumpspeed;

  }
  else {
    // this will make sure when user stop pressing key then player
    // should stop
    this.player.setVelocityX(0);
    this.player.anims.play('center', true);
  }
}
function eatFruit(player,fruit)
{  // we have to remember that disable function always works in dynamic objects

   fruit.disableBody(true,true);
}