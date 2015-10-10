var sendInformation = "var elements = document.querySelectorAll('div.def-set > div'); " +
                      "for (var i = 0; i < elements.length; i++) {" +
                      " postMessage(elements[i].textContent) " +
                      "}" +
                      "self.destroy();";

function createPageWorker(URL){

    dictionaryReference.Page({
        contentScriptWhen: "ready",
        contentScriptFile: [
            data.url("jquery.js"),
            data.url("jquery-ui.min.js"),
            data.url("define.js"),
            data.url("definitionsender.js")
        ],
        contentURL: URL,
        contentScript: sendInformation,
        onMessage: "function(message){"+
        "console.log(message);}"
    });
}
