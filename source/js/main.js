var BALLOON_PX_HEIGHT = 140,
    UFO_PX_WIDTH      = 121,
    N_OF_BALLOONS     = 5,
    INITIAL_SPEED     = 1,        // measured in pixels per movement
    INCREASING_SPEED_RATE = 1e5,  // the lower the faster
    UFO_SCORE         = 100,
    scoring = {'green': 5, 'blue': 10, 'orange': 15, 'red': 20},
    lives = 3,
    array_balloons = [],
    $ufo = null,
    finished = false,       // when gaming over, don't let poping balloons
    ufo_running = false,    // to know when UFO should be moved
    ufo_ascending = true,   // for senoidal path
    speed = INITIAL_SPEED;  // balloons speed


/* Moves balloon ascending */
function ascendBalloon(balloon) {
  if (balloon.position().top > -BALLOON_PX_HEIGHT) {
    setTimeout(function() {
      balloon.css({top: balloon.position().top - speed + 'px'});
      ascendBalloon(balloon);
    }, rnd(5, 20));  // balloon speed changing
  }
  else {
    resetBalloon(balloon);
    subtractLife();
    ascendBalloon(balloon);
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
  var updated_score = current_score + score;
  $("#points").html(updated_score);
  increaseBalloonSpeed(updated_score);
  if (updated_score > 20 && updated_score % 500 <= 15) { // launch UFO every 500 points
    launchUfo();
  }
}


/* Sets new properties to balloon  */
function initBalloon(balloon) {
  var color = getRndColor();
  balloon.attr('src', "images/balloon-"+color+".png");
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
  $('.lives ul li:nth-child('+lives+')').css('visibility', 'hidden');  // hide heart icon
  lives = lives - 1;
  if (lives === 0) {
    $('.result').addClass("active");
    finished = true;
  }
}


/* Increases balloons speed */
function increaseBalloonSpeed(score) {
  speed = speed + (score/INCREASING_SPEED_RATE);
}


/* Creates DOM element with UFO */
function launchUfo() {
  // First time ufo is created
  if ($ufo === null) {
    $ufo = $('<img class="ufo">');
    $ufo.appendTo($('body'));
    $ufo.attr('src', "images/ufo.png");
    $ufo.data("score", UFO_SCORE);
  }
  ufo_running = true;
  moveUfo($ufo);
}


/* Moves UFO horizontally */
function moveUfo(ufo) {
  if (ufo_running && ufo.position().left < $('body').width()) {
    setTimeout(function() {
      ufo.css({left: ufo.position().left + 1 + 'px', top: senoidal(ufo.position().top) });
      moveUfo(ufo);
    }, 10);
  }
  else {
    resetUfo(ufo);
  }
}


/* Places UFO to start position and stops it */
function resetUfo(ufo) {
  ufo.css({left: -UFO_PX_WIDTH});
  ufo_running = false;
}


/* Simulates senoidal UFO path */
function senoidal(top) {
  var window_height = $('body').height();
  var ufo_height_percentage = top/window_height; // 0..1
  if (ufo_ascending) {
    if (ufo_height_percentage < 0.45) {
      ufo_ascending = false;
    }
    return top - 0.75;
  }
  else {
    if (ufo_height_percentage > 0.55) {
      ufo_ascending = true;
    }
    return top + 0.75;
  }
}


/* Throws event when balloon is clicked */
$(document).on('click', '.balloon', function() {
  if (!finished) {
    addScore($(this).data("score"));
    resetBalloon($(this));
  }
});


/* Throws event when UFO is clicked */
$(document).on('click', '.ufo', function() {
  if (!finished) {
    addScore($(this).data("score"));
    resetUfo($(this));
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
    $('.lives ul li').css('visibility', 'visible');
    finished = false;
    speed = INITIAL_SPEED;
  });


  /* Creating balloons */
  for (var i = 0; i < N_OF_BALLOONS; i++) {
    var $balloon = newBalloon();
    array_balloons.push($balloon);
    ascendBalloon($balloon);
  }

});
