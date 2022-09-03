let config={
    type: Phaser.AUTO,
    scale : {
        mode: Phaser.Scale.FIT,
        width : 800,
        height : 600,
    },
    backgroundColor :"#049cd8",
    scene: {
        preload : preload,
        create : create,
        update : update,
    }
};
let game= new Phaser.Game(config);
function preload() {

}
function create() {

}
function update()
{

}