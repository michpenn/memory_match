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


//When the card is clicked...
function card_clicked(card_container_element) {
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
        first_card_clicked = card_container_element;
    }
    //assigns second_card_clicked variable
    else {
        console.log('This is the second card we clicked');
        //second_card_clicked = card_src_data;
        second_card_clicked = card_container_element;
        //checks if the cards match
        var first_src = $(first_card_clicked).find('.back').attr('card_src');
        if (first_src == card_src_data) {
            console.log('they match');
            $(first_card_clicked).addClass('match_class');
            $(second_card_clicked).addClass('match_class');

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
                alert("You won!");
                reset_cards();

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
            $(reset_card_1).show(2000);
            $(reset_card_2).show(2000);
            //reset the variables
            first_card_clicked = null;
            second_card_clicked = null;
        }
    }
}
//Reset button
function reset_cards () {
    $('.match_class').removeClass('match_class');
    $('.back').show();
    games_played++;
    console.log('Games Played: '+ games_played,'Attempts: '+ attempts,'Accuracy: ' + accuracy);
    first_card_clicked = null;
    second_card_clicked = null;
    console.log('reset works');
    attempts = 0;
    match_counter = 0;
    accuracy = 0;
    console.log('Games Played: '+ games_played,'Attempts: '+ attempts,'Accuracy: ' + accuracy);
    console.log(display_stats());
}

//display status function
function display_stats(){
    $('.games-played .value').empty().append(games_played);
    $('.attempts .value').empty().append(attempts);
    var accuracy2 = accuracy.toPrecision(3);
    $('.accuracy .value').empty().append(accuracy2 + '%');

}
