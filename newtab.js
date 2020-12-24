$(document).ready(function() {

  //just takes image url from memory and displays it
  function display(image) {
    $("#main").attr("src", image)
    $("#bg").attr("src", image)
    localStorage.setItem("link", image)
  }

  //sets cover status
  function cover(cov) {
    if (cov) {
      $("#bg").addClass("cover")
    } else {
      $("#bg").removeClass("cover")
    }
    localStorage.setItem("cover", cov)
  }

  var default_cover = localStorage.getItem("cover")
  cover(default_cover == 'true') // Because it's stored as a string

  var default_link = localStorage.getItem("link")
  display(default_link)

  //listen for commands from popup
  browser.runtime.onMessage.addListener((message) => {
    if (!document.hidden) {
      if (message.command === "setlink") {
        display(message.link)
      } else if (message.command === "cover") {
        cover(message.checked)
      }
    }
  })
});
