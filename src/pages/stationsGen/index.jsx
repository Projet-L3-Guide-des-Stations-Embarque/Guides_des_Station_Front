import { Link } from "react-router-dom"

function Stations()
{
    return(
        <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/apropos">A propos</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations" className="active">Générer les pages des stations</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
            </div>
            <p>Page pour générer les pages des Stations</p>
        
        </>
    )
}

export default Stations;