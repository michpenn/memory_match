/**
 * Created by michpenn on 1/28/16.
 */
function Game(theme, level) {
    this.theme = theme;
    this.level = level;
    this.cards = this.buildDeck();
    this.deck = [];
    this.card1 = null;
    this.card2 = null;
    this.card3 = null;
}

Game.prototype = {
    constructor: Game,
    buildDeck: function () {
        var deck = [];
        for (var i = 0; i < this.level.numberOfCards; i++) {
            for (var j = 0; j < this.level.cardsPerMatch; j++) {
                var card = new Card(this.theme.cardFrontImages[i].data_cardID, this.theme.cardFrontImages[i].front, this.theme.cardBackImage);
                deck.push(card);
            }

        }
        this.randomizeDeck(deck);
        /*
         iterate through theme and create new card objects and return an array
         */
    },
    randomizeDeck: function (deck) {
        var randomizedDeck = [];
        $(deck).each(function () {
            var randomIndex = Math.floor(Math.random() * (deck.length));
            var card = deck[randomIndex];
            randomizedDeck.push(card);
            deck.splice(randomIndex, 1);
        });
        this.deck = randomizedDeck;
        this.displayDeck();
    },
    displayDeck: function () {
        for (var i = 0; i < this.deck.length; i++) {
            var card = this.deck[i];
            card.index = i;
            $('#container_game').append(card.getHTML());

        }
        this.assignClickHandlers();

    },
    assignClickHandlers: function () {
        $('.card').on('click', function (e) {
            board.game.deck = this;
            var cardParent = $(e.target).parent().parent()[0];
            var index = $(cardParent).attr('data-index');
            var card = this[index];
            card.clickHandler();

        }.bind(this.deck));
    },
    checkCard: function (card) {
        /*
         * Idea: put cards in an array and check array length for checking match
         * */
        if (this.level.cardsPerMatch == 2) {
            if (this.card1 == null || this.card2 == null) {
                this.assignCard(card);
            }
            else {
                return;
            }
        }
        else if (this.level.cardsPerMatch == 3) {
            if (this.card1 == null || this.card2 == null || this.card3 == null) {
                this.assignCard(card);
            }
            else {
                return;
            }
        }

    },
    assignCard: function (card) {
        if (this.level.cardsPerMatch == 2) {
            if (this.card1 == null) {
                this.card1 = card;
                this.flipCard(card);
            }
            else if (this.card2 == null && (this.card1.index != card.index)) {
                this.card2 = card;
                this.flipCard(card);
                this.checkMatch();
            }
        }
        else if (this.level.cardsPerMatch == 3) {
            if (this.card1 == null) {
                this.card1 = card;
                this.flipCard(card);
            }
            else if (this.card2 == null && (this.card1.index != card.index)) {
                this.card2 = card;
                this.flipCard(card);
            }
            else if (this.card3 == null && ((this.card1.index != card.index) && (this.card2.index != card.index))) {
                this.card3 = card;
                this.flipCard(card);
                this.checkMatch();
            }
        }

    },
    flipCard: function (card) {
        card.flip();
    },
    checkMatch: function () {
        if (this.level.cardsPerMatch == 2) {
            if ((this.card1.data_cardID == this.card2.data_cardID)) {
                this.matchFound(this.card1, this.card2);
            }
            else {
                this.matchNotFound(this.card1, this.card2);
            }
        }
        else if (this.level.cardsPerMatch == 3) {
            if ((this.card1.data_cardID == this.card2.data_cardID) && (this.card1.data_cardID == this.card3.data_cardID)) {
                this.matchFound_3(this.card1, this.card2, this.card3);
            }
            else {
                this.matchNotFound_3(this.card1, this.card2, this.card3);
            }

        }
        this.updateStats_attempts();
        board.displayCurrentStats();

    },
    matchFound: function (card1, card2) {
        setTimeout(function () {
            card1.matched();
            card2.matched();
            board.game.card1 = null;
            board.game.card2 = null;
        }, 2000);
        this.updateStats_matches();
        board.checkForWin();
        board.animations();
    },
    matchFound_3: function (card1, card2, card3) {
        setTimeout(function () {
            card1.matched();
            card2.matched();
            card3.matched();
            board.game.card1 = null;
            board.game.card2 = null;
            board.game.card3 = null;
        }, 2000);
        this.updateStats_matches();
        if (board.stats.matches === 5 && this.level.name == 'hard') {
            this.reshuffle(this.reshuffle_order());
        }
        board.checkForWin();
        board.animations();
    },
    matchNotFound: function (card1, card2) {
        setTimeout(function () {
            card1.flip();
            card2.flip();
            board.game.card1 = null;
            board.game.card2 = null;
        }, 2000);
    },
    matchNotFound_3: function (card1, card2, card3) {
        setTimeout(function () {
            card1.flip();
            card2.flip();
            card3.flip();
            board.game.card1 = null;
            board.game.card2 = null;
            board.game.card3 = null;
        }, 2000);
    },
    updateStats_attempts: function () {
        board.stats.attempts++;
    },
    updateStats_matches: function () {
        board.stats.matches++;
    },
    updateStats_gamesPlayed: function () {
        board.stats.games_played++;
    },
    find_cardsToReshuffle: function () {
        var cardsToReshuffle = [];
        for (var i = 0; i < $('.card').length; i++) {
            var thisCard = $('.card')[i];
            if (!($(thisCard).hasClass('flipped'))) {
                cardsToReshuffle.push(thisCard);
            }
        }
        return cardsToReshuffle;
    },
    reshuffle_order: function () {
        var cardsToReshuffle = this.find_cardsToReshuffle();
        var cardsRandomized = [];
        $(cardsToReshuffle).each(function(){
            var randomIndex = Math.floor(Math.random()* (cardsToReshuffle.length));
            var thisCard = cardsToReshuffle[randomIndex];
            cardsRandomized.push(thisCard);
            cardsToReshuffle.splice(randomIndex,1);
        });

        return cardsRandomized;
    },
    reshuffle: function(array){
        for(var i=0; i<array.length; i+=3) {
            var card1 = array[i];
            var card2 = array[i+1];
            var card3 = array[i+2];
            console.log(array[i]);
            var card1_offsetLeft = $(card1)[0].offsetLeft;
            var card1_offsetTop = $(card1)[0].offsetTop;
            var card2_offsetLeft = $(card2)[0].offsetLeft;
            var card2_offsetTop = $(card2)[0].offsetTop;
            var card3_offsetLeft = $(card3)[0].offsetLeft;
            var card3_offsetTop  = $(card3)[0].offsetTop;

            $(card1).animate({left: '+=' + (card2_offsetLeft - card1_offsetLeft),
            top: '+=' + (card2_offsetTop - card1_offsetTop)}, 2000);
            $(card2).animate({left: '+=' + (card3_offsetLeft - card2_offsetLeft),
                top: '+=' + (card3_offsetTop -card2_offsetTop)}, 2000);
            $(card3).animate({left: '+=' + (card1_offsetLeft -card3_offsetLeft),
                top: '+=' + (card1_offsetTop - card3_offsetTop)}, 2000);
        }

    }


};
