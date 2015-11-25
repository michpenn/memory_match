/**
 * Created by michpenn on 11/13/15.
 */
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
    //Stats
    self.accuracy= 0;
    self.stats = {
        games_played: 0,
        attempts: 0,
        matches: 0
    };
    self.get_accuracy = function(){
        console.log(self.accuracy);
        return self.accuracy;
    };
    self.calculate_accuracy = function(){
        var accuracy = self.stats.matches/self.stats.attempts;
        accuracy = accuracy.toPrecision(3);
        return self.accuracy = accuracy;
    };

}


Board.prototype.cardClick = function ($card) {
    var self = this;
    $card.find('.back').hide();
    if (self.card1 == null) {
        self.card1 = {id: $card.attr('id'), count: $card.attr('data-count')};
    }
    else {
        self.card2 = {id: $card.attr('id'), count: $card.attr('data-count')};
        setTimeout(function(){
            self.checkMatch(self.card1, self.card2);
        },2000)

    }

};


Board.prototype.checkMatch = function (card1, card2) {
    var self = this;
    if (card1.id == card2.id) {
        if (card1.count != card2.count) {
            self.matchFound(card1, card2);
            self.card1 = null;
            self.card2 = null;
        }
        else {
            self.card2 == null;
        }
    }
    else {
        // reset
        self.matchNotFound(card1, card2);
    }
};

Board.prototype.matchFound = function (card1, card2) {
    console.log('match');
    console.log(card1, card2);
};

Board.prototype.$getCard = function (card) {
    return $('#' + card.id + '[data-count="' + card.count + '"]');
};

Board.prototype.matchNotFound = function (card1, card2) {
    var self = this;
    console.log('not a match');
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

//Prototyping stats calculations


function Card(id, count, frontImage, backImage) {
    var self = this;
    self.id = id;
    self.frontImage = frontImage;
    self.backImage = backImage;
    self.$el = $(self.getHTML(count));
}

Card.prototype.getFront = function () {
    var self = this;
    return '<div class="front"><img src="' + self.frontImage + '"></div>';
};

Card.prototype.getBack = function () {
    var self = this;
    return '<div class="back"><img src="' + self.backImage + '"></div>';
};

Card.prototype.getHTML = function (count) {
    var self = this;
    var html = '' +
        '<div class="card" id="' + self.id + '" data-count="' + count + '">' +
        self.getFront() +
        self.getBack() +
        '</div>';
    return html;
};

function stats_template(stats_container, game){
    var self=this;
    self.stats_container = $(stats_container);
    self.game=game;
    self.gamesPlayed_text = self.stats_container.find('.games_played > span');
    self.attempts_text = self.stats_container.find('.attempts > span');
    self.accuracy_text = self.stats_container.find('.accuracy > span');
    self.init = function(){
        self.update_stats();
    };
    //self.update_stats = function(){}

};


$(document).ready(function () {
    console.log('ready to load');
    createBoard();
});
