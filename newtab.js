/* THIS IS THE SOURCE CODE, THE ACTUAL BUNDLED VERSION THAT THE EXTENSION USES IS bundle.js */

//snoowrap setup
var snoowrap = require('snoowrap');

const r = new snoowrap({
    userAgent: 'browser extension by thennal',
    clientId: 'XmmZXHXna_fWFg',
    clientSecret: 'T_m_HaKVqOOB-hGEDJP1pmR30p8',
    refreshToken: '30464057-4axSFYGufmJ36I3vz1vxVxa399s'
});

//jquery let's go
$(document).ready(function() {

  //just takes image url from memory and displays it
  function display(image) {
    $("#main").attr("src", image)
    $("#bg").css("background-image", "url('" + image + "')")
  }

  //sets cover status
  function cover(cov) {
    if (cov & $("#container").is(":visible")) {
      $("#bg").addClass("cover")
    } else {
      $("#bg").removeClass("cover")
    }
  }

  //standard image, keyword should be a bool that states whether you want to update the bg or just load from memory (faster)
  function standard(update) {

    //set a loading image
    $("#main").attr("src", "icons/loadingv2.gif")

    //just check if cover is ticked
    var is_cover = localStorage.getItem("cover")
    cover(JSON.parse(is_cover))
    
    if (update) {
      //uses snoowrap shit to get the submission url and update the bg, plus store it in memory for later use
      var i = localStorage.getItem("currentIndex")
      var subreddit = localStorage.getItem("subreddit")
      var timespan = $("input[name=timespan]:checked").attr("id")
      r.getSubreddit(subreddit).getTop({time: timespan}).then(sumbission_list => {
        var image = sumbission_list[i].url
        localStorage.setItem("currentImg", image)
        display(image)
      });
    }
    else {
      display(localStorage.getItem("currentImg"))
    }
  }

  //opens options menue
  function options() {
    //just to prevent any dumb errors (makes the whole thing slightly slower but eh)
    $("#container").hide();
    $("#menue").show();

    //for the input textbox
    var subreddit = localStorage.getItem("subreddit");
    $("#subreddit").val(subreddit);

    //gets the currently selected timespan value
    var timespan = $("input[name=timespan]:checked").attr("id")

    //snoowrap woo woo
    r.getSubreddit(subreddit).getTop({time: timespan}).then(sumbission_list => {
      //generates 25 new <img> tags with appropriate src
      for (var i = 0; i < 25; i++) {
        try {
          $("#options").append("<img class='option' src=" + sumbission_list[i].url +">")
        } catch (e) {
          console.log(e);
        }
      }
      //just applies the click event to all the newly generated <img>
      $(".option").click(clickOption)
    });
  };

  standard(false);

  /* - clicks and pesses - */

  //key press
  $("#subreddit").keyup(function (event) {
    //enter button being pressed
    if(event.which == 13) {
      var subreddit = $("#subreddit").val();
      localStorage.setItem("subreddit", subreddit);
      //just kills all the images
      $("#options").empty();
      options();
    }
  })

  //when an image option is clicked
  function clickOption() {
    $("#container").show();
    $("#menue").hide();
    localStorage.setItem("currentIndex", $(this).index());
    standard(true);
  }

  //timespan change
  $("input[name=timespan]").change(function() {
    $("#options").empty();
    options();
  })

  /* --- */

  //listen for commands from popup
  browser.runtime.onMessage.addListener((message) => {
    if (!document.hidden) {
      if (message.command === "options") {
        $("#bg").removeClass("cover")
        options();
      } else if (message.command === "cover") {
        cover(message.checked);
      }
    }
  })
});
