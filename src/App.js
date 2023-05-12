import Home from './pages/home'
import About from './pages/about'
import Tuto from './pages/tuto'
//import Questions from './pages/questionsGen'
import MultiGe from './pages/mge'
import ModificationG from './pages/modificationGuide'
import Stations from './pages/GenerationStation'
import Questions from './pages/generationQuestion'
import './styles/main.css'
import {Route, Routes} from 'react-router-dom'
import {Link, useLocation} from 'react-router-dom'

function App() {
  let location = useLocation();
  return (
    
    <div className="App">
      <div className="topnav">
        <Link to="/" className={(location.pathname == "/")? "active" : ""}>Accueil</Link>
        <Link to="/questions" className={(location.pathname == "/questions")? "active" : ""}>Générer les questions</Link>
        <Link to="/stations" className={(location.pathname == "/stations")? "active" : ""}>Générer les pages des stations</Link>
        <Link to="/ge" className={(location.pathname == "/ge")? "active" : ""}>Générer les groupes écologiques</Link>
        <Link to="/tutoriel" className={(location.pathname == "/tutoriel")? "active" : ""}>Tutoriel pour KML</Link>
        <Link to="/modification" className={(location.pathname == "/modification")? "active" : ""}>Modification de guide</Link>
        <Link to="/apropos" className={(location.pathname == "/apropos")? "active" : ""}>A propos</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/apropos" element={<About/>}/>
        <Route path="/questions" element={<Questions/>}/>
        <Route path="/stations" element={<Stations/>}/>
        <Route path="/ge" element={<MultiGe/>}/>
        <Route path="/tutoriel" element={<Tuto/>}/>
        <Route path="/modification" element={<ModificationG/>}/>
      </Routes>
    </div>
  );
}

export default App;
