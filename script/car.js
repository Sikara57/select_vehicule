$(document).ready(function(){
    var nbre = 0;

    draw = SVG('drawing').size('100%','100%');
    $('#myObject').hide();
    $('#recap').hide();

    initialize(draw,'car');

    $('#nav span').on('click',function(){
        $('#myObject').hide();
        var tmp = car.attr('href');             // je sauvegarde l'image actuel
        $('#drawing svg').children().remove();  // je supprime toutes les images
        initialize(draw,'car');                 // j'affiche l'image de la voiture
        car.attr('href',tmp);                   // je remplace l'image par celle en cours
        var menu = $(this).text();              // je récupére le nom dans le menu
        switch (menu) {                         // j'ajoute les objets correspondants
            case 'Palette':
            {
                initialize(draw,'palette');
                break;
            }
            case 'Tube':
            {
                initialize(draw,'tube');
                break;
            }
            case 'Divers':
            {
                initialize(draw,'divers');
                break;
            }
            case 'Votre Produit':
            {
                $('#myObject').show();
                break;
            }
            default:
            {
                break;
            }
        }
    });

    $('#addObject').on('click',function(){
        event.preventDefault();
        nbre++;
        $('#error_my_object').empty();
        var vol = parseFloat($('#Volume').val());
        console.log(vol)
        if(vol)
        {
            var tmp = {
                id : Date.now(),
                longueur:parseFloat($('#Longueur').val()),
                largeur:parseFloat($('#Largeur').val()),
                hauteur:parseFloat($('#Hauteur').val()),
                volume:parseFloat($('#Volume').val()),
                poids:parseFloat($('#Poids').val()),
                vehicule:0,
                name:'Mon chargement '+ nbre
            };
    
            total = addObjUser(total,tmp);
            total.chargement.push(tmp);
            rangeCar(total);
            // console.log(total.chargement);
    
            $('.collection').append('<li class="collection-item">'+ tmp.name +'<i class="material-icons right"  data-id="'+tmp.id+'">close</i> <br> <span id="detail">(' + tmp.longueur + ' x ' + tmp.largeur + ' x ' + tmp.hauteur + ') ' + tmp.poids + 'kg</span></li>');
            $('[data-id="'+tmp.id+'"]').on('click',function(){
                total=suprObj($(this).attr('data-id'));
                rangeCar(total);
            })
            $('#recap').show();
        }
        else
        {
            $('#error_my_object').text('Seul des chiffres doivent être saisis ! Attention la virgule est un "." pas une "," !');
        }
    });

    $('#Longueur,#Largeur,#Hauteur').on('change',function(){
        $('#error_my_object').empty();
        var largeur = $('#Largeur').val();
        var longueur = $('#Longueur').val();
        var hauteur = $('#Hauteur').val();
        var tmp = Math.round(largeur*hauteur*longueur*100);
        $('#Volume').val(tmp/100);
    })

})

