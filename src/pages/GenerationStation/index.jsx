import { Link } from "react-router-dom"
import { useState} from "react";
import Station from './Station';
import Popup from "reactjs-popup";


//const jsonS = [{id:'1', titre: 'Titre', elements: [{idSect:'4', titre:'test',elements: [{idElem:'0',type:'texte',contenu:'coucou',base64:''},{idElem:'1',type:'image',contenu:'',base64:'dddd'}] }]}]

function Stations() {

    const [idSuivant, setIdSuivant] = useState(2)

    const [TabStation, setTabStations] = useState([{id:'1', titre: '', elements: [{idSect:'0', titre:'',elements: [{idElem:'0',type:'texte',contenu:'',base64:''},{idElem:'1',type:'image',contenu:'',base64:''}]}]}]);

    const [guideActuel, setGuideActuel] = useState("")
    const [guideLoaded, setGuideLoaded] = useState(false)
    const [nombreGuide, setNombreGuide] = useState(0)

    const getStation = (jsonGE) => {
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
            const blob = new Blob([fileData], { type: "text/plain;charset=utf-8" });
            const formData = new FormData();
            formData.append("file", blob, "stations.json");
            if (guideActuel == "guide") {
                formData.append("dir", guideActuel + String(nombreGuide));
                formData.append("name", document.getElementById("guideName").value);
            } else {
                formData.append("dir", guideActuel);
            }
            fetch('api/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => alert(data))
                .catch(error => console.error(error));
        }

        const loadJsonFromServer = (guide) => {
            fetch('/api/files/' + guide + '/stations.json')
                .then(response => response.json())
                .then(data => {
                    getStation(data);
                })
                .catch(error => console.error(error));
        }

        const getGuideList = () => {
            if (!guideLoaded) {
                fetch('api/guidesList')
                    .then(response => response.json())
                    .then(data => {
                        let select = document.getElementById("guideList");
                        for (let i = 0; i < data.length; i++) {
                            let option = document.createElement("option");
                            option.value = data[i].url;
                            option.text = data[i].nom;
                            select.appendChild(option);
                        }
                        let option = document.createElement("option");
                        option.value = "guide";
                        option.text = "Nouveau Guide";
                        select.appendChild(option);
                        setGuideLoaded(true);
                        setNombreGuide(data.length+1);
                    })
                    .catch(error => console.error(error));
                }
        }
    
        return (
            <>
            <div className="choix-guide">
            <select name="guideList" id="guideList" onChange={event => {
              setGuideActuel(event.target.value);
              loadJsonFromServer(event.target.value);
            } }>
                <option value="">Choisir un guide</option>
                {getGuideList()}
            </select>
            {(guideActuel == "guide") ? <input type="text" id="guideName" placeholder="Nom du guide" /> : null}
        </div>
        <h2 className="catchPhrase">Page pour générer les pages des Stations</h2>
        <div className="App">              
        {/*<button onClick={event => getStation(jsonS)}>test</button>*/}  
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
                {/* <button onClick={submit}>Envoyer</button> */}
                <Popup
                trigger={<button type='button'>Envoyer</button>}
                modal
                nested
                >
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header"> Confirmation de téléversement </div>
                            <div className="content">
                                {" "}
                                Vous vous apprêtez à téléverser un fichier sur le serveur de l'application.
                                Si ce fichier existait déjà sur le serveur pour ce guide, il sera remplacé.
                                Êtes-vous sûr de vouloir continuer?
                            </div>
                            <div className="actions">
                                <button className="validate" onClick={submit}>Valider</button>
                                <button className="cancel" onClick={() => {console.log('modal closed '); close(); }}>
                                    Annuler
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </div>
        </>
        )

} export default Stations;