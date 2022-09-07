let config={
    type: Phaser.AUTO,
    scale : {
        mode: Phaser.Scale.FIT,
        width : 800,
        height : 600    ,
    },
    backgroundColor :"#049cd8",
    physics:{
      default:'arcade',
      arcade :{
        // add debugger when you think animation is doing something crazy
         // debug: true,
        gravity :{
            y:1000,
        }
      },
    },
    scene: {
        preload : preload,
        create : create,
        update : update,
    }
};
let game= new Phaser.Game(config);

// now we will create functions
// preload is used for image and animation loading
function preload() {
    this.load.image("ground","Assets/topground.png");
    this.load.image("sky","Assets/background.png");
    this.load.image("apple","Assets/apple.png");
    this.load.spritesheet("hero","Assets/hero.png",{frameWidth:58,frameHeight:56});
}
// create is called once preload has completed, this includes the loading of any assets from the Loader.
//If you don't have a preload method then create is the first method called in your State.
function create() {
    W=game.config.width;
    H=game.config.height;
    // A Sprite Game Object is used for the display of both static and animated images in your game. Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled and animated.
    //  The main difference between a Sprite and an Image Game Object is that you cannot animate Images.
    // adding tilesSprites
    let ground=this.add.tileSprite(0,H-82,W,82,"ground");
    ground.setOrigin(0,0);

    // adding background
      let background=this.add.sprite(0,0,'sky');
      background.setOrigin(0,0);
      background.displayWidth =W;
      background.displayHeight=H;
      background.depth =-1;

    // loading player and it will also falling
    let player= this.physics.add.sprite(100,100,"hero",8);

    // now making player to collide in ground
    // first making ground to allow under physics
     // adding physics to the ground also making ground static
    this.physics.add.existing(ground,true);
    ground.body.allowGravity=false;
    // // making ground static
    // ground.body.immovable=true;

    // now adding collision detection which is inbuilt in this framework
    this.physics.add.collider(ground,player);

    // now adding group of apples which will fall to the ground
      let fruits = this.physics.add.group({
        key : "apple",
        repeat : 8,
        setScale : {x:0.05,y:0.05},
        setXY : {x :10 , y:0, stepX: 100},
      })

}
// The update method is left empty for your own use. It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
//If is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
function update()
{

}