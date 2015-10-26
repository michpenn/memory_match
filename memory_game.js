/**
 * Created by michpenn on 10/14/15.
 */

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var games_played = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var displaying_match = false;




//When the card is clicked...

function card_clicked(card_container_element) {
    if (displaying_match) {
        return;
    }
    console.clear();
    console.log("card_container_element: ", card_container_element);

    var back_element = $(card_container_element).find('.back');
    $(back_element).hide();
    console.log($(back_element).attr('card_src'));
    var card_src_data = $(back_element).attr('card_src');
    /*check if first_card_clicked is null,
     if it is, then assign it */

    if (first_card_clicked == null) {
        console.log('This is the first card we clicked');
        $('#my_popup').remove();
        first_card_clicked = card_container_element;
    }
    //assigns second_card_clicked variable
    else {
        console.log('This is the second card we clicked');
        second_card_clicked = card_container_element;
        //checks if the cards match
        var first_src = $(first_card_clicked).find('.back').attr('card_src');
        if (first_src == card_src_data) {
            console.log('they match');
            setTimeout(makeAMatch(),1000);
            popUP(first_src);
            //Work In Progress: Show Quote
            //setTimeout(popUp,2000);
            //$('#my_popup').popUp();
            //increment the attempts
            attempts++;
            console.log(attempts);

            //increment the match counter
            match_counter++;
            console.log(match_counter);
            //increment the accuracy
            accuracy = (match_counter/attempts)*100;
            console.log(accuracy);
            //update stats
            display_stats();
            //reset the variables
            first_card_clicked = null;
            second_card_clicked = null;
            console.log(first_card_clicked, second_card_clicked);
            //check if match counter = total possible matches
            if (match_counter == total_possible_matches) {
                console.log("You won!");
                win();
                //winning();
                //alert("You Won!");
                //$('.winning-div').css("display", "block");
                setTimeout(function() {reset_cards(); }, 5000);
                //$('.winning-div').css("display", "none");

            }
        }
        else {
            console.log('they don\'t match');
            //increment attempts
            attempts++;
            //increment the accuracy
            accuracy = (match_counter/attempts)*100;
            console.log(accuracy);
            console.log(attempts);
            //update stats
            display_stats();
            //make the cards flip back over
            var reset_card_1 = $(first_card_clicked).find('.back');
            console.log(reset_card_1);
            var reset_card_2 = $(second_card_clicked).find('.back');
            console.log("this is reset card 2", second_card_clicked);
            $(reset_card_1).show(3000);
            $(reset_card_2).show(3000);
            //reset the variables
            first_card_clicked = null;
            second_card_clicked = null;
        }
    }
}
//Reset button
function reset_cards () {
    console.log('reset button works');
    $('.match_class').removeClass('match_class');
    $('.back').show();
    games_played++;
    console.log('Games Played: ' + games_played, 'Attempts: ' + attempts, 'Accuracy: ' + accuracy);
    first_card_clicked = null;
    second_card_clicked = null;
    console.log('reset works');
    attempts = 0;
    match_counter = 0;
    accuracy = 0;
    console.log('Games Played: ' + games_played, 'Attempts: ' + attempts, 'Accuracy: ' + accuracy);
    console.log(display_stats());
}

//display stats function
function display_stats(){
    $('.games-played .value').empty().append(games_played);
    $('.attempts .value').empty().append(attempts);
    var accuracy2 = Math.round(accuracy);
    $('.accuracy .value').empty().append(accuracy2 + '%');

}
function makeAMatch() {
    $(first_card_clicked).addClass('match_class');
    $(second_card_clicked).addClass('match_class');
}



function startGame() {
    console.log('let the games begin');
    $('.buttons-container').remove();
    var body_container = $('<div>', {
        id: 'body-container'
    });
    var stats_container = $('<div>', {
        id: 'stats_container'
    });
    var games_played2 =$('<div>', {
        class: 'games-played'
    });
    var attempts2 =$('<div>', {
        class: 'attempts'
    });
    var accuracy2 =$('<div>', {
        class: 'accuracy'
    });
    var reset_cards2 =$('<button>', {
         type:"button",
        name: "reset",
        id: 'reset_button',
        text: 'Reset'
    });
    var label_games_played =$('<h4>', {
        class: 'label',
        text: 'Games Played: '
    });
    var label_attempts =$('<h4>', {
        class: 'label',
        text: 'Attempts: '
    });
    var label_accuracy =$('<h4>', {
        class: 'label',
        text: 'Accuracy: '
    });
    var game_area = $('<div>', {
        class: 'game-area'
    });

    var data_games_played = $('<p>', {
        class: 'value games-played',
        text: ''
    });

    var data_attempts = $('<p>', {
        class: 'value attempts',
        text: ''
    });

    var data_accuracy = $('<p>', {
        class: 'value accuracy',
        text: ''
    });


    $(stats_container).append(games_played2, attempts2, accuracy2).append(reset_cards2);
    $(games_played2).append(label_games_played, data_games_played);
    $(attempts2).append(label_attempts, data_attempts);
    $(accuracy2).append(label_accuracy, data_accuracy);
    $(body_container).append(stats_container, game_area);
    $('body').append(body_container);
    var rows = $('.row').css('display','block');
    $(game_area).append(rows);
    $(reset_cards2).click(reset_cards());

}

//WORKING ON THE QUOTE MODAL, RESET BUTTON, AND WINNING HEADING

function popUP(person) {
    displaying_match = true;
    $('div#pop-up').show();
    var img_src = $('.'+person).find('img').attr('src');
    var person_img = $('<img>', {
        src: img_src
    });
    $('#candidatepic').html(person_img);
}

function popUpHide() {
    $('div#pop-up').hide();
    displaying_match = false;
}

function win() {
    popUpHide();
    $('div#winning').show();
}

function winHide() {
    $('div#winning').hide();
}

/*


function quoteModal() {
    $('#openModal_quote').modal();
}
/*
 <a href="#openModal_quote">Quote</a>
 </button>
 <div id="openModal_quote" class="modalDialog">
 <div>
 <a href="#close" title="Close" class="close">X</a>
 <h2>This Candidate Said...</h2>
 <p>speech bubble here</p>
 <p>"Insert Silly Quote Here"</p>
 </div>
 */
/*function popUp() {
 var popup = $("<div>", {
 id: "my_popup"
 });

 var img = $("<img>", {
 src: "http://chattertainment.com/wp-content/uploads/2014/03/cartoon-speech-bubble-hi.png",
 class: "bubble"
 });

 var candidate = $("<div>", {
 class: "candidate-pic"
 });

 var message = $("<p>", {
 text: "This is the quote text",
 class: "quote-text"
 });

 popup.append(img, message, candidate);

 $('.game-area').append(popup);
 }
 */



/*var winning = $('<h1>', {
    id: 'winning',
    text: 'You Won!'
});

function win() {
    $(winning).css('display', 'block');
    $(body_container).append(winning);
}

*/
/* ATTEMPT TO RANDOMIZE
var backcard = 'images/2016.png';

 var frontcard = [];
 frontcard[0] = 'images/bush.jpg';
 frontcard[1] = 'images/carson.jpg';
 frontcard[2] = 'images/clinton.jpg';
 frontcard[3] = 'images/cruz.jpg';
 frontcard[4] = 'images/fiorina.jpg';
 frontcard[5] = 'images/huckabee.jpg';
 frontcard[6] = 'images/bush.jpg';
 frontcard[7] = 'images/carson.jpg';
 frontcard[8] = 'images/clinton.jpg';
 frontcard[9] = 'images/cruz.jpg';
 frontcard[10] = 'images/fiorina.jpg';
 frontcard[11] = 'images/huckabee.jpg';

 var numOfMatches = 0.5* frontcard.length;
 var tid; */

/*

 $('document').ready(function() {
 $('#game-area').on('click','#my_popup', function() {
 $(this).remove();
 });
 });
 */