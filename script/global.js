var tmp, car;
var tabObj = {};
var tabDestination = {};
var total={poids:0,volume:0,vehicule:0,longueur:0,largeur:0,hauteur:0,chargement:[]};
var id =0;

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
        // si les caractéristiques de l'objet impose un type de véhicule on change forcément l'image mais on vérifie le poids
        var tmp = {
            poids: total.poids+obj.poids,
            volume: total.volume+obj.volume,
            vehicule:obj.vehicule,
            longueur:vehicules[obj.vehicule].longueur,
            largeur:vehicules[obj.vehicule].largeur,
            hauteur:vehicules[obj.vehicule].hauteur,
            chargement:total.chargement
        };
                
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
            hauteur:obj.hauteur,
            chargement:total.chargement
        };

        for (let index = 0; index < vehicules.length; index++) {
            // On parcours l'ensemble des véhicules enregistrés et on cherche le véhicule qui peut contenir l'objet
            var element = vehicules[index];
            if(element.hauteur>=total.hauteur && element.largeur>=total.largeur && element.longueur>=total.longueur && element.poids>tmp.poids && element.volume>=tmp.volume)
            {   // Soit il existe et on change l'image et les  attributs de total
                if(vehicules.indexOf(element)>tmp.vehicule) tmp.vehicule = vehicules.indexOf(element);
                tmp.longueur = element.longueur;
                tmp.largeur = element.largeur;
                tmp.hauteur = element.hauteur;
                break;
            }
        }

    }

    if(vehicules[tmp.vehicule].poids>=tmp.poids)
    {
        find = true;
        car.attr('href',vehicules[obj.vehicule].img)
    }

    if(find==true)
    {
        return tmp;
    }
    else
    {
        car.attr('href','img/car/noCar.png');
        draw.text('Aucun véhicule ne semble correspondre aux critères,').font({size:'20'}).move(30,300).attr('data-warning','yes');
        draw.text('Merci de nous contacter.').font({size:'20'}).move(120,320).attr('data-warning','yes');
        return tmp;
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
        hauteur:obj.hauteur,
        chargement:total.chargement
    };
    
    for (let index = 0; index < vehicules.length; index++) {
        // On parcours l'ensemble des véhicules enregistrés et on cherche le véhicule qui peut contenir l'objet
        var element = vehicules[index];
        if(element.hauteur>=tmp.hauteur && element.largeur>=tmp.largeur && element.longueur>=tmp.longueur && element.poids>tmp.poids && element.volume>=tmp.volume)
        {   // Soit il existe et on change l'image et les  attributs de total
            if(vehicules.indexOf(element)>tmp.vehicule) tmp.vehicule = vehicules.indexOf(element);
            obj.vehicule=vehicules.indexOf(element);
            tmp.longueur = element.longueur;
            tmp.largeur = element.largeur;
            tmp.hauteur = element.hauteur;
            break;
        }
    }

    if(vehicules[tmp.vehicule].poids>=tmp.poids)
    {
        car.attr('href',vehicules[tmp.vehicule].img);
        find=true;
    }

    if(find==true)
    {
        return tmp;
    }
    else
    {   // Soit il existe pas et on affiche notre incapacité à satisfaire la demande
        car.attr('href','img/car/noCar.png');
        draw.text('Aucun véhicule ne semble correspondre aux critères,').font({size:'20'}).move(30,300).attr('data-warning','yes');
        draw.text('Merci de nous contacter.').font({size:'20'}).move(120,320).attr('data-warning','yes');
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
            var objCarac = obj.data('caracteristique').value;
            total = addObj(total,objCarac);
            objCarac.id = Date.now();
            total.chargement.push(objCarac);
            // console.log(total.chargement);
            rangeCar(total);

            $('.collection').append('<li class="collection-item">'+ objCarac.name +'<i class="material-icons right"  data-id="'+objCarac.id+'">close</i> <br> <span id="detail">(' + objCarac.longueur + ' x ' + objCarac.largeur + ' x ' + objCarac.hauteur + ') ' + objCarac.poids + 'kg</span></li>');
            $('[data-id="'+objCarac.id+'"]').on('click',function(){
                total=suprObj($(this).attr('data-id'));
                rangeCar(total);
                // console.log(total)
            })
            $('#recap').show();

            var text = draw.text('+1');
            text.font({size:'42'});
            text.move(180,200);
            setTimeout(function(){text.hide()},500);
        } 
    })
}

function suprObj(id)
{
    var obj;
    // Suppression du DOM
    $('[data-id="'+id+'"]').parent().remove();
    $('text[data-warning="yes"]').remove();

    // Recherche de l'objet avec notre id
    for (let index = 0; index < total.chargement.length; index++) {
        const elt = total.chargement[index];
        if(elt.id==id)
        {
            obj=elt;
        }
    }

    // Suppression de l'objet dans le chargement
    var position = total.chargement.indexOf(obj);
    total.chargement.splice(position,1);

    // On vérifie si il y a encore un chargement ou plusieurs
    if(total.chargement.length>1)
    {
        // On calcul les nouvelles caractéristiques du chargement puis on choisi les dimensions les plus grandes
        total =
        {
            poids:total.poids-obj.poids,
            volume:total.volume-obj.volume,
            vehicule:0,
            longueur:0,
            largeur:0,
            hauteur:0,
            chargement:total.chargement
        };

        for (let index = 0; index < total.chargement.length; index++) {
            var elt = total.chargement[index];
            if(total.vehicule<=elt.vehicule)
            {
                total.vehicule = elt.vehicule;
                total.longueur = elt.longueur;
                total.largeur = elt.largeur;
                total.hauteur = elt.hauteur;
            }            
        }
        console.log(total)

    }
    else if(total.chargement.length==1)
    {
        total =
        {
            poids:total.chargement[0].poids,
            volume:total.chargement[0].volume,
            vehicule:total.chargement[0].vehicule,
            longueur:total.chargement[0].longueur,
            largeur:total.chargement[0].largeur,
            hauteur:total.chargement[0].hauteur,
            chargement:total.chargement
        };
    }
    else
    {
        total = {poids:0,volume:0,vehicule:0,longueur:0,largeur:0,hauteur:0,chargement:[]};
    }

    if(vehicules[total.vehicule].poids>=total.poids)
    {
        car.attr('href',vehicules[total.vehicule].img);
    }
    else
    {
        car.attr('href','img/car/noCar.png');
        draw.text('Aucun véhicule ne semble correspondre aux critères,').font({size:'20'}).move(30,300).attr('data-warning','yes');
        draw.text('Merci de nous contacter.').font({size:'20'}).move(120,320).attr('data-warning','yes');
    }

    return total;

}


function rangeCar(total)
{
    var poids = total.poids;
    var car = total.vehicule;
    var volume = total.volume;

    var vehicule_poids = vehicules[car].poids;
    var vehicule_volume = vehicules[car].volume;

    $('#jauge_poids').html('Poids : ' + poids + ' / ' + vehicule_poids);
    $('#jauge_volume').html('Volume : ' + volume + ' / ' + vehicule_volume);
}