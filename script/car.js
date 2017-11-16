$(document).ready(function(){
    var nbre = 0;

    draw = SVG('drawing').size(500,400);
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
        var tmp = {
            longueur:parseFloat($('#Longueur').val()),
            largeur:parseFloat($('#Largeur').val()),
            hauteur:parseFloat($('#Hauteur').val()),
            volume:parseFloat($('#Volume').val()),
            poids:parseFloat($('#Poids').val()),
            vehicule:0,
            name:'Mon chargement '+ nbre
        };

        total = addObjUser(total,tmp);

        console.log(total);
        // $('#myObject').hide();
        // total = 
    });

    $('#Longueur,#Largeur,#Hauteur').on('change',function(){
        var largeur = $('#Largeur').val();
        var longueur = $('#Longueur').val();
        var hauteur = $('#Hauteur').val();
        var tmp = Math.round(largeur*hauteur*longueur*100);
        $('#Volume').val(tmp/100);
    })

})

