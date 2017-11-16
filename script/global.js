var tmp, car;
var tabObj = {};
var tabDestination = {};
var total={poids:0,volume:0,vehicule:0,longueur:0,largeur:0,hauteur:0};

// Fonction qui permet de detecter le passage de l'image de l'objet au dessus de celle du véhicule
function intersection(r,d)
{
    var boolean = false;
    if((r.a.x>=d.a.x)&&(r.a.x<=d.b.x)&&(r.a.y>=d.a.y)&&(r.a.y<=d.c.y)) boolean = true;
    if((r.b.x>=d.a.x)&&(r.b.x<=d.b.x)&&(r.b.y>=d.a.y)&&(r.b.y<=d.c.y)) boolean = true;
    if((r.c.x>=d.a.x)&&(r.c.x<=d.b.x)&&(r.c.y>=d.a.y)&&(r.c.y<=d.c.y)) boolean = true;
    if((r.d.x>=d.a.x)&&(r.d.x<=d.b.x)&&(r.d.y>=d.a.y)&&(r.d.y<=d.c.y)) boolean = true;
    return boolean;
}

// Fonction qui permet de faire le total des attributs dans le camion et de sélectionner l'image à afficher avec des objets dans les datas
function addObj(total,obj)
{
    var poids = 0,volume = 0,vehicule = total.vehicule, find=false;

    if(total.vehicule<obj.vehicule)
    {
        // si les caractéristiques de l'objet impose un type de véhicule on change forcément l'image
        car.attr('href',vehicules[obj.vehicule].img)
        var tmp = {
            poids: total.poids+obj.poids,
            volume: total.volume+obj.volume,
            vehicule:obj.vehicule,
            longueur:vehicules[obj.vehicule].longueur,
            largeur:vehicules[obj.vehicule].largeur,
            hauteur:vehicules[obj.vehicule].hauteur
        };
        find = true;
    }
    else
    {
        // On créé l'objet image temporaire additionnant les poids, les volumes, les caractéristiques de l'obj et le type du véhicule
        var tmp = {
            poids: total.poids+obj.poids,
            volume: total.volume+obj.volume,
            vehicule:total.vehicule,
            longueur:obj.longueur,
            largeur:obj.largeur,
            hauteur:obj.hauteur
        };

        for (let index = 0; index < vehicules.length; index++) {
            // On parcours l'ensemble des véhicules enregistrés et on cherche le véhicule qui peut contenir l'objet
            var element = vehicules[index];
            if(element.hauteur>=tmp.hauteur && element.largeur>=tmp.largeur && element.longueur>=tmp.longueur && element.poids>tmp.poids && element.volume>=tmp.volume)
            {   // Soit il existe et on change l'image et les  attributs de total
                tmp.vehicule = vehicules.indexOf(element);
                tmp.longueur = element.longueur;
                tmp.largeur = element.largeur;
                tmp.hauteur = element.hauteur;
                car.attr('href',vehicules[tmp.vehicule].img);
                find=true;
                break;
            }
        }

    }

    if(find==true)
    {
        $('.collection').append('<li class="collection-item">'+ obj.name +'<i class="material-icons right suprChargement">close</i> <br> <span id="detail">(' + obj.longueur + ' x ' + obj.largeur + ' x ' + obj.hauteur + ') ' + obj.poids + 'kg</span></li>');
        $('.suprChargement').on('click',function(){
            $(this).parent().remove();
        })
        $('#recap').show();
        return tmp;
    }
    else
    {
        car.attr('href','img/car/noCar.png');
        draw.text('Aucun véhicule disponible correspondant au critère,').font({size:'20'}).move(30,300);
        draw.text('Merci de nous contacter.').font({size:'20'}).move(120,320);
    }
}

// Fonction qui permet d'ajouter un objet inventé par l'utilisateurs
function addObjUser(total,obj)
{
    var find=false;
    var tmp = {
        poids: total.poids+obj.poids,
        volume: total.volume+obj.volume,
        vehicule:total.vehicule,
        longueur:obj.longueur,
        largeur:obj.largeur,
        hauteur:obj.hauteur
    };
    
    for (let index = 0; index < vehicules.length; index++) {
        // On parcours l'ensemble des véhicules enregistrés et on cherche le véhicule qui peut contenir l'objet
        var element = vehicules[index];
        if(element.hauteur>=tmp.hauteur && element.largeur>=tmp.largeur && element.longueur>=tmp.longueur && element.poids>tmp.poids && element.volume>=tmp.volume)
        {   // Soit il existe et on change l'image et les  attributs de total
            tmp.vehicule = vehicules.indexOf(element);
            tmp.longueur = element.longueur;
            tmp.largeur = element.largeur;
            tmp.hauteur = element.hauteur;
            car.attr('href',vehicules[tmp.vehicule].img);
            find=true;
            break;
        }
    }

    if(find==true)
    {
        $('.collection').append('<li class="collection-item">'+ obj.name +'<i class="material-icons right suprChargement">close</i> <br> <span id="detail">(' + obj.longueur + ' x ' + obj.largeur + ' x ' + obj.hauteur + ') ' + obj.poids + 'kg</span></li>');
        $('.suprChargement').on('click',function(){
            $(this).parent().remove()
        })
        $('#recap').show();
        return tmp;
    }
    else
    {   // Soit il existe pas et on affiche notre incapacité à satisfaire la demande
        car.attr('href','img/car/noCar.png');
        console.log('prout')
        draw.text('Aucun véhicule disponible correspondant au critère,').font({size:'20'}).move(30,300);
        draw.text('Merci de nous contacter.').font({size:'20'}).move(120,320);
        return tmp;
    }

}

// Fonction qui permet de déssiner les images
function initialize(draw,type)
{
    /*
        Les types de véhicules vont de 0 à 3 et le T4P est le numéro 4
    */

    if(type!='car')
    {
        var x=20,y=10,z=1;
        objet[type].forEach(function(elt){
            var image =
            draw.image(elt.img.adr)
                .size(elt.img.width,elt.img.height)
                .move(x,y)
                .data('caracteristique',{value:{name:elt.name,longueur:elt.longueur,largeur:elt.largeur,hauteur:elt.hauteur,poids:elt.poids,volume:elt.volume,vehicule:elt.type_vehicule}});

            draw.text(elt.name+' \n ('+elt.longueur+' x '+elt.largeur+' x '+elt.hauteur+')\n'+elt.poids+'kg')
                .font({size:10})
                .move(x,y+80);
            
            x+=120;
            z++;
            dragObj(draw,image);
            if(z==5){x=10;y=130}
        });
    }
    else
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

        // console.log(obj.data('caracteristique').value);
        
        if(intersection(tabObj,tabDestination))
        {
            total = addObj(total,obj.data('caracteristique').value)
            console.log(total)
            var text = draw.text('+1');
            text.font({size:'42'});
            text.move(180,200);
            setTimeout(function(){text.hide()},500);
        } 
    })
}


function suprObj(total,obj)
{
    var tmp = {
        poids: total.poids-obj.poids,
        volume: total.volume-obj.volume,
        vehicule:total.vehicule,
        longueur:obj.longueur,
        largeur:obj.largeur,
        hauteur:obj.hauteur
    };

    return tmp;
}
