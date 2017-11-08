$(document).ready(function(){

    var draw = SVG('drawing').size(500,300);
    var text = draw.text("+1")
    text.font({size:'42'})
    text.move(180,100)
    text.hide()
    initialize(text,draw,'car');
    initialize(text,draw,'obj');

})
