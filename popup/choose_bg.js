$(document).ready(function () {
    //just ticks the check depending on previous state
    var default_cover = localStorage.getItem("cover")
    $("#cover").prop("checked", JSON.parse(default_cover))

    //sends the browser a message that option has been clicked
    $("#options").click(function () {
        browser.runtime.sendMessage({
            command: "options"
        });
    })

    //resets localstorage and sends the browser a message with new cover state
    $("#cover").click(function() {
        var cover_state = $("#cover").is(':checked')
        localStorage.setItem("cover", JSON.parse(cover_state))
        browser.runtime.sendMessage({
            command: "cover",
            checked: cover_state
        });
    })
});