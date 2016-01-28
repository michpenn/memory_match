/**
 * Created by michpenn on 1/27/16.
 */
 function Level(name){
    this.name = name;
    this.numberOfCards;
    this.cardsPerMatch;
    this.hasReshuffleTimer;
    this.timerMilliseconds;
}

Level.prototype = {
    constructor: Level
};

var easyLevel = new Level('easy');
easyLevel.numberOfCards = 18;
easyLevel.cardsPerMatch = 2;
easyLevel.hasReshuffleTimer = false;

var mediumLevel = new Level('medium');
mediumLevel.numberOfCards = 27;
mediumLevel.cardsPerMatch = 3;
mediumLevel.hasReshuffleTimer = false;

var hardLevel = new Level('hard');
hardLevel.numberOfCards = 27;
hardLevel.cardsPerMatch = 3;
hardLevel.hasReshuffleTimer = true;
hardLevel.timerMilliseconds = 90000;
