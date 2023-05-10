import { Link } from "react-router-dom"
import { useState} from "react";

/*function Stations()
{
    const [StationField, setStationField] = useState([
        {station:"",section:"", textElement:"", imageElement:""}
    ])
    const [stationName, setStationName] = useState("");

    const handleFormChange = (index, event) => {
        let data = [...StationField];
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
            setStationField(data);
        }
    }

    const handleTitle = (event) => {
        let data = [...StationField];
        data[0]["station"] = event.target.value;
        setStationName(event.target.value);
        setStationField(data);
    }

    

    const addSection = () => {
        let object ={section:"", textElement:"", imageElement:""}

        setStationField([...StationField, object]);
    }

    const removeSection = (section) => {
        let data = [...StationField];
        data.splice(section, 1)
        setStationField(data)
        //e.target.parentNode.remove();
    }

    const removeTextElement = (idx) => {
        let data = [...StationField];
        data[idx]["textElement"] = "";
        setStationField(data)
        //e.target.parentNode.remove();
    }

    const removeImageElement = (section, e) => {
        let data = [...StationField];
        data[section]["imageElement"] = "";
        setStationField(data)
        //e.target.remove();
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(StationField);
        for(let i = 0; i < StationField.length; i++){
            StationField[i]["station"] = stationName;
        }
        download(e);
        
    }

    const download = (e) => {
        const fileData = JSON.stringify(StationField);
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
                <Link to="/ge">Générer les groupes écologiques</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/apropos">A propos</Link>
            </div>
            <p>Page pour générer les pages des Stations</p> 
            {/*
            <center>
            <div className="page">
            <div className="station">
                <input type="text" name="station" placeholder="Nom de station" onChange={handleTitle}/>

             <form onSubmit={submitForm}> 
                <form>
                {StationField.map((val, idx) => {
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
            
        </>*/
/*
    )
}

//export default Stations;
*/


function StationsBis()
{
    const[StationField,setStationField] = useState([
        {station:"",section : [{section:"",textElement:"",imageElement:""}]}
    ])

    const handleFormChange = (event, indexStation, indexSection, field) => {
        if(event.target.name == "station"){
            let data = [...StationField];
            data[indexStation].station = event.target.value;
            setStationField(data);
        } else {
            let data = [...StationField];
            data[indexStation].section[indexSection][field] = event.target.value;
            setStationField(data);
        }
    }

    const addSection = (indexStation) => {
        const newSection = {section:"",textElement:"",imageElement:""};
        const data = [...StationField];
        data[indexStation].section.push(newSection);
        setStationField(data);
    }

    const addStation = () => {
        const newStation = {station:"",section : [{section:"",textElement:"",imageElement:""}]};
        setStationField([...StationField, newStation]);
    }

    const removeSection = (indexStation, indexSection) => {
        const data = [...StationField];
        data[indexStation].section.splice(indexSection, 1);
        setStationField(data);
    }

    const removeStation = (indexStation) => {
        const data = [...StationField];
        data.splice(indexStation, 1);
        setStationField(data);
    }

    const removeTextElement = (e,indexStation,indexSection) => {
        const data = [...StationField];
        data[indexStation].section[indexSection].textElement = "";
        setStationField(data);
        e.target.parentNode.remove();
    }
    

    const removeImageElement = (e,indexStation,indexSection) => {
        const data = [...StationField];
        data[indexStation].section[indexSection].imageElement = "";
        setStationField(data);
        e.target.parentNode.remove();
    }

    const submitForm = (e) => {
        e.preventDefault();
        //console.log(formSectionField);
        download(e);

    }

    const download = (e) => {
        const fileData = JSON.stringify(StationField);
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
                <Link to="/ge">Générer les groupes écologiques</Link>
                <Link to="/tutoriel">Tutoriel pour KML</Link>
                <Link to="/apropos">A propos</Link>
            </div>
            {/* <p>Page pour générer les pages des Stations</p> */}
            <center>
            <div className="page">
            <form>
                {StationField.map((val, idx) => {
                    return(
                        <div key={idx} className="station">
                            <input type="text" name="station" placeholder="Nom de station" value={val.station} onChange={event => handleFormChange(event, idx, null, "station")}/>
                            {val.section.map((val2, idx2) => {
                                return(
                                    <div key={idx2} className="section">
                                        <input type="text" name="section" placeholder="Nom de section" value={val2.section} onChange={event => handleFormChange(event, idx, idx2, "section")}/>
                                        <div className="textElement">
                                            <textarea name="textElement" placeholder="Texte" value={val2.textElement} onChange={event => handleFormChange(event, idx, idx2, "textElement")}/>
                                            <br/>
                                            <button onClick={event => removeTextElement(event,idx,idx2)}>Supprimer</button>
                                        </div>
                                        <div className="imageElement">
                                            <input type="file" name="imageElement" placeholder="Image" multiple accept="image/*" onChange={event => handleFormChange(event, idx, idx2, "imageElement")}/>
                                            <br/>
                                            <button onClick={event => removeImageElement(event,idx,idx2)}>Supprimer</button>
                                        </div>
                                        <button onClick={() => removeSection(idx, idx2)}>Supprimer</button>
                                    </div>
                                )
                            })}
                            <br/>
                            <button onClick={() => addSection(idx)}>Ajouter une section</button>
                            <br/>
                            <button onClick={() => removeStation(idx)}>Supprimer la station</button>
                            
                        </div>
                        
                    )
                })}
            </form>   
            <button onClick={() => addStation()}>Ajouter une station</button>      
            </div>
            <button className='validateButton' onClick={submitForm}>Sauvegarder</button>
            </center>
        </>
    )
}

export default StationsBis;