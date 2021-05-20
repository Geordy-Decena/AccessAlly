const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Convert digits to array
var getDigs = function (hours, mins) {
    var digs = [];
    if (hours > 9) digs.push(1);
    digs.push(hours % 10);
    if (mins < 10) {
        digs.push(0);
        digs.push(mins);
    }
    else {
        digs.push(Math.floor(mins / 10));
        digs.push(mins % 10);
    }
    return digs;
}

// Finding arithmetic sequence
var isFavTime = function (digits) {
    var check = digits[0] - digits[1];
    for (var x = 1; x < digits.length - 1; x++) {
        if (digits[x] - digits[x + 1] !== check) return false;
    }
    return true;
}

// Main function to calculate number of favTimes
var findFavTimes = function (duration) {
    if (duration === 0) return [0, [12, 0, 0]]
    var num = 0;
    var hours = 12;
    var mins = 0;
    while (duration > 0) {
        mins += 1;
        if (mins == 60) {
            mins = 0;
            hours++;
        }
        if (hours == 13) hours = 1;
        var digits = getDigs(hours, mins);
        if (isFavTime(digits)) num++;
        duration -= 1;
    }
    return [num, [hours, digits[digits.length - 2], digits[digits.length - 1]]];
}

// Get user input for duration
readline.question('Enter value for duration: ', d => {
    var num = 0;
    if (d >= 720) num += 31 * (Math.floor(d / 720));
    var results = findFavTimes(d % 720);
    console.log("Number of favourite times:", num += results[0]);
    console.log(`Stopped at ${results[1][0]}:${results[1][1]}${results[1][2]}`);
    readline.close();
});
