// for game logic
$(document).ready(()=>{


var buttonColours = ["red", "blue", "green", "yellow"]; // array of colors
var gamePattern = [];
var userClickPattern=[];
var randomNum;

// level of game 
var level=0;

// whenever key is pressed 
var toggler=false;
$(document).keypress(()=> {
if(!toggler){
nextSequence();
toggler=true;
$("#level-title").text("level "+level);
}
});

function nextSequence() {
  // reseting user clicked array every time  this function is called
  userClickPattern=[];

  randomNum = Math.floor(Math.random() * 4); // 0 to 3
  //   console.log(randomNum);
  var randomChosenColour = buttonColours[randomNum];
  // console.log(randomChosenColour);
  // animation
  $("#" + randomChosenColour)
    .fadeOut(60)
    .fadeIn(60);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);
  level+=1;
  $("#level-title").text("level "+level);

}


// for user click button 
$(".btn").click((event)=>{
  // console.log(event.currentTarget);
  let userChosenColour=$(event.currentTarget).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickPattern.push(userChosenColour);
  // console.log(userClickPattern);
  checkPattern(userClickPattern.length-1);
});

function checkPattern(index){
  if(userClickPattern[index]===gamePattern[index]){
    // console.log("success");
    if(userClickPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    $("body").addClass("game-over");
    // console.log("wrong");
    $("#level-title").text("game over!");
    setTimeout(function(){
      $("#level-title").text("press any key to restart");
      $("body").removeClass("game-over");
    },1500)
    toggler=false;
    level=0;
    gamePattern=[];
  }

}

// playing sound using function
function playSound(name){
// playing sound
let tune = new Audio("sounds/" + name + ".mp3");
tune.play();
}

// animation using function
function animatePress(color){
  // console.log(color);
$("."+color).addClass("pressed");
setTimeout(function(){
$("."+color).removeClass("pressed");
},100);
}

});