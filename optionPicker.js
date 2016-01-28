/**
 * Created by michpenn on 1/27/16.
 */
function OptionPicker(){
    this.themes =['disney_princesses', 'safari', 'candidates2016'];
    this.themeChoice = theme;
    this.levels = ['easy', 'medium', 'hard'];
    this.levelChoice = level;
}

OptionPicker.prototype = {
  constructor: OptionPicker,
    displayTheme: function(){},
    handleThemeChoice: function(){}
};