var BALLOON_PX_HEIGHT = 140,
    N_OF_BALLOONS     = 5,
    scoring = {'green': 5, 'blue': 10, 'orange': 15, 'red': 20},
    lives = 3,
    array_balloons = [],
    finished = false;


/* Moves balloon ascending */
function ascend(balloon) {
  if (balloon.position().top > -BALLOON_PX_HEIGHT) {
    setTimeout(function() {
      balloon.css({top: balloon.position().top - 1 + 'px'});
      ascend(balloon);
    }, rnd(5, 20));  // balloon speed changing
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
  var idx = rnd(0, colors.length - 1);
  return colors[idx];
}


/* Creates new element balloon in DOM */
function newBalloon() {
  var $balloon = $('<img class="balloon">');
  initBalloon($balloon);
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
  balloon.css({left: rnd(0, 95) + '%'}); // left: (96-100%) -> balloon almost not visible
}


/* Reuses balloon setting new properties and moving it to the bottom  */
function resetBalloon(balloon) {
  initBalloon(balloon);
  balloon.css({top: $('body').height()});
}


/* Subtracts life, update the lives sign and check if the player lose */
function subtractLife() {
  $('.lives ul li:nth-child('+lives+')').hide();  // hide heart icon
  lives = lives - 1;
  if (lives === 0) {
    $('.result').addClass("active");
    finished = true;
  }
}


/* Throws event when balloon is clicked */
$(document).on('click', '.balloon', function() {
  if (!finished) {
    addScore($(this).data("score"));
    resetBalloon($(this));
  }
});


/***
 * Utils
 ***/

/* Returns a random integer between min (inclusive) and max (inclusive) */
function rnd(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}


/* On load */
$(function() {

  /* Resets the game */
  $("#again").on('click', function() {
    $('.result').removeClass("active");
    $("#points").html(0);
    // All balloons to bottom
    $.each( array_balloons, function( index, balloon ){
      resetBalloon(balloon);
    });
    lives = 3;
    $('.lives ul li').show();
    finished = false;
  });


  for (var i = 0; i < N_OF_BALLOONS; i++) {
    var $balloon = newBalloon();
    array_balloons.push($balloon);
    ascend($balloon);
  }
});
