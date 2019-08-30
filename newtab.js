//snoowrap setup
var snoowrap = require('snoowrap');

const r = new snoowrap({
    userAgent: 'browser extension by thennal',
    clientId: 'XmmZXHXna_fWFg',
    clientSecret: 'T_m_HaKVqOOB-hGEDJP1pmR30p8',
    refreshToken: '30464057-4axSFYGufmJ36I3vz1vxVxa399s'
});

//set the bg
function set_bg(num, current_nm, input, cover) {
  console.log(num)
  console.log(input)
  console.log(cover)

  if (cover) {
    document.getElementsByTagName('img')[0].src = "";
    document.getElementById('bgdiv').classList.remove("fade-bg")
    //compare the two numbers given, and if they differ, change the background
    if (num != current_nm) {
      document.getElementById('bgdiv').style.backgroundImage = "url('icons/loadingv2.gif')";
      document.getElementById('bgdiv').classList.remove("cover")
      r.getSubreddit(input).getTop({time: "week"}).then(sumbission_list => {
          var submission_url = sumbission_list[num].url
          localStorage.setItem('current_bg', submission_url)
          document.getElementById('bgdiv').style.backgroundImage = "url('"+submission_url+"')";
          document.getElementById('bgdiv').classList.add("cover")
        });
    } else {
      //load old background
      var bg_url = localStorage.getItem("current_bg")
      document.getElementById('bgdiv').style.backgroundImage = "url('"+bg_url+"')";
      document.getElementById('bgdiv').classList.add("cover")
    }
  } else {
    document.getElementById('bgdiv').classList.add("fade-bg", "cover")
    if (num != current_nm) {
      document.getElementsByTagName('img')[0].src = "icons/loadingv2.gif";
      r.getSubreddit(input).getTop({time: "week"}).then(sumbission_list => {
          var submission_url = sumbission_list[num].url
          localStorage.setItem('current_bg', submission_url)
          document.getElementsByTagName('img')[0].src = submission_url;
          document.getElementById('bgdiv').style.backgroundImage = "url('"+submission_url+"')";
        });
    } else {
      //load old background
      var bg_url = localStorage.getItem("current_bg")
      document.getElementsByTagName('img')[0].src = bg_url;
      document.getElementById('bgdiv').style.backgroundImage = "url('"+bg_url+"')";
    }
  }
}

//initial setup for a new tab
var string_current_num = localStorage.getItem("current_bg_num") || "0"
var current_num = parseInt(string_current_num, 10)

var default_input = localStorage.getItem("textbox_input")
var default_cover_string = localStorage.getItem("cover")
if (default_cover_string === "true") {
    var default_cover = true
} else if (default_cover_string === "false") {
    var default_cover = false
}

set_bg(current_num, current_num, default_input, default_cover);

//listen for commands from popup
browser.runtime.onMessage.addListener((message) => {
  if (!document.hidden) {
    var string_current_num = localStorage.getItem("current_bg_num") || "0"
    var current_num = parseInt(string_current_num, 10)
    
    if (message.command === "next") {
      localStorage.setItem('current_bg_num', `${current_num + 1}`)
      set_bg(current_num + 1, current_num, message.input, message.cover)
    } else if (message.command === "back") {
      localStorage.setItem('current_bg_num', `${current_num - 1}`)
      set_bg(current_num - 1, current_num, message.input, message.cover)
    } else if (message.command === "cover") {
      set_bg(current_num, current_num, message.input, message.cover)
    }
  }
});