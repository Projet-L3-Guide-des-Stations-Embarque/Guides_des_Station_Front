import { Link } from "react-router-dom"

function Tuto()
{
    return(
        <>
        <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/ge">Générer les groupes écologiques</Link>
                <Link to="/tutoriel" className="active">Tutoriel pour KML</Link>
                <Link to="/modification">Modification de guide</Link>
                <Link to="/apropos">A propos</Link>
            </div>
            <div className="tuto_body">
    <center><h1>Tutoriel de création de zones géographiques pour un guide forestier digital</h1></center>

    <ul>
        <li>1. Introduction</li>
        <li>2. Préparation</li>
        <li>3. Création</li>
        <li>4. Exportation</li>
    </ul>

    <h2>1. Introduction</h2>

    <p>Certains guides forestiers incluent une carte, permettant d'adapter des jugements et conclusions en fonction du terrain local. Ce document montre comment réaliser un fichier pouvant être lu par l'application Guide des Stations.</p>

    <center>
        <div>
            <img src="./images_tutoriel/carteGuide.png" className="tuto_20wid"/>
            <img src="./images_tutoriel/carteGoogleEarth.png" className="tuto_20wid"/>
        </div>
    </center>

    <h2>2. Préparation</h2>

    <p>
        L’application utilise un fichier « KML », soi un fichier avec l’extension « .kml ». 
    </p>

    <h2>3. Création</h2>

    <h3>Initialisation</h3>

    <p>Ouvrez Google Earth.</p>

    <center><img src="./images_tutoriel/googleEarth.png" className="tuto_40wid"/></center>

    <p>Sélectionnez « Projets ».</p>

    <center><img src="./images_tutoriel/projets.png" className="tuto_30wid"/></center>

    <p>Sélectionnez « Créer ».</p>

    <center><img src="./images_tutoriel/creerProjet.png" className="tuto_20wid"/></center>

    <p>Sélectionnez « Créer un fichier KML ».</p>

    <center><img src="./images_tutoriel/fichierKML.png" className="tuto_20wid"/></center>

    <h3>Ajouter une zone</h3>

    <p>Dans le nouveau projet, sélectionnez « Nouvel élément ».</p>

    <center><img src="./images_tutoriel/nouveauSecteur.png" className="tuto_40wid"/></center>

    <p>Sélectionnez « Tracer une ligne ou une forme ».</p>

    <center><img src="./images_tutoriel/tracerUneLigneOuUneForme.png" className="tuto_20wid"/></center>

    <p>Cliquez sur la carte pour commencer votre tracé. Cliquez à nouveau pour créer un nouveau trait.</p>  

    <center><img src="./images_tutoriel/debutLigne.png" className="tuto_40wid"/></center>

    <p>Pour finir la zone, créez un nouveau tracé sur le point d’origine.</p>

    <center>
        <img src="./images_tutoriel/finLigne.png" className="tuto_40wid"/>
        <img src="./images_tutoriel/traceComplet.png" className="tuto_40wid"/>
    </center>

    <h3>Nommer la nouvelle zone</h3>

    <p>Le nom que vous donnez au secteur est important car il sera utilisé directement par l’outil pour l’identifier.
Une zone est associée à un secteur (par exemple « secteur climatique »). Si ce secteur est identifié par un certain nombre, entrez ce nombre au début du nom de la zone.
    </p>

    
    <center><img src="./images_tutoriel/triangleGuide.png" className="tuto_10wid"/></center>
    <center><img src="./images_tutoriel/nomSecteur.png" className="tuto_30wid"/></center>
    

    <p>
        <b>Attention</b>    L’application regardera les premiers chiffres du nom de la zone pour savoir à quel secteur elle est associée. Tant qu’il y a une séparation entre la fin du numéro de secteur et le reste du nom, tout est bon (voir exemples). Le reste du nom peut être ce que vous souhaitez.
    </p>

    <center><img src="./images_tutoriel/tableau.png" className="tuto_20wid"/></center>

    <h2>4. Exportation</h2>

    <p>Pour récupérer le fichier KML, sélectionnez « Autres actions ».</p>

    <center><img src="./images_tutoriel/aExporter.png" className="tuto_40wid"/></center>

    <p>Sélectionnez « Exporter en tant que fichier KML ».</p>

    <center><img src="./images_tutoriel/exporterKml.png" className="tuto_20wid"/></center>

    <p>Vous récupérez alors le fichier.</p>

    <center><img src="./images_tutoriel/telechargement.png" className="tuto_40wid"/></center>
</div>
         <Link to="/">Home</Link>
        </>
    )
}

export default Tuto;