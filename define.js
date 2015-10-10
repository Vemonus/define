$('body').append('<div id="define" style="display:none; position:center;" title="">');
$('body').append('</div>');

$('#define').dialog({
    modal:true,
    autoOpen:false,
    height:50,
    minWidth:400,
    minHeight:30,
    draggable:true,
});

function calldictionary(word){
    var test;
    $('#define').html('<div id="definition" style="background-color:blue; text-align:center;">You picked the word ' + word + '.');
    var reference = '<a href="http://app.dictionary.com/click/hbnm17?clkdest=http://dictionary.reference.com/browse/' + word + '"/>';
    var complete_url = urlheader + word;
    $('#define').append('<div id="link" style="background-color:grey; text-align:left;"><a href=' + complete_url + '>Define</div>');
    $('div#define').attr('title', word);
}

function emitTest(){
    self.port.emit("updatedWord");
}

$(window).dblclick(function() {
    var selected = getSelected();
    if (selected!="") {
        calldictionary(selected);
        var completedURL = "http://www.dictionary.com/browse/" + selected;
        $('#define').dialog("open");
        dictionaryRef.contentURL = completedURL;
        self.port.emit("test");
        self.port.emit("updatedWord");
    }
});

function getSelected() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

self.port.on("updatedWord", function(){
    console.log("index.js emitted updatedWord");
});
