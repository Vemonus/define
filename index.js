var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var dictionaryRef = require("sdk/page-worker");

pageMod.PageMod({
  include: "*",
  contentScriptWhen: "ready",
  contentScriptFile: [
  	data.url("jquery.js"),
	data.url("jquery-ui.min.js"),
    data.url("definitionsender.js"),
	data.url("define.js")
    // data.url("query.js")
  ],
  onAttach: function(worker){
      contentScriptFile: [
        data.url("jquery.js"),
        data.url("jquery-ui.min.js"),
        data.url("define.js")
      ]
      worker.port.emit("getWord", "this");
      worker.port.on("getWord", function(word) {
          console.log("word selected");
          worker.port.emit("newWord", word);
      });
      worker.port.on("updatedWord", function(url){
          console.log(url);
      });
    }
});

dictionaryRef.Page({
    contentScriptWhen: "ready",
    contentScriptFile: [
      data.url("jquery.js"),
      data.url("jquery-ui.min.js"),
      data.url("define.js"),
      // data.url("query.js"),
      data.url("definitionsender.js")
    ],
    contentURL: "http://www.dictionary.com/browse/",
    contentScript: "console.log('hello')",
    onAttach: function(worker){
        // worker.port.emit("definition", function(){
            // console.log("word definition output goes here");
        // });
        worker.port.emit("getWord", "this");
        worker.port.on("newWord", function(word) {
            console.log(word);
            self.contentURL = "http://www.dictionary.com/browse/" + word;
            worker.port.emit("updatedWord", self.contentURL);
        });
    }
});
