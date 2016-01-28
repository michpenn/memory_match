/**
 * Created by michpenn on 1/27/16.
 */
 function Level(){
    var timerInterval;
    this.level = level;
    if(this.level =='easy'){}
    else if(this.level == 'medium'){}
    else if(this.level == 'hard'){}
}

Level.prototype = {
    constructor: Level,
    //maybe this should go in game?
    reshuffle_cards: function(){
    },
    reshuffle_timer: function(){
        var timerInterval = setInterval(reshuffle_cards, 10000)
    }
};

function reshuffle_cards(){
    //rewrite shuffle code here
}