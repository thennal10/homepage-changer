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

  //standard image, keyword should be a bool that states whether you want to update the bg or just load from memory (faster)
  function standard(update) {
    $("#main").attr("src", "icons/loadingv2.gif")
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
    $("#container").hide();
    $("#menue").show();

    //for the input textbox
    var subreddit = localStorage.getItem("subreddit");
    $("#subreddit").val(subreddit);

    //gets the currently selected timespan value
    var timespan = $("input[name=timespan]:checked").attr("id")

    //snoowrap woop woop
    r.getSubreddit(subreddit).getTop({time: timespan}).then(sumbission_list => {
      $(".option").each(function(index) {
        $(this).attr("src", sumbission_list[index].url);
      });
    });
  };

  standard(false);

  /* - clicks and pesses - */

  $("#subreddit").keyup(function (event) {
    //enter button being pressed
    if(event.which == 13) {
      var subreddit = $("#subreddit").val();
      localStorage.setItem("subreddit", subreddit);
      //just kills all the images
      $(".option").attr("src", "");
      options();
    }
  })

  //when an image option is clicked
  $(".option").click(function () {
    $("#container").show();
    $("#menue").hide();
    localStorage.setItem("currentIndex", $(this).index());
    standard(true);
  })

  $('input[name=timespan]').change(function() {
    $(".option").attr("src", "");
    options();
  })

  //listen for commands from popup
  browser.runtime.onMessage.addListener((message) => {
    if (!document.hidden) {
      if (message.command === "options") {
        options();
      } else if (message.command === "cover") {
        console.log("cover")
      }
    }
  })
});
