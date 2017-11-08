var tmp;
var tabObj = {};
var tabDestination = {};

function intersection(r,d)
{
    var boolean = false;
    if((r.a.x>=d.a.x)&&(r.a.x<=d.b.x)&&(r.a.y>=d.a.y)&&(r.a.y<=d.c.y)) boolean = true;
    if((r.b.x>=d.a.x)&&(r.b.x<=d.b.x)&&(r.b.y>=d.a.y)&&(r.b.y<=d.c.y)) boolean = true;
    if((r.c.x>=d.a.x)&&(r.c.x<=d.b.x)&&(r.c.y>=d.a.y)&&(r.c.y<=d.c.y)) boolean = true;
    if((r.d.x>=d.a.x)&&(r.d.x<=d.b.x)&&(r.d.y>=d.a.y)&&(r.d.y<=d.c.y)) boolean = true;
    return boolean;
}


function initialize(text,draw,type)
{
    switch (type) {
        case 'obj':
        {
            var box = draw.image('img/objet/box.png').size(30,30).move(10,10);
            var cabinet = draw.image('img/objet/cabinet.png').size(30,30).move(60,10);
            dragObj(text,draw,box);
            dragObj(text,draw,cabinet);
            break;
        }
        case 'car':
        {
            var t1 = draw.image('img/car/T1.png').size(250,170).move(120,140);
            tabDestination = {
                a:
                {
                    x:t1.attr('x'),
                    y:t1.attr('y')
                },
                b:
                {
                    x:t1.attr('x')+t1.attr('width'),
                    y:t1.attr('y')
                },
                c:
                {
                    x:t1.attr('x'),
                    y:t1.attr('y')+t1.attr('height')
                },
                d:
                {
                    x:t1.attr('x')+t1.attr('width'),
                    y:t1.attr('y')+t1.attr('height')
                }
            };
            break;
        }   
        default:
        {
            break;
        }
    }
}

function dragObj(text,draw,obj)
{
    obj.draggable();
    var departX = obj.attr('x');
    var departY = obj.attr('y');
    var width = obj.attr('width');
    var height = obj.attr('height');
    var adresse = obj.attr('href');

    obj.on('dragstart', function(event){
        tmp = draw.image(adresse).size(width,height).move(departX,departY);        
    })

    obj.on('dragmove',function(event){
        tabObj = {
            a:
            {
                x:obj.attr('x'),
                y:obj.attr('y')
            },
            b:
            {
                x:obj.attr('x')+obj.attr('width'),
                y:obj.attr('y')
            },
            c:
            {
                x:obj.attr('x'),
                y:obj.attr('y')+obj.attr('height')
            },
            d:
            {
                x:obj.attr('x')+obj.attr('width'),
                y:obj.attr('y')+obj.attr('height')
            }
        };
    })

    obj.on('dragend', function(event){

        obj.move(departX,departY)
        tmp.remove()

        if(intersection(tabObj,tabDestination))
        {
            text.show()
            setTimeout(function(){text.hide()},500)
            console.log('OVERLAP')
        } 
    })
}