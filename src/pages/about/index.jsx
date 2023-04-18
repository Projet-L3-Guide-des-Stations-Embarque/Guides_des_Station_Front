import { Link } from "react-router-dom"

function About()
{
    return(
        <>
         <p>Site Web pour la génération et l'utilisation des Guides de Stations Embarqués.</p>
         <p>CMIndustries ©</p>
         <Link to="/">Home</Link>
        </>
    )
}

export default About;