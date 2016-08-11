var Preloader = {

	preload:function () {

		game.load.image("background","assets/images/background.png");
		game.load.image("ground","assets/images/ground.png");
		game.load.image("platform","assets/images/platform.png");
		game.load.image("player","assets/images/player.png");
		game.load.image("star","assets/images/star.png");

	},

	create:function () {



	},


	update:function () {

		game.state.start("Game");

	}

}