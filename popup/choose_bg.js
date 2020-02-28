//set the default value of the cover checkbox

var default_cover = localStorage.getItem("cover")
document.getElementById("cover").checked = JSON.parse(default_cover)

document.addEventListener("click", (e) => {
    var current_cover = document.getElementById('cover').checked;
    if (current_cover === true) {
        localStorage.setItem("cover", "true");
    } else {
        localStorage.setItem("cover", "false")
    }

    function options() {
        browser.runtime.sendMessage({
            command: "options"
        });
    }

    function cover() {
        browser.runtime.sendMessage({
            command: "cover",
            cover: current_cover
        });
    }

    // Just log the error to the console.

    function reportError(error) {
        console.error(`Error: ${error}`);
    }

    if (e.target.classList.contains("options")) {
        options();
    }
    else if (e.target.classList.contains("cover")) {
        cover();
    }

});