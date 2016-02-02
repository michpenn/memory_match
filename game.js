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
        for(var i=0; i<this.level.numberOfCards; i++) {
            for(var j=0; j<this.level.cardsPerMatch; j++) {
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
            card.index = i;
            $('#container_game').append(card.getHTML());


        }
        console.log(this.deck);
        this.assignClickHandlers();
    },
    assignClickHandlers: function(){
      $('.card').on('click',function(e){
          var card = $(e.target).parent().parent()[0];
          var index = $(card).attr('data-index');
          console.log(this[index]);
          //console.log(this);

      }.bind(this.deck));
    },


};
