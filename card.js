/**
 * Created by michpenn on 1/27/16.
 */

function Card(data_cardID, frontImage, backImage) {
    this.data_cardID = data_cardID;
    this.frontImage = frontImage;
    this.backImage = backImage;
    this.isFaceDown = true;
}

Card.prototype = {
    constructor: Card,
    flip: function () {
        if (this.isFaceDown) {
            //apply class flip up
            this.isFaceDown = false;
        }
        else {
            //apply class to flip up
            this.isFaceDown = true;
        }
    },
    getHTML: function () {
        var html =
            '<div class="card" data-cardID="' + this.data_cardID + '" >' +
            '<div class="front"><img src="' + this.frontImage + '"></div>' +
            '<div class="back"><img src="' + this.backImage + '"></div>' +
            '</div>';
        return html;
    }
};

/*
Card flip function: http://jsbin.com/vabibeyuro/edit?html,css,js,output
 */