<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>SVG</title>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="script/svg.js"></script>
    <script type="text/javascript" src="script/svg.draggable.js"></script>
    <script type="text/javascript" src="script/svg.intersection.js"></script>
    <script type="text/javascript" src="script/global.js"></script>
    <script type="text/javascript" src="script/car.js"></script>
    <!-- <script type="text/javascript" src="script/script.js"></script> -->
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <link rel="stylesheet" href="script/script.css">
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
</head>
<body>
    <div>
        <div class="container">
            <div id="nav">
                <span>Palette</span>
                <span>Tube</span>
                <span>Divers</span>
                <span>Votre Produit</span>
            </div>   
            <div id="drawing">
            </div>
            <i>Ces informations sont données à titre indicatf, pour convenir d'une course il est nécessaire de contacter nos services.</i>
        </div>
        <div id="myObject">
            Mon Chargement :
            <form name="myObject">
                <input type="text" name="Longueur" id="Longueur"><label for="Longueur">Longueur</label>
                <input type="text" name="Largeur" id="Largeur"><label for="Largeur">Largeur</label>
                <input type="text" name="Hauteur" id="Hauteur"><label for="Hauteur">Hauteur</label>
                <input type="text" name="Poids" id="Poids"><label for="Poids">Poids</label>
                <input type="text" name="Volume" id="Volume"><label for="Volume">Volume</label>
            </form>
            <button id="addObject">Ajouter</button>
        </div> 
    </div>
</body>
</html>