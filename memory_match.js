/**
 * Created by michpenn on 1/20/16.
 */
var theme;
var level;
//Step 1: setting the board's preferences
function BoardPreferences(theme, level) {
    var self = this;
    self.theme = theme;
    self.level = level;
}
//Click handler for setting preferences
function setPreferenceVariables() {

    $('.btn_preferences').on('click', function (e) {
        preference_clicked(e);
    });

}
//Checks which preference was clicked
function preference_clicked(e) {
    var clicked = ($(e.target)[0].id);
    if (clicked.substr(0, 6) == 'theme_') {
        theme = clicked.slice(6);
        console.log('theme: ' + theme);
        setPreferences();
    }
    else if (clicked.substr(0, 6) == 'level_') {
        level = clicked.slice(6);
        console.log('level: ' + level);
        setPreferences();
    }
    else {
        console.log('this does not work');
    }
}

//animation setting preferences
function setPreferences() {
    if (theme != undefined && level == undefined) {
        $('#container_theme').removeClass('enterPreferences').addClass('exitPreferences');
        setTimeout(function () {
            $('#container_theme').addClass('hide')
        }, 900);
        setTimeout(function () {
            $('#container_level').addClass('enterPreferences').removeClass('hide');
            $('#container_theme').remove();
        }, 1000);
    }
    else if (theme != undefined && level != undefined) {
        $('#container_level').removeClass('enterPreferences').addClass('exitPreferences');
        setTimeout(function () {
            $('#container_level').addClass('hide')
        }, 900);
        $('#confirm_theme').text('Theme: ' + theme);
        $('#confirm_level').text('Level: ' + level);
        setTimeout(function () {
            $('#container_confirm_preferences').addClass('enterPreferences').removeClass('hide');
        }, 1000);
        $('#btn_changePreferences').on('click', changePreferences);
        $('#btn_confirmPreferences').on('click', loadGame);
    }
}

//fills in the blanks on modal for changing preferences
function changePreferences() {
    $('#btn_confirmChanges').on('click', checkPreferences);
    console.log('user wants to change preferences');
    $('#span_theme').text(theme);
    $('#span_level').text(level);
}

//checks that radio buttons were selected when changing preferences
function checkPreferences(){
    console.log('check that radios are checked');
    var new_theme = $('input[name=inlineRadioOptions_theme]:checked').val();
    var new_level = $('input[name=inlineRadioOptions_level]:checked').val();
    if(new_theme == undefined || new_level == undefined) {
        alert('please make a selection');
    }
    else {
        theme = new_theme;
        level = new_level;
        loadGame();
    }

}
//loads the game
function loadGame() {
    $('#container_preferences').fadeOut('slow');
    detectMobile();
    var body = $('body');
    if(theme == '2016'){
        body.addClass('background_2016');
    }
    else if(theme == 'disney') {
        body.addClass('background_disney');
    }
    else if(theme == 'safari') {
        body.addClass('background_safari');
    }
    $('#container_preferences').remove();
}
//Warns user that the game is not designed for mobile
function detectMobile(){
    if ($(window).width() < 768){
        alert('For your viewing pleasure, we recommend switching to a device with a larger screen');
    }
}



$(document).ready(function () {
    setPreferenceVariables();

});
