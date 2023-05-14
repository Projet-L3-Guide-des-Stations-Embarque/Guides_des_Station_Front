import { Link } from "react-router-dom"
import { useState} from "react";
import Station from './Station';


//const jsonS = [{id:'1', titre: 'Titre', elements: [{idSect:'4', titre:'test',elements: [{idElem:'0',type:'texte',contenu:'coucou',base64:''},{idElem:'1',type:'image',contenu:'',base64:'dddd'}]}]}]

function Stations() {

    const [idSuivant, setIdSuivant] = useState(2)

    const [TabStation, setTabStations] = useState([{id:'1', titre: '', elements: [{idSect:'0', titre:'',elements: [{idElem:'0',type:'texte',contenu:'',base64:''},{idElem:'1',type:'image',contenu:'',base64:''}]}]}]);

    const getGe = (jsonGE) => {
        setIdSuivant(jsonGE.length + 1)
        setTabStations(jsonGE)
    }

    
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
        <h2 className="catchPhrase">Page pour générer les pages des Stations</h2>
        <div className="App">              
        {/*<button onClick={event => getGe(jsonS)}>test</button>*/}  
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