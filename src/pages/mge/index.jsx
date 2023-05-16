import GE from './GE'
import { useState } from 'react'
import Popup from 'reactjs-popup';


function MultiGe () {

    const [idSuivant, setIdSuivant] = useState(2)

    const [TabGEs, setTabGEs] = useState([
        {idParcours:'1', id: '1', nom: '', plantes: [{idP:'0', imageGE: '', descriptionfr:'', descriptionlat: ''}]}
    ]);

    const [guideActuel, setGuideActuel] = useState("")
    const [guideLoaded, setGuideLoaded] = useState(false)
    const [nombreGuide, setNombreGuide] = useState(0)

    const ajouterGE = () => {
        let geActuel = ({idParcours:String(idSuivant), id: String(idSuivant), nom: '', plantes: [{idP:'0', imageGE: '', descriptionfr:'', descriptionlat: ''}]})
        setIdSuivant(idSuivant + 1)
        setTabGEs([...TabGEs, geActuel])
    }

    const SupprimerGE = (i) => {
        let data = [...TabGEs];
        let part1 = data.splice(0, i)
        data.splice(0, 1)
        let result = [...part1, ...data]
        setTabGEs(result)
    }

    const getGE = (jsonserv) => {
        let res = []
        for (let parcGE =0; parcGE<jsonserv.length; parcGE++ ){
            const newGE = {idParcours:jsonserv[parcGE].GE, id:jsonserv[parcGE].GE, nom:jsonserv[parcGE].titre, plantes:[]} 
            for (let plante = 0; plante < jsonserv[parcGE].images.length; plante++){
                const newP = {idP: String(plante), imageGE: jsonserv[parcGE].images[plante], descriptionfr: jsonserv[parcGE].titre_image[plante], descriptionlat:jsonserv[parcGE].sous_titre_image[plante]}
                newGE.plantes.push(newP)
            }
            res.push(newGE)
        }
        setTabGEs(res);
    }



    const submit = (e) => {
        e.preventDefault();
        console.log(TabGEs);
        let strfile = "[\n";
        if (TabGEs.length >0){
            for(let i = 0; i < TabGEs.length; i++){
                const element = TabGEs[i];

                // IDENTIFIANT + NOM du GE dans le JSON----------------------
                strfile = strfile + "{\n";
                strfile = strfile + "\"GE\":\""+ element["id"] +"\",\n";
                strfile = strfile + "\"titre\":\""+ element["nom"] + "\",\n";
                //-----------------------------------------------------------
                
                if(element.plantes.length > 0){
                    //Gestion des tableaux images / titre_image / sous_titre_images du JSON-
                    
                    /////////////////////////////////////

                    strfile = strfile + "\"images\":[\n";
                    for (let plante = 0; plante < element.plantes.length - 1; plante++){
                        strfile = strfile + "\"" + element.plantes[plante]["imageGE"] + "\",\n";
                    }
                    strfile = strfile + "\"" + element.plantes[element.plantes.length - 1]["imageGE"] + "\"\n";
                    strfile = strfile + "],\n";

                    /////////////////////////////////////

                    strfile = strfile + "\"titre_image\":[\n";
                    for (let plante = 0; plante < element.plantes.length - 1; plante++){
                        strfile = strfile + "\"" + element.plantes[plante]["descriptionfr"] + "\",\n";
                    }
                    strfile = strfile + "\"" + element.plantes[element.plantes.length - 1]["descriptionfr"] + "\"\n";
                    strfile = strfile + "],\n";

                    /////////////////////////////////////

                    strfile = strfile + "\"sous_titre_image\":[\n";
                    for (let plante = 0; plante < element.plantes.length - 1; plante++){
                        strfile = strfile + "\"" + element.plantes[plante]["descriptionlat"] + "\",\n";
                    }
                    strfile = strfile + "\"" + element.plantes[element.plantes.length - 1]["descriptionlat"] + "\"\n";
                    strfile = strfile + "]\n";

                    /////////////////////////////////////
                    
                    //----------------------------------------------------------------------
                } else {
                    //SI PAS DE PLANTE------------
                    strfile = strfile + "\"images\":[\n],\n\"titre_image\":[\n],\n\"sous_titre_image\":[\n]\n"
                    //----------------------------
                }
                
                if (i < TabGEs.length -1){
                    strfile = strfile + "},\n";
                } else {
                    strfile = strfile + "}\n";
                }
            }
        }
        strfile = strfile + "]\n";
        const blob = new Blob([strfile], { type: "text/plain;charset=utf-8" });
        const formData = new FormData();
        formData.append("file", blob, "ge.json");
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


    const changeIemeElementID = (i, val) => {
        let data = [...TabGEs];
        data[i].id = val;
        setTabGEs(data);
    }
    const changeIemeElementNom = (i, val) => {
        let data = [...TabGEs];
        data[i].nom = val;
        setTabGEs(data);
    }

    const changeIemeElementTabP = (i, val) => {
        let data = [...TabGEs];
        data[i].plantes = val;
        setTabGEs(data);
    }

    const createChangeIemeElementID = (i) => {
        return changeIemeElementID.bind(null, i)
    }
    
    const createChangeIemeElementNom = (i) => {
        return changeIemeElementNom.bind(null, i)
    }

    const createChangeIemeElementTabP = (i) => {
        return changeIemeElementTabP.bind(null, i)
    }

    const loadJsonFromServer = (guide) => {
        fetch('/api/files/' + guide + '/ge.json')
            .then(response => response.json())
            .then(data => {
                getGE(data);
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
        <h2 className="catchPhrase">Vous pouvez ici générer les différents groupes écologiques présents dans le guide.</h2>
        <div className="App">
            {TabGEs.map((entry,indexGE) => {
                return(
                    <div key={entry.idParcours} className='formulairedeLaGE'>
                        <GE geid={entry.id} nom={entry.nom} plantes={entry.plantes} 
                            onChangeID={createChangeIemeElementID(indexGE)} 
                            onChangeNom={createChangeIemeElementNom(indexGE)}
                            onChangeTabP={createChangeIemeElementTabP(indexGE)}></GE>
                        <button onClick={event => SupprimerGE(indexGE)}>Supprimer</button>
                    </div>
                )
            })}
            <div className='formulaireFin'>
                <button onClick={ajouterGE}>Ajouter un nouveau Groupe Ecologique</button>
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
}
export default MultiGe;