import Element from './Element';
import { useState} from "react";

function Section(props) {

    const [idSuivant, setIdSuivant] = useState(2)
    const [valueNomSection, setValueNomSection] = useState(props.nomSection)
    const [valueTabElements, setValueTabElements] = useState(props.elements)

    const ajouterElementText = () => {
        let newElement = ({idElem:String(idSuivant),type:'text',info:''})
        setIdSuivant(idSuivant + 1)
        setValueTabElements([...valueTabElements, newElement])
        props.onChangeTabSections(valueTabElements)
    }

    const ajouterElementImage = () => {
        let newElement = ({idElem:String(idSuivant),type:'image',info:''})
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

    const changeIemeElementInfoElements = (i, val) => {
        let data = [...valueTabElements];
        data[i].info = val;
        setValueTabElements(data);
        props.onChangeTabSections(valueTabElements);
    }

    const createChangeIemeElementInfoElements = (i) => {
        return changeIemeElementInfoElements.bind(null, i)
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
                        <Element typeElem={entrySection.type} infoElem={entrySection.info}
                        onChangeInfoElem={createChangeIemeElementInfoElements(indexElement)}></Element>
                        <button onClick={event => supprimerElement(indexElement)}>Supprimer</button>
                    </div>
                    )
        })}
        <div className='formulaireFin'>
            <button onClick={ajouterElementText}>Ajouter un élément texte à la section</button>
            <button onClick={ajouterElementImage}>Ajouter une image à la section</button>
        </div>
        </>
    )
} export default Section;