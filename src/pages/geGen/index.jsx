import { useState } from 'react'
import { Link } from "react-router-dom"

function Ge()
{
    const [idSuivant, setIdSuivant] = useState(1)

    const [inputFields, setInputFields] = useState([
        { id:'0', image: '', descriptionfr:'', descriptionlat: ''}
        //GERER PLUSIEUR + NOM GE + Image
    ])
    
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        if (data[index]["id"] == "") {
            data[index]["id"] = String(index);
        }
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    /*const handleCheckBoxChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.checked;
        setInputFields(data);
        if (event.target.checked) {
            data[index]["idoui"] = "";
            data[index]["idnon"] = "";
        }
    }*/

    const addFields = () => {
        let newfield = {id:String(idSuivant), image: '', descriptionfr:'', descriptionlat: ''}
        setIdSuivant(idSuivant + 1)
        setInputFields([...inputFields, newfield])
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
        const fileData = JSON.stringify(inputFields);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "ge.json";
        link.href = url;
        link.click();
    }

    const removeFields = (index, e) => {
        e.preventDefault();
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return(
        <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/ge" className="active">Générer les groupes écologiques</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/apropos">A propos</Link>
            </div>
            <h2 className="catchPhrase">Vous pouvez ici générer la clé de determination des stations à l'aide de questions.</h2>
            <div className="App">
                <form>
                    {inputFields.map((input, index) => {
                    return (
                        <div key={index} className='questionFormulaire'>
                            <>{"Numéro du Groupe écologique : "}
                                    <input 
                                        type='text'
                                        name='id'
                                        value={input.id}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <div className='formulairedeLaGE'>
                                        <div>
                                            <label>Image de la plante : </label>
                                            <input type="file" name="imageElement" placeholder="Image" multiple accept="image/*" onChange={event =>handleFormChange(index,event)}/>
                                        </div>
                                        <div>
                                            <label>Nom (français) : </label>
                                            <input type='text' name="textFr" value={input.descriptionfr} onChange={event =>handleFormChange(index,event)}/>
                                        </div>
                                        <div>
                                            <label>Nom (latin) : </label>
                                            <input type='text' name="textLat" value={input.descriptionlat} onChange={event =>handleFormChange(index,event)}/>
                                        </div>
                                    </div>
                                </> 
                            <button onClick={event => removeFields(index, event)}>Supprimer</button>
                            <hr></hr>
                        </div>
                    )
                    })}
                </form>
                <div className='formulaireFin'>
                    <button onClick={addFields}>Ajouter une plante au Ge</button>
                    <button onClick={submit}>Envoyer</button>
                </div>
            </div>
        </>
    )
}
export default Ge;