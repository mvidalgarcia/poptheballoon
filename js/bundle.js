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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQkFMTE9PTl9QWF9IRUlHSFQgPSAxNDAsXG4gICAgTl9PRl9CQUxMT09OUyAgICAgPSA1LFxuICAgIElOSVRJQUxfU1BFRUQgICAgID0gMSwgICAgICAgIC8vIG1lYXN1cmVkIGluIHBpeGVscyBwZXIgbW92ZW1lbnRcbiAgICBJTkNSRUFTSU5HX1NQRUVEX1JBVEUgPSAxZTUsICAvLyB0aGUgbG93ZXIgdGhlIGZhc3RlclxuICAgIHNjb3JpbmcgPSB7J2dyZWVuJzogNSwgJ2JsdWUnOiAxMCwgJ29yYW5nZSc6IDE1LCAncmVkJzogMjB9LFxuICAgIGxpdmVzID0gMyxcbiAgICBhcnJheV9iYWxsb29ucyA9IFtdLFxuICAgIGZpbmlzaGVkID0gZmFsc2UsXG4gICAgc3BlZWQgPSBJTklUSUFMX1NQRUVEO1xuXG5cbi8qIE1vdmVzIGJhbGxvb24gYXNjZW5kaW5nICovXG5mdW5jdGlvbiBhc2NlbmQoYmFsbG9vbikge1xuICBpZiAoYmFsbG9vbi5wb3NpdGlvbigpLnRvcCA+IC1CQUxMT09OX1BYX0hFSUdIVCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBiYWxsb29uLmNzcyh7dG9wOiBiYWxsb29uLnBvc2l0aW9uKCkudG9wIC0gc3BlZWQgKyAncHgnfSk7XG4gICAgICBhc2NlbmQoYmFsbG9vbik7XG4gICAgfSwgcm5kKDUsIDIwKSk7ICAvLyBiYWxsb29uIHNwZWVkIGNoYW5naW5nXG4gIH1cbiAgZWxzZSB7XG4gICAgcmVzZXRCYWxsb29uKGJhbGxvb24pO1xuICAgIHN1YnRyYWN0TGlmZSgpO1xuICAgIGFzY2VuZChiYWxsb29uKTtcbiAgfVxufVxuXG5cbi8qIFJldHVybnMgYSBTdHJpbmcgb2YgYSByYW5kb20gYmFsbG9vbiBjb2xvciAqL1xuZnVuY3Rpb24gZ2V0Um5kQ29sb3IoKSB7XG4gIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhzY29yaW5nKTtcbiAgdmFyIGlkeCA9IHJuZCgwLCBjb2xvcnMubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBjb2xvcnNbaWR4XTtcbn1cblxuXG4vKiBDcmVhdGVzIG5ldyBlbGVtZW50IGJhbGxvb24gaW4gRE9NICovXG5mdW5jdGlvbiBuZXdCYWxsb29uKCkge1xuICB2YXIgJGJhbGxvb24gPSAkKCc8aW1nIGNsYXNzPVwiYmFsbG9vblwiPicpO1xuICBpbml0QmFsbG9vbigkYmFsbG9vbik7XG4gICRiYWxsb29uLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gIHJldHVybiAkYmFsbG9vbjtcbn1cblxuXG4vKiBBZGRzIHNjb3JlIHRvIHRoZSBwdW5jdHVhdGlvbiBzaWduICovXG5mdW5jdGlvbiBhZGRTY29yZShzY29yZSkge1xuICB2YXIgY3VycmVudF9zY29yZSA9IHBhcnNlSW50KCQoXCIjcG9pbnRzXCIpLmh0bWwoKSk7XG4gIHZhciB1cGRhdGVkX3Njb3JlID0gY3VycmVudF9zY29yZSArIHNjb3JlO1xuICAkKFwiI3BvaW50c1wiKS5odG1sKHVwZGF0ZWRfc2NvcmUpO1xuICBpbmNyZWFzZUJhbGxvb25TcGVlZCh1cGRhdGVkX3Njb3JlKTtcbn1cblxuXG4vKiBTZXRzIG5ldyBwcm9wZXJ0aWVzIHRvIGJhbGxvb24gICovXG5mdW5jdGlvbiBpbml0QmFsbG9vbihiYWxsb29uKSB7XG4gIHZhciBjb2xvciA9IGdldFJuZENvbG9yKCk7XG4gIGJhbGxvb24uYXR0cignc3JjJywgXCJpbWFnZXMvYmFsbG9vbi1cIitjb2xvcitcIi5wbmdcIik7XG4gIGJhbGxvb24uZGF0YShcInNjb3JlXCIsIHNjb3JpbmdbY29sb3JdKTtcbiAgYmFsbG9vbi5jc3Moe2xlZnQ6IHJuZCgwLCA5NSkgKyAnJSd9KTsgLy8gbGVmdDogKDk2LTEwMCUpIC0+IGJhbGxvb24gYWxtb3N0IG5vdCB2aXNpYmxlXG59XG5cblxuLyogUmV1c2VzIGJhbGxvb24gc2V0dGluZyBuZXcgcHJvcGVydGllcyBhbmQgbW92aW5nIGl0IHRvIHRoZSBib3R0b20gICovXG5mdW5jdGlvbiByZXNldEJhbGxvb24oYmFsbG9vbikge1xuICBpbml0QmFsbG9vbihiYWxsb29uKTtcbiAgYmFsbG9vbi5jc3Moe3RvcDogJCgnYm9keScpLmhlaWdodCgpfSk7XG59XG5cblxuLyogU3VidHJhY3RzIGxpZmUsIHVwZGF0ZSB0aGUgbGl2ZXMgc2lnbiBhbmQgY2hlY2sgaWYgdGhlIHBsYXllciBsb3NlICovXG5mdW5jdGlvbiBzdWJ0cmFjdExpZmUoKSB7XG4gICQoJy5saXZlcyB1bCBsaTpudGgtY2hpbGQoJytsaXZlcysnKScpLmhpZGUoKTsgIC8vIGhpZGUgaGVhcnQgaWNvblxuICBsaXZlcyA9IGxpdmVzIC0gMTtcbiAgaWYgKGxpdmVzID09PSAwKSB7XG4gICAgJCgnLnJlc3VsdCcpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgfVxufVxuXG5cbi8qIEluY3JlYXNlcyBiYWxsb29ucyBzcGVlZCAqL1xuZnVuY3Rpb24gaW5jcmVhc2VCYWxsb29uU3BlZWQoc2NvcmUpIHtcbiAgc3BlZWQgPSBzcGVlZCArIChzY29yZS9JTkNSRUFTSU5HX1NQRUVEX1JBVEUpO1xufVxuXG5cbi8qIFRocm93cyBldmVudCB3aGVuIGJhbGxvb24gaXMgY2xpY2tlZCAqL1xuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5iYWxsb29uJywgZnVuY3Rpb24oKSB7XG4gIGlmICghZmluaXNoZWQpIHtcbiAgICBhZGRTY29yZSgkKHRoaXMpLmRhdGEoXCJzY29yZVwiKSk7XG4gICAgcmVzZXRCYWxsb29uKCQodGhpcykpO1xuICB9XG59KTtcblxuXG4vKioqXG4gKiBVdGlsc1xuICoqKi9cblxuLyogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSkgKi9cbmZ1bmN0aW9uIHJuZChtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSApICsgbWluO1xufVxuXG5cbi8qIE9uIGxvYWQgKi9cbiQoZnVuY3Rpb24oKSB7XG5cbiAgLyogUmVzZXRzIHRoZSBnYW1lICovXG4gICQoXCIjYWdhaW5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCgnLnJlc3VsdCcpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQoXCIjcG9pbnRzXCIpLmh0bWwoMCk7XG4gICAgLy8gQWxsIGJhbGxvb25zIHRvIGJvdHRvbVxuICAgICQuZWFjaCggYXJyYXlfYmFsbG9vbnMsIGZ1bmN0aW9uKCBpbmRleCwgYmFsbG9vbiApe1xuICAgICAgcmVzZXRCYWxsb29uKGJhbGxvb24pO1xuICAgIH0pO1xuICAgIGxpdmVzID0gMztcbiAgICAkKCcubGl2ZXMgdWwgbGknKS5zaG93KCk7XG4gICAgZmluaXNoZWQgPSBmYWxzZTtcbiAgICBzcGVlZCA9IElOSVRJQUxfU1BFRUQ7XG4gIH0pO1xuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBOX09GX0JBTExPT05TOyBpKyspIHtcbiAgICB2YXIgJGJhbGxvb24gPSBuZXdCYWxsb29uKCk7XG4gICAgYXJyYXlfYmFsbG9vbnMucHVzaCgkYmFsbG9vbik7XG4gICAgYXNjZW5kKCRiYWxsb29uKTtcbiAgfVxuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
