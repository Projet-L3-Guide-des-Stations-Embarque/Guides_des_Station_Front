import Ge from '../geGen'
import { useState } from 'react'
import { Link } from "react-router-dom"


function MultiGe () {

    const [idSuivant, setIdSuivant] = useState(2)
    
    const [inputGes, setInputGes] = useState([
        { idGe:'1', nom:'', plantes: []}
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputGes];
        data[index][event.target.name] = event.target.value;
        setInputGes(data);
    }

    const addGE = () => {
        let newfield = {idGe:String(idSuivant), nom: ''}
        setIdSuivant(idSuivant + 1)
        setInputGes([...inputGes, newfield])
    }

    const removeGe = (index, e) => {
        e.preventDefault();
        let data = [...inputGes];
        data.splice(index, 1)
        setInputGes(data)
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputGes);
        let strfile = '[\n';
        for (const element of inputGes){
            strfile = strfile + "{\n";
            strfile = strfile + "\"GE\":\""+ element["idGe"] +"\",\n";
            strfile = strfile + "\"titre\":\""+ element["nom"] + "\",\n";
            strfile = strfile + "},\n";
        }
        strfile = strfile + "]\n";
        const blob = new Blob([strfile], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "ge.json";
        link.href = url;
        link.click();
    }

    /*const onRemoveplante = (inputFields, index, e) => {
        e.preventDefault();
        let data = [...inputFields];
        data.splice(index, 1)
        setInputGes(data)
    }*/

    const onSubmitData = (foo) => {
        console.log('bar: ' + foo)
    }

    /*
        [
            {
                numeroGE, nomGE, info = {
                    fichier:,
                    nom,

                }
            }
        ]
    */

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
            {inputGes.map((inputGes,indexGE) => {
                return(
                    <div key={indexGE} className='formulairedeLaGE'>
                        Numéro du Groupe Ecologique :
                        <input type='text'name='idGe' value={inputGes.idGe} onChange={event => handleFormChange(indexGE, event)}/>
                        Nom du Groupe Ecologique :
                        <input type='text'name='nom' value={inputGes.nom} onChange={event => handleFormChange(indexGE, event)}/>
                        <Ge onSubmitDataFn={onSubmitData}></Ge>
                        <button onClick={event => removeGe(indexGE, event)}>Supprimer</button>
                    </div>
                )
            })}
            <div className='formulaireFin'>
                <button onClick={addGE}>Ajouter un nouveau Groupe Ecologique</button>
                <button onClick={submit}>Envoyer</button>
            </div>
        </div>
    </>
    )
}
export default MultiGe;
//<Ge></Ge>