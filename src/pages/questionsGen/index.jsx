import { useState } from 'react'
import { Link } from "react-router-dom"

function Questions()
{
    const [inputFields, setInputFields] = useState([
        { question: '', oui: '', non: '' }
    ])
    
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = () => {
        let newfield = { question: '', oui: '', non: '' }
    
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
                        <div className='formulaireOuiNon'>
                            <input
                                name='oui'
                                type='number'
                                placeholder='Oui'
                                value={input.oui}
                                onChange={event => handleFormChange(index, event)}
                            />
                            <input
                                name='non'
                                type='number'
                                placeholder='Non'
                                value={input.non}
                                onChange={event => handleFormChange(index, event)}
                            />
                        </div>
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