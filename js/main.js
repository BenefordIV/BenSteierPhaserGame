var game = new Phaser.Game(800, 600, Phaser.AUTO);
var platforms;
var player;
var cursors;
var stars;

var GameState = {
    //load before game
    preload: function() {
        //load the sprite before the page opens
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },


    //create game
    create: function() {
        //enable the physics with the arcade.physics library
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //add sprites for everything else with the game.add.sprite(locationX, locationY, anchorName);
        game.add.sprite(0,0,'sky');

        //add a platform group, this allows us to have a ground and platform to run and jump on.
        //creates a group of objects that we can manipulate (think of making an array of objects)
        platforms = game.add.group();
        //enable physics on the platforms
        platforms.enableBody = true;

        //create the ground object
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //scale to fit the width of the game
        ground.scale.setTo(2,2);
        //make ground immovable
        //If this was not set to true, when a unit collids with the object it will move accordingly
        ground.body.immovable = true;

        //create two ledges
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        //add a player sprite with code from online
        player = game.add.sprite(32, game.world.height - 150, 'dude');

        //enable physics on the player
        game.physics.arcade.enable(player);

        //give additional physics to the player
        player.body.bounce.y = .3;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //add the two animations
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        cursors = game.input.keyboard.createCursorKeys();

        //create a stars group
        stars = game.add.group();
        //enable physics
        stars.enableBody = true;

        for(var i = 0; i <= 12; i++){
            //create star objects that are at random spots on the x and y access
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 6;

            star.body.bounc.y = 0.7 * Math.random() * 0.2;
        }
    },

    //update game constantly with the website
    update: function() {
        //add collision functionallity for player and ground
        var hitPlatform = game.physics.arcade.collide(player, platforms);

        //reset player velocity
        player.body.velocity.x = 0;

        //simple if statement to move the player object.
        if(cursors.left.isDown){
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown){
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else{
            player.animations.stop();
            player.frame = 4;
        }

        if(cursors.up.isDown && player.body.touching.down && hitPlatform){
            player.body.velocity.y = -350;
        }
    }
};

game.state.add('GameState', GameState);

game.state.start('GameState');
