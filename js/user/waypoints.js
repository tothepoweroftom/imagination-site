var waypoint = new Waypoint({
  element: document.getElementById("section-1"),
  handler: function(direction) {
    if (!hasntClicked && direction === "down") {
      console.log("hit", direction);
      tweencolor();
    }
    
          $( ".iconn" ).each(function( index ) {
  $( this ).css("animation-play-state", "initial");
});
    // $('#intro1').toggleClass('open-left');
    // $('#question').show();
    $("#cyclops2").css({ opacity: 1 });
    $("#cyclops2").fadeIn();
    $(".nav").hide();
    
  },
  offset: (3 * window.innerHeight) / 4

});

var waypoint = new Waypoint({
  element: document.getElementById("section-2"),
  handler: function(direction) {
    $("#question").show();
    $("#cyclops2").css({ opacity: 1 });
    $("#cyclops2").fadeIn();
      $( ".iconn" ).each(function( index ) {
  $( this ).css("animation-play-state", "initial");
});
  },
  offset: (3 * window.innerHeight) / 4
});

var waypoint2 = new Waypoint({
  element: document.getElementById("section-3"),
  handler: function(direction) {
    if (moreOpen) {
      $(".nav").show();
    }
    

  },
  offset: (3 * window.innerHeight) / 4
});
var waypoint3 = new Waypoint({
  
  element: document.getElementById("icons"),
  handler: function(direction) {
      console.log("hit")
    setTimeout(()=>{
                  $( '#littleCircle' ).css("animation", "littleCircle 4s");
  $( '#bigCircle' ).css("animation", "bigCircle 4s");
      $( '#lens' ).css("animation", "lens 4s");
  $( '#camera' ).css("animation", "camera 5s");
  $( '.m-letter' ).css("animation", "m-letter 6s");
  $( '#envelope2' ).css("animation", "envelope2 6s");
  $( '#envelope' ).css("animation", "envelope2 6s");
  $( '#pop-up' ).css("animation", "pop-up 5s");
  $( '.outer-box' ).css("animation", "outer-box 5s");  
    },1000)




  },
  offset: ( 3 * window.innerHeight) / 4
});