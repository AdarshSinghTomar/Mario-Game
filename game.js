let config={
    type: Phaser.AUTO,
    scale : {
        mode: Phaser.Scale.FIT,
        width : 800,
        height : 600    ,
    },
    backgroundColor :"#049cd8",
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
}
// create is called once preload has completed, this includes the loading of any assets from the Loader.
//If you don't have a preload method then create is the first method called in your State.
function create() {
    W=game.config.width;
    H=game.config.height;
    // A Sprite Game Object is used for the display of both static and animated images in your game. Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled and animated.
    //  The main difference between a Sprite and an Image Game Object is that you cannot animate Images.
    // adding tilesSprites
    let ground=this.add.tileSprite(0,H-280,W,280,"ground");
    ground.setOrigin(0,0);

}
// The update method is left empty for your own use. It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
//If is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
function update()
{

}