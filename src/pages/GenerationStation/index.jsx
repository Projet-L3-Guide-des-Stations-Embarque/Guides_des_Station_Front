import { Link } from "react-router-dom"
import { useState} from "react";
import Station from './Station';

function Stations() {

    const [idSuivant, setIdSuivant] = useState(2)

    const [TabStation, setTabStations] = useState([{id:'1', titre: '', elements: [{idSect:'0', titre:'',elements: [{idElem:'0',type:'texte',contenu:'',base64:''},{idElem:'1',type:'image',contenu:'',base64:''}]}]}]);

    const ajouterStation = () => {
        let newStation = ({id:String(idSuivant), titre: '', elements: [ {idSect:'0',titre:'', elements: [ {idElem:'0',type:'texte',contenu:'',base64:''},{idElem:'1',type:'image',contenu:'',base64:''}] }] })
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
            data[i].elements = val;
            setTabStations(data);
        }
    
        const changeIemeElementNomStation = (i, val) => {
            let data = [...TabStation];
            data[i].titre = val;
            setTabStations(data);
        }

        const createChangeIemeElementNomStation = (i) => {
            return changeIemeElementNomStation.bind(null, i)
        }

        const createChangeIemeElementTabSections = (i) => {
            return changeIemeElementTabSections.bind(null, i)
        }

        const submit = (e) => {
            download(e);
    
        }
    
        const download = (e) => {
            const fileData = JSON.stringify(TabStation);
            const blob = new Blob([fileData], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = "stations.json";
            link.href = url;
            link.click();
        }
    
        return (
            <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations" className="active">Générer les pages des stations</Link>
                <Link to="/ge">Générer les groupes écologiques</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/modification">Modification de guide</Link>
                <Link to="/apropos">A propos</Link>
        </div>
        <h2 className="catchPhrase">Page pour générer les pages des Stations</h2>
        <div className="App">                
        {TabStation.map((entry,indexStation) => {
                return(
                    <div key={entry.id} className='formulairedeLaGE'>
                        <Station nomStat={entry.titre} sections={entry.elements}
                        onChangeNomStation={createChangeIemeElementNomStation(indexStation)}
                        onChangeTabSections={createChangeIemeElementTabSections(indexStation)}></Station>
                        <button onClick={event => SupprimerStation(indexStation)}>Supprimer</button>
                    </div>
                    )
            })}
            <div className='formulaireFin'>
                <button onClick={ajouterStation}>Ajouter une nouvelle station</button>
                <button onClick={submit}>Envoyer</button>
            </div>
        </div>
        </>
        )

} export default Stations;