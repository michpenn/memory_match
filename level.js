/**
 * Created by michpenn on 1/27/16.
 */
 function Level(name){
    this.name = name;
    //pass these all in?
    this.numberOfCards;
    this.numberOfCardsModifier;
    this.cardsPerMatch;
    this.hasReshuffleTimer;
    this.timerMilliseconds;
}

Level.prototype = {
    constructor: Level,
};

var easyLevel = new Level('easy');
easyLevel.numberOfCards = 9;
easyLevel.numberOfCardsModifier = 2;
easyLevel.cardsPerMatch = 2;
easyLevel.hasReshuffleTimer = false;

var mediumLevel = new Level('medium');
mediumLevel.numberOfCards = 9;
mediumLevel.cardsPerMatch = 3;
mediumLevel.hasReshuffleTimer = false;

var hardLevel = new Level('hard');
hardLevel.numberOfCards = 9;
hardLevel.cardsPerMatch = 3;
hardLevel.hasReshuffleTimer = true;
hardLevel.timerMilliseconds = 90000;
