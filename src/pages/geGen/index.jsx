import { useState } from 'react'
import { Link } from "react-router-dom"

function Ge(props)
{
    const [idSuivant, setIdSuivant] = useState(1)

    const [inputFields, setInputFields] = useState([
        { idPlante:'0', imageGE: '', descriptionfr:'', descriptionlat: ''}
    ])
    
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        if (data[index]["idPlante"] == "") {
            data[index]["idPlante"] = String(index);
        }
        if(event.target.name === "imageGE"){
            let base64string = "";
            const files = event.target.files;
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>{
                base64string = reader.result;
                data[index][event.target.name] = base64string;
            }
        }else{
            data[index][event.target.name] = event.target.value;
            setInputFields(data);
        }
    }

    const addPlante = () => {
        let newfield = {idPlante:String(idSuivant), imageGE: '', descriptionfr:'', descriptionlat: ''}
        setIdSuivant(idSuivant + 1)
        if (props.onSubmitDataFn && typeof props.onSubmitDataFn === 'function') {
            props.onSubmitDataFn(JSON.stringify(newfield))
        }
        setInputFields([...inputFields, newfield])
    }


    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
        var strfile = '[\n';
        for (var i = 0; i < inputFields.length; i++){
            strfile = strfile + "\"" + inputFields[i]["imageGE"] + "\",\n";
        }
        strfile = strfile + "],\n";
        
        strfile = strfile + "\"titre_image\":[\n";
        for (var i = 0; i < inputFields.length; i++){
            strfile = strfile + "\"" + inputFields[i]["descriptionfr"] + "\",\n";
        }
        strfile = strfile + "],\n";

        strfile = strfile + "\"sous_titre_image\":[\n";
        for (var i = 0; i < inputFields.length; i++){
            strfile = strfile + "\"" + inputFields[i]["descriptionlat"] + "\",\n";
        }
        strfile = strfile + "]\n";
        return strfile;
    }

    const removeFields = (index, e) => {
        e.preventDefault();
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return(
        <>
            <div className="App">
                    <div className='formulairedesGE'>
                    {inputFields.map((input, index) => {
                        return (
                            <div key={index} >
                                <>{"Informations de la plante"}
                                    <input type='file' name='imageGE' value={input.id} onChange={event => handleFormChange(index, event)}/>
                                    <div>
                                        <textarea name='descriptionfr' placeholder='Nom (français)' value={input.question} onChange={event => handleFormChange(index, event)}/>
                                    </div>
                                    <div>
                                        <textarea name='descriptionlat' placeholder='Nom (latin)' value={input.question} onChange={event => handleFormChange(index, event)}/>
                                    </div>
                                </>
                                <div className='formulaireFin'>
                                    <button onClick={event => removeFields(index, event)}>Supprimer</button>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <div className='formulaireFin'>
                        <button onClick={addPlante}>Ajouter une plante au Ge</button>
                    </div>
                </div>
            </>
        )
}
export default Ge;