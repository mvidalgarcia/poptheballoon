var BALLOON_HEIGHT = 140;
var scoring = {'green': 5, 'blue': 10, 'orange': 15, 'red': 20};
var lives = 3;
var array_balloons;


/* Moves balloon ascending */
function ascend(balloon) {
  if (balloon.position().top > -BALLOON_HEIGHT) {
    setTimeout(function() {
      balloon.css({top: balloon.position().top - 0.5 + 'px'});
      ascend(balloon);
    }, 5);
  }
  else {
    resetBalloon(balloon);
    subtractLife();
    ascend(balloon);
  }
}


/* Returns a String of a random balloon color */
function getRndColor() {
  var colors = Object.keys(scoring);
  var idx = rnd(colors.length - 1);
  return colors[idx];
}


/* Creates new element balloon in DOM */
function newBalloon() {
  var color = getRndColor();
  var $balloon = $('<img class="balloon" src="assets/images/balloon-'+color+'.png">');
  $balloon.data("score", scoring[color]);
  $balloon.css({left: rnd(95) + '%'}); // left: (96-100%) -> balloon almost not visible
  $balloon.appendTo($('body'));
  return $balloon;
}


/* Adds score to the punctuation sign */
function addScore(score) {
  var current_score = parseInt($("#points").html());
  $("#points").html(current_score + score);
}


/* Sets new properties to balloon  */
function initBalloon(balloon) {
  var color = getRndColor();
  balloon.attr('src', "assets/images/balloon-"+color+".png");
  balloon.data("score", scoring[color]);
  balloon.css({left: rnd(95) + '%'});
}


/* Reuses balloon setting new properties and moving it to the bottom  */
function resetBalloon(balloon) {
  initBalloon(balloon);
  balloon.css({top: $('body').height()});
}


/* Subtracts life, update the lives sign and check if the player lose */
function subtractLife() {
  lives = lives - 1;
  $('.lives ul li:last-child').remove();  // remove heart icon
  if (lives === 0) {
    $('.result').addClass("active");
  }
}


/* Throw event when balloon is clicked */
$(document).on('click', '.balloon', function(e) {
  addScore($(this).data("score"));
  resetBalloon($(this));
});


/* Utils */
function rnd(max) {
  return Math.floor( Math.random()*(max + 1) );
}


/* On load */
$(function() {
  console.log('poptheballoon!');
  for (var i = 0; i < 5; i++) {
    var $balloon = newBalloon();
    // array_balloons.push($balloon);
    ascend($balloon);
  }
});
