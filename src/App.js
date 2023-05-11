import Home from './pages/home'
import About from './pages/about'
import Tuto from './pages/tuto'
import Questions from './pages/questionsGen'
import MultiGe from './pages/mge'
import ModificationG from './pages/modificationGuide'
import Stations from './pages/GenerationStation'
import './styles/main.css'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
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
