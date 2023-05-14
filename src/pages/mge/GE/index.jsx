import { useState, useEffect } from 'react'
import Plantes from './plantes';

function GE (props) {    
    const [valueID, setValueID] = useState(props.geid)
    const [valueNom, setValueNom] = useState(props.nom)
    const [valueTabP, setValueTabP] = useState(props.plantes)
    
    const onChangeID = (e) => {
        setValueID(e.target.value)
        //POTENTIEL CONTROLE
        props.onChangeID(e.target.value)
    }

    const onChangeNom = (e) => {
        setValueNom(e.target.value)
        //POTENTIEL CONTROLE
        props.onChangeNom(e.target.value)
    }

    const changeIemeElementPImage = (i, val) => {
        let data = [...valueTabP];
        data[i].imageGE = val;
        setValueTabP(data);
        props.onChangeTabP(valueTabP);
    }

    const createChangeIemeElementPImage = (i) => {
        return changeIemeElementPImage.bind(null, i)
    }

    const changeIemeElementPNomFR = (i, val) => {
        let data = [...valueTabP];
        data[i].descriptionfr = val;
        setValueTabP(data);
        props.onChangeTabP(data);
    }

    const createChangeIemeElementPNomFR = (i) => {
        return changeIemeElementPNomFR.bind(null, i)
    }

    const changeIemeElementPNomLT = (i, val) => {
        let data = [...valueTabP];
        data[i].descriptionlat = val;
        setValueTabP(data);
        props.onChangeTabP(data);
    }

    const createChangeIemeElementPNomLT = (i) => {
        return changeIemeElementPNomLT.bind(null, i)
    }

    const [idSuivantP, setIdSuivantP] = useState(1)

    const supprimerPlante = (i) => {
        let data = [...valueTabP];
        let part1 = data.splice(0, i)
        data.splice(0, 1)
        let result = [...part1, ...data]
        setValueTabP(result)
        props.onChangeTabP(result)
    }

    const ajouterPlante = () => {
        let newPlante = ({idP: String(idSuivantP), imageGE: '', descriptionfr:'', descriptionlat:''})
        setIdSuivantP(idSuivantP + 1)
        setValueTabP([...valueTabP, newPlante])
        //TODO fix 
        props.onChangeTabP(valueTabP)
    }

    useEffect(() => {
        setValueID(props.geid)
        setValueNom(props.nom)
        setValueTabP(props.plantes)
        setIdSuivantP(String(props.plantes.length))
    }, [ props.geid, props.nom, props.plantes ])

    return(
        <>
        Numéro du Groupe Ecologique :
        <div>
            <input type='text'name='id' value={valueID} onChange={onChangeID}/>
        </div>
        
        Nom du Groupe Ecologique :
        <div>
            <input type='text'name='nom' value={valueNom} onChange={onChangeNom}/>
        </div>
        {valueTabP.map((entryP,indexPlante) => {
            return (
            <div key={entryP.idP} className='formulairedeLaGE'>
                <Plantes image={entryP.image} descFR={entryP.descriptionfr} descLT={entryP.descriptionlat}
                onChangeImage={createChangeIemeElementPImage(indexPlante)}
                onChangeNomFR={createChangeIemeElementPNomFR(indexPlante)}
                onChangeNomLT={createChangeIemeElementPNomLT(indexPlante)}></Plantes>
                <button onClick={event => supprimerPlante(indexPlante)}>Supprimer</button>
            </div>
            )
        })}
        <div className='formulaireFin'>
                <button onClick={ajouterPlante}>Ajouter une nouvelle plante</button>
            </div>
        </>
    )
}export default GE;