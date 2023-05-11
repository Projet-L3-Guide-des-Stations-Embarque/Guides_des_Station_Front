import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home()
{
    const [number, setNumber] = useState(0)

    useEffect(() =>
    {
        if(number > 7)
            setNumber(0)
    }, [number])

    return(
        <>
            <div className="topnav">
                <Link to="/" className="active">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/ge">Générer les groupes écologiques</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/modification">Modification de guide</Link>
                <Link to="/apropos">A propos</Link>
            </div>

            <div className="content">
                <p>
                    Pour créer un guide vous pouvez <Link to="/questions">Générer les questions</Link> ainsi que <Link to="/stations">Générer les pages des stations</Link>.
                </p>
            </div>

        </>
    )
}

export default Home;