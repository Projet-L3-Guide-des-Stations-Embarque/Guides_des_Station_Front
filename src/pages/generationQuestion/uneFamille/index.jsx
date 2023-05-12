import { useState } from 'react'
//import { Link } from "react-router-dom"
//import { saveAs } from 'file-saver';

function Famille(props)
{

    const [idSuivant, setIdSuivant] = useState('b')
    const [inputFields, setInputFields] = useState(props.tabQuestion)
    const [valueIDF, setValueIDF] = useState(props.familleID)
    const [valueNomF, setValueNomF] = useState(props.familleNom)

    const onChangeIDF = (e) => {
        setValueIDF(e.target.value)
        props.onChangeIDF(e.target.value)
    }

    const onChangeNomF = (e) => {
        setValueNomF(e.target.value)
        props.onChangeNomF(e.target.value)
    }

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        if (data[index]["id"] == "") {
            data[index]["id"] = String(index);
        }
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        props.onChangeTabQuestion(inputFields)
    }

    const handleCheckBoxChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.checked;
        setInputFields(data);
        if (event.target.checked) {
            data[index]["idoui"] = "";
            data[index]["idnon"] = "";
        }
        props.onChangeTabQuestion(inputFields)
    }

    const addFields = () => {
        let newfield = {id:String(idSuivant), question: '', fin:false, idoui: '', idnon: '' }
        setIdSuivant(String.fromCharCode(String(idSuivant).charCodeAt(0) + 1))
    
        setInputFields([...inputFields, newfield])
        props.onChangeTabQuestion(inputFields)
    }

    const removeFields = (index, e) => {
        e.preventDefault();
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
        props.onChangeTabQuestion(inputFields)
    }

    return(
        <>
            Numéro de la famille:
            <div>
                <input type='text'name='idFamille' value={valueIDF} onChange={onChangeIDF}/>
            </div>
            Nom de la famille:
            <div>
                <input type='text'name='nomFamille' value={valueNomF} onChange={onChangeNomF}/>
            </div>
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
                                                {props.getotherVal()}
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
                </div>
            </div>
        </>
    )
}
export default Famille;