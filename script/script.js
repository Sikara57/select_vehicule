$(document).ready(function(){
    var tmp;

    // initialize SVG.js
    var draw = SVG('drawing');
    // draw.height(350);
    
    // draw pink square
    var destination = draw.rect(100,100).move(600,50).fill('blue');
    var rect = draw.rect(100, 100).move(100, 50).fill('#f06');

    var text = draw.text("+1")
    text.font({size:'42'})
    text.move(625,0)
    text.hide()

    tabDestination = {
        a:
        {
            x:destination.attr('x'),
            y:destination.attr('y')
        },
        b:
        {
            x:destination.attr('x')+destination.attr('width'),
            y:destination.attr('y')
        },
        c:
        {
            x:destination.attr('x'),
            y:destination.attr('y')+destination.attr('height')
        },
        d:
        {
            x:destination.attr('x')+destination.attr('width'),
            y:destination.attr('y')+destination.attr('height')
        }
    };
    
    rect.draggable();

    rect.on('dragstart', function(event){
        tmp = draw.rect(100,100).move(100,50).fill('#f06');        
    })

    rect.on('dragmove',function(event){
        tabRect = {
            a:
            {
                x:rect.attr('x'),
                y:rect.attr('y')
            },
            b:
            {
                x:rect.attr('x')+rect.attr('width'),
                y:rect.attr('y')
            },
            c:
            {
                x:rect.attr('x'),
                y:rect.attr('y')+rect.attr('height')
            },
            d:
            {
                x:rect.attr('x')+rect.attr('width'),
                y:rect.attr('y')+rect.attr('height')
            }
        };
    })

    rect.on('dragend', function(event){
        var x = rect.attr('x');
        var y = rect.attr('y');
        var width = rect.attr('width');
        var height = rect.attr('height');

        var xD = destination.attr('x');
        var yD = destination.attr('y');
        var widthD = destination.attr('width');
        var heightD = destination.attr('height');

        rect.move(100,50)
        tmp.remove()

        // console.log(tabRect)
        // console.log(tabDestination)

        if(intersection(tabRect,tabDestination))
        {
            text.show()
            setTimeout(function(){text.hide()},500)
            console.log('OVERLAP')
        } 
    })
})



function intersection(r,d)
{
    var tmp = false;
    if((r.a.x>=d.a.x)&&(r.a.x<=d.b.x)&&(r.a.y>=d.a.y)&&(r.a.y<=d.c.y)) tmp = true;
    if((r.b.x>=d.a.x)&&(r.b.x<=d.b.x)&&(r.b.y>=d.a.y)&&(r.b.y<=d.c.y)) tmp = true;
    if((r.c.x>=d.a.x)&&(r.c.x<=d.b.x)&&(r.c.y>=d.a.y)&&(r.c.y<=d.c.y)) tmp = true;
    if((r.d.x>=d.a.x)&&(r.d.x<=d.b.x)&&(r.d.y>=d.a.y)&&(r.d.y<=d.c.y)) tmp = true;
    return tmp;
}


