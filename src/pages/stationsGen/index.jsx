import { Link } from "react-router-dom"
import { useState } from "react";

function addTextElement(){
    return(
        <div className="textElement">
            <input type="text" placeholder="Texte" />
            <br/>
            <button>Supprimer</button>
        </div>
    )
}

function Stations()
{
    const [formSectionField, setFormSectionField] = useState([
        {section:"", textElement:[], imageElement:[]}
    ])

    const handleFormChange = (e) => {
        const updatedFormSectionField = [...formSectionField];
        updatedFormSectionField[e.target.dataset.idx][e.target.className] = e.target.value;
        setFormSectionField(updatedFormSectionField);
    }
    const addSection = () => {
        let object ={section:"", textElement:[], imageElement:[]}

        setFormSectionField([...formSectionField, object]);
    }

    const removeSection = (e) => {
        e.target.parentNode.remove();
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
                <form>
                {formSectionField.map((val, idx) => {
                    return(
                        <div className="section">
                            <input type="text" placeholder="Nom de la section" />
                            <div className="textElement">
                                <textarea placeholder="Texte" />
                            </div>
                            <div className="imageElement">
                                <input type="file" placeholder="Image" multiple accept="image/*"/>
                            </div>
                            <button onClick={removeSection}>Supprimer la section</button>
                        </div>
                    )
                })}
                </form>
                <button onClick={addSection}>Ajouter une section</button>
                </div>
                <button className="validateButton">Valider</button>
            </center>
        </>
    )
}

export default Stations;
{/*  */}