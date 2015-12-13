var BALLOON_PX_HEIGHT = 140,
    N_OF_BALLOONS     = 5;
var scoring = {'green': 5, 'blue': 10, 'orange': 15, 'red': 20};
var lives = 3;
var array_balloons = [];


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
  }
}


/* Throw event when balloon is clicked */
$(document).on('click', '.balloon', function() {
  addScore($(this).data("score"));
  resetBalloon($(this));
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
  });


  for (var i = 0; i < N_OF_BALLOONS; i++) {
    setTimeout(function() {
      var $balloon = newBalloon();
      array_balloons.push($balloon);
      ascend($balloon);
    }, 1000);
  }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJBTExPT05fUFhfSEVJR0hUID0gMTQwLFxuICAgIE5fT0ZfQkFMTE9PTlMgICAgID0gNTtcbnZhciBzY29yaW5nID0geydncmVlbic6IDUsICdibHVlJzogMTAsICdvcmFuZ2UnOiAxNSwgJ3JlZCc6IDIwfTtcbnZhciBsaXZlcyA9IDM7XG52YXIgYXJyYXlfYmFsbG9vbnMgPSBbXTtcblxuXG4vKiBNb3ZlcyBiYWxsb29uIGFzY2VuZGluZyAqL1xuZnVuY3Rpb24gYXNjZW5kKGJhbGxvb24pIHtcbiAgaWYgKGJhbGxvb24ucG9zaXRpb24oKS50b3AgPiAtQkFMTE9PTl9QWF9IRUlHSFQpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgYmFsbG9vbi5jc3Moe3RvcDogYmFsbG9vbi5wb3NpdGlvbigpLnRvcCAtIDEgKyAncHgnfSk7XG4gICAgICBhc2NlbmQoYmFsbG9vbik7XG4gICAgfSwgcm5kKDUsIDIwKSk7ICAvLyBiYWxsb29uIHNwZWVkIGNoYW5naW5nXG4gIH1cbiAgZWxzZSB7XG4gICAgcmVzZXRCYWxsb29uKGJhbGxvb24pO1xuICAgIHN1YnRyYWN0TGlmZSgpO1xuICAgIGFzY2VuZChiYWxsb29uKTtcbiAgfVxufVxuXG5cbi8qIFJldHVybnMgYSBTdHJpbmcgb2YgYSByYW5kb20gYmFsbG9vbiBjb2xvciAqL1xuZnVuY3Rpb24gZ2V0Um5kQ29sb3IoKSB7XG4gIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhzY29yaW5nKTtcbiAgdmFyIGlkeCA9IHJuZCgwLCBjb2xvcnMubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBjb2xvcnNbaWR4XTtcbn1cblxuXG4vKiBDcmVhdGVzIG5ldyBlbGVtZW50IGJhbGxvb24gaW4gRE9NICovXG5mdW5jdGlvbiBuZXdCYWxsb29uKCkge1xuICB2YXIgJGJhbGxvb24gPSAkKCc8aW1nIGNsYXNzPVwiYmFsbG9vblwiPicpO1xuICBpbml0QmFsbG9vbigkYmFsbG9vbik7XG4gICRiYWxsb29uLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gIHJldHVybiAkYmFsbG9vbjtcbn1cblxuXG4vKiBBZGRzIHNjb3JlIHRvIHRoZSBwdW5jdHVhdGlvbiBzaWduICovXG5mdW5jdGlvbiBhZGRTY29yZShzY29yZSkge1xuICB2YXIgY3VycmVudF9zY29yZSA9IHBhcnNlSW50KCQoXCIjcG9pbnRzXCIpLmh0bWwoKSk7XG4gICQoXCIjcG9pbnRzXCIpLmh0bWwoY3VycmVudF9zY29yZSArIHNjb3JlKTtcbn1cblxuXG4vKiBTZXRzIG5ldyBwcm9wZXJ0aWVzIHRvIGJhbGxvb24gICovXG5mdW5jdGlvbiBpbml0QmFsbG9vbihiYWxsb29uKSB7XG4gIHZhciBjb2xvciA9IGdldFJuZENvbG9yKCk7XG4gIGJhbGxvb24uYXR0cignc3JjJywgXCJhc3NldHMvaW1hZ2VzL2JhbGxvb24tXCIrY29sb3IrXCIucG5nXCIpO1xuICBiYWxsb29uLmRhdGEoXCJzY29yZVwiLCBzY29yaW5nW2NvbG9yXSk7XG4gIGJhbGxvb24uY3NzKHtsZWZ0OiBybmQoMCwgOTUpICsgJyUnfSk7IC8vIGxlZnQ6ICg5Ni0xMDAlKSAtPiBiYWxsb29uIGFsbW9zdCBub3QgdmlzaWJsZVxufVxuXG5cbi8qIFJldXNlcyBiYWxsb29uIHNldHRpbmcgbmV3IHByb3BlcnRpZXMgYW5kIG1vdmluZyBpdCB0byB0aGUgYm90dG9tICAqL1xuZnVuY3Rpb24gcmVzZXRCYWxsb29uKGJhbGxvb24pIHtcbiAgaW5pdEJhbGxvb24oYmFsbG9vbik7XG4gIGJhbGxvb24uY3NzKHt0b3A6ICQoJ2JvZHknKS5oZWlnaHQoKX0pO1xufVxuXG5cbi8qIFN1YnRyYWN0cyBsaWZlLCB1cGRhdGUgdGhlIGxpdmVzIHNpZ24gYW5kIGNoZWNrIGlmIHRoZSBwbGF5ZXIgbG9zZSAqL1xuZnVuY3Rpb24gc3VidHJhY3RMaWZlKCkge1xuICAkKCcubGl2ZXMgdWwgbGk6bnRoLWNoaWxkKCcrbGl2ZXMrJyknKS5oaWRlKCk7ICAvLyBoaWRlIGhlYXJ0IGljb25cbiAgbGl2ZXMgPSBsaXZlcyAtIDE7XG4gIGlmIChsaXZlcyA9PT0gMCkge1xuICAgICQoJy5yZXN1bHQnKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfVxufVxuXG5cbi8qIFRocm93IGV2ZW50IHdoZW4gYmFsbG9vbiBpcyBjbGlja2VkICovXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJhbGxvb24nLCBmdW5jdGlvbigpIHtcbiAgYWRkU2NvcmUoJCh0aGlzKS5kYXRhKFwic2NvcmVcIikpO1xuICByZXNldEJhbGxvb24oJCh0aGlzKSk7XG59KTtcblxuXG4vKioqXG4gKiBVdGlsc1xuICoqKi9cblxuLyogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSkgKi9cbmZ1bmN0aW9uIHJuZChtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSApICsgbWluO1xufVxuXG5cbi8qIE9uIGxvYWQgKi9cbiQoZnVuY3Rpb24oKSB7XG5cbiAgLyogUmVzZXRzIHRoZSBnYW1lICovXG4gICQoXCIjYWdhaW5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCgnLnJlc3VsdCcpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQoXCIjcG9pbnRzXCIpLmh0bWwoMCk7XG4gICAgLy8gQWxsIGJhbGxvb25zIHRvIGJvdHRvbVxuICAgICQuZWFjaCggYXJyYXlfYmFsbG9vbnMsIGZ1bmN0aW9uKCBpbmRleCwgYmFsbG9vbiApe1xuICAgICAgcmVzZXRCYWxsb29uKGJhbGxvb24pO1xuICAgIH0pO1xuICAgIGxpdmVzID0gMztcbiAgICAkKCcubGl2ZXMgdWwgbGknKS5zaG93KCk7XG4gIH0pO1xuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBOX09GX0JBTExPT05TOyBpKyspIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRiYWxsb29uID0gbmV3QmFsbG9vbigpO1xuICAgICAgYXJyYXlfYmFsbG9vbnMucHVzaCgkYmFsbG9vbik7XG4gICAgICBhc2NlbmQoJGJhbGxvb24pO1xuICAgIH0sIDEwMDApO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
