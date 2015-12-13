var BALLOON_PX_HEIGHT = 140,
    N_OF_BALLOONS     = 5,
    INITIAL_SPEED     = 1,        // measured in pixels per movement
    INCREASING_SPEED_RATE = 1e5,  // the lower the faster
    scoring = {'green': 5, 'blue': 10, 'orange': 15, 'red': 20},
    lives = 3,
    array_balloons = [],
    finished = false,
    speed = INITIAL_SPEED;


/* Moves balloon ascending */
function ascend(balloon) {
  if (balloon.position().top > -BALLOON_PX_HEIGHT) {
    setTimeout(function() {
      balloon.css({top: balloon.position().top - speed + 'px'});
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
  var updated_score = current_score + score;
  $("#points").html(updated_score);
  increaseBalloonSpeed(updated_score);
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


/* Increases balloons speed */
function increaseBalloonSpeed(score) {
  speed = speed + (score/INCREASING_SPEED_RATE);
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
    speed = INITIAL_SPEED;
  });


  for (var i = 0; i < N_OF_BALLOONS; i++) {
    var $balloon = newBalloon();
    array_balloons.push($balloon);
    ascend($balloon);
  }

});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQkFMTE9PTl9QWF9IRUlHSFQgPSAxNDAsXG4gICAgTl9PRl9CQUxMT09OUyAgICAgPSA1LFxuICAgIElOSVRJQUxfU1BFRUQgICAgID0gMSwgICAgICAgIC8vIG1lYXN1cmVkIGluIHBpeGVscyBwZXIgbW92ZW1lbnRcbiAgICBJTkNSRUFTSU5HX1NQRUVEX1JBVEUgPSAxZTUsICAvLyB0aGUgbG93ZXIgdGhlIGZhc3RlclxuICAgIHNjb3JpbmcgPSB7J2dyZWVuJzogNSwgJ2JsdWUnOiAxMCwgJ29yYW5nZSc6IDE1LCAncmVkJzogMjB9LFxuICAgIGxpdmVzID0gMyxcbiAgICBhcnJheV9iYWxsb29ucyA9IFtdLFxuICAgIGZpbmlzaGVkID0gZmFsc2UsXG4gICAgc3BlZWQgPSBJTklUSUFMX1NQRUVEO1xuXG5cbi8qIE1vdmVzIGJhbGxvb24gYXNjZW5kaW5nICovXG5mdW5jdGlvbiBhc2NlbmQoYmFsbG9vbikge1xuICBpZiAoYmFsbG9vbi5wb3NpdGlvbigpLnRvcCA+IC1CQUxMT09OX1BYX0hFSUdIVCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBiYWxsb29uLmNzcyh7dG9wOiBiYWxsb29uLnBvc2l0aW9uKCkudG9wIC0gc3BlZWQgKyAncHgnfSk7XG4gICAgICBhc2NlbmQoYmFsbG9vbik7XG4gICAgfSwgcm5kKDUsIDIwKSk7ICAvLyBiYWxsb29uIHNwZWVkIGNoYW5naW5nXG4gIH1cbiAgZWxzZSB7XG4gICAgcmVzZXRCYWxsb29uKGJhbGxvb24pO1xuICAgIHN1YnRyYWN0TGlmZSgpO1xuICAgIGFzY2VuZChiYWxsb29uKTtcbiAgfVxufVxuXG5cbi8qIFJldHVybnMgYSBTdHJpbmcgb2YgYSByYW5kb20gYmFsbG9vbiBjb2xvciAqL1xuZnVuY3Rpb24gZ2V0Um5kQ29sb3IoKSB7XG4gIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhzY29yaW5nKTtcbiAgdmFyIGlkeCA9IHJuZCgwLCBjb2xvcnMubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBjb2xvcnNbaWR4XTtcbn1cblxuXG4vKiBDcmVhdGVzIG5ldyBlbGVtZW50IGJhbGxvb24gaW4gRE9NICovXG5mdW5jdGlvbiBuZXdCYWxsb29uKCkge1xuICB2YXIgJGJhbGxvb24gPSAkKCc8aW1nIGNsYXNzPVwiYmFsbG9vblwiPicpO1xuICBpbml0QmFsbG9vbigkYmFsbG9vbik7XG4gICRiYWxsb29uLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gIHJldHVybiAkYmFsbG9vbjtcbn1cblxuXG4vKiBBZGRzIHNjb3JlIHRvIHRoZSBwdW5jdHVhdGlvbiBzaWduICovXG5mdW5jdGlvbiBhZGRTY29yZShzY29yZSkge1xuICB2YXIgY3VycmVudF9zY29yZSA9IHBhcnNlSW50KCQoXCIjcG9pbnRzXCIpLmh0bWwoKSk7XG4gIHZhciB1cGRhdGVkX3Njb3JlID0gY3VycmVudF9zY29yZSArIHNjb3JlO1xuICAkKFwiI3BvaW50c1wiKS5odG1sKHVwZGF0ZWRfc2NvcmUpO1xuICBpbmNyZWFzZUJhbGxvb25TcGVlZCh1cGRhdGVkX3Njb3JlKTtcbn1cblxuXG4vKiBTZXRzIG5ldyBwcm9wZXJ0aWVzIHRvIGJhbGxvb24gICovXG5mdW5jdGlvbiBpbml0QmFsbG9vbihiYWxsb29uKSB7XG4gIHZhciBjb2xvciA9IGdldFJuZENvbG9yKCk7XG4gIGJhbGxvb24uYXR0cignc3JjJywgXCJhc3NldHMvaW1hZ2VzL2JhbGxvb24tXCIrY29sb3IrXCIucG5nXCIpO1xuICBiYWxsb29uLmRhdGEoXCJzY29yZVwiLCBzY29yaW5nW2NvbG9yXSk7XG4gIGJhbGxvb24uY3NzKHtsZWZ0OiBybmQoMCwgOTUpICsgJyUnfSk7IC8vIGxlZnQ6ICg5Ni0xMDAlKSAtPiBiYWxsb29uIGFsbW9zdCBub3QgdmlzaWJsZVxufVxuXG5cbi8qIFJldXNlcyBiYWxsb29uIHNldHRpbmcgbmV3IHByb3BlcnRpZXMgYW5kIG1vdmluZyBpdCB0byB0aGUgYm90dG9tICAqL1xuZnVuY3Rpb24gcmVzZXRCYWxsb29uKGJhbGxvb24pIHtcbiAgaW5pdEJhbGxvb24oYmFsbG9vbik7XG4gIGJhbGxvb24uY3NzKHt0b3A6ICQoJ2JvZHknKS5oZWlnaHQoKX0pO1xufVxuXG5cbi8qIFN1YnRyYWN0cyBsaWZlLCB1cGRhdGUgdGhlIGxpdmVzIHNpZ24gYW5kIGNoZWNrIGlmIHRoZSBwbGF5ZXIgbG9zZSAqL1xuZnVuY3Rpb24gc3VidHJhY3RMaWZlKCkge1xuICAkKCcubGl2ZXMgdWwgbGk6bnRoLWNoaWxkKCcrbGl2ZXMrJyknKS5oaWRlKCk7ICAvLyBoaWRlIGhlYXJ0IGljb25cbiAgbGl2ZXMgPSBsaXZlcyAtIDE7XG4gIGlmIChsaXZlcyA9PT0gMCkge1xuICAgICQoJy5yZXN1bHQnKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gIH1cbn1cblxuXG4vKiBJbmNyZWFzZXMgYmFsbG9vbnMgc3BlZWQgKi9cbmZ1bmN0aW9uIGluY3JlYXNlQmFsbG9vblNwZWVkKHNjb3JlKSB7XG4gIHNwZWVkID0gc3BlZWQgKyAoc2NvcmUvSU5DUkVBU0lOR19TUEVFRF9SQVRFKTtcbn1cblxuXG4vKiBUaHJvd3MgZXZlbnQgd2hlbiBiYWxsb29uIGlzIGNsaWNrZWQgKi9cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYmFsbG9vbicsIGZ1bmN0aW9uKCkge1xuICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgYWRkU2NvcmUoJCh0aGlzKS5kYXRhKFwic2NvcmVcIikpO1xuICAgIHJlc2V0QmFsbG9vbigkKHRoaXMpKTtcbiAgfVxufSk7XG5cblxuLyoqKlxuICogVXRpbHNcbiAqKiovXG5cbi8qIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChpbmNsdXNpdmUpICovXG5mdW5jdGlvbiBybmQobWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKSArIG1pbjtcbn1cblxuXG4vKiBPbiBsb2FkICovXG4kKGZ1bmN0aW9uKCkge1xuXG4gIC8qIFJlc2V0cyB0aGUgZ2FtZSAqL1xuICAkKFwiI2FnYWluXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICQoJy5yZXN1bHQnKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAkKFwiI3BvaW50c1wiKS5odG1sKDApO1xuICAgIC8vIEFsbCBiYWxsb29ucyB0byBib3R0b21cbiAgICAkLmVhY2goIGFycmF5X2JhbGxvb25zLCBmdW5jdGlvbiggaW5kZXgsIGJhbGxvb24gKXtcbiAgICAgIHJlc2V0QmFsbG9vbihiYWxsb29uKTtcbiAgICB9KTtcbiAgICBsaXZlcyA9IDM7XG4gICAgJCgnLmxpdmVzIHVsIGxpJykuc2hvdygpO1xuICAgIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgc3BlZWQgPSBJTklUSUFMX1NQRUVEO1xuICB9KTtcblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgTl9PRl9CQUxMT09OUzsgaSsrKSB7XG4gICAgdmFyICRiYWxsb29uID0gbmV3QmFsbG9vbigpO1xuICAgIGFycmF5X2JhbGxvb25zLnB1c2goJGJhbGxvb24pO1xuICAgIGFzY2VuZCgkYmFsbG9vbik7XG4gIH1cblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
