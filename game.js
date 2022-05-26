var gamePattern = [];
var userPattern = [];
var level = -1;

var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var blue = new Audio("sounds/blue.mp3");
var gameover = new Audio("sounds/wrong.mp3");

var allAudios = [green, red, yellow, blue, gameover];

var colours = ["green", "red", "yellow", "blue"];

$(document).on("keypress", nextTile);

function nextTile(){
    var num = Math.floor(Math.random()*4);
    $("." + colours[num]).fadeOut(100).fadeIn(100);
    allAudios[num].currentTime = 0;
    allAudios[num].play();
    gamePattern[gamePattern.length] = num;
    console.log(gamePattern);
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
    $(document).off("keypress");
}

$(".green").on("click", function(){
    tileClicked(0);
})

$(".red").on("click", function(){
    tileClicked(1);
});

$(".yellow").on("click", function(){
    tileClicked(2);
});


$(".blue").on("click", function(){
    tileClicked(3);
});

function checkNext(){
    if(userPattern[userPattern.length - 1] == gamePattern[userPattern.length - 1]){
        if(userPattern.length == gamePattern.length){
            setTimeout(function(){
                nextTile();
            }, 1000);
        }
    }
    else{
        gamePattern = [];
        gameover.currentTime = 0;
        gameover.play();
        $("h1").text("Game Over, Press any key to restart");
        level = -1;
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $(document).keypress(nextTile);
    }
}


function tileClicked(n){
    allAudios[n].currentTime = 0;
    allAudios[n].play();
    $("." + colours[n]).addClass("pressed");
    setTimeout(function(){
        $("." + colours[n]).removeClass("pressed");
    }, 100);
    
    userPattern[userPattern.length] = n;
    checkNext();
}