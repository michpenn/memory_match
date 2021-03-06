/**
 * Created by michpenn on 1/27/16.
 */
function Theme(name) {
    this.name = name;
    this.cardBackImage = '';
    this.cardFrontImages = [];
    this.background = [];
    this.timerIntervalAnimations;
}

Theme.prototype = {
    constructor: Theme,
    onGameStart: function () {
        console.log('this is where to load things that happen before game');
        $('.options').remove();
        $('#container_stats').show();
        this.format_stats();
        this.determineDevice();
    },
    determineDevice: function(){
console.log(navigator.userAgent);
        this.loadBackground();
    },
    format_stats: function(){},
    loadBackground: function (){},
    createAnimation1: function(){},
    animation1: function(){},
    win: function(){
    },
    onGameEnd: function () {
        console.log('this is where to load things that happen at the end of the game');
        this.win();
        $('.closeLink').on('click', function(){
            $('#popUpWin').hide();
        });
        $('#popUpWin').show();
        console.log('play again?');

    }
};

var disneyPrincesses = new Theme('Disney Princesses');
disneyPrincesses.cardBackImage = 'themes/disney/disney_backcard.png';
disneyPrincesses.cardFrontImages = [
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
];
disneyPrincesses.loadBackground = function(){
    $('body').addClass('background_princess');
};
disneyPrincesses.format_stats = function(){
    $('.button_reset').addClass('button_reset_disney');
    $('#ul_stats').addClass('ul_stats_disney')
};
disneyPrincesses.createAnimation1= function(){
    var tink = $('<div>',{
        class: 'animate_tink_1'
    });
    $('.container-full-game').append(tink);
};
disneyPrincesses.animation1= function(){
    this.createAnimation1();
    var tink = $('.animate_tink_1');
    $(tink).show();
    tink.animate({left: '+=100%', top: '-=100%'}, {duration: 5000, complete: function(){$(tink).remove()}});
};
disneyPrincesses.win = function(){
    console.log('disney princess win here');
};

var safari = new Theme('Safari');
safari.cardBackImage = 'themes/safari/cardback.png';
safari.cardFrontImages = [
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
];
safari.timerIntervalAnimations = [];
safari.loadBackground = function(){
    $('body').addClass('background_safari');
};
safari.format_stats = function(){
    $('.button_reset').addClass('button_reset_safari');
};
safari.createAnimation1= function(){
    var car = $('<div>',{
        class: 'safari_car'
    });
    $('body').append(car);
};

safari.animation1 = function(){
this.createAnimation1();
    var car = $('.safari_car');
    $(car).show().animate({left: '-=140%'}, {duration: 9000, complete: function(){$(car).remove()}});
};
safari.win = function(){
    //append decorations to the div and display the div
    console.log('safari win here');
};

var candidates2016 = new Theme('2016 Candidates');
candidates2016.cardBackImage = 'themes/candidates/2016.png';
candidates2016.cardFrontImages = [
            {
                data_cardID: 'bush',
                front: 'themes/candidates/bush.jpg'
            },
            {
                data_cardID: 'carson',
                front: 'themes/candidates/carson.jpg'
            },
            {
                data_cardID: 'clinton',
                front: 'themes/candidates/clinton.jpg'
            },
            {
                data_cardID: 'cruz',
                front: 'themes/candidates/cruz.jpg'
            },
            {
                data_cardID: 'fiorina',
                front: 'themes/candidates/fiorina.jpg'
            },
            {
                data_cardID: 'huckabee',
                front: 'themes/candidates/huckabee.jpg'
            },
            {
                data_cardID: 'rubio',
                front: 'themes/candidates/rubio.jpg'
            },
            {
                data_cardID: 'sanders',
                front: 'themes/candidates/sanders.jpg'
            },
            {
                data_cardID: 'trump',
                front: 'themes/candidates/trump.jpg'
            }
        ];
candidates2016.loadBackground = function(){
    $('body').addClass('background_2016');
};
candidates2016.format_stats = function(){
    //$('#ul_stats').addClass('ul_stats_2016');
    $('#ul_stats').css('background-color', '#959497');
    $('.button_reset').addClass('button_reset_2016');
};
candidates2016.animation1 = function(){
    var flipped_cards = $('.flipped');
    var animate_this = flipped_cards[flipped_cards.length-1];
    console.log(flipped_cards, animate_this);
};

candidates2016.win = function(){
    console.log('2016 win here');
};