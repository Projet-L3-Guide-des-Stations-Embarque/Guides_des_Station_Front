import Section from './Section';
import { useState, useEffect } from 'react'

function Station(props) {

    const [idSuivant, setIdSuivant] = useState(1)
    const [valueNomStation, setValueNomStation] = useState(props.nomStat)
    const [valueVerefNStation, setValueVerefNStation] = useState(props.verf)
    const [valueTabSections, setValueTabSections] = useState(props.sections)

    useEffect(() => {
        setValueNomStation(props.nomStat)
        setValueTabSections(props.sections)
        setIdSuivant(props.sections.length)
    }, [ props.nomStat, props.sections ])

    const ajouterSection = () => {
        let newSection = ({idSect:String(idSuivant), titre:'', elements: [ {idElem:'0',type:'texte',contenu:'',base64:''},{idElem:'1',type:'image',contenu:'',base64:''}]})
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
        let res = 'red'
        setValueNomStation(e.target.value)
        const regexp = /[1-9]-[1-9]+ \S.*$/g
        const found = e.target.value.match(regexp)
        if(found != null){
            setValueVerefNStation('green')
            res = 'green'
        } else {
            setValueVerefNStation('red')
        }
        props.onChangeVerefNomStation(valueVerefNStation);
        if(res == 'green'){
            props.onChangeNomStation(e.target.value)
        }
    }

    const changeIemeElementNomSection = (i, val) => {
        let data = [...valueTabSections];
        data[i].titre = val;
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
            <input type='text'name='nomStation' value={valueNomStation} style={{ backgroundColor: valueVerefNStation, color:'white'}} onChange={onChangeNomStation}/>
        </div>
        {valueTabSections.map((entryStation,indexSection) => {
                return(
                    <div key={entryStation.idSect} className='formulairedeLaGE'>
                        <Section nomSection={entryStation.titre} elements={entryStation.elements}
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