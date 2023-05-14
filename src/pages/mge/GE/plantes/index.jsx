import { useState, useEffect } from 'react'

function Plantes (props) {

    const [valueImage, setValueImage] = useState(props.image)
    const [valueDescFR, setValueDescFR] = useState(props.descFR)
    const [valueDescLT, setValueDescLT] = useState(props.descLT)

    useEffect(() => {
        setValueImage(props.image)
        setValueDescFR(props.descFR)
        setValueDescLT(props.descLT)
    }, [ props.descFR, props.image, props.descLT ])

    const onChangeImage = (e) => {
        let base64string = "";
        const files = e.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>{
            base64string = reader.result;
            console.log('B64: ' + base64string)
            
            props.onChangeImage(base64string)
        }
    }
    const onChangeNomFR = (e) => {
        setValueDescFR(e.target.value)
        //POTENTIEL CONTROLE
        props.onChangeNomFR(e.target.value)
    }

    const onChangeNomLT = (e) => {
        setValueDescLT(e.target.value)
        //POTENTIEL CONTROLE
        props.onChangeNomLT(e.target.value)
    }

    return(
        <>
        <div>
            Image de la plante:
            <div>
            <input type='file' name='imageP' value={valueImage} onChange={onChangeImage}/>
            </div>
            Nom de la plante en français:
            <div>
                <input type='text'name='nomFR' value={valueDescFR} onChange={onChangeNomFR}/>
            </div>
            
            Nom de la plante en latin:
            <div>
                <input type='text'name='nomLT' value={valueDescLT} onChange={onChangeNomLT}/>
            </div>
        </div>
        </>
    )
}
export default Plantes;