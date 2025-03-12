window.addEventListener("load", () => {
    // This code redirects console log information and prints
    // it to a textarea on the web page instead.
    const printField = document.getElementById("printField");
    console.stdlog = console.log.bind(console);
    window.onerror = function(msg, url, line) {
        console.error(`Error line ${line}: ${msg}`);
    }
    function log(content, status) {
        if (Array.isArray(content)) {
            let s = "";
            for (let i = 0; i < content.length; i++) {
                s = s.concat(content[i], ", ");
            }
            content = `array: [ ${s.substring(0, s.length - 2)} ]`;
        }
        let line = document.createElement("div");
        line.classList.add(status !== "error" ? "consoleLog" : "consoleError");
        line.innerText = content;
        printField.appendChild(line);
        printField.scrollTop = printField.scrollHeight;
    }
    console.log = function (content) {
        if (content.length > 17 && (content.substring(0, 13) === "[Five Server]" || content.substring(0, 17) === "Socket is closed.")) {
            console.stdlog(content);
            return;
        }
        log(content, "log");
    }
    console.error = function (content) {
        log(content, "error");
    }
});