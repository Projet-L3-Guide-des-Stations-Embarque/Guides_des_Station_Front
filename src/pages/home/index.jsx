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
                <Link to="/apropos">A propos</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
            </div>
            
            <button onClick={() => setNumber(number + 1)}>Incrémenter</button>
            {(number > 5) && <p>super paragraphe</p>}
            <p className={'paragraph-base ' + ((number > 5) ? 'paragraph-red' : 'paragraph-green')}>{number}</p>
        </>
    )
}

export default Home;