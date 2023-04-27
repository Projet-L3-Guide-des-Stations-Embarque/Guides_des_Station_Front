import { Link } from "react-router-dom"
import { useState} from "react";

function Stations()
{
    const [formSectionField, setFormSectionField] = useState([
        {section:"", textElement:"", imageElement:""}
    ])

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

    

    const addSection = () => {
        let object ={section:"", textElement:"", imageElement:""}

        setFormSectionField([...formSectionField, object]);
    }

    const removeSection = (e) => {
        e.target.parentNode.remove();
    }

    const removeTextElement = (e) => {
        e.target.parentNode.remove();
    }

    const removeImageElement = (e) => {
        e.target.parentNode.remove();
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formSectionField);
    }

    return(
        <>
            <div className="topnav">
                <Link to="/">Accueil</Link>
                <Link to="/apropos">A propos</Link>
                <Link to="/questions">Générer les questions</Link>
                <Link to="/stations" className="active">Générer les pages des stations</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
            </div>
            {/* <p>Page pour générer les pages des Stations</p> */}
            <center>
            <div className="page">
                <form onSubmit={submitForm}>
                {formSectionField.map((val, idx) => {
                    return(
                        <div key={idx} className="section">
                            <input type="text" name="section" placeholder="Nom de section" value={val.section} onChange={event => handleFormChange(idx,event)}/>
                            <div className="textElement">
                                <textarea name="textElement" placeholder="Texte" value={val.textElement} onChange={event =>handleFormChange(idx,event)}/>
                                <br/>
                                <button onClick={removeTextElement}>Supprimer</button>
                            </div>
                            <div className="imageElement">
                                <input type="file" name="imageElement" placeholder="Image" value={val.imageElement} multiple accept="image/*" onChange={event =>handleFormChange(idx,event)}/>
                                <br/>
                                <button onClick={removeImageElement}>Supprimer</button>
                            </div>
                            <button onClick={removeSection}>Supprimer la section</button>
                        </div>
                    )
                })}
                </form>
                <button onClick={addSection}>Ajouter une section</button>
                </div>
                <button onClick={submitForm} className="validateButton">Valider</button>
            </center>
        </>
    )
}

export default Stations;
{/*  */}