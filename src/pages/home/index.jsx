import { Link } from 'react-router-dom'

function Home()
{

    return(
        <>
            <div className="content">
                <p>
                    Pour créer un guide vous pouvez <Link to="/questions">Générer les questions</Link> ainsi que <Link to="/stations">Générer les pages des stations</Link>.
                </p>
            </div>

        </>
    )
}

export default Home;