var game;

game = new Phaser.Game(400,600,Phaser.Auto,'');

game.state.add('Preloader',Preloader);
game.state.add('Game',Game);
game.state.start("Preloader");