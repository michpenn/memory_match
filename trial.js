/**
 * Created by michpenn on 11/21/15.
 */
var gameTheme;


function selectTheme() {
    var theme_container = $('<div>', {
        class: 'preference_container container-fluid'
    });
    var theme_heading = $('<h3>', {
        class: 'preference_heading text-center',
        text: 'Please select a theme'
    });

    var button_container = $('<div>', {
        class: 'row'
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
    $('.theme_button').click(function() {
        gameTheme = ($(this).attr('theme'));
    })
}

$(document).ready(function () {
    console.log('ready to load');
    selectTheme();
});