/**
 * Created by michpenn on 1/27/16.
 */
function OptionPicker() {
    this.optionSets = [];
    this.winningOptions = {};
    this.callback;
}

OptionPicker.prototype = {
    constructor: OptionPicker,
    loadNewOptionSet: function (optionSet) {
        this.optionSets.push(optionSet);
    },
    getOptions: function (callback) {
        this.callback = callback;
        this.counterChoicesDisplayed = 0;
        this.counterChoicesMade = 0;
        this.counterMax = this.optionSets.length;
        var self = this;
        this.optionSets.forEach(function (set) {
            self.displayOptionSet(set);

        });
        $('.button_select_theme').click(this.pickWinningTheme);
        $('.button_select_level').click(this.pickWinningLevel);
        //if (this.counterChoicesMade == this.counterMax) {
        //    this.callback();
        //}
        /*
         if(all options picked){
         this.callback();
         }
         */
    },
    displayNextSet: function () {
        /*
         if a selection has been made, it calls the next set
         if all options have been selected, it calls the init game?
         */
        for (var i = 0; i < this.optionSets.length; i++) {
            if (!this.winningOptions[this.optionSets[i].name]) {
                console.log('this needs to be loaded: ' + this.optionSets[i].name);
                $('.container_option_' + this.optionSets[i].name).css('display', 'initial');
            }
            console.log(this.counterChoicesMade, this.counterMax);
        }
        if (this.counterChoicesMade == this.counterMax) {
            console.log('let the game begin');
            board.buildGame();
        }
        else {
            console.log('display next set');
        }
    },
    displayOptionSet: function (set) {
        var optionContainer = $('<div>', {
            class: 'container_options container_option_' + set.name
        });
        var optionTitle = $('<h1>', {
            text: 'Please Chose Your ' + set.name,
            class: 'heading_options col-xs-12 text-center'
        });
        var choicesContainer = $('<div>', {
            class: 'container_choices'
        });
        for (var i = 0; i < set.options.length; i++) {
            var choice = $('<button>', {
                text: set.options[i].name,
                class: 'col-xs-offset-2 col-xs-8 col-md-offset-0 col-md-3 button_choice_selection button_select_' + set.name,
                id: 'button_select_' + set.options[i].name
            });
            $(choicesContainer).append(choice);
        }
        $(optionContainer).append(optionTitle, choicesContainer);
        $('.options').append(optionContainer);
        this.counterChoicesDisplayed++;
    },
    //pickWinningOption: function (e) {
    //    var selection = $(e.target).text();
    //    console.log('this works: ' + selection);
    //    options.saveWinningOption(selection);
    //    $(e.target).parent().parent().hide();
    //},
    pickWinningTheme: function (e) {
        var selectedTheme = $(e.target).text();
        options.saveWinningOption(selectedTheme, 0);
        options.counterChoicesMade++;
        $(e.target).parent().parent().hide();
        options.displayNextSet();
    },
    pickWinningLevel: function (e) {
        var selectedLevel = $(e.target).text();
        options.counterChoicesMade++;
        options.saveWinningOption(selectedLevel, 1);
        $(e.target).parent().parent().hide();
        options.displayNextSet();
        //increment options counter and call next option function
    },
    saveWinningOption: function (option, index) {
        var optionArray = this.optionSets[index].options;
        for (var i = 0; i < optionArray.length; i++) {
            if (optionArray[i].name == option) {
                this.winningOptions[this.optionSets[index].name] = optionArray[i];
                break;
            }
        }
        //console.log(this.winningOptions);
    },
    confirmOptions: function () {
    },
    changeOptions: function () {
    }

};

var options = new OptionPicker();
options.loadNewOptionSet({
    name: 'theme',
    options: [disneyPrincesses, safari, candidates2016]
});
options.loadNewOptionSet({
    name: 'level',
    options: [easyLevel, mediumLevel, hardLevel]
});
