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
            <h1>Home</h1>
            {(number > 5) && <p>super paragraphe</p>}
            <button onClick={() => setNumber(number + 1)}>Incrémenter</button>
            <p className={'paragraph-base ' + ((number > 5) ? 'paragraph-red' : 'paragraph-green')}>{number}</p>
            <Link to="/apropos">A propos</Link>
            <br/>
            <Link to="/tutoriel">Tutoriel pour KML</Link>
        </>
    )
}

export default Home;