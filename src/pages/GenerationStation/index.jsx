import { Link } from "react-router-dom"
import { useState} from "react";
import Station from './Station';

function Stations() {

    const [idSuivant, setIdSuivant] = useState(2)

    const [TabStation, setTabStations] = useState([{id:'1', nomStation: '', section: [{idSect:'0', nomSection:'',elements: [{idElem:'0',type:'text',info:''},{idElem:'1',type:'image',info:''}]}]}]);

    const ajouterStation = () => {
        let newStation = ({id:String(idSuivant), nomStation: '', section: [ {idSect:'0',nomSection:'', elements: [ {idElem:'0',type:'text',info:''},{idElem:'1',type:'image',info:''}] }] })
        setIdSuivant(idSuivant + 1)
        setTabStations([...TabStation, newStation])
    }
    
        const SupprimerStation = (i) => {
            let data = [...TabStation];
            let part1 = data.splice(0, i)
            data.splice(0, 1)
            let result = [...part1, ...data]
            setTabStations(result)
        }

        const changeIemeElementTabSections = (i, val) => {
            let data = [...TabStation];
            data[i].section = val;
            setTabStations(data);
        }
    
        const changeIemeElementNomStation = (i, val) => {
            let data = [...TabStation];
            data[i].nomStation = val;
            setTabStations(data);
        }

        const createChangeIemeElementNomStation = (i) => {
            return changeIemeElementNomStation.bind(null, i)
        }

        const createChangeIemeElementTabSections = (i) => {
            return changeIemeElementTabSections.bind(null, i)
        }
    
        return (
            <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations" className="active">Générer les pages des stations</Link>
                <Link to="/ge">Générer les groupes écologiques</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/apropos">A propos</Link>
        </div>
        <h2 className="catchPhrase">Page pour générer les pages des Stations</h2>
        <div className="App">                
        {TabStation.map((entry,indexStation) => {
                return(
                    <div key={entry.id} className='formulairedeLaGE'>
                        <Station nomStat={entry.nomStation} sections={entry.section}
                        onChangeNomStation={createChangeIemeElementNomStation(indexStation)}
                        onChangeTabSections={createChangeIemeElementTabSections(indexStation)}></Station>
                        <button onClick={event => SupprimerStation(indexStation)}>Supprimer</button>
                    </div>
                    )
            })}
            <div className='formulaireFin'>
                <button onClick={ajouterStation}>Ajouter une nouvelle station</button>
                <button>Envoyer</button>
            </div>
        </div>
        </>
        )

} export default Stations;
//{TabStation.map((entry,indexStation) => {
    //<button onClick={event => SupprimerStation(indexStation)}>Supprimer</button>