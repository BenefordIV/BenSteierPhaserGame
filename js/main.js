var game = new Phaser.Game(1334, 750, Phaser.AUTO);


var GameState = {
    //load before game
    preload: function() {

    },

    //create game
    create: function() {

    },

    //update game constantly with the website
    update: function() {

    }
};

game.state.add('GameState', GameState);

game.state.start('GameState');
