var tmp, car;
var tabObj = {};
var tabDestination = {};
var total=0;

function intersection(r,d)
{
    var boolean = false;
    if((r.a.x>=d.a.x)&&(r.a.x<=d.b.x)&&(r.a.y>=d.a.y)&&(r.a.y<=d.c.y)) boolean = true;
    if((r.b.x>=d.a.x)&&(r.b.x<=d.b.x)&&(r.b.y>=d.a.y)&&(r.b.y<=d.c.y)) boolean = true;
    if((r.c.x>=d.a.x)&&(r.c.x<=d.b.x)&&(r.c.y>=d.a.y)&&(r.c.y<=d.c.y)) boolean = true;
    if((r.d.x>=d.a.x)&&(r.d.x<=d.b.x)&&(r.d.y>=d.a.y)&&(r.d.y<=d.c.y)) boolean = true;
    return boolean;
}


function initialize(draw,type)
{
    switch (type) {
        case 'obj':
        {
            var box = draw.image('img/objet/box.png').size(30,30).move(10,10);
            box.data('volume', { value: { data: 0.3 }});
            var cabinet = draw.image('img/objet/cabinet.png').size(30,30).move(60,10);
            cabinet.data('volume',{value : {data:1.5}});
            dragObj(draw,box);
            dragObj(draw,cabinet);
            break;
        }
        case 'car':
        {
            car = draw.image('img/car/T1.png').size(250,170).move(120,140);
            tabDestination = {
                a:
                {
                    x:car.attr('x'),
                    y:car.attr('y')
                },
                b:
                {
                    x:car.attr('x')+car.attr('width'),
                    y:car.attr('y')
                },
                c:
                {
                    x:car.attr('x'),
                    y:car.attr('y')+car.attr('height')
                },
                d:
                {
                    x:car.attr('x')+car.attr('width'),
                    y:car.attr('y')+car.attr('height')
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

function dragObj(draw,obj)
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

        var volume = obj.data('volume').value.data;
        
        if(intersection(tabObj,tabDestination))
        {
            total = total+volume;
            console.log(total)
            var text = draw.text('+' + JSON.stringify(volume));
            text.font({size:'42'});
            text.move(180,100);
            setTimeout(function(){text.hide()},500)

            var newImg = changeImg(total);
            car.attr('href',newImg)
            // console.log(car.attr('href'))
            // console.log('OVERLAP')
        } 
    })
}

function changeImg(total)
{
    if (total>=10 && total<20) {
        return src='img/car/T2.png';
        
    } else if(total>=20 && total<30){
        return src='img/car/T3.png';
    }
    else if(total>=30){
        return src='img/car/T4.png';
    }
}