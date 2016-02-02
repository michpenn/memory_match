/**
 * Created by michpenn on 1/28/16.
 */
function Board(){
    this.optionPicker = options;
    this.game;
    this.stats = {
        accuracy: 0,
        games_played: 0,
        attempts: 0,
        matches: 0,
        number_matches: 9
    };
}

Board.prototype = {
    constructor: Board,
    getOptions: function(){
        this.optionPicker.getOptions(this.buildGame);
    },
    buildGame: function(){
        var theme = this.optionPicker.winningOptions.theme;
        var level = this.optionPicker.winningOptions.level;
        this.game = new Game(theme, level);
    },
    cardClicked: function(){
        console.log('card clicked');
        //console.log($(e.target).parent());
        console.log($(this));
    },
    checkMatch: function(){},
    matchFound: function(){},
    matchNotFound: function(){},
    displayCurrentStats: function(){

    },
    buildBackground: function(){},
};

var board = new Board();

$(document).ready(function(){
    board.optionPicker.getOptions();
});