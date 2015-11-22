/**
 * Created by michpenn on 11/13/15.
 */
var randomizedNumbers = [];
var level;
var theme;
var cards = [];
var numberOfColumns = 0;
var numberOfRows = 0;
var THEMES = {
    presidents: {
        back: 'images/2016.png',
        images: [
            {
                id: 'bush',
                front: 'images/bush.jpg'
            },
            {
                id: 'carson',
                front: 'images/carson.jpg'
            },
            {
                id: 'clinton',
                front: 'images/clinton.jpg'
            },
            {
                id: 'cruz',
                front: 'images/cruz.jpg'
            },
            {
                id: 'fiorina',
                front: 'images/fiorina.jpg'
            },
            {
                id: 'huckabee',
                front: 'images/huckabee.jpg'
            },
            {
                id: 'rubio',
                front: 'images/rubio.jpg'
            },
            {
                id: 'sanders',
                front: 'images/sanders.jpg'
            },
            {
                id: 'trump',
                front: 'images/trump.jpg'
            }
        ]
    }
};

function randomize(matches) {
    var randomNumber;
    if (randomizedNumbers.length < matches) {
        console.log('we can push numbers to the array');
        for (var i = 0; i < matches;) {
            randomNumber = Math.floor((Math.random() * matches) + 1);
            if (randomizedNumbers.length === 0) {
                randomizedNumbers.push(randomNumber);
                i++;
            }
            else {
                if ($.inArray(randomNumber, randomizedNumbers) == -1) {
                    randomizedNumbers.push(randomNumber);
                    i++;
                }
            }
        }

    }
    console.log('the final array: ' + randomizedNumbers);
}

function createBoard() {
    console.log('create board has been called');
    $('.level').click(function () {
        level = $(this).attr('level');
        console.log('level is set to: ' + level);
        numberOfColumns = 6;
        numberOfRows = 3;
    });
    $('.theme').click(function () {
        theme = $(this).attr('theme');
        console.log('theme is set to: ' + theme);
    });
    var board = new Board('presidents');
    board.drawCards();
    $('.card').on('click', function () {
        board.cardClick($(this));
    });
}


function Board(theme) {
    console.log('board has been called');
    var self = this;
    self.$el = $('#board');
    self.$cardsContainer = $('<div id="cards"></div>');
    self.cards = [];

    self.level = level;
    if (self.level == 'easy') {
        self.number_of_matches = 9;
        self.rows = 3;
        self.columns = 6;
    }
    else if (self.level == 'medium') {
        self.number_of_matches = 9;
        self.rows = 3;
        self.columns = 6;

    }
    else if (self.level == 'hard') {
        self.number_of_matches = 9;
        self.rows = 3;
        self.columns = 6;
    }
    self.theme = theme;
    self.card1 = null;
    self.card2 = null;
}
Board.prototype.cardClick = function ($card) {
    var self = this;
    $card.find('.back').hide();
    if (self.card1 == null) {
        self.card1 = {id: $card.attr('id'), count: $card.attr('data-count')};
    }
    else {
        self.card2 = {id: $card.attr('id'), count: $card.attr('data-count')};
        self.checkMatch(self.card1, self.card2);
    }

};
Board.prototype.checkMatch = function (card1, card2) {
    var self = this;
    if (card1.id == card2.id) {
        if (card1.count != card2.count) {
            self.matchFound(card1, card2);
        }
        else {
            self.card2 == null;
        }
    }
    else {
        // reset
        self.matchNotFound();
    }
};
Board.prototype.matchFound = function (card1, card2) {
    alert('match');
};
Board.prototype.$getCard = function (card) {
    return $('#' + self.card.id + '[data-count="' + self.card.count + '"]');
};

Board.prototype.matchNotFound = function (card1, card2) {
    alert('not a match');
    self.$getCard(card1).find('.back').show();
    self.$getCard(card2).find('.back').show();
    self.card1 = null;
    self.card2 = null;
};

Board.prototype.getCards = function () {
    var self = this;
    var images = THEMES[self.theme].images;
    var back = THEMES[self.theme]['back'];
    var imagesLength = images.length;
    for (var i = 0; i < imagesLength; i++) {
        var randIndex = Math.floor(Math.random(images.length));
        var image = images[randIndex];
        self.cards.push(new Card(image['id'], 1, image['front'], back));
        self.cards.push(new Card(image['id'], 2, image['front'], back));
        images.splice(randIndex, 1);
    }
};

Board.prototype.drawCards = function () {
    var self = this;
    self.getCards();
    self.cards.sort(function () {
        return 0.5 - Math.random();
    });

    for (var i = 0; i < self.cards.length; i++) {
        var card = self.cards[i];
        card.$el.appendTo(self.$cardsContainer);
    }

    self.$el.html(self.$cardsContainer.html());
};


function Card(id, count, frontImage, backImage) {
    var self = this;
    self.id = id;
    self.frontImage = frontImage;
    self.backImage = backImage;
    self.$el = $(self.getHTML(count));
}

Card.prototype.getFront = function() {
    var self = this;
    return '<div class="front"><img src="'+ self.frontImage +'"></div>';
};

Card.prototype.getBack = function() {
    var self = this;
    return '<div class="back"><img src="'+ self.backImage +'"></div>';
};

Card.prototype.getHTML = function(count) {
    var self = this;
    var html = ''+
        '<div class="card" id="'+ self.id +'" data-count="'+count+'">'+
        self.getFront() +
        self.getBack() +
        '</div>';
    return html;
};



$(document).ready(function () {
    console.log('ready to load');
    createBoard();
});