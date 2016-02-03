/**
 * Created by michpenn on 1/28/16.
 */
function Board() {
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
    getOptions: function () {
        this.optionPicker.getOptions(this.buildGame);
    },
    buildGame: function () {
        var theme = this.optionPicker.winningOptions.theme;
        var level = this.optionPicker.winningOptions.level;
        theme.onGameStart();
        this.game = new Game(theme, level);
    },
    calculateAccuracy: function(){
      var accuracy = this.stats.matches/this.stats.attempts;
        accuracy = accuracy.toFixed(2);
        accuracy = parseFloat(accuracy);
        this.stats.accuracy = Math.round(accuracy*100)+'%';
    },
    displayCurrentStats: function () {
        this.calculateAccuracy();
        $('#span_games_played').text(this.stats.games_played);
        $('#span_attempts').text(this.stats.attempts);
        $('#span_accuracy').text(this.stats.accuracy);
        $('#span_matches').text(this.stats.matches);
        console.log(this.stats);
    },
    checkForWin: function(){
        if(this.stats.matches == this.stats.number_matches){
            console.log('you win!');
        }
    },
    buildBackground: function () {
    },
};

var board = new Board();

$(document).ready(function () {
    $('#container_stats').hide();
    board.optionPicker.getOptions();
});