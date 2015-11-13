/**
 * Created by michpenn on 11/13/15.
 */
var randomizedNumbers = [];

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

randomize(8);