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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEJBTExPT05fSEVJR0hUID0gMTQwO1xudmFyIHNjb3JpbmcgPSB7J2dyZWVuJzogNSwgJ2JsdWUnOiAxMCwgJ29yYW5nZSc6IDE1LCAncmVkJzogMjB9O1xudmFyIGxpdmVzID0gMztcbnZhciBhcnJheV9iYWxsb29ucztcblxuXG4vKiBNb3ZlcyBiYWxsb29uIGFzY2VuZGluZyAqL1xuZnVuY3Rpb24gYXNjZW5kKGJhbGxvb24pIHtcbiAgaWYgKGJhbGxvb24ucG9zaXRpb24oKS50b3AgPiAtQkFMTE9PTl9IRUlHSFQpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgYmFsbG9vbi5jc3Moe3RvcDogYmFsbG9vbi5wb3NpdGlvbigpLnRvcCAtIDAuNSArICdweCd9KTtcbiAgICAgIGFzY2VuZChiYWxsb29uKTtcbiAgICB9LCA1KTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXNldEJhbGxvb24oYmFsbG9vbik7XG4gICAgc3VidHJhY3RMaWZlKCk7XG4gICAgYXNjZW5kKGJhbGxvb24pO1xuICB9XG59XG5cblxuLyogUmV0dXJucyBhIFN0cmluZyBvZiBhIHJhbmRvbSBiYWxsb29uIGNvbG9yICovXG5mdW5jdGlvbiBnZXRSbmRDb2xvcigpIHtcbiAgdmFyIGNvbG9ycyA9IE9iamVjdC5rZXlzKHNjb3JpbmcpO1xuICB2YXIgaWR4ID0gcm5kKGNvbG9ycy5sZW5ndGggLSAxKTtcbiAgcmV0dXJuIGNvbG9yc1tpZHhdO1xufVxuXG5cbi8qIENyZWF0ZXMgbmV3IGVsZW1lbnQgYmFsbG9vbiBpbiBET00gKi9cbmZ1bmN0aW9uIG5ld0JhbGxvb24oKSB7XG4gIHZhciBjb2xvciA9IGdldFJuZENvbG9yKCk7XG4gIHZhciAkYmFsbG9vbiA9ICQoJzxpbWcgY2xhc3M9XCJiYWxsb29uXCIgc3JjPVwiYXNzZXRzL2ltYWdlcy9iYWxsb29uLScrY29sb3IrJy5wbmdcIj4nKTtcbiAgJGJhbGxvb24uZGF0YShcInNjb3JlXCIsIHNjb3JpbmdbY29sb3JdKTtcbiAgJGJhbGxvb24uY3NzKHtsZWZ0OiBybmQoOTUpICsgJyUnfSk7IC8vIGxlZnQ6ICg5Ni0xMDAlKSAtPiBiYWxsb29uIGFsbW9zdCBub3QgdmlzaWJsZVxuICAkYmFsbG9vbi5hcHBlbmRUbygkKCdib2R5JykpO1xuICByZXR1cm4gJGJhbGxvb247XG59XG5cblxuLyogQWRkcyBzY29yZSB0byB0aGUgcHVuY3R1YXRpb24gc2lnbiAqL1xuZnVuY3Rpb24gYWRkU2NvcmUoc2NvcmUpIHtcbiAgdmFyIGN1cnJlbnRfc2NvcmUgPSBwYXJzZUludCgkKFwiI3BvaW50c1wiKS5odG1sKCkpO1xuICAkKFwiI3BvaW50c1wiKS5odG1sKGN1cnJlbnRfc2NvcmUgKyBzY29yZSk7XG59XG5cblxuLyogU2V0cyBuZXcgcHJvcGVydGllcyB0byBiYWxsb29uICAqL1xuZnVuY3Rpb24gaW5pdEJhbGxvb24oYmFsbG9vbikge1xuICB2YXIgY29sb3IgPSBnZXRSbmRDb2xvcigpO1xuICBiYWxsb29uLmF0dHIoJ3NyYycsIFwiYXNzZXRzL2ltYWdlcy9iYWxsb29uLVwiK2NvbG9yK1wiLnBuZ1wiKTtcbiAgYmFsbG9vbi5kYXRhKFwic2NvcmVcIiwgc2NvcmluZ1tjb2xvcl0pO1xuICBiYWxsb29uLmNzcyh7bGVmdDogcm5kKDk1KSArICclJ30pO1xufVxuXG5cbi8qIFJldXNlcyBiYWxsb29uIHNldHRpbmcgbmV3IHByb3BlcnRpZXMgYW5kIG1vdmluZyBpdCB0byB0aGUgYm90dG9tICAqL1xuZnVuY3Rpb24gcmVzZXRCYWxsb29uKGJhbGxvb24pIHtcbiAgaW5pdEJhbGxvb24oYmFsbG9vbik7XG4gIGJhbGxvb24uY3NzKHt0b3A6ICQoJ2JvZHknKS5oZWlnaHQoKX0pO1xufVxuXG5cbi8qIFN1YnRyYWN0cyBsaWZlLCB1cGRhdGUgdGhlIGxpdmVzIHNpZ24gYW5kIGNoZWNrIGlmIHRoZSBwbGF5ZXIgbG9zZSAqL1xuZnVuY3Rpb24gc3VidHJhY3RMaWZlKCkge1xuICBsaXZlcyA9IGxpdmVzIC0gMTtcbiAgJCgnLmxpdmVzIHVsIGxpOmxhc3QtY2hpbGQnKS5yZW1vdmUoKTsgIC8vIHJlbW92ZSBoZWFydCBpY29uXG4gIGlmIChsaXZlcyA9PT0gMCkge1xuICAgICQoJy5yZXN1bHQnKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfVxufVxuXG5cbi8qIFRocm93IGV2ZW50IHdoZW4gYmFsbG9vbiBpcyBjbGlja2VkICovXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJhbGxvb24nLCBmdW5jdGlvbihlKSB7XG4gIGFkZFNjb3JlKCQodGhpcykuZGF0YShcInNjb3JlXCIpKTtcbiAgcmVzZXRCYWxsb29uKCQodGhpcykpO1xufSk7XG5cblxuLyogVXRpbHMgKi9cbmZ1bmN0aW9uIHJuZChtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkqKG1heCArIDEpICk7XG59XG5cblxuLyogT24gbG9hZCAqL1xuJChmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJ3BvcHRoZWJhbGxvb24hJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgdmFyICRiYWxsb29uID0gbmV3QmFsbG9vbigpO1xuICAgIC8vIGFycmF5X2JhbGxvb25zLnB1c2goJGJhbGxvb24pO1xuICAgIGFzY2VuZCgkYmFsbG9vbik7XG4gIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
