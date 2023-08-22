var gamepattern = [];
var userclickedpattern = [];
var buttoncolors = ["red", "blue", "green", "yellow"];


var started=false;
var level=0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }
});


function nextsequence() {
    userclickedpattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttoncolors[randomnumber];
    gamepattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
}

$(".btn").click(function () {
    var userchosencolour = $(this).attr("id");
    userclickedpattern.push(userchosencolour);
    animatepress(userchosencolour);
    playsound(userchosencolour);
    checkanswer(userclickedpattern.length-1);
});

function startover(){
    level=0;
    gamepattern=[];
    started=false;
}


function checkanswer(currentlevel){
    if(gamepattern[currentlevel]===userclickedpattern[currentlevel]){
        if(userclickedpattern.length===gamepattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }
    else{
        playsound("wrong")
        $("body").addClass("gameover");
        setTimeout(function(){
            $("body").removeClass("gameover");
        },200);

        $("#level-title").text("Game Over,Press any key to Restart");
        startover();
    }
}

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatepress(currentcolour){
    $("." + currentcolour).addClass("pressed");
    setTimeout(function(){
        $("."+currentcolour).removeClass("pressed");
    },100);
}


