import { Link } from "react-router-dom"

function ModificationG(){
    return(
        <>
        <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/ge">Générer les groupes écologiques</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/modification" className="active">Modification de guide</Link>
                <Link to="/apropos">A propos</Link>
        </div>
        </>
    )
} export default ModificationG;