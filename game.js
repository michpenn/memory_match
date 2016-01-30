/**
 * Created by michpenn on 1/28/16.
 */
function Game(theme, level){
    this.theme = theme;
    this.level = level;
    this.cards = this.buildDeck();
    this.deck = [];
}

Game.prototype ={
    constructor: Game,
    buildDeck: function(){
        var deck = [];
        //console.log(this.level.cardsPerMatch);
        for(var i=0; i<this.level.numberOfCards; i++) {
            //console.log(this.theme.cardBackImage);
            for(var j=0; j<this.level.cardsPerMatch; j++) {
                //console.log(this.theme.cardFrontImages[i]);
                var card = new Card(this.theme.cardFrontImages[i].data_cardID, this.theme.cardFrontImages[i].front,this.theme.cardBackImage);
                deck.push(card);
            }

        }
        this.randomizeDeck(deck);
        /*
        iterate through theme and create new card objects and return an array
         */
    },
    randomizeDeck: function(deck){
        var randomizedDeck = [];
        $(deck).each(function(){
            var randomIndex = Math.floor(Math.random()* (deck.length));
            var card = deck[randomIndex];
            randomizedDeck.push(card);
            deck.splice(randomIndex,1);
        });
        this.deck = randomizedDeck;
        this.displayDeck();
    },
    displayDeck: function(){
        for(var i=0; i<this.deck.length; i++) {
            var card= this.deck[i];
            console.log(card);
            card = this.clickTrial(card);
            $('#container_game').append(card.getHTML());


        }
        //this.assignClickHandlers();
    },
    assignClickHandlers: function(){
      $('.card').on('click',function(){
          console.log('this works', this);
      });
    },
    buildBackground: function(){},
    clickTrial: function(theobject){
        $(theobject).on('click', function(){
            alert('it finally worked');
        });
    }
};

function click(e){
    console.log(e);
}