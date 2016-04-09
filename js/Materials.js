function PlayMaterialsClass() {

    /* Multi-dimensional array to hold a static resource container of choices to be made */
    this.playMaterials = [
							 ["appel", "bilder/appel.gif"],     // index 0
							 ["banan", "bilder/banan.gif"],     // index 1
                             ["gjord", "bilder/gjord.gif"],     // index 2
                             ["gurka", "bilder/gurka.gif"],     // index 3
                             ["morot", "bilder/morot.gif"],     // index 4
							 ["paron", "bilder/paron.gif"]     // index 5
/*
                             ["sten",  "bilder/sten.gif"],       // index 6 
                             ["sax",   "bilder/sax.gif"],         // index 7 
                             ["pase",  "bilder/pase.gif"]        // index 8 
*/
                             
    ];

    // variables to hold number of delays 
    this.DelayBetweenImagesShowSequence = 300;              // images show sequence timer

    // Playerlog writer delay timer. NB. added 200 Milliseconds from (300 * 3) = 900 to 1100
    this.DelayToWriteToPlayersPlayingLog = (this.DelayBetweenImagesShowSequence * 3) + 200;           

    // Jackpot image
    this.ImagesThatEarns100PointsArray = ["paron"];                 // images that lands a 100 jackpot reward
}

// Return a random number between 0 and 5 that will result into 6 probably randoms:
// We set the Max number to be randomized based on the array length above
PlayMaterialsClass.prototype.Randomizer = function () {
    return Math.floor((Math.random() * this.playMaterials.length) + 1) - 1;
};

// Find occurance of a string in a Randomized single dimensional array of image names
PlayMaterialsClass.prototype.CheckOccuranceOfStringsInArray = function (randomizedNamesArray) {

    var ultimateNumberOfSearchStringOccurances = 0;

    // Go through all elements in array
    for (var j = 0; j < randomizedNamesArray.length; j++) {

        // variable to count the current string's number of occurances in the Array
        var numberOfSearchStringOccurances = 0;

        // holding one string, go through the whole array and match 
        // all elements that match the current held string at randomizedNamesArray[j].
        // we are always sure to return number 1 because a string will 
        // atleast match to itself
        for (var i = 0; i < randomizedNamesArray.length; i++) {
            if (randomizedNamesArray[j].match(randomizedNamesArray[i]))
                numberOfSearchStringOccurances += 1;
        }

        // we should see the highest number of occurancies. Keep the biggest number only 
        if (ultimateNumberOfSearchStringOccurances < numberOfSearchStringOccurances)
            ultimateNumberOfSearchStringOccurances = numberOfSearchStringOccurances;
    }

    return ultimateNumberOfSearchStringOccurances;
};

// Reward Player with money based on the rules of the game
// Rule 1 - 2 Matches in a row = 2kr
// Rule 2 - 3 Matches in a row = 20 kr
// Rule 3 - 3 Matches of Päron = 100kr
// Rule 4 - 1 Match and account decreases by 1kr
PlayMaterialsClass.prototype.RewardByValue = function (occuranceNumber, randomizedNamesArray) {

    var playerAccountEffect;

    if (occuranceNumber == 2)  playerAccountEffect = 2;
    else if (occuranceNumber == 3) playerAccountEffect = this.CheckIfAllReturnedWereJackpotImagesOrNot(randomizedNamesArray);
    else playerAccountEffect = -1;

    return playerAccountEffect;
};

// Check for the numbe of occurance of the word "**" in the string array, that could be a jackpot string
PlayMaterialsClass.prototype.CheckIfAllReturnedWereJackpotImagesOrNot = function (randomizedNamesArray) {

    var numberOfSearchStringOccurances = 0;
    for (var i = 0; i < randomizedNamesArray.length; i++) {
        for (var j = 0; j < this.ImagesThatEarns100PointsArray.length; j++) {
            if (randomizedNamesArray[i].match(this.ImagesThatEarns100PointsArray[j]))
                numberOfSearchStringOccurances += 1;
        }
    }
    
    return (numberOfSearchStringOccurances == 3) ? 100 : 20;
};

// Keep current reward value in hidden element
PlayMaterialsClass.prototype.KeepNewValueInHiddenElement = function (newVal) {

    var previousValue = parseFloat($('#currentScoreHolder').val());
    $('#currentScoreHolder').val(previousValue + newVal);
};

// Print Randomized images into Image Elements
PlayMaterialsClass.prototype.PersistImages = function(imageNames) {
    for (var i = 1; i < 4; i++) {
        this.PersistParticularImage(i, imageNames[i - 1]);
    }
};

PlayMaterialsClass.prototype.PersistParticularImage = function(imageIndex, imageDivName) {
    $("#" + imageIndex + "Choice").css("display", "none");
    $("#" + imageIndex + "Choice").attr("src", $("#" + imageIndex + "ChoiceImageSrcHolder").val());

    $("#div" + imageIndex + "ChoiceName").css("display", "none");
    $("#div" + imageIndex + "ChoiceName").html(imageDivName);

    //$("#" + imageIndex + "Choice").fadeIn(1000);
    //$("#" + imageIndex + "Choice").slideDown();
};

