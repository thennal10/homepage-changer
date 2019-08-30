//set the default value of the textbox
var default_input = localStorage.getItem("textbox_input")
document.getElementById("textbox").defaultValue = default_input

//set the default value of the cover checkbox
var default_cover = localStorage.getItem("cover")
if (default_cover === "true") {
    document.getElementById("cover").checked = true
} else if (default_cover === "false") {
    document.getElementById("cover").checked = false
}

document.addEventListener("click", (e) => {
    var current_input = document.getElementById('textbox').value;
    localStorage.setItem("textbox_input", current_input);

    var current_cover = document.getElementById('cover').checked;
    if (current_cover === true) {
        localStorage.setItem("cover", "true");
    } else {
        localStorage.setItem("cover", "false")
    }

    function next() {
        browser.runtime.sendMessage({
            command: "next",
            input: current_input,
            cover: current_cover
        });
    }

    function back() {
        browser.runtime.sendMessage({
            command: "back",
            input: current_input,
            cover: current_cover
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

    if (e.target.classList.contains("next")) {
        next();
    } 
    else if (e.target.classList.contains("back")) {
        back();
    }
    else if (e.target.classList.contains("cover")) {
        cover();
    }

});