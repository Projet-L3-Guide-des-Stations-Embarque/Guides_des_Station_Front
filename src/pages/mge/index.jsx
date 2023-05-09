import GE from './GE'
import { useState } from 'react'
import { Link } from "react-router-dom"


function MultiGe () {

    const [idSuivant, setIdSuivant] = useState(2)

    const [TabGEs, setTabGEs] = useState([
        {id: '1', nom: '', plantes: [{idP:'0', imageGE: '', descriptionfr:'', descriptionlat: ''}]}
    ]);

    const ajouterGE = () => {
        let geActuel = ({id: String(idSuivant), nom: '', plantes: [{idP:'0', imageGE: '', descriptionfr:'', descriptionlat: ''}]})
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

    const recup = (geJson) => {
        //VIDE TAB
        setTabGEs([]);
        //////////
        setIdSuivant(2);
        for (const elem in geJson){
            let newGe = ({id: elem.GE, nom: elem.titre, plantes:[]})
            let nextid = 1
            for(let indiceI = 0; indiceI < elem.images.length ; indiceI++){
                let newTab = {idP: String(nextid), imageGE: elem.images[indiceI], descriptionfr: elem.titre_image[indiceI], descriptionlat: elem.sous_titre_image[indiceI]};
                newGe.plantes = newGe.plantes + newTab;
                nextid = nextid + 1;
            }
            setIdSuivant(idSuivant + 1)
            setTabGEs([...TabGEs, newGe])
        }
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
        const blob = new Blob([strfile], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "ge.json";
        link.href = url;
        link.click();
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


    return (
        <>
        <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/ge" className="active">Générer les groupes écologiques</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/apropos">A propos</Link>
        </div>
        <h2 className="catchPhrase">Vous pouvez ici générer les différents groupes écologiques présents dans le guide.</h2>
        <div className="App">
            <div className='formulaireFin'>
                <button>Charger un Ge existant</button>
            </div>
            {TabGEs.map((entry,indexGE) => {
                return(
                    <div key={entry.id} className='formulairedeLaGE'>
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
                <button onClick={submit}>Envoyer</button>
            </div>
        </div>
    </>
    )
}
export default MultiGe;