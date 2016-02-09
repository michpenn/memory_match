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
        this.resetHandler();
    },
    calculateAccuracy: function () {
        var accuracy = this.stats.matches / this.stats.attempts;
        accuracy = accuracy.toFixed(2);
        accuracy = parseFloat(accuracy);
        this.stats.accuracy = Math.round(accuracy * 100) + '%';
    },
    displayCurrentStats: function () {
        this.calculateAccuracy();
        $('#span_games_played').text(this.stats.games_played);
        $('#span_attempts').text(this.stats.attempts);
        $('#span_accuracy').text(this.stats.accuracy);
        $('#span_matches').text(this.stats.matches);
        console.log(this.stats);
    },
    checkForWin: function () {
        if (this.stats.matches == this.stats.number_matches) {
            console.log('you win!');
        }
    },
    buildBackground: function () {
    },
    resetHandler: function () {
        $('.button_reset, #closeLink').on('click', this.display_reset);


    },
    reset_game: function(){
        console.log('make everything work in this function');
        this.calculate_overlay_size();
        
    },
    display_reset: function () {
        console.log('display the reset options here');
        var inner_height = window.innerHeight;
        var inner_width = window.innerWidth;

        this.calculate_overlay_size(inner_height, inner_width);

        /*
         * Give option to change theme and level
         * clear board
         * make new game
         * increase number of games played
         * */
    },
    calculate_overlay_size: function(height, width){
        console.log(height, width);
    },
    toggle_reset_display: function () {
        var reset_div = $('#popUpDiv');
        console.log($(reset_div).css('display'));
        if ($(reset_div).css('display') == 'none') {
            $(reset_div).css('display', 'block');
        }
        else if ($(reset_div).css('display') == 'block') {
            $(reset_div).css('display', 'none');
        }
    },
    toggle_overlay_display: function(){
        console.log('toggle the overlay here');
    },
    toggle: function (div_id) {
        var el = document.getElementById(div_id);
        if (el.style.display == 'none') {
            el.style.display = 'block';
        }
        else {
            el.style.display = 'none';
        }
    },
    blanket_size: function (popUpDivVar) {
        var viewport_height;
        var blanket_height;
        var popUpDiv_height;
        if (typeof window.innerWidth != 'undefined') {
            viewport_height = window.innerHeight;
        } else {
            viewport_height = document.documentElement.clientHeight;
        }
        if ((viewport_height > document.body.parentNode.scrollHeight) && (viewport_height > document.body.parentNode.clientHeight)) {
            blanket_height = viewport_height;
        } else {
            if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
                blanket_height = document.body.parentNode.clientHeight;
            } else {
                blanket_height = document.body.parentNode.scrollHeight;
            }
        }
        var blanket = document.getElementById('blanket');
        blanket.style.height = blanket_height + 'px';
        var popUpDiv = document.getElementById(popUpDivVar);
        popUpDiv_height = blanket_height / 2 - 200;//200 is half popup's height
        popUpDiv.style.top = popUpDiv_height + 'px';
    },
    window_pos: function (popUpDivVar) {
        var viewport_width;
        var window_width;
        if (typeof window.innerWidth != 'undefined') {
            viewport_width = window.innerHeight;
        } else {
            viewport_width = document.documentElement.clientHeight;
        }
        if ((viewport_width > document.body.parentNode.scrollWidth) && (viewport_width > document.body.parentNode.clientWidth)) {
            window_width = viewport_width;
        } else {
            if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
                window_width = document.body.parentNode.clientWidth;
            } else {
                window_width = document.body.parentNode.scrollWidth;
            }
        }
        var popUpDiv = document.getElementById(popUpDivVar);
        window_width=window_width/2-200;//200 is half popup's width
        popUpDiv.style.left = window_width + 'px';/**/
    },
    popup: function (windowname) {
        this.blanket_size(windowname);
        this.window_pos(windowname);
        this.toggle('blanket');
        this.toggle(windowname);
    },

    close_reset: function () {
    }
};


var board = new Board();

$(document).ready(function () {
    $('#container_stats').hide();
    board.optionPicker.getOptions();
});