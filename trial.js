/**
 * Created by michpenn on 11/21/15.
 */
var gameTheme;
var gameLevel;
var iPhone;
var iPad;

//setting preferences before generating the game board
//STEP 2
function selectTheme() {
    var theme_container = $('<div>', {
        class: 'theme_container container'
    });
    var theme_heading = $('<h3>', {
        class: 'preference_heading text-center',
        text: 'Please select a theme'
    });

    var button_container = $('<div>', {
        class: 'row row_buttons_theme'
    });

    var disney = $('<button>', {
        class: 'col-xs-5 col-sm-offset-1 col-sm-4 btn btn-primary btn-lg theme_button disney_button',
        type: 'button',
        theme: 'disney',
        text: 'Disney Princesses'
    });


    var candidates = $('<button>', {
        class: 'col-xs-5 col-xs-offset-2 col-sm-4 col-sm-offset-2 btn btn-primary btn-lg theme_button candidates_button',
        type: 'button',
        theme: 'candidates',
        text: '2016'
    });


    $(button_container).append(disney, candidates);
    $(theme_container).append(theme_heading, button_container);
    $('#preferences_container').append(theme_container);
    $('.theme_button').click(function () {
        gameTheme = ($(this).attr('theme'));
        if(gameTheme == 'disney'){
            if(iPhone == true) {
                $('body').addClass('disney_phone_background');
            }
            else if (iPad == true) {
                $('body').addClass('disney_ipad_background');
            }

            else{
                $('body').addClass('disney_background');
            }
        }
        else if(gameTheme == 'candidates'){
            console.log('set candidate background');
            if(iPhone == true) {
                $('body').addClass('candidate_iphone_background');
            }
            else if (iPad == true) {
                $('body').addClass('candidate_ipad_background');
            }
            else{
                $('body').addClass('candidate_background');
            }
        }
        $('.theme_container').addClass('removeThemes');
        setTimeout(selectLevel, 3000);

    })
}
//STEP3
function selectLevel() {
    $('.theme_container').remove();
    $('.welcome').remove();
    var level_container = $('<div>', {
        class: 'level_container container enterLevels'
    });
    var level_heading = $('<h3>', {
        class: 'preference_heading text-center',
        text: 'Please select a level'
    });

    var button_container = $('<div>', {
        class: 'row row_buttons row_buttons_level'
    });

    var easy = $('<button>', {
        class: 'btn btn-primary outline level_button easy_button col-sm-offset-1',
        type: 'button',
        level: 'easy',
        text: 'Easy'
    });

    var medium = $('<button>', {
        class: 'btn btn-primary outline level_button medium_button col-sm-offset-2',
        type: 'button',
        level: 'medium',
        text: 'Medium'
    });

    var hard = $('<button>', {
        class: 'btn btn-primary outline level_button hard_button col-sm-offset-2',
        type: 'button',
        level: 'hard',
        text: 'Hard'
    });

    $(button_container).append(easy, medium,hard);
    $(level_container).append(level_heading, button_container);
    $('#preferences_container').append(level_container);
    $('.level_button').click(function () {
        gameLevel = ($(this).attr('level'));
        console.log(gameLevel);
        clearScreen();
        //TODO clear level selection and load game board and card
        //TODO also make a warning about the different versions
    });
}

//Step 1: check device type
function checkDevise() {
    if(navigator.userAgent.search("iPhone") >= 0) {
        console.log('version iPhone');
        iPhone = true;
    }
    if(navigator.userAgent.search("iPad") >= 0) {
        console.log('version iPad');
        iPad = true;
    }
    else {
        console.log(navigator.userAgent);
    }
}

//Step 4: clear screen to generate game board
function clearScreen() {
    $('.level_container').addClass('remove_level_container');
    setTimeout(function(){
        $('.level_container').remove();
    },1024)
}



$(document).ready(function () {
    console.log('ready to load');
    checkDevise();
    selectTheme();
});