import Section from './Section';
import { useState} from "react";

function Station(props) {

    const [idSuivant, setIdSuivant] = useState(1)
    const [valueNomStation, setValueNomStation] = useState(props.nomStat)
    const [valueTabSections, setValueTabSections] = useState(props.sections)

    const ajouterSection = () => {
        let newSection = ({idSect:String(idSuivant), nomSection:'', elements: [ {idElem:'0',type:'text',info:''},{idElem:'1',type:'image',info:''}]})
        setIdSuivant(idSuivant + 1)
        setValueTabSections([...valueTabSections, newSection])
        props.onChangeTabSections(valueTabSections)
    }

    const supprimerSection = (i) => {
        let data = [...valueTabSections];
        let part1 = data.splice(0, i)
        data.splice(0, 1)
        let result = [...part1, ...data]
        setValueTabSections(result)
        props.onChangeTabSections(result)
    }

    const onChangeNomStation = (e) => {
        setValueNomStation(e.target.value)
        props.onChangeNomStation(e.target.value)
    }

    const changeIemeElementNomSection = (i, val) => {
        let data = [...valueTabSections];
        data[i].nomSection = val;
        setValueTabSections(data);
        props.onChangeTabSections(valueTabSections);
    }

    const changeIemeElementTabElements = (i, val) => {
        let data = [...valueTabSections];
        data[i].elements = val;
        setValueTabSections(data);
        props.onChangeTabSections(valueTabSections);
    }

    const createChangeIemeElementNomSection = (i) => {
        return changeIemeElementNomSection.bind(null, i)
    }

    const createChangeIemeElementTabElements = (i) => {
        return changeIemeElementTabElements.bind(null, i)
    }

    return(
        <>
        Nom de la station :
        <div>
            <input type='text'name='nomStation' value={valueNomStation} onChange={onChangeNomStation}/>
        </div>
        {valueTabSections.map((entryStation,indexSection) => {
                return(
                    <div key={entryStation.idSect} className='formulairedeLaGE'>
                        <Section nomSection={entryStation.nomSection} elements={entryStation.elements}
                        onChangeNomSection={createChangeIemeElementNomSection(indexSection)}
                        onChangeTabSections={createChangeIemeElementTabElements(indexSection)}></Section>
                        <button onClick={event => supprimerSection(indexSection)}>Supprimer</button>
                    </div>
                    )
        })}
        <div className='formulaireFin'>
            <button onClick={ajouterSection}>Ajouter une nouvelle section</button>
        </div>
        </>
    )
} export default Station;