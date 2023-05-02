import Home from './pages/home'
import About from './pages/about'
import Tuto from './pages/tuto'
import Questions from './pages/questionsGen'
import Ge from './pages/geGen'
import Stations from './pages/stationsGen'
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
        <Route path="/ge" element={<Ge/>}/>
        <Route path="/tutoriel" element={<Tuto/>}/>
      </Routes>
    </div>
  );
}

export default App;
