$(document).ready(function(){
    draw = SVG('drawing').size(600,400);
    $('#myObject').hide();
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
        var tmp = {
            longueur:$('#Longueur').val(),
            largeur:$('#Largeur').val(),
            hauteur:$('#Hauteur').val(),
            volume:$('#Volume').val(),
            poids:$('#Poids').val()
        };

        var text = draw.text('+1');
        text.font({size:'42'});
        text.move(180,200);
        setTimeout(function(){text.hide()},500)

        console.log(tmp);
        $('#myObject').hide();
        // total = 
    });

})
