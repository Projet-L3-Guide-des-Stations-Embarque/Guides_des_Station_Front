import { useState } from 'react'
import { Link } from "react-router-dom"

function Questions()
{
    const [idSuivant, setIdSuivant] = useState(1)

    const [inputFields, setInputFields] = useState([
        { id:'0', question: '', fin:false, idoui: '', idnon: '' }
    ])
    
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        if (data[index]["id"] == "") {
            data[index]["id"] = String(index);
        }
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const handleCheckBoxChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.checked;
        setInputFields(data);
        if (event.target.checked) {
            data[index]["idoui"] = "";
            data[index]["idnon"] = "";
        }
    }

    const addFields = () => {
        let newfield = {id:String(idSuivant), question: '', fin:false, idoui: '', idnon: '' }
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
        link.download = "questions_stations.json";
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
                <Link to="/questions" className="active">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/apropos">A propos</Link>
            </div>
            <h2 className="catchPhrase">Vous pouvez ici générer la clé de determination des stations à l'aide de questions.</h2>
            <div className="App">
                <form>
                    {inputFields.map((input, index) => {
                    return (
                        <div key={index} className='questionFormulaire'>
                            <div className='formulairefin'>
                                <label>Station : </label>
                                <input
                                    name='fin'
                                    type='checkbox'
                                    placeholder='fin'
                                    value={input.fin}
                                    onChange={event => handleCheckBoxChange(index, event)}
                                />
                            </div>
                            {(!input.fin) ? 
                            // Lorsque la checkbox est cochée, on affiche les champs pour une question
                                <>{"Numéro question : "+input.id}
                                    <textarea
                                        name='question'
                                        placeholder='Question'
                                        value={input.question}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <div className='formulaireOuiNon'>
                                        <div>
                                            <label>Redirection OUI : </label>
                                            <select name='idoui' onChange={event => handleFormChange(index, event)}>
                                                <option value=''>Numéro suivant</option>
                                                {inputFields.map((input, index) => {
                                                    return (
                                                        <option value={input.id} key={index}>{input.id}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <label>Redirection NON : </label>
                                            <select name='idnon' onChange={event => handleFormChange(index, event)}>
                                                <option value=''>Numéro suivant</option>
                                                {inputFields.map((input, index) => {
                                                    return (
                                                        <option value={input.id} key={index}>{input.id}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </> 
                                : 
                                // Lorsque la checkbox n'est pas cochée, on affiche les champs pour une station
                                <>{"Numéro de station : "}
                                    <input 
                                        type='text'
                                        name='id'
                                        value={input.id}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <textarea
                                        name='question'
                                        placeholder='Nom Station'
                                        value={input.question}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                </>
                            }
                            <button onClick={event => removeFields(index, event)}>Supprimer</button>
                            <hr></hr>
                        </div>
                    )
                    })}
                </form>
                <div className='formulaireFin'>
                    <button onClick={addFields}>Ajouter une question</button>
                    <button onClick={submit}>Envoyer</button>
                </div>
            </div>
        </>
    )
}
export default Questions;