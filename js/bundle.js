function ascendBalloon(o){o.position().top>-BALLOON_PX_HEIGHT?setTimeout(function(){o.css({top:o.position().top-speed+"px"}),ascendBalloon(o)},rnd(5,20)):(resetBalloon(o),subtractLife(),ascendBalloon(o))}function getRndColor(){var o=Object.keys(scoring),n=rnd(0,o.length-1);return o[n]}function newBalloon(){var o=$('<img class="balloon">');return initBalloon(o),o.appendTo($("body")),o}function addScore(o){var n=parseInt($("#points").html()),e=n+o;$("#points").html(e),increaseBalloonSpeed(e),e>20&&15>=e%500&&launchUfo()}function initBalloon(o){var n=getRndColor();o.attr("src","images/balloon-"+n+".png"),o.data("score",scoring[n]),o.css({left:rnd(0,95)+"%"})}function resetBalloon(o){initBalloon(o),o.css({top:$("body").height()})}function subtractLife(){$(".lives ul li:nth-child("+lives+")").css("visibility","hidden"),lives-=1,0===lives&&($(".result").addClass("active"),finished=!0)}function increaseBalloonSpeed(o){speed+=o/INCREASING_SPEED_RATE}function launchUfo(){null===$ufo&&($ufo=$('<img class="ufo">'),$ufo.appendTo($("body")),$ufo.attr("src","images/ufo.png"),$ufo.data("score",UFO_SCORE)),ufo_running=!0,moveUfo($ufo)}function moveUfo(o){ufo_running&&o.position().left<$("body").width()?setTimeout(function(){o.css({left:o.position().left+1+"px",top:senoidal(o.position().top)}),moveUfo(o)},10):resetUfo(o)}function resetUfo(o){o.css({left:-UFO_PX_WIDTH}),ufo_running=!1}function senoidal(o){var n=$("body").height(),e=o/n;return ufo_ascending?(.45>e&&(ufo_ascending=!1),o-.75):(e>.55&&(ufo_ascending=!0),o+.75)}function rnd(o,n){return Math.floor(Math.random()*(n-o+1))+o}var BALLOON_PX_HEIGHT=140,UFO_PX_WIDTH=121,N_OF_BALLOONS=5,INITIAL_SPEED=1,INCREASING_SPEED_RATE=1e5,UFO_SCORE=100,scoring={green:5,blue:10,orange:15,red:20},lives=3,array_balloons=[],$ufo=null,finished=!1,ufo_running=!1,ufo_ascending=!0,speed=INITIAL_SPEED;$(document).on("click",".balloon",function(){finished||(addScore($(this).data("score")),resetBalloon($(this)))}),$(document).on("click",".ufo",function(){finished||(addScore($(this).data("score")),resetUfo($(this)))}),$(function(){$("#again").on("click",function(){$(".result").removeClass("active"),$("#points").html(0),$.each(array_balloons,function(o,n){resetBalloon(n)}),lives=3,$(".lives ul li").css("visibility","visible"),finished=!1,speed=INITIAL_SPEED});for(var o=0;N_OF_BALLOONS>o;o++){var n=newBalloon();array_balloons.push(n),ascendBalloon(n)}});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXNjZW5kQmFsbG9vbiIsImJhbGxvb24iLCJwb3NpdGlvbiIsInRvcCIsIkJBTExPT05fUFhfSEVJR0hUIiwic2V0VGltZW91dCIsImNzcyIsInNwZWVkIiwicm5kIiwicmVzZXRCYWxsb29uIiwic3VidHJhY3RMaWZlIiwiZ2V0Um5kQ29sb3IiLCJjb2xvcnMiLCJPYmplY3QiLCJrZXlzIiwic2NvcmluZyIsImlkeCIsImxlbmd0aCIsIm5ld0JhbGxvb24iLCIkYmFsbG9vbiIsIiQiLCJpbml0QmFsbG9vbiIsImFwcGVuZFRvIiwiYWRkU2NvcmUiLCJzY29yZSIsImN1cnJlbnRfc2NvcmUiLCJwYXJzZUludCIsImh0bWwiLCJ1cGRhdGVkX3Njb3JlIiwiaW5jcmVhc2VCYWxsb29uU3BlZWQiLCJsYXVuY2hVZm8iLCJjb2xvciIsImF0dHIiLCJkYXRhIiwibGVmdCIsImhlaWdodCIsImxpdmVzIiwiYWRkQ2xhc3MiLCJmaW5pc2hlZCIsIklOQ1JFQVNJTkdfU1BFRURfUkFURSIsIiR1Zm8iLCJVRk9fU0NPUkUiLCJ1Zm9fcnVubmluZyIsIm1vdmVVZm8iLCJ1Zm8iLCJ3aWR0aCIsInNlbm9pZGFsIiwicmVzZXRVZm8iLCJVRk9fUFhfV0lEVEgiLCJ3aW5kb3dfaGVpZ2h0IiwidWZvX2hlaWdodF9wZXJjZW50YWdlIiwidWZvX2FzY2VuZGluZyIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIk5fT0ZfQkFMTE9PTlMiLCJJTklUSUFMX1NQRUVEIiwiZ3JlZW4iLCJibHVlIiwib3JhbmdlIiwicmVkIiwiYXJyYXlfYmFsbG9vbnMiLCJkb2N1bWVudCIsIm9uIiwidGhpcyIsInJlbW92ZUNsYXNzIiwiZWFjaCIsImluZGV4IiwiaSIsInB1c2giXSwibWFwcGluZ3MiOiJBQWlCQSxRQUFBQSxlQUFBQyxHQUNBQSxFQUFBQyxXQUFBQyxLQUFBQyxrQkFDQUMsV0FBQSxXQUNBSixFQUFBSyxLQUFBSCxJQUFB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N0MsRUFBQSxXQUFBK0MsWUFBQSxVQUNBL0MsRUFBQSxXQUFBTyxLQUFBLEdBRUFQLEVBQUFnRCxLQUFBTCxlQUFBLFNBQUFNLEVBQUFwRSxHQUNBUSxhQUFBUixLQUVBbUMsTUFBQSxFQUNBaEIsRUFBQSxnQkFBQWQsSUFBQSxhQUFBLFdBQ0FnQyxVQUFBLEVBQ0EvQixNQUFBbUQsZUFLQSxLQUFBLEdBQUFZLEdBQUEsRUFBQWIsY0FBQWEsRUFBQUEsSUFBQSxDQUNBLEdBQUFuRCxHQUFBRCxZQUNBNkMsZ0JBQUFRLEtBQUFwRCxHQUNBbkIsY0FBQW1CIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCQUxMT09OX1BYX0hFSUdIVCA9IDE0MCxcbiAgICBVRk9fUFhfV0lEVEggICAgICA9IDEyMSxcbiAgICBOX09GX0JBTExPT05TICAgICA9IDUsXG4gICAgSU5JVElBTF9TUEVFRCAgICAgPSAxLCAgICAgICAgLy8gbWVhc3VyZWQgaW4gcGl4ZWxzIHBlciBtb3ZlbWVudFxuICAgIElOQ1JFQVNJTkdfU1BFRURfUkFURSA9IDFlNSwgIC8vIHRoZSBsb3dlciB0aGUgZmFzdGVyXG4gICAgVUZPX1NDT1JFICAgICAgICAgPSAxMDAsXG4gICAgc2NvcmluZyA9IHsnZ3JlZW4nOiA1LCAnYmx1ZSc6IDEwLCAnb3JhbmdlJzogMTUsICdyZWQnOiAyMH0sXG4gICAgbGl2ZXMgPSAzLFxuICAgIGFycmF5X2JhbGxvb25zID0gW10sXG4gICAgJHVmbyA9IG51bGwsXG4gICAgZmluaXNoZWQgPSBmYWxzZSwgICAgICAgLy8gd2hlbiBnYW1pbmcgb3ZlciwgZG9uJ3QgbGV0IHBvcGluZyBiYWxsb29uc1xuICAgIHVmb19ydW5uaW5nID0gZmFsc2UsICAgIC8vIHRvIGtub3cgd2hlbiBVRk8gc2hvdWxkIGJlIG1vdmVkXG4gICAgdWZvX2FzY2VuZGluZyA9IHRydWUsICAgLy8gZm9yIHNlbm9pZGFsIHBhdGhcbiAgICBzcGVlZCA9IElOSVRJQUxfU1BFRUQ7ICAvLyBiYWxsb29ucyBzcGVlZFxuXG5cbi8qIE1vdmVzIGJhbGxvb24gYXNjZW5kaW5nICovXG5mdW5jdGlvbiBhc2NlbmRCYWxsb29uKGJhbGxvb24pIHtcbiAgaWYgKGJhbGxvb24ucG9zaXRpb24oKS50b3AgPiAtQkFMTE9PTl9QWF9IRUlHSFQpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgYmFsbG9vbi5jc3Moe3RvcDogYmFsbG9vbi5wb3NpdGlvbigpLnRvcCAtIHNwZWVkICsgJ3B4J30pO1xuICAgICAgYXNjZW5kQmFsbG9vbihiYWxsb29uKTtcbiAgICB9LCBybmQoNSwgMjApKTsgIC8vIGJhbGxvb24gc3BlZWQgY2hhbmdpbmdcbiAgfVxuICBlbHNlIHtcbiAgICByZXNldEJhbGxvb24oYmFsbG9vbik7XG4gICAgc3VidHJhY3RMaWZlKCk7XG4gICAgYXNjZW5kQmFsbG9vbihiYWxsb29uKTtcbiAgfVxufVxuXG5cbi8qIFJldHVybnMgYSBTdHJpbmcgb2YgYSByYW5kb20gYmFsbG9vbiBjb2xvciAqL1xuZnVuY3Rpb24gZ2V0Um5kQ29sb3IoKSB7XG4gIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhzY29yaW5nKTtcbiAgdmFyIGlkeCA9IHJuZCgwLCBjb2xvcnMubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBjb2xvcnNbaWR4XTtcbn1cblxuXG4vKiBDcmVhdGVzIG5ldyBlbGVtZW50IGJhbGxvb24gaW4gRE9NICovXG5mdW5jdGlvbiBuZXdCYWxsb29uKCkge1xuICB2YXIgJGJhbGxvb24gPSAkKCc8aW1nIGNsYXNzPVwiYmFsbG9vblwiPicpO1xuICBpbml0QmFsbG9vbigkYmFsbG9vbik7XG4gICRiYWxsb29uLmFwcGVuZFRvKCQoJ2JvZHknKSk7XG4gIHJldHVybiAkYmFsbG9vbjtcbn1cblxuXG4vKiBBZGRzIHNjb3JlIHRvIHRoZSBwdW5jdHVhdGlvbiBzaWduICovXG5mdW5jdGlvbiBhZGRTY29yZShzY29yZSkge1xuICB2YXIgY3VycmVudF9zY29yZSA9IHBhcnNlSW50KCQoXCIjcG9pbnRzXCIpLmh0bWwoKSk7XG4gIHZhciB1cGRhdGVkX3Njb3JlID0gY3VycmVudF9zY29yZSArIHNjb3JlO1xuICAkKFwiI3BvaW50c1wiKS5odG1sKHVwZGF0ZWRfc2NvcmUpO1xuICBpbmNyZWFzZUJhbGxvb25TcGVlZCh1cGRhdGVkX3Njb3JlKTtcbiAgaWYgKHVwZGF0ZWRfc2NvcmUgPiAyMCAmJiB1cGRhdGVkX3Njb3JlICUgNTAwIDw9IDE1KSB7IC8vIGxhdW5jaCBVRk8gZXZlcnkgNTAwIHBvaW50c1xuICAgIGxhdW5jaFVmbygpO1xuICB9XG59XG5cblxuLyogU2V0cyBuZXcgcHJvcGVydGllcyB0byBiYWxsb29uICAqL1xuZnVuY3Rpb24gaW5pdEJhbGxvb24oYmFsbG9vbikge1xuICB2YXIgY29sb3IgPSBnZXRSbmRDb2xvcigpO1xuICBiYWxsb29uLmF0dHIoJ3NyYycsIFwiaW1hZ2VzL2JhbGxvb24tXCIrY29sb3IrXCIucG5nXCIpO1xuICBiYWxsb29uLmRhdGEoXCJzY29yZVwiLCBzY29yaW5nW2NvbG9yXSk7XG4gIGJhbGxvb24uY3NzKHtsZWZ0OiBybmQoMCwgOTUpICsgJyUnfSk7IC8vIGxlZnQ6ICg5Ni0xMDAlKSAtPiBiYWxsb29uIGFsbW9zdCBub3QgdmlzaWJsZVxufVxuXG5cbi8qIFJldXNlcyBiYWxsb29uIHNldHRpbmcgbmV3IHByb3BlcnRpZXMgYW5kIG1vdmluZyBpdCB0byB0aGUgYm90dG9tICAqL1xuZnVuY3Rpb24gcmVzZXRCYWxsb29uKGJhbGxvb24pIHtcbiAgaW5pdEJhbGxvb24oYmFsbG9vbik7XG4gIGJhbGxvb24uY3NzKHt0b3A6ICQoJ2JvZHknKS5oZWlnaHQoKX0pO1xufVxuXG5cbi8qIFN1YnRyYWN0cyBsaWZlLCB1cGRhdGUgdGhlIGxpdmVzIHNpZ24gYW5kIGNoZWNrIGlmIHRoZSBwbGF5ZXIgbG9zZSAqL1xuZnVuY3Rpb24gc3VidHJhY3RMaWZlKCkge1xuICAkKCcubGl2ZXMgdWwgbGk6bnRoLWNoaWxkKCcrbGl2ZXMrJyknKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7ICAvLyBoaWRlIGhlYXJ0IGljb25cbiAgbGl2ZXMgPSBsaXZlcyAtIDE7XG4gIGlmIChsaXZlcyA9PT0gMCkge1xuICAgICQoJy5yZXN1bHQnKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gIH1cbn1cblxuXG4vKiBJbmNyZWFzZXMgYmFsbG9vbnMgc3BlZWQgKi9cbmZ1bmN0aW9uIGluY3JlYXNlQmFsbG9vblNwZWVkKHNjb3JlKSB7XG4gIHNwZWVkID0gc3BlZWQgKyAoc2NvcmUvSU5DUkVBU0lOR19TUEVFRF9SQVRFKTtcbn1cblxuXG4vKiBDcmVhdGVzIERPTSBlbGVtZW50IHdpdGggVUZPICovXG5mdW5jdGlvbiBsYXVuY2hVZm8oKSB7XG4gIC8vIEZpcnN0IHRpbWUgdWZvIGlzIGNyZWF0ZWRcbiAgaWYgKCR1Zm8gPT09IG51bGwpIHtcbiAgICAkdWZvID0gJCgnPGltZyBjbGFzcz1cInVmb1wiPicpO1xuICAgICR1Zm8uYXBwZW5kVG8oJCgnYm9keScpKTtcbiAgICAkdWZvLmF0dHIoJ3NyYycsIFwiaW1hZ2VzL3Vmby5wbmdcIik7XG4gICAgJHVmby5kYXRhKFwic2NvcmVcIiwgVUZPX1NDT1JFKTtcbiAgfVxuICB1Zm9fcnVubmluZyA9IHRydWU7XG4gIG1vdmVVZm8oJHVmbyk7XG59XG5cblxuLyogTW92ZXMgVUZPIGhvcml6b250YWxseSAqL1xuZnVuY3Rpb24gbW92ZVVmbyh1Zm8pIHtcbiAgaWYgKHVmb19ydW5uaW5nICYmIHVmby5wb3NpdGlvbigpLmxlZnQgPCAkKCdib2R5Jykud2lkdGgoKSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICB1Zm8uY3NzKHtsZWZ0OiB1Zm8ucG9zaXRpb24oKS5sZWZ0ICsgMSArICdweCcsIHRvcDogc2Vub2lkYWwodWZvLnBvc2l0aW9uKCkudG9wKSB9KTtcbiAgICAgIG1vdmVVZm8odWZvKTtcbiAgICB9LCAxMCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmVzZXRVZm8odWZvKTtcbiAgfVxufVxuXG5cbi8qIFBsYWNlcyBVRk8gdG8gc3RhcnQgcG9zaXRpb24gYW5kIHN0b3BzIGl0ICovXG5mdW5jdGlvbiByZXNldFVmbyh1Zm8pIHtcbiAgdWZvLmNzcyh7bGVmdDogLVVGT19QWF9XSURUSH0pO1xuICB1Zm9fcnVubmluZyA9IGZhbHNlO1xufVxuXG5cbi8qIFNpbXVsYXRlcyBzZW5vaWRhbCBVRk8gcGF0aCAqL1xuZnVuY3Rpb24gc2Vub2lkYWwodG9wKSB7XG4gIHZhciB3aW5kb3dfaGVpZ2h0ID0gJCgnYm9keScpLmhlaWdodCgpO1xuICB2YXIgdWZvX2hlaWdodF9wZXJjZW50YWdlID0gdG9wL3dpbmRvd19oZWlnaHQ7IC8vIDAuLjFcbiAgaWYgKHVmb19hc2NlbmRpbmcpIHtcbiAgICBpZiAodWZvX2hlaWdodF9wZXJjZW50YWdlIDwgMC40NSkge1xuICAgICAgdWZvX2FzY2VuZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdG9wIC0gMC43NTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAodWZvX2hlaWdodF9wZXJjZW50YWdlID4gMC41NSkge1xuICAgICAgdWZvX2FzY2VuZGluZyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0b3AgKyAwLjc1O1xuICB9XG59XG5cblxuLyogVGhyb3dzIGV2ZW50IHdoZW4gYmFsbG9vbiBpcyBjbGlja2VkICovXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJhbGxvb24nLCBmdW5jdGlvbigpIHtcbiAgaWYgKCFmaW5pc2hlZCkge1xuICAgIGFkZFNjb3JlKCQodGhpcykuZGF0YShcInNjb3JlXCIpKTtcbiAgICByZXNldEJhbGxvb24oJCh0aGlzKSk7XG4gIH1cbn0pO1xuXG5cbi8qIFRocm93cyBldmVudCB3aGVuIFVGTyBpcyBjbGlja2VkICovXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnVmbycsIGZ1bmN0aW9uKCkge1xuICBpZiAoIWZpbmlzaGVkKSB7XG4gICAgYWRkU2NvcmUoJCh0aGlzKS5kYXRhKFwic2NvcmVcIikpO1xuICAgIHJlc2V0VWZvKCQodGhpcykpO1xuICB9XG59KTtcblxuXG4vKioqXG4gKiBVdGlsc1xuICoqKi9cblxuLyogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSkgKi9cbmZ1bmN0aW9uIHJuZChtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSApICsgbWluO1xufVxuXG5cbi8qIE9uIGxvYWQgKi9cbiQoZnVuY3Rpb24oKSB7XG5cbiAgLyogUmVzZXRzIHRoZSBnYW1lICovXG4gICQoXCIjYWdhaW5cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgJCgnLnJlc3VsdCcpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICQoXCIjcG9pbnRzXCIpLmh0bWwoMCk7XG4gICAgLy8gQWxsIGJhbGxvb25zIHRvIGJvdHRvbVxuICAgICQuZWFjaCggYXJyYXlfYmFsbG9vbnMsIGZ1bmN0aW9uKCBpbmRleCwgYmFsbG9vbiApe1xuICAgICAgcmVzZXRCYWxsb29uKGJhbGxvb24pO1xuICAgIH0pO1xuICAgIGxpdmVzID0gMztcbiAgICAkKCcubGl2ZXMgdWwgbGknKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuICAgIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgc3BlZWQgPSBJTklUSUFMX1NQRUVEO1xuICB9KTtcblxuXG4gIC8qIENyZWF0aW5nIGJhbGxvb25zICovXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgTl9PRl9CQUxMT09OUzsgaSsrKSB7XG4gICAgdmFyICRiYWxsb29uID0gbmV3QmFsbG9vbigpO1xuICAgIGFycmF5X2JhbGxvb25zLnB1c2goJGJhbGxvb24pO1xuICAgIGFzY2VuZEJhbGxvb24oJGJhbGxvb24pO1xuICB9XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
