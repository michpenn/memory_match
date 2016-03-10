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
        var accuracy;
        if (this.stats.attempts === 0) {
            accuracy = 0;
        }
        else {
            accuracy = this.stats.matches / this.stats.attempts;
            accuracy = accuracy.toFixed(2);
            accuracy = parseFloat(accuracy);

        }
        this.stats.accuracy = Math.round(accuracy * 100) + '%';

    },
    displayCurrentStats: function () {
        this.calculateAccuracy();
        $('#span_games_played').text(this.stats.games_played);
        $('#span_attempts').text(this.stats.attempts);
        $('#span_accuracy').text(this.stats.accuracy);
        $('#span_matches').text(this.stats.matches);
    },
    checkForWin: function () {
        if (this.stats.matches == this.stats.number_matches) {
            this.game.updateStats_gamesPlayed();
            this.displayCurrentStats();
            this.game.theme.onGameEnd();
            $('.button_newGame').on('click', function(){
                console.log('make a new game');
            }.bind(this));
        }
    },
    resetHandler: function () {
        $('.button_reset, #closeLink').on('click', this.display_reset);


    },
    display_reset: function () {
        var overlay = $('#blanket');
        var options_div = $('#popUpDiv');

        if ($(overlay).css('display') == 'none' && $(options_div).css('display') == 'none') {
            $(overlay).show();
            $(options_div).show();
            board.display_reset_options();
        }
        else {
            $(overlay).hide();
            $(options_div).hide();
        }
    },
    display_reset_options: function () {
        for (var i = 0; i < this.optionPicker.optionSets.length; i++) {
            var this_option = this.optionPicker.optionSets[i];
            var fieldset = $('<fieldset>');
            var legend = $('<legend>', {
                text: 'your ' + this_option.name + ' options are:'
            });
            $(fieldset).append(legend);
            for (var j = 0; j < this_option.options.length; j++) {
                var option = $('<input>', {
                    type: 'radio',
                    name: this_option.name,
                    value: this_option.options[j].name,
                    required: 'required'
                });
                var label = $('<label>', {
                    for: this_option.options[j].name,
                    text: this_option.options[j].name
                });
                var linebreak = $('<br>');
                $(fieldset).append(option, label, linebreak);
            }

            $('#reset_form').append(fieldset);
        }
        var reset_choices_button = $('<button>', {
            text: 'Create new game',
            type: 'button'
        });
        $('#reset_form').append(reset_choices_button);
        $(reset_choices_button).on('click', this.make_new_game.bind(this));
        console.log(this);
    },
    make_new_game: function () {
        var new_game_selections = [];
        var form = $('#reset_form')[0];
        for (var i = 0; i < ($(form)).children().length; i++) {
            var children_elements = $(form).children()[i];
            for (var j = 0; j < ($(children_elements)).children().length; j++) {
                if (($(children_elements)).children()[j].nodeName == 'INPUT') {
                    var input_variable = ($(children_elements)).children()[j];
                    if ($(input_variable).is(':checked')) {
                        new_game_selections.push($(input_variable)[0].value);
                    }
                }
            }
        }
        this.remove_old_game();
        this.optionPicker.changeOptions(new_game_selections[0], new_game_selections[1]);
        setTimeout(function () {
            this.buildGame();
            this.game.updateStats_gamesPlayed();
            this.displayCurrentStats();
            $('#blanket').hide();
        }.bind(this), 1200);


    },
    remove_old_game: function () {
        $('#popUpDiv').fadeOut('slow');
        $('.card').fadeOut(1000, 'swing', function () {
            $(this).remove();
        });
        $('body').removeClass();
    },
    animations: function(){
        if(this.stats.matches === 2){
                this.game.theme.animation1();
        }
    },
};


var board = new Board();

$(document).ready(function () {
    $('#container_stats').hide();
    board.optionPicker.getOptions();
});