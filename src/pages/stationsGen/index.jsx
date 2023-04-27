import { Link } from "react-router-dom"
import { useState} from "react";

function Stations()
{
    const [formSectionField, setFormSectionField] = useState([
        {station:"",section:"", textElement:"", imageElement:""}
    ])
    const [stationName, setStationName] = useState("");

    const handleFormChange = (index, event) => {
        let data = [...formSectionField];
        console.log(event.target.value);
        if(event.target.name === "imageElement"){
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
            setFormSectionField(data);
        }
    }

    const handleTitle = (event) => {
        let data = [...formSectionField];
        data[0]["station"] = event.target.value;
        setStationName(event.target.value);
        setFormSectionField(data);
    }

    

    const addSection = () => {
        let object ={section:"", textElement:"", imageElement:""}

        setFormSectionField([...formSectionField, object]);
    }

    const removeSection = (section) => {
        let data = [...formSectionField];
        data.splice(section, 1)
        setFormSectionField(data)
        //e.target.parentNode.remove();
    }

    const removeTextElement = (idx) => {
        let data = [...formSectionField];
        data[idx]["textElement"] = "";
        setFormSectionField(data)
        //e.target.parentNode.remove();
    }

    const removeImageElement = (section, e) => {
        let data = [...formSectionField];
        data[section]["imageElement"] = "";
        setFormSectionField(data)
        //e.target.remove();
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formSectionField);
        for(let i = 0; i < formSectionField.length; i++){
            formSectionField[i]["station"] = stationName;
        }
        download(e);
        
    }

    const download = (e) => {
        const fileData = JSON.stringify(formSectionField);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "stations.json";
        link.href = url;
        link.click();
    }

    return(
        <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations" className="active">Générer les pages des stations</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/apropos">A propos</Link>
            </div>
            {/* <p>Page pour générer les pages des Stations</p> */}
            <center>
            <div className="page">
            <div className="station">
                <input type="text" name="station" placeholder="Nom de station" onChange={handleTitle}/>

                {/* <form onSubmit={submitForm}> */}
                <form>
                {formSectionField.map((val, idx) => {
                    return(
                        
                            <div key={idx} className="section">
                                <input type="text" name="section" placeholder="Nom de section" value={val.section} onChange={event => handleFormChange(idx,event)}/>
                                <div className="textElement">
                                    <textarea name="textElement" placeholder="Texte" value={val.textElement} onChange={event =>handleFormChange(idx,event)}/>
                                    <br/>
                                    <button onClick={() => removeTextElement(idx)}>Supprimer</button>
                                </div>
                                <div className="imageElement">
                                    <input type="file" name="imageElement" placeholder="Image" multiple accept="image/*" onChange={event =>handleFormChange(idx,event)}/>
                                    <br/>
                                    <button onClick={() => removeImageElement(idx)}>Supprimer</button>
                                </div>
                                <button onClick={() => removeSection(val.section)}>Supprimer</button>
                            </div>
                    )
                })}
                </form>
                </div>
                <button onClick={addSection}>Ajouter une section</button>
                </div>
                <button onClick={submitForm} className="validateButton">Valider</button>
            </center>
        </>
    )
}

export default Stations;
{/*  */}