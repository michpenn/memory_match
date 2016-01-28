/**
 * Created by michpenn on 1/27/16.
 */
function OptionPicker(){
    this.optionSets = [];
    this.winningOptions =[];
}

OptionPicker.prototype = {
  constructor: OptionPicker,
    loadNewOptionSet: function(optionSet){
        this.optionSets.push(optionSet);
    },
    displayOptionSet: function(){},
    pickWinningOption: function(){},
    saveWinningOption: function(){},
    confirmOptions: function(){},
    changeOptions: function(){},

};

var options = new OptionPicker();
options.loadNewOptionSet({
    name: 'themes',
    options: [disneyPrincesses, safari, candidates2016]
});
options.loadNewOptionSet({
    name: 'levels',
    options: [easyLevel, mediumLevel, hardLevel]
});
