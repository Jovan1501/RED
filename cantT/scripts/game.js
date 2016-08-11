var background;
var ground;
var player;
var pressCounter = 0;
var timer;
var total = 0;
var secTxT;
var restart;
var star;

var starVal = 0;
var starTxt;
var starTxtVal = 0;


var speed = 800;

var Game = {

	preload:function () {



	},

	create:function () {


		game.physics.startSystem(Phaser.Physics.ARCADE);

		background = game.add.sprite(0,0,'background');


		ground = game.add.sprite(0,599,'ground');
		game.physics.arcade.enable(ground);
		ground.body.immovable = true;


		player = game.add.sprite(game.world.centerX,game.world.centerY+200,'player');
		player.anchor.setTo(0.5,0.5);
		game.physics.arcade.enable(player);
		player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;


		background.inputEnabled = true;
		background.events.onInputDown.add(function () {
			
			player.body.velocity.x = -200;
			pressCounter += 1;

			if (pressCounter == 2) {

				player.body.velocity.x = 200;
				pressCounter = 0;

			}

		});


		platforms = game.add.group();
		platforms.enableBody = true;

		block_left = platforms.create(game.world.centerX-130,150,'platform');
		block_left.anchor.setTo(0.5,0.5);
		block_left.body.immovable = true;
		game.add.tween(block_left).to({y:450},800,Phaser.Easing.Linear.None, true, 0, 1000, true);


		block_right = platforms.create(game.world.centerX+130,150,'platform');
		block_right.body.immovable = true;
		block_right.anchor.setTo(0.5,0.5);
		game.add.tween(block_right).to({y:450},speed,Phaser.Easing.Linear.None, true, 0, 1000, true);

		block_center = platforms.create(game.world.centerX,150,'platform');
		block_center.body.immovable = true;
		block_center.anchor.setTo(0.5,0.5);
		game.add.tween(block_center).to({y:450},600,Phaser.Easing.Linear.None, true, 0, 1000, true);

        secTxT = game.add.text(360,30,total,{fontSize:'25px', fill: '#fff'});
        game.physics.arcade.enable(secTxT);

		timer = game.time.create(false);
		timer.loop(1000,updateCounter,this);

		timer.start();

		function updateCounter () {

			total++;
			secTxT.text = total;


		}

	},

	update:function () {

		game.physics.arcade.collide(player,ground);
		game.physics.arcade.overlap(player,platforms,collideEnd);


		function collideEnd () {

			block_center.kill();
			block_right.kill();
			block_left.kill();
			timer.stop();
			secTxT.kill();

			player.body.gravity.y = -200;
			player.body.bounce.y = 1;
			player.body.velocity.x = 100;
			player.body.bounce.x = 1;

			background.inputEnabled = false;

			var decor = game.add.text(game.world.centerX,game.world.centerY-50,'your score is',{fontSize:'20',fill: '#fff'});
			decor.anchor.setTo(.5,.5);
			var endTxT = game.add.text(game.world.centerX,game.world.centerY,total,{fontSize:'80px', fill: '#fff'});
			endTxT.anchor.setTo(.5,.5);


			var rs = game.add.text(game.world.centerX,game.world.centerY+50,'click here to restart',{fontSize:'20px', fill: '#fff'});
			rs.anchor.setTo(.5,.5);
			rs.inputEnabled = true;
			rs.events.onInputDown.add(function () {


				starTxtVal = 0;
				speed = 800;

				game.state.start("Game");
				total = 0;



			})

		}

	}

}