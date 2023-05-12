import { Link } from "react-router-dom"
import { useState } from 'react'
import Famille from './uneFamille'
import { saveAs } from 'file-saver';

function Questions()
{
    const [idSuivant, setIdSuivant] = useState(2)

    const [inputFamille, setFamille] = useState([
            {idFamille:'1', nomFamille:'', question: [{ id:'a', question: '', fin:false, idoui: '', idnon: '' }]}
        ]);

    //const [res, setRes] = useState([ { id:'', question: '', fin:false, idoui: '', idnon: '' }]);

    const [guideActuel, setGuideActuel] = useState("")
    const [guideLoaded, setGuideLoaded] = useState(false)
    const [nombreGuide, setNombreGuide] = useState(0)

    const ajouterFamille = () => {
        let newFamille = ( {idFamille:String(idSuivant), nomFamille:'', question: [{ id:'a', question: '', fin:false, idoui: '', idnon: '' }]})
        setIdSuivant(idSuivant + 1)
        setFamille([...inputFamille, newFamille])
    }
    
    const SupprimerFamille = (i) => {
        let data = [...inputFamille];
        let part1 = data.splice(0, i)
        data.splice(0, 1)
        let result = [...part1, ...data]
        setFamille(result)
    }

    const changeIemeElementIDF = (i, val) => {
        let data = [...inputFamille];
        data[i].idFamille = val;
        setFamille(data);
    }

    const changeIemeElementNomF = (i, val) => {
        let data = [...inputFamille];
        data[i].nomFamille = val;
        setFamille(data);
    }

    const createChangeIemeElementIDF = (i) => {
        return changeIemeElementIDF.bind(null, i)
    }

    const createChangeIemeElementNomF = (i) => {
        return changeIemeElementNomF.bind(null, i)
    }

    const changeIemeQuestionTab = (i, val) => {
        let data = [...inputFamille];
        data[i].question = val;
        setFamille(data);
    }

    const createChangeIemeQuestionTab = (i) => {
        return changeIemeQuestionTab.bind(null, i)
    }

    const getIemeElementOther = (i) => {
        return (
            <>
                <option value='ddd'>Coucou</option>
            </>
        )
    }

    const submit = (e) => {
        let res = []
        //On vérifie qu'il y a des éléments à envoyer
        if(inputFamille.length > 0){

            //On fait le for => taille - 1 car on accède à l'id de la famille suivante en cas d'idnon
            for (let i = 0; i < inputFamille.length -1; i++){
                const famille = inputFamille[i]
                //On vérifie que la famille courante possède au moins une question
                if(famille.question.length > 0){

                    //Ajoute la famille au JSON ------------------------------
                    const idadd = famille.idFamille //id famille
                    const questionadd = famille.nomFamille //nom famille
                    const idouiadd = idadd + famille.question[0].id //idoui: Première question de la famille
                    const idnonadd = inputFamille[i+1].idFamille  // idnon: famille suivante
                    let add = ({id: idadd, question: questionadd, fin:false, idoui: idouiadd , idnon: idnonadd })
                    res.push(add)
                    //--------------------------------------------------------
                    
                    //Ajoute les questions de la famille au JSON--------------
                    for (const element in famille.question){
                        //console.log(element)
                        const quest = famille.question[element]
                        const idq = idadd + quest.id
                        let idouiq = ''
                        if (quest.idoui!= idouiq){
                            idouiq = idadd + quest.idoui
                        }
                        let idnonq = ''
                        if (quest.idnon!= idnonq){
                            idnonq = idadd + quest.idnon
                        }
                        let newq = ({id: idq, question: quest.question, fin: quest.fin, idoui: idouiq, idnon: idnonq })
                        res.push(newq)
                    }
                    //--------------------------------------------------------
                }
            }

            //Dernière famille on accède à l'id de la première famille en cas d'idnon
            const famille = inputFamille[inputFamille.length -1]
            if (famille.question.length > 0){
                const idadd = famille.idFamille
                const questionadd = famille.nomFamille
                const idouiadd = (famille.idFamille + famille.question[0].id)
                const idnonadd = inputFamille[0].idFamille
                let add = ({id: idadd, question: questionadd, fin:false, idoui: idouiadd, idnon: idnonadd })
                res.push(add)
                for (const element in famille.question){
                    const quest = famille.question[element]
                    const idq = idadd + quest.id
                    let idouiq = ""
                    if (quest.idoui != idouiq){
                        idouiq = quest.idoui
                    }
                    let idnonq = ""
                    if (quest.idnon!= idnonq){
                        idnonq = idadd + quest.idnon
                    }
                    let newq = ({id: idq, question: quest.question, fin: quest.fin, idoui: idouiq, idnon: idnonq })
                    res.push(newq)
                }
            }
        }
        console.log(res)
        const fileData = JSON.stringify(res);
        const blob = new Blob([fileData], { type: "text/plain;charset=utf-8" });
        const formData = new FormData();
        formData.append("file", blob, "questions.json");
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

    return(
        <>
        <div className="topnav">
            <Link to="/">Accueil</Link>
            <Link to="/questions" className="active">Générer les questions</Link>
            <Link to="/stations">Générer les pages des stations</Link>
            <Link to="/ge">Générer les groupes écologiques</Link>
            <Link to="/tutoriel">Tutoriel pour KML</Link>
            <Link to="/modification">Modification de guide</Link>
            <Link to="/apropos">A propos</Link>
        </div>
        <div className="choix-guide">
            <select name="guideList" id="guideList" onChange={event => setGuideActuel(event.target.value)}>
                <option value="">Choisir un guide</option>
                {getGuideList()}
            </select>
            {(guideActuel == "guide") ? <input type="text" id="guideName" placeholder="Nom du guide" /> : null}
        </div>
        <h2 className="catchPhrase">Vous pouvez ici générer la clé de determination des stations à l'aide de questions.</h2>
        {inputFamille.map((entry,indexFamille) => {
                return(
                    <div key={entry.idFamille} className='formulairedeLaGE'>
                        <Famille familleID={entry.idFamille} tabQuestion={entry.question} familleNom={entry.nomFamille}
                        onChangeIDF={createChangeIemeElementIDF(indexFamille)}
                        onChangeTabQuestion={createChangeIemeQuestionTab(indexFamille)}
                        onChangeNomF={createChangeIemeElementNomF(indexFamille)}
                        getotherVal ={getIemeElementOther}></Famille>
                        <button onClick={event => SupprimerFamille(indexFamille)}>Supprimer</button>
                    </div>
                )
        })}
        <div className='formulaireFin'>
            <button onClick={ajouterFamille}>Ajouter une nouvelle Famille de questions</button>
            <button onClick={submit}>Envoyer</button>
        </div>
        </>
    )
}
export default Questions;