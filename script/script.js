$(document).ready(function(){
    var tmp;

    // initialize SVG.js
    var draw = SVG('drawing');
    draw.height(350);
    
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



