/**
 * Created by michpenn on 1/27/16.
 */

function Card(data_cardID, frontImage, backImage) {
    this.data_cardID = data_cardID;
    this.index;
    this.frontImage = frontImage;
    this.backImage = backImage;
    this.isFaceDown = true;
}

Card.prototype = {
    constructor: Card,
    flip: function () {
        if (this.isFaceDown) {
            $('div[data-index='+ this.index+']').addClass('flipped');
            this.isFaceDown = false;
        }
        else {
            $('div[data-index='+ this.index+']').removeClass('flipped');
            this.isFaceDown = true;
        }
    },
    matched: function(){
        $('div[data-index='+ this.index+']').addClass('match');

    },
    clickHandler: function(){
        console.log(this);
        console.log(board.game);
        board.game.checkCard(this);

},
    getHTML: function () {
        var html =
            '<div class="card" data-index = "'+this.index +'" data-cardID="' + this.data_cardID+'" >' +
            '<div class="front"><img src="' + this.frontImage + '"></div>' +
            '<div class="back"><img src="' + this.backImage + '"></div>' +
            '</div>';
        return html;
    }
};

/*
Card flip function: http://jsbin.com/vabibeyuro/edit?html,css,js,output
 */