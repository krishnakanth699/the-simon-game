
var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var flag = false;
var level = 0;

$(document).keypress(function(){
    if(!flag)
    {
        flag = true;
        $("h1").text("Level"+level);
        nextSequence();
    }
});

function nextSequence()
{
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log(gamePattern);
}

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if(flag)
    {
        userClickedPattern.push(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    }
    console.log(userClickedPattern);
});

function checkAnswer(number)
{
    if(gamePattern[number] === userClickedPattern[number])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            nextSequence();
            userClickedPattern = [];
        }
    }
    else
    {
        flag = false;
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
