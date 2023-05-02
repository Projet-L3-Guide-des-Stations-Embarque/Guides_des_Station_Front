import { useState } from 'react'
import { Link } from "react-router-dom"

function Ge()
{
    const [idSuivant, setIdSuivant] = useState(1)

    const [inputFields, setInputFields] = useState([
        { idPlante:'0', image: '', descriptionfr:'', descriptionlat: ''}
        //GERER PLUSIEUR + NOM GE + Image
        /*
        "GE":"7",
        "titre":"Plantes des milieux très frais (hygroclines) • GE.7",
        "images":[],
        "titre_image":[],
        "sous_titre_image":[]*/
    ])
    
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        if (data[index]["idPlante"] == "") {
            data[index]["idPlante"] = String(index);
        }
        if(event.target.name === "image"){
            //traitement sur image
            // data[index][event.target.name] = getEmergencyFoundImg(event.target.value);
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
        let newfield = {idPlante:String(idSuivant), image: '', descriptionfr:'', descriptionlat: ''}
        setIdSuivant(idSuivant + 1)
        setInputFields([...inputFields, newfield])
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)

        var strfile = '[\n';
        strfile = strfile + "{\n";
        strfile = strfile + "\"GE\":\"1\",\n";
        strfile = strfile + "\"titre\":\"LE TITRE DE LA GE\",\n";
        
        strfile = strfile + "\"images\":[\n";
        for (var i = 0; i < inputFields.length; i++){
            strfile = strfile + "\"" + inputFields[i]["image"] + "\",\n";
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
        strfile = strfile + "}\n";
        strfile = strfile + "]\n";
        //const fileData = JSON.stringify(inputFields);
        const blob = new Blob([strfile], { type: "text/plain" });
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
            <h2 className="catchPhrase">Vous pouvez ici générer les différents groupes écologiques présents dans le guide.</h2>
            <div className="App">
                <form>
                    {inputFields.map((input, index) => {
                    return (
                        <div key={index} className='questionFormulaire'>
                            <>{"Image de la plante : "}
                                    <input 
                                        type='file'
                                        name='image'
                                        value={input.id}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                    <div className='formulairedeLaGE'>
                                        <div>
                                            <label>Nom (français) : </label>
                                            <input type='text' name="descriptionfr" placeholder="Nom de la plante" value={input.descriptionfr} onChange={event =>handleFormChange(index,event)}/>
                                        </div>
                                        <div>
                                            <label>Nom (latin) : </label>
                                            <input type='text' name="descriptionlat" placeholder="Nom de la plante" value={input.descriptionlat} onChange={event =>handleFormChange(index,event)}/>
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
                    <button onClick={addPlante}>Ajouter une plante au Ge</button>
                    <button onClick={submit}>Envoyer</button>
                </div>
            </div>
        </>
    )
}
export default Ge;