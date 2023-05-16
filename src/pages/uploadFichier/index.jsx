import { Link } from "react-router-dom"
import { useState } from 'react'
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"

function Upload(){

    const [guideActuel, setGuideActuel] = useState("")
    const [guideLoaded, setGuideLoaded] = useState(false)
    const [nombreGuide, setNombreGuide] = useState(0)

    const getGuideList = () => {
        if (!guideLoaded) {
            fetch('api/guidesList')
                .then(response => response.json())
                .then(data => {
                    let select = document.getElementById("guideList");
                    for (let i = 0; i < data.length; i++) {
                        let option = document.createElement("option");
                        option.value = data[i].url;
                        option.text = data[i].nom;
                        select.appendChild(option);
                    }
                    let option = document.createElement("option");
                    option.value = "guide";
                    option.text = "Nouveau Guide";
                    select.appendChild(option);
                    setGuideLoaded(true);
                    setNombreGuide(data.length+1);
                })
                .catch(error => console.error(error));
            }
    }

    const submit = (e) => {
        e.preventDefault();
        if (guideActuel == "") {
            alert("Veuillez choisir un guide");
        } else if (guideActuel == "guide" && document.getElementById("guideName").value == "") {
            alert("Veuillez entrer un nom pour le guide");
        } else if (document.getElementsByName("file")[0].files[0] == undefined) {
            alert("Veuillez choisir un fichier");
        } else {
            const formData = new FormData();
            formData.append("file", document.getElementsByName("file")[0].files[0]);
            if (guideActuel == "guide") {
                formData.append("dir", guideActuel + String(nombreGuide));
                formData.append("name", document.getElementById("guideName").value);
            } else {
                formData.append("dir", guideActuel);
            }
            fetch('api/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => alert(data))
                .catch(error => console.error(error));
        }
    }

    

    return(
        <>
        <div className="choix-guide">
            <select name="guideList" id="guideList" onChange={event => setGuideActuel(event.target.value)}>
                <option value="">Choisir un guide</option>
                {getGuideList()}
            </select>
            {(guideActuel == "guide") ? <input type="text" id="guideName" placeholder="Nom du guide" /> : null}
        </div>

        <div>
            <form>
                <label>
                    Fichier: 
                    <input type="file" name="file" />
                </label>
                <br />
                {/* <button onClick={submit}>Envoyer</button> */}
                <Popup
                trigger={<button type='button'>EnvoyerTest</button>}
                modal
                nested
                >
                    {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                            <div className="header"> Confirmation de téléversement </div>
                            <div className="content">
                                {" "}
                                Vous vous apprêtez à téléverser un fichier sur le serveur de l'application.
                                Si ce fichier existait déjà sur le serveur pour ce guide, il sera remplacé.
                                Êtes-vous sûr de vouloir continuer?
                            </div>
                            <div className="actions">
                                <button className="validate" onClick={submit}>Valider</button>
                                <button className="cancel" onClick={() => {console.log('modal closed '); close(); }}>
                                    Annuler
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
            </form>
        </div>
        </>
    )
} export default Upload;