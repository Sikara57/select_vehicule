var tmp, car;
var tabObj = {};
var tabDestination = {};
var total={poids:0,volume:0};

// Fonctioin qui permet de detecter le passage de l'image de l'objet au dessus de celle du véhicule
function intersection(r,d)
{
    var boolean = false;
    if((r.a.x>=d.a.x)&&(r.a.x<=d.b.x)&&(r.a.y>=d.a.y)&&(r.a.y<=d.c.y)) boolean = true;
    if((r.b.x>=d.a.x)&&(r.b.x<=d.b.x)&&(r.b.y>=d.a.y)&&(r.b.y<=d.c.y)) boolean = true;
    if((r.c.x>=d.a.x)&&(r.c.x<=d.b.x)&&(r.c.y>=d.a.y)&&(r.c.y<=d.c.y)) boolean = true;
    if((r.d.x>=d.a.x)&&(r.d.x<=d.b.x)&&(r.d.y>=d.a.y)&&(r.d.y<=d.c.y)) boolean = true;
    return boolean;
}

// Fonction qui permet de faire le total des attributs dans le camion
function addObj(total,obj)
{
    var tmp = {
        poids: total.poids+obj.poids,
        volume: total.volume+obj.volume
    };

    return tmp;
}


// Fonction qui permet de déssiner les images
function initialize(draw,type)
{
    switch (type) {
        case 'palette':
        {
            var palette = draw.image('img/objet/palette.png').size(80,90).move(20,10);
            palette.data('caracteristique', { value :{longueur:0.8, largueur:1.2, hauteur:1, poids:200,volume:0.96}});
            var msg = draw.text('Palette \n (0.8 x 1.2 x 1) \n 200kg').font({size:'10'}).move(20,90);

            var palette1 = draw.image('img/objet/palette.png').size(80,90).move(150,10);
            palette1.data('caracteristique', { value :{longueur:0.8, largueur:1.2, hauteur:2, poids:500,volume:1.92}});
            var msg1 = draw.text('Palette \n (0.8 x 1.2 x 2) \n 500kg').font({size:'10'}).move(150,90);
            
            var palette2 = draw.image('img/objet/palette.png').size(80,90).move(270,10);
            palette2.data('caracteristique', { value :{longueur:0.8, largueur:1.2, hauteur:1.5, poids:300,volume:1.44}});
            var msg1 = draw.text('Palette \n (0.8 x 1.2 x 1.5) \n 300kg').font({size:'10'}).move(270,90);
            
            var palette3 = draw.image('img/objet/palette.png').size(80,90).move(390,10);
            palette3.data('caracteristique', { value :{longueur:1, largueur:0.8, hauteur:1.7, poids:200,volume:1.36}});
            var msg1 = draw.text('Palette \n (1 x 0.8 x 1.7) \n 200kg').font({size:'10'}).move(390,90);
            
            dragObj(draw,palette);
            dragObj(draw,palette1);
            dragObj(draw,palette2);
            dragObj(draw,palette3);
            break;
        }
        case 'tube':
        {
            var tube = draw.image('img/objet/tube.png').size(70,50).move(20,10);
            tube.data('caracteristique', { value :{longueur:9, largueur:0, hauteur:9, poids:400,volume:0}});
            var msg = draw.text('Tube \n 9m \n 400kg').font({size:'10'}).move(20,70);

            var tube1 = draw.image('img/objet/tube.png').size(70,50).move(150,10);
            tube1.data('caracteristique', { value :{longueur:7, largueur:0, hauteur:0, poids:700,volume:0}});
            var msg1 = draw.text('Tube \n 7m \n 700kg').font({size:'10'}).move(150,70);

            dragObj(draw,tube);
            dragObj(draw,tube1);
            break;
        }
        case 'divers':
        {
            var divers = draw.image('img/objet/cadre.png').size(80,90).move(20,10);
            divers.data('caracteristique', { value :{longueur:1.8, largueur:0.8, hauteur:2.2, poids:300,volume:3.17}});
            var msg = draw.text('Cadre \n (1.8 x 0.8 x 2.2) \n 300kg').font({size:'10'}).move(20,90);

            var divers1 = draw.image('img/objet/bac.png').size(80,90).move(150,10);
            divers1.data('caracteristique', { value :{longueur:1, largueur:1.2, hauteur:1, poids:200,volume:1.2}});
            var msg1 = draw.text('Bac \n (1 x 1.2 x 1) \n 200kg').font({size:'10'}).move(150,90);
            
            var divers2 = draw.image('img/objet/boite_elec.png').size(80,80).move(270,10);
            divers2.data('caracteristique', { value :{longueur:1, largueur:2, hauteur:2, poids:200,volume:2}});
            var msg1 = draw.text('Boite Electrique \n (1 x 1 x 2) \n 200kg').font({size:'10'}).move(270,90);

            dragObj(draw,divers);
            dragObj(draw,divers1);
            dragObj(draw,divers2);
            break;
        }
        case 'car':
        {
            car = draw.image('img/car/T1.png').size(250,170).move(120,240);
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

// Fonction qui permet de rendre déplaçable les images
function dragObj(draw,obj)
{
    obj.draggable();
    var departX = obj.attr('x');
    var departY = obj.attr('y');
    var width = obj.attr('width');
    var height = obj.attr('height');
    var adresse = obj.attr('href');

    obj.on('dragstart', function(event){ // au démarrage du drag
        tmp = draw.image(adresse).size(width,height).move(departX,departY);        
    })

    obj.on('dragmove',function(event){ // lors du drag
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

    obj.on('dragend', function(event){ // a la fin du drag

        obj.move(departX,departY)
        tmp.remove()

        console.log(obj.data('caracteristique').value);
        
        if(intersection(tabObj,tabDestination))
        {
            total = addObj(total,obj.data('caracteristique').value)
            console.log(total)
            var text = draw.text('+1');
            text.font({size:'42'});
            text.move(180,200);
            setTimeout(function(){text.hide()},500)

            var newImg = changeImg(total);
            car.attr('href',newImg)
        } 
    })
}

// Fonction qui permet de déterminer quelle image afficher
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