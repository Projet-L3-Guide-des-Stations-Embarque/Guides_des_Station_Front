import { Link } from 'react-router-dom'

function Home()
{

    return(
        <>
            <div className="content">
                <p>
                    Pour créer un guide vous pouvez <Link to="/questions">Gestionnaire des questions</Link> ainsi que <Link to="/stations">Gestionnaire des pages des stations</Link>.
                </p>
            </div>

        </>
    )
}

export default Home;