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
    finished = false,
    ufo_running = false,
    speed = INITIAL_SPEED;


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
  if (updated_score > 20 && updated_score % 200 <= 15) {
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
  $('.lives ul li:nth-child('+lives+')').hide();  // hide heart icon
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
      ufo.css({left: ufo.position().left + 1 + 'px'});
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
    $('.lives ul li').show();
    finished = false;
    speed = INITIAL_SPEED;
  });


  for (var i = 0; i < N_OF_BALLOONS; i++) {
    var $balloon = newBalloon();
    array_balloons.push($balloon);
    ascendBalloon($balloon);
  }

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQkFMTE9PTl9QWF9IRUlHSFQgPSAxNDAsXG4gICAgVUZPX1BYX1dJRFRIICAgICAgPSAxMjEsXG4gICAgTl9PRl9CQUxMT09OUyAgICAgPSA1LFxuICAgIElOSVRJQUxfU1BFRUQgICAgID0gMSwgICAgICAgIC8vIG1lYXN1cmVkIGluIHBpeGVscyBwZXIgbW92ZW1lbnRcbiAgICBJTkNSRUFTSU5HX1NQRUVEX1JBVEUgPSAxZTUsICAvLyB0aGUgbG93ZXIgdGhlIGZhc3RlclxuICAgIFVGT19TQ09SRSAgICAgICAgID0gMTAwLFxuICAgIHNjb3JpbmcgPSB7J2dyZWVuJzogNSwgJ2JsdWUnOiAxMCwgJ29yYW5nZSc6IDE1LCAncmVkJzogMjB9LFxuICAgIGxpdmVzID0gMyxcbiAgICBhcnJheV9iYWxsb29ucyA9IFtdLFxuICAgICR1Zm8gPSBudWxsLFxuICAgIGZpbmlzaGVkID0gZmFsc2UsXG4gICAgdWZvX3J1bm5pbmcgPSBmYWxzZSxcbiAgICBzcGVlZCA9IElOSVRJQUxfU1BFRUQ7XG5cblxuLyogTW92ZXMgYmFsbG9vbiBhc2NlbmRpbmcgKi9cbmZ1bmN0aW9uIGFzY2VuZEJhbGxvb24oYmFsbG9vbikge1xuICBpZiAoYmFsbG9vbi5wb3NpdGlvbigpLnRvcCA+IC1CQUxMT09OX1BYX0hFSUdIVCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBiYWxsb29uLmNzcyh7dG9wOiBiYWxsb29uLnBvc2l0aW9uKCkudG9wIC0gc3BlZWQgKyAncHgnfSk7XG4gICAgICBhc2NlbmRCYWxsb29uKGJhbGxvb24pO1xuICAgIH0sIHJuZCg1LCAyMCkpOyAgLy8gYmFsbG9vbiBzcGVlZCBjaGFuZ2luZ1xuICB9XG4gIGVsc2Uge1xuICAgIHJlc2V0QmFsbG9vbihiYWxsb29uKTtcbiAgICBzdWJ0cmFjdExpZmUoKTtcbiAgICBhc2NlbmRCYWxsb29uKGJhbGxvb24pO1xuICB9XG59XG5cblxuLyogUmV0dXJucyBhIFN0cmluZyBvZiBhIHJhbmRvbSBiYWxsb29uIGNvbG9yICovXG5mdW5jdGlvbiBnZXRSbmRDb2xvcigpIHtcbiAgdmFyIGNvbG9ycyA9IE9iamVjdC5rZXlzKHNjb3JpbmcpO1xuICB2YXIgaWR4ID0gcm5kKDAsIGNvbG9ycy5sZW5ndGggLSAxKTtcbiAgcmV0dXJuIGNvbG9yc1tpZHhdO1xufVxuXG5cbi8qIENyZWF0ZXMgbmV3IGVsZW1lbnQgYmFsbG9vbiBpbiBET00gKi9cbmZ1bmN0aW9uIG5ld0JhbGxvb24oKSB7XG4gIHZhciAkYmFsbG9vbiA9ICQoJzxpbWcgY2xhc3M9XCJiYWxsb29uXCI+Jyk7XG4gIGluaXRCYWxsb29uKCRiYWxsb29uKTtcbiAgJGJhbGxvb24uYXBwZW5kVG8oJCgnYm9keScpKTtcbiAgcmV0dXJuICRiYWxsb29uO1xufVxuXG5cbi8qIEFkZHMgc2NvcmUgdG8gdGhlIHB1bmN0dWF0aW9uIHNpZ24gKi9cbmZ1bmN0aW9uIGFkZFNjb3JlKHNjb3JlKSB7XG4gIHZhciBjdXJyZW50X3Njb3JlID0gcGFyc2VJbnQoJChcIiNwb2ludHNcIikuaHRtbCgpKTtcbiAgdmFyIHVwZGF0ZWRfc2NvcmUgPSBjdXJyZW50X3Njb3JlICsgc2NvcmU7XG4gICQoXCIjcG9pbnRzXCIpLmh0bWwodXBkYXRlZF9zY29yZSk7XG4gIGluY3JlYXNlQmFsbG9vblNwZWVkKHVwZGF0ZWRfc2NvcmUpO1xuICBpZiAodXBkYXRlZF9zY29yZSA+IDIwICYmIHVwZGF0ZWRfc2NvcmUgJSAyMDAgPD0gMTUpIHtcbiAgICBsYXVuY2hVZm8oKTtcbiAgfVxufVxuXG5cbi8qIFNldHMgbmV3IHByb3BlcnRpZXMgdG8gYmFsbG9vbiAgKi9cbmZ1bmN0aW9uIGluaXRCYWxsb29uKGJhbGxvb24pIHtcbiAgdmFyIGNvbG9yID0gZ2V0Um5kQ29sb3IoKTtcbiAgYmFsbG9vbi5hdHRyKCdzcmMnLCBcImltYWdlcy9iYWxsb29uLVwiK2NvbG9yK1wiLnBuZ1wiKTtcbiAgYmFsbG9vbi5kYXRhKFwic2NvcmVcIiwgc2NvcmluZ1tjb2xvcl0pO1xuICBiYWxsb29uLmNzcyh7bGVmdDogcm5kKDAsIDk1KSArICclJ30pOyAvLyBsZWZ0OiAoOTYtMTAwJSkgLT4gYmFsbG9vbiBhbG1vc3Qgbm90IHZpc2libGVcbn1cblxuXG4vKiBSZXVzZXMgYmFsbG9vbiBzZXR0aW5nIG5ldyBwcm9wZXJ0aWVzIGFuZCBtb3ZpbmcgaXQgdG8gdGhlIGJvdHRvbSAgKi9cbmZ1bmN0aW9uIHJlc2V0QmFsbG9vbihiYWxsb29uKSB7XG4gIGluaXRCYWxsb29uKGJhbGxvb24pO1xuICBiYWxsb29uLmNzcyh7dG9wOiAkKCdib2R5JykuaGVpZ2h0KCl9KTtcbn1cblxuXG4vKiBTdWJ0cmFjdHMgbGlmZSwgdXBkYXRlIHRoZSBsaXZlcyBzaWduIGFuZCBjaGVjayBpZiB0aGUgcGxheWVyIGxvc2UgKi9cbmZ1bmN0aW9uIHN1YnRyYWN0TGlmZSgpIHtcbiAgJCgnLmxpdmVzIHVsIGxpOm50aC1jaGlsZCgnK2xpdmVzKycpJykuaGlkZSgpOyAgLy8gaGlkZSBoZWFydCBpY29uXG4gIGxpdmVzID0gbGl2ZXMgLSAxO1xuICBpZiAobGl2ZXMgPT09IDApIHtcbiAgICAkKCcucmVzdWx0JykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgZmluaXNoZWQgPSB0cnVlO1xuICB9XG59XG5cblxuLyogSW5jcmVhc2VzIGJhbGxvb25zIHNwZWVkICovXG5mdW5jdGlvbiBpbmNyZWFzZUJhbGxvb25TcGVlZChzY29yZSkge1xuICBzcGVlZCA9IHNwZWVkICsgKHNjb3JlL0lOQ1JFQVNJTkdfU1BFRURfUkFURSk7XG59XG5cblxuLyogQ3JlYXRlcyBET00gZWxlbWVudCB3aXRoIFVGTyAqL1xuZnVuY3Rpb24gbGF1bmNoVWZvKCkge1xuICAvLyBGaXJzdCB0aW1lIHVmbyBpcyBjcmVhdGVkXG4gIGlmICgkdWZvID09PSBudWxsKSB7XG4gICAgJHVmbyA9ICQoJzxpbWcgY2xhc3M9XCJ1Zm9cIj4nKTtcbiAgICAkdWZvLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gICAgJHVmby5hdHRyKCdzcmMnLCBcImltYWdlcy91Zm8ucG5nXCIpO1xuICAgICR1Zm8uZGF0YShcInNjb3JlXCIsIFVGT19TQ09SRSk7XG4gIH1cbiAgdWZvX3J1bm5pbmcgPSB0cnVlO1xuICBtb3ZlVWZvKCR1Zm8pO1xufVxuXG5cbi8qIE1vdmVzIFVGTyBob3Jpem9udGFsbHkgKi9cbmZ1bmN0aW9uIG1vdmVVZm8odWZvKSB7XG4gIGlmICh1Zm9fcnVubmluZyAmJiB1Zm8ucG9zaXRpb24oKS5sZWZ0IDwgJCgnYm9keScpLndpZHRoKCkpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdWZvLmNzcyh7bGVmdDogdWZvLnBvc2l0aW9uKCkubGVmdCArIDEgKyAncHgnfSk7XG4gICAgICBtb3ZlVWZvKHVmbyk7XG4gICAgfSwgMTApO1xuICB9XG4gIGVsc2Uge1xuICAgIHJlc2V0VWZvKHVmbyk7XG4gIH1cbn1cblxuXG4vKiBQbGFjZXMgVUZPIHRvIHN0YXJ0IHBvc2l0aW9uIGFuZCBzdG9wcyBpdCAqL1xuZnVuY3Rpb24gcmVzZXRVZm8odWZvKSB7XG4gIHVmby5jc3Moe2xlZnQ6IC1VRk9fUFhfV0lEVEh9KTtcbiAgdWZvX3J1bm5pbmcgPSBmYWxzZTtcbn1cblxuXG4vKiBUaHJvd3MgZXZlbnQgd2hlbiBiYWxsb29uIGlzIGNsaWNrZWQgKi9cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYmFsbG9vbicsIGZ1bmN0aW9uKCkge1xuICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgYWRkU2NvcmUoJCh0aGlzKS5kYXRhKFwic2NvcmVcIikpO1xuICAgIHJlc2V0QmFsbG9vbigkKHRoaXMpKTtcbiAgfVxufSk7XG5cblxuLyogVGhyb3dzIGV2ZW50IHdoZW4gVUZPIGlzIGNsaWNrZWQgKi9cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcudWZvJywgZnVuY3Rpb24oKSB7XG4gIGlmICghZmluaXNoZWQpIHtcbiAgICBhZGRTY29yZSgkKHRoaXMpLmRhdGEoXCJzY29yZVwiKSk7XG4gICAgcmVzZXRVZm8oJCh0aGlzKSk7XG4gIH1cbn0pO1xuXG5cbi8qKipcbiAqIFV0aWxzXG4gKioqL1xuXG4vKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoaW5jbHVzaXZlKSAqL1xuZnVuY3Rpb24gcm5kKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICkgKyBtaW47XG59XG5cblxuLyogT24gbG9hZCAqL1xuJChmdW5jdGlvbigpIHtcblxuICAvKiBSZXNldHMgdGhlIGdhbWUgKi9cbiAgJChcIiNhZ2FpblwiKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAkKCcucmVzdWx0JykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgJChcIiNwb2ludHNcIikuaHRtbCgwKTtcbiAgICAvLyBBbGwgYmFsbG9vbnMgdG8gYm90dG9tXG4gICAgJC5lYWNoKCBhcnJheV9iYWxsb29ucywgZnVuY3Rpb24oIGluZGV4LCBiYWxsb29uICl7XG4gICAgICByZXNldEJhbGxvb24oYmFsbG9vbik7XG4gICAgfSk7XG4gICAgbGl2ZXMgPSAzO1xuICAgICQoJy5saXZlcyB1bCBsaScpLnNob3coKTtcbiAgICBmaW5pc2hlZCA9IGZhbHNlO1xuICAgIHNwZWVkID0gSU5JVElBTF9TUEVFRDtcbiAgfSk7XG5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IE5fT0ZfQkFMTE9PTlM7IGkrKykge1xuICAgIHZhciAkYmFsbG9vbiA9IG5ld0JhbGxvb24oKTtcbiAgICBhcnJheV9iYWxsb29ucy5wdXNoKCRiYWxsb29uKTtcbiAgICBhc2NlbmRCYWxsb29uKCRiYWxsb29uKTtcbiAgfVxuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
