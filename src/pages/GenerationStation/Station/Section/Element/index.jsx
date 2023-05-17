import { useState, useEffect } from 'react'

function Element(props) {
    const [valueTypeElem, setValueTypeElem] = useState(props.typeElem)
    const [valueInfoElem, setValueInfoElem] = useState(props.infoElem)

    useEffect(() => {
        setValueTypeElem(props.typeElem)
        setValueInfoElem(props.infoElem)
    }, [ props.typeElem, props.infoElem ])

    const onChangeTextElement = (e) => {
        setValueInfoElem(e.target.value)
        props.onChangeContenuElem(e.target.value)
    }
    
    const onChangeImageElement = (e) => {
        try {
            let base64string = "";
            const files = e.target.files;
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>{
                base64string = reader.result;
                console.log('B64: ' + base64string)
                //setValueInfoElem(base64string)
                props.onChangeBase64Elem(base64string)
            }
        } catch (error) {
            console.log(error)
        }
    }


    if(valueTypeElem == "image"){
        return(
            <>
            Image:
            <div>
                <input type='file' name='base64' accept="image/*" value={valueInfoElem} onChange={onChangeImageElement}/>
            </div>
            </>
        )
    } else if(valueTypeElem == "titre"){
        return (
            <>
            Titre:
            <div>
                <textarea type='text'name='contenu' value={valueInfoElem} onChange={onChangeTextElement}/>
            </div>
            </>
        )
    } else {
        return (
            <>
            Texte:
            <div>
                <textarea type='text'name='contenu' value={valueInfoElem} onChange={onChangeTextElement}/>
            </div>
            </>
        )
    }

} export default Element;