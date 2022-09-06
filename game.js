let config={
    type: Phaser.AUTO,
    scale : {
        mode: Phaser.Scale.FIT,
        width : 1370,
        height : innerHeight    ,
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

}
// create is called once preload has completed, this includes the loading of any assets from the Loader.
//If you don't have a preload method then create is the first method called in your State.
function create() {

}
// The update method is left empty for your own use. It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
//If is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
function update()
{

}