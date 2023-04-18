import { Link } from "react-router-dom"

function Questions()
{
    return(
        <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/apropos">A propos</Link>
                <Link to="/questions" className="active">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
            </div>
            <p>Page pour générer les questions</p>
        </>
    )
}

export default Questions;