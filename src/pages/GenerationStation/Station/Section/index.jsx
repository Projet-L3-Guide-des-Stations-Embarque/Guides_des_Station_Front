import Element from './Element';
import { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';

function Section(props) {

    const [idSuivant, setIdSuivant] = useState(2)
    const [valueNomSection, setValueNomSection] = useState(props.nomSection)
    const [valueTabElements, setValueTabElements] = useState(props.elements)

    useEffect(() => {
        setValueNomSection(props.nomSection)
        setValueTabElements(props.elements)
        setIdSuivant(props.elements.length)
    }, [ props.nomSection, props.elements ])

    const ajouterElementText = () => {
        let newElement = ({idElem:String(idSuivant),type:'texte',contenu:'',base64:''})
        setIdSuivant(idSuivant + 1)
        setValueTabElements([...valueTabElements, newElement])
        props.onChangeTabSections(valueTabElements)
    }

    const ajouterElementTitre = () => {
        let newElement = ({idElem:String(idSuivant),type:'titre',contenu:'',base64:''})
        setIdSuivant(idSuivant + 1)
        setValueTabElements([...valueTabElements, newElement])
        props.onChangeTabSections(valueTabElements)
    }

    const ajouterElementImage = () => {
        let newElement = ({idElem:String(idSuivant),type:'image',contenu:'',base64:''})
        setIdSuivant(idSuivant + 1)
        setValueTabElements([...valueTabElements, newElement])
        props.onChangeTabSections(valueTabElements)
    }

    const supprimerElement = (i) => {
        let data = [...valueTabElements];
        let part1 = data.splice(0, i)
        data.splice(0, 1)
        let result = [...part1, ...data]
        setValueTabElements(result)
        props.onChangeTabSections(result)
    }

    const onChangeNomSection = (e) => {
        setValueNomSection(e.target.value)
        props.onChangeNomSection(e.target.value)
    }

    const changeIemeElementContenuElements = (i, val) => {
        let data = [...valueTabElements];
        data[i].contenu = val;
        setValueTabElements(data);
        props.onChangeTabSections(valueTabElements);
    }

    const changeIemeElementBase64Elements = (i, val) => {
        let data = [...valueTabElements];
        data[i].base64 = val;
        setValueTabElements(data);
        props.onChangeTabSections(valueTabElements);
    }

    const createChangeIemeElementContenuElements = (i) => {
        return changeIemeElementContenuElements.bind(null, i)
    }

    const createChangeIemeElementBase64Elements = (i) => {
        return changeIemeElementBase64Elements.bind(null, i)
    }

    return(
        <>
        Nom de la section :
        <div>
            <input type='text'name='nomSection' value={valueNomSection} onChange={onChangeNomSection}/>
        </div>
        {valueTabElements.map((entrySection,indexElement) => {
                return(
                    <div key={entrySection.idElem} className='formulairedeLaGE'>
                        <Element typeElem={entrySection.type} infoElem={entrySection.contenu}
                        onChangeContenuElem={createChangeIemeElementContenuElements(indexElement)}
                        onChangeBase64Elem={createChangeIemeElementBase64Elements(indexElement)}></Element>
                        {/* <button onClick={event => supprimerElement(indexElement)}>Supprimer</button> */}
                        <Popup
                            trigger={<button type='button'>Supprimer</button>}
                            modal
                            nested
                            >
                                {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>
                                        <div className="header"> Confirmation de suppression </div>
                                        <div className="content">
                                            {" "}
                                            Vous vous apprêtez à supprimer un élément de section.
                                            Êtes-vous sûr de vouloir continuer?
                                        </div>
                                        <div className="actions">
                                            <button className="validate" onClick={(event) => {close(); supprimerElement(indexElement);}}>Valider</button>
                                            <button className="cancel" onClick={() => {console.log('modal closed '); close(); }}>
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                    </div>
                    )
        })}
        <div className='formulaireFin'>
            <button onClick={ajouterElementTitre}>Ajouter un titre à la section</button>
            <button onClick={ajouterElementText}>Ajouter du texte à la section</button>
            <button onClick={ajouterElementImage}>Ajouter une image à la section</button>
        </div>
        </>
    )
} export default Section;