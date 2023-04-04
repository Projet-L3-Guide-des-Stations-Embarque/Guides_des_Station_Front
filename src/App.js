import Home from './pages/home'
import About from './pages/about'
import './styles/main.css'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/apropos" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
