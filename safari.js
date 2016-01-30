/**
 * Created by michpenn on 1/14/16.
 */
var level;
var board;
var theme;
var cards = [];
var numberOfColumns = 0;
var numberOfRows = 0;
var THEMES = {
    safari: {
        back: 'themes/safari/cardback.png',
        images: [
            {
                data_cardID: 'baboon',
                front: 'themes/safari/baboon1.png'
            },
            {
                data_cardID: 'buffalo',
                front: 'themes/safari/buffalo1.png'
            },
            {
                data_cardID: 'cheetah',
                front: 'themes/safari/cheetah1.png'
            },
            {
                data_cardID: 'elephant',
                front: 'themes/safari/elephant1.png'
            },
            {
                data_cardID: 'giraffe',
                front: 'themes/safari/giraffe1.png'
            },
            {
                data_cardID: 'hippo',
                front: 'themes/safari/hippo1.png'
            },
            {
                data_cardID: 'lion',
                front: 'themes/safari/lion1.png'
            },
            {
                data_cardID: 'rhino',
                front: 'themes/safari/rhino1.png'
            },
            {
                data_cardID: 'zebra',
                front: 'themes/safari/zebra1.png'
            }
        ]
    },
    disney: {
        back: 'themes/disney/disney_backcard.png',
        images: [
            {
                data_cardID: 'ariel',
                front: 'themes/disney/disney_ariel.png'
            },
            {
                data_cardID: 'aurora',
                front: 'themes/disney/disney_aurora.png'
            },
            {
                data_cardID: 'belle',
                front: 'themes/disney/disney_belle.png'
            },
            {
                data_cardID: 'cindarella',
                front: 'themes/disney/disney_cindarella.png'
            },
            {
                data_cardID: 'jasmine',
                front: 'themes/disney/disney_jasmine.png'
            },
            {
                data_cardID: 'mulan',
                front: 'themes/disney/disney_mulan.png'
            },
            {
                data_cardID: 'pocahontas',
                front: 'themes/disney/disney_pocahontas.png'
            },
            {
                data_cardID: 'snowWhite',
                front: 'themes/disney/disney_snowwhite.png'
            },
            {
                data_cardID: 'tinkerbell',
                front: 'themes/disney/disney_tinkerbell.png'
            }
        ]

    }
};


function detectWindow() {
    if ($(window).width() < 768 || $(window).height() < 480) {
        console.log('mobile phone');
        $('#mobile_alert').css('visibility', 'visible');
    }
    else {
        console.log('not mobile phone');
    }
}

function Board(theme) {
    console.log('board has been called');
    var self = this;
    self.$el = $('#container_game');
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
    self.stats = {
        accuracy: 0,
        games_played: 0,
        attempts: 0,
        matches: 0,
        number_matches: 9
    };
    self.calculate_accuracy = function () {
        var accuracy = self.stats.attempts / self.stats.matches;
        accuracy = accuracy.toPrecision(3);
        return self.stats.accuracy = accuracy;
    };
}
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


Board.prototype.$getCard = function (card) {
    return $('#' + card.data_cardID + '[data-count="' + card.count + '"]');
};

Board.prototype.getCards = function () {
    var self = this;
    var images = THEMES[self.theme].images;
    var back = THEMES[self.theme]['back'];
    var imagesLength = images.length;
    for (var i = 0; i < imagesLength; i++) {
        var randIndex = Math.floor(Math.random(images.length));
        var image = images[randIndex];
        self.cards.push(new Card(image['data_cardID'], 1, image['front'], back));
        self.cards.push(new Card(image['data_cardID'], 2, image['front'], back));
        images.splice(randIndex, 1);
    }
};
//TODO: make this check if card 1 and 2 are null
Board.prototype.cardClick = function ($card) {
    var self = this;
    $card.find('back').hide();
};

function Card(data_cardID, count, frontImage, backImage) {
    var self = this;
    self.data_cardID = data_cardID;
    self.frontImage = frontImage;
    self.backImage = backImage;
    self.$el = $(self.getHTML(count));
    //self.cards_clicked = function(){
    //    console.log('click works');
    //}

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
        '<div class="card" data-cardID="' + self.data_cardID + '" data-count="' + count + '">' +
        self.getFront() +
        self.getBack() +
        '</div>';
    return html;
};


function createBoard() {
    numberOfColumns = 6;
    numberOfRows = 3;
    board = new Board('disney');
    board.drawCards();
}

function card_is_clicked(e) {
    if (board.canFlipCard()) {
        $(e.target).hide();
        var parent = $(e.target).parent().parent();
        board.flipCard($(parent));
    }


}

Board.prototype.canFlipCard = function () {
    var self = this;
    if ((self.card1 == null || self.card2 == null)) {
        return true;
    }
    else {
        return false;
    }
};

Board.prototype.flipCard = function (card) {
    var self = this;
    if (self.card1 == null) {
        self.card1 = card;
    }
    else {
        self.card2 = card;
        self.checkMatch();

    }
};

Board.prototype.checkMatch = function () {
    var self = this;
    if (self.card1.attr('data-cardid') === self.card2.attr('data-cardid')) {
        console.log('match found');
        self.card1.addClass('match');
        self.card2.addClass('match');
        self.increaseAttempts();
        self.increaseMatches();
        self.calculateAccuracy();
        self.checkForWin();
        self.updateStats();
        self.card1 = null;
        self.card2 = null;

    }
    else {
        console.log('not a match');
        setTimeout(function () {
            var card1 = $(self.card1[0]).find('.back img')[0];
            var card2 = $(self.card2[0]).find('.back img')[0];
            self.increaseAttempts();
            self.calculateAccuracy();
            self.updateStats();
            $(card1).show();
            $(card2).show();
            self.card1 = null;
            self.card2 = null;
        }, 2000);


    }
};

Board.prototype.updateStats = function () {
    var self = this;
    var li_games_played = $('#li_gamesplayed');
    var li_accuracy = $('#li_accuracy');
    var li_attempts = $('#li_attempts');
    var li_matches = $('#li_matches');
    $(li_games_played).text(self.stats.games_played);
    $(li_accuracy).text((self.stats.accuracy * 100) + '%');
    $(li_attempts).text(self.stats.attempts);
    $(li_matches).text(self.stats.matches);


};
Board.prototype.calculateAccuracy = function () {
    var self = this;
    var accuracy = self.stats.matches / self.stats.attempts;
    accuracy = accuracy.toFixed(3);
    self.stats.accuracy = accuracy;
};
Board.prototype.increaseAttempts = function () {
    var self = this;
    self.stats.attempts += 1;
};
Board.prototype.increaseMatches = function () {
    var self = this;
    self.stats.matches += 1;
};
Board.prototype.increaseGamesPlayed = function () {
    var self = this;
    self.stats.games_played += 1;
};
Board.prototype.checkForWin = function () {
    var self = this;
    if (self.stats.number_matches == self.stats.matches) {
        console.log('you won!');
        self.increaseGamesPlayed();
    }
};
//TODO MAKE RESET WORK
Board.prototype.reset = function () {
    var self = this;
    var reset_button = $('#btn_reset');
};

$(document).ready(function () {
    console.log("ready!");
    //detectWindow();
    createBoard();
    $('.back').on('click', card_is_clicked);
});

