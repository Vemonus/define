var data = require("sdk/self").data;
var word;
var definition = 'Loading...';
var loading = false;

var getDefinition = "var def = document.getElementsByClassName('def-content');" +
                    "definition = def[0].textContent;" +
                    "console.log(definition);" +
                    "self.postMessage(definition, self.contentURL);" +
                    "word = document.getElementsByClassName('js-headword');" +
                    "word = word.textContent;"

pageWorker = require("sdk/page-worker").Page({
  contentScript: getDefinition,
  contentScriptFile: [
    data.url("jquery.js"),
    data.url("jquery-ui.min.js"),
    data.url("define.js")
  ],
  contentURL: "http://dictionary.reference.com/browse/success",
  onAttach: function(worker){
      self.port.emit("complete");
  }
});

currPage = require("sdk/page-mod").PageMod({
    include: "*",
    contentScriptWhen: "ready",
    contentScriptFile: [
        data.url("jquery.js"),
        data.url("jquery-ui.min.js"),
        data.url("define.js"),
    ],
    onAttach: function(worker){
        worker.port.on("dblclick", function(selected){
            pageWorker.contentURL = "http://dictionary.reference.com/browse/" + selected;
            worker.port.emit("dialog", definition);
            worker.on("message", function(){
                console.log("pageMod received a message!");
            });
        });
    }
});
