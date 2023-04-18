import { Link } from "react-router-dom"

function About()
{
    return(
        <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/apropos" className="active">A propos</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
            </div>
            <p>Site Web pour la génération et l'utilisation des Guides de Stations Embarqués.</p>
            <p>CMIndustries ©</p>
        </>
    )
}

export default About;