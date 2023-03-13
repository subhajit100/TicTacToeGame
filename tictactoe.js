var chance = 0;
var started = true;
var oddChancePositionList = [];
var evenChancePositionList = [];

$(".btn").click(function(){
    
    if(started){
        var clickedElementPosition = $(this).attr("id");
    
        if(!oddChancePositionList.includes(clickedElementPosition.toString()) && !evenChancePositionList.includes(clickedElementPosition.toString())){
            chance++;
            animatePress(clickedElementPosition);
            if(isOddChance()){
                playSound("first_player");
            }
            else{
                playSound("second_player");
            }
            if(isOddChance()){
                oddChancePositionList.push(clickedElementPosition);
            }
            else{
                evenChancePositionList.push(clickedElementPosition);
            }
            if(someOneWins()){
                // leave as it is, do all the processing inside someOneWins()
                started = false;
                playSound("game-ending-sound");
            }
            else if(chance==9){
                // match tie, no one wins
                $(".status-title").text("Match draw, no one wins");
                started = false;
                playSound("game-ending-sound");
            }
        }
    }
});

function playSound(soundType){
    var audio = new Audio("sounds/"+ soundType + ".wav");
    audio.play();
}

$(".restart-btn").click(function(){
    animatePressForButton("res-btn");
    $(".status-title").text("New Game");
    $(".status-title").css("color", "blue");
    doTheEndingCeremony();
    started = true;
});

function someOneWins(){
    if(isOddChance()){
        // will process for cross.
         // check all combinations of wins for odd chance position list here
        if(ifPatternMatchWin(oddChancePositionList)){
            $(".status-title").text("Red player wins");
            $(".status-title").css("color", "red");
            return true;
        }
    }
    else{
        // will process for circle.
         // check all combinations of wins for even chance position list here
        if(ifPatternMatchWin(evenChancePositionList)){
            $(".status-title").text("Green player wins");
            $(".status-title").css("color", "green");
            return true;
        }
    }
    return false;
}

function ifPatternMatchWin(positionList){
    if(topRowMatch(positionList)){
        return true;
    }
    else if(middleRowMatch(positionList)){
        return true;
    }
    else if(bottomRowMatch(positionList)){
        return true;
    }
    else if(leftColumnMatch(positionList)){
        return true;
    }
    else if(middleColumnMatch(positionList)){
        return true;
    }
    else if(rightColumnMatch(positionList)){
        return true;
    }
    else if(leftToRightDiagonalMatch(positionList)){
        return true;
    }
    else if(rightToLeftDiagonalMatch(positionList)){
        return true;
    }
}

function topRowMatch(positionList){
    return (positionList.includes("tl") && positionList.includes("tm") && positionList.includes("tr"));
}

function middleRowMatch(positionList){
    return (positionList.includes("ml") && positionList.includes("mm") && positionList.includes("mr"));
}

function bottomRowMatch(positionList){
    return (positionList.includes("bl") && positionList.includes("bm") && positionList.includes("br"));
}

function leftColumnMatch(positionList){
    return (positionList.includes("tl") && positionList.includes("ml") && positionList.includes("bl"));
}

function middleColumnMatch(positionList){
    return (positionList.includes("tm") && positionList.includes("mm") && positionList.includes("bm"));
}

function rightColumnMatch(positionList){
    return (positionList.includes("tr") && positionList.includes("mr") && positionList.includes("br"));
}

function leftToRightDiagonalMatch(positionList){
    return (positionList.includes("tl") && positionList.includes("mm") && positionList.includes("br"));
}

function rightToLeftDiagonalMatch(positionList){
    return (positionList.includes("tr") && positionList.includes("mm") && positionList.includes("bl"));
}

function doTheEndingCeremony(){
    chance = 0;
    oddChancePositionList = [];
    evenChancePositionList = [];
    $(".btn").css("background-color", "yellow");
}

function animatePressForButton(restartId){
    $("#"+restartId).addClass("pressed");
    setTimeout(function(){
        $("#"+restartId).removeClass("pressed");
    },100);
}

function animatePress(userChosenPosition){
    animatePressForButton(userChosenPosition);
    if(isOddChance()){
        $("#"+userChosenPosition).css("background-color", "red");
    }
    else{
        $("#"+userChosenPosition).css("background-color", "green");
    }
}

function isOddChance(){
    return chance%2;
}