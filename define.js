$('body').append('<div id="define" style="display:block; position:center;" title=""><div id="definition" style="background-color:blue; text-align:center;"></div>');
$('body').append('</div>');


var definition;

$('#define').dialog({
    modal:true,
    autoOpen:false,
    height:50,
    minWidth:400,
    minHeight:40,
    draggable:true,
});

function calldictionary(definition){
    console.log(definition);
    $('div#definition').text(definition);
    $('#define').dialog("open");
}

function send(){
    var selected = getSelected();
    if (selected != ""){
        self.port.emit("dblclick", selected);
    }
}

function getSelected() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

$(window).dblclick(function() {
    send();
});

self.port.on("dialog", function(definition){
    calldictionary(definition);
});
