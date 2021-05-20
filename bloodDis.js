const fs = require('fs')

// Distributing Rh negative blood first (high priority)
var solveSupplyNeg = function (supply, demand, x) {
    var types = ["O neg", "A neg", "B neg", "AB neg"];
    for (var y = x; y >= 0; y--) {
        if (x === 2 && y == 1) y = 0;
        if (parseInt(supply[types[y]]) < parseInt(demand[types[x]])) {
            demand[types[x]] -= supply[types[y]];
            supply[types[y]] = 0;
        }
        else {
            supply[types[y]] -= demand[types[x]];
            demand[types[x]] = 0;
            break;
        }
    }
    return;
}

// Distributing Rh positive blood second (low priority)
var solveSupplyPos = function (supply, demand, x) {
    var types = ["O neg", "O pos", "A neg", "A pos", "B neg", "B pos", "AB neg", "AB pos"];
    for (var y = x; y >= 0; y--) {
        if (x === 5 && y == 3) y = 1;
        if (parseInt(supply[types[y]]) < parseInt(demand[types[x]])) {
            demand[types[x]] -= supply[types[y]];
            supply[types[y]] = 0;
        }
        else {
            supply[types[y]] -= demand[types[x]];
            demand[types[x]] = 0;
            break;
        }
    }
    return;
}

// Get remainder of blood units
var getSupplyRemainder = function (obj) {
    var count = 0;
    for (var x = 0; x < 8; x++) {
        count += parseInt(obj[Object.keys(obj)[x]]);
    }
    return count;
}

// Main function to maximize blood delivery
var numPatients = function (data) {
    var split = data.search(/\n/);
    var line1 = data.substring(0, split).split(" ");
    var line2 = data.substring(split + 1, data.length).split(" ");
    var totalInit = 0;
    for (var x = 0; x < 8; x++) {
        totalInit += parseInt(line1[x])
    }
    var supply = {
        "O neg": line1[0],
        "A neg": line1[2],
        "B neg": line1[4],
        "AB neg": line1[6],
        "O pos": line1[1],
        "A pos": line1[3],
        "B pos": line1[5],
        "AB pos": line1[7],
    }
    var demand = {
        "O neg": line2[0],
        "A neg": line2[2],
        "B neg": line2[4],
        "AB neg": line2[6],
        "O pos": line2[1],
        "A pos": line2[3],
        "B pos": line2[5],
        "AB pos": line2[7],
    }
    for (var x = 0; x < 4; x++) {
        solveSupplyNeg(supply, demand, x);
    }
    for (var x = 0; x < 4; x++) {
        solveSupplyPos(supply, demand, (x * 2) + 1);
    }
    var totalFinal = getSupplyRemainder(supply);
    console.log(totalInit - totalFinal);
    return;
}

// Reading from file 'bloodDis.txt'
fs.readFile('bloodDis.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return;
    }
    numPatients(data);
    return;
})
