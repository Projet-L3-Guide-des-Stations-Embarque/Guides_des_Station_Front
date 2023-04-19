import { useState } from 'react'
import { Link } from "react-router-dom"

function Questions()
{
    const [inputFields, setInputFields] = useState([
        { id:'0', question: '', fin:false, idoui: '', idnon: '' }
    ])
    
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index]["id"] = index;
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
        let newfield = {id:'', question: '', fin:false, idoui: '', idnon: '' }
    
        setInputFields([...inputFields, newfield])
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return(
        <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/apropos">A propos</Link>
                <Link to="/questions" className="active">Générer les questions</Link>
                <Link to="/stations">Générer les pages des stations</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
            </div>
            <p>Page pour générer les questions</p>
            <div className="App">
                <form onSubmit={submit}>
                    {inputFields.map((input, index) => {
                    return (
                        <div key={index} className='questionFormulaire'>
                        <>{index}</>
                        <textarea
                            name='question'
                            placeholder='Question'
                            value={input.question}
                            onChange={event => handleFormChange(index, event)}
                        />
                        <div className='formulairefin'>
                            <label>Fin de chemin : </label>
                            <input
                                name='fin'
                                type='checkbox'
                                placeholder='fin'
                                value={input.fin}
                                onChange={event => handleCheckBoxChange(index, event)}
                            />
                        </div>
                        {(!input.fin) && <div className='formulaireOuiNon'>
                            <input
                                name='idoui'
                                type='number'
                                placeholder='idoui'
                                value={input.idoui}
                                onChange={event => handleFormChange(index, event)}
                            />
                            <input
                                name='idnon'
                                type='number'
                                placeholder='idnon'
                                value={input.idnon}
                                onChange={event => handleFormChange(index, event)}
                            />
                        </div>}
                        <button onClick={() => removeFields(index)}>Supprimer</button>
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