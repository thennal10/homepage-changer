$(document).ready(function () {
    // Sets default values from localstorage
    var default_cover = localStorage.getItem("cover")
    $("#cover").prop("checked", default_cover == 'true') // Because default_cover is stored as a string 

    var default_link = localStorage.getItem("link")
    $("#link").val(default_link)

    $('#link').keypress(function (e) {
        if (e.which == 13) { // enter key
            browser.runtime.sendMessage({
                command: "setlink",
                link: $(this).val()
            });
        }
    })

    //Sends the browser a message with new cover state
    $("#cover").click(function() {
        var cover_state = $("#cover").is(':checked')
        browser.runtime.sendMessage({
            command: "cover",
            checked: cover_state
        });
    })
});