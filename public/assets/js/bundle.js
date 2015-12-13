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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJBTExPT05fUFhfSEVJR0hUID0gMTQwLFxuICAgIE5fT0ZfQkFMTE9PTlMgICAgID0gNSxcbiAgICBzY29yaW5nID0geydncmVlbic6IDUsICdibHVlJzogMTAsICdvcmFuZ2UnOiAxNSwgJ3JlZCc6IDIwfSxcbiAgICBsaXZlcyA9IDMsXG4gICAgYXJyYXlfYmFsbG9vbnMgPSBbXSxcbiAgICBmaW5pc2hlZCA9IGZhbHNlO1xuXG5cbi8qIE1vdmVzIGJhbGxvb24gYXNjZW5kaW5nICovXG5mdW5jdGlvbiBhc2NlbmQoYmFsbG9vbikge1xuICBpZiAoYmFsbG9vbi5wb3NpdGlvbigpLnRvcCA+IC1CQUxMT09OX1BYX0hFSUdIVCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBiYWxsb29uLmNzcyh7dG9wOiBiYWxsb29uLnBvc2l0aW9uKCkudG9wIC0gMSArICdweCd9KTtcbiAgICAgIGFzY2VuZChiYWxsb29uKTtcbiAgICB9LCBybmQoNSwgMjApKTsgIC8vIGJhbGxvb24gc3BlZWQgY2hhbmdpbmdcbiAgfVxuICBlbHNlIHtcbiAgICByZXNldEJhbGxvb24oYmFsbG9vbik7XG4gICAgc3VidHJhY3RMaWZlKCk7XG4gICAgYXNjZW5kKGJhbGxvb24pO1xuICB9XG59XG5cblxuLyogUmV0dXJucyBhIFN0cmluZyBvZiBhIHJhbmRvbSBiYWxsb29uIGNvbG9yICovXG5mdW5jdGlvbiBnZXRSbmRDb2xvcigpIHtcbiAgdmFyIGNvbG9ycyA9IE9iamVjdC5rZXlzKHNjb3JpbmcpO1xuICB2YXIgaWR4ID0gcm5kKDAsIGNvbG9ycy5sZW5ndGggLSAxKTtcbiAgcmV0dXJuIGNvbG9yc1tpZHhdO1xufVxuXG5cbi8qIENyZWF0ZXMgbmV3IGVsZW1lbnQgYmFsbG9vbiBpbiBET00gKi9cbmZ1bmN0aW9uIG5ld0JhbGxvb24oKSB7XG4gIHZhciAkYmFsbG9vbiA9ICQoJzxpbWcgY2xhc3M9XCJiYWxsb29uXCI+Jyk7XG4gIGluaXRCYWxsb29uKCRiYWxsb29uKTtcbiAgJGJhbGxvb24uYXBwZW5kVG8oJCgnYm9keScpKTtcbiAgcmV0dXJuICRiYWxsb29uO1xufVxuXG5cbi8qIEFkZHMgc2NvcmUgdG8gdGhlIHB1bmN0dWF0aW9uIHNpZ24gKi9cbmZ1bmN0aW9uIGFkZFNjb3JlKHNjb3JlKSB7XG4gIHZhciBjdXJyZW50X3Njb3JlID0gcGFyc2VJbnQoJChcIiNwb2ludHNcIikuaHRtbCgpKTtcbiAgJChcIiNwb2ludHNcIikuaHRtbChjdXJyZW50X3Njb3JlICsgc2NvcmUpO1xufVxuXG5cbi8qIFNldHMgbmV3IHByb3BlcnRpZXMgdG8gYmFsbG9vbiAgKi9cbmZ1bmN0aW9uIGluaXRCYWxsb29uKGJhbGxvb24pIHtcbiAgdmFyIGNvbG9yID0gZ2V0Um5kQ29sb3IoKTtcbiAgYmFsbG9vbi5hdHRyKCdzcmMnLCBcImFzc2V0cy9pbWFnZXMvYmFsbG9vbi1cIitjb2xvcitcIi5wbmdcIik7XG4gIGJhbGxvb24uZGF0YShcInNjb3JlXCIsIHNjb3JpbmdbY29sb3JdKTtcbiAgYmFsbG9vbi5jc3Moe2xlZnQ6IHJuZCgwLCA5NSkgKyAnJSd9KTsgLy8gbGVmdDogKDk2LTEwMCUpIC0+IGJhbGxvb24gYWxtb3N0IG5vdCB2aXNpYmxlXG59XG5cblxuLyogUmV1c2VzIGJhbGxvb24gc2V0dGluZyBuZXcgcHJvcGVydGllcyBhbmQgbW92aW5nIGl0IHRvIHRoZSBib3R0b20gICovXG5mdW5jdGlvbiByZXNldEJhbGxvb24oYmFsbG9vbikge1xuICBpbml0QmFsbG9vbihiYWxsb29uKTtcbiAgYmFsbG9vbi5jc3Moe3RvcDogJCgnYm9keScpLmhlaWdodCgpfSk7XG59XG5cblxuLyogU3VidHJhY3RzIGxpZmUsIHVwZGF0ZSB0aGUgbGl2ZXMgc2lnbiBhbmQgY2hlY2sgaWYgdGhlIHBsYXllciBsb3NlICovXG5mdW5jdGlvbiBzdWJ0cmFjdExpZmUoKSB7XG4gICQoJy5saXZlcyB1bCBsaTpudGgtY2hpbGQoJytsaXZlcysnKScpLmhpZGUoKTsgIC8vIGhpZGUgaGVhcnQgaWNvblxuICBsaXZlcyA9IGxpdmVzIC0gMTtcbiAgaWYgKGxpdmVzID09PSAwKSB7XG4gICAgJCgnLnJlc3VsdCcpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgfVxufVxuXG5cbi8qIFRocm93cyBldmVudCB3aGVuIGJhbGxvb24gaXMgY2xpY2tlZCAqL1xuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5iYWxsb29uJywgZnVuY3Rpb24oKSB7XG4gIGlmICghZmluaXNoZWQpIHtcbiAgICBhZGRTY29yZSgkKHRoaXMpLmRhdGEoXCJzY29yZVwiKSk7XG4gICAgcmVzZXRCYWxsb29uKCQodGhpcykpO1xuICB9XG59KTtcblxuXG4vKioqXG4gKiBVdGlsc1xuICoqKi9cblxuLyogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSkgKi9cbmZ1bmN0aW9uIHJuZChtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSApICsgbWluO1xufVxuXG5cbi8qIE9uIGxvYWQgKi9cbiQoZnVuY3Rpb24oKSB7XG5cbiAgLyogUmVzZXRzIHRoZSBnYW1lICovXG4gICQoXCIjYWdhaW5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCgnLnJlc3VsdCcpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQoXCIjcG9pbnRzXCIpLmh0bWwoMCk7XG4gICAgLy8gQWxsIGJhbGxvb25zIHRvIGJvdHRvbVxuICAgICQuZWFjaCggYXJyYXlfYmFsbG9vbnMsIGZ1bmN0aW9uKCBpbmRleCwgYmFsbG9vbiApe1xuICAgICAgcmVzZXRCYWxsb29uKGJhbGxvb24pO1xuICAgIH0pO1xuICAgIGxpdmVzID0gMztcbiAgICAkKCcubGl2ZXMgdWwgbGknKS5zaG93KCk7XG4gICAgZmluaXNoZWQgPSBmYWxzZTtcbiAgfSk7XG5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IE5fT0ZfQkFMTE9PTlM7IGkrKykge1xuICAgIHZhciAkYmFsbG9vbiA9IG5ld0JhbGxvb24oKTtcbiAgICBhcnJheV9iYWxsb29ucy5wdXNoKCRiYWxsb29uKTtcbiAgICBhc2NlbmQoJGJhbGxvb24pO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
