import { Link } from "react-router-dom"

function Tuto()
{
    return(
        <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/tutoriel" className="active">Tutoriel pour KML</Link>
                <Link to="/apropos">A propos</Link>
            </div>
            <p>Tutoriel pour fichier KML ici</p>
        </>
    )
}

export default Tuto;