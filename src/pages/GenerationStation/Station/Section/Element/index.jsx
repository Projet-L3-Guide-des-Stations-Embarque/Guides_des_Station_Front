import { useState} from "react";

function Element(props) {
    const [valueTypeElem, setValueTypeElem] = useState(props.typeElem)
    const [valueInfoElem, setValueInfoElem] = useState(props.infoElem)

    const onChangeTextElement = (e) => {
        setValueInfoElem(e.target.value)
        props.onChangeInfoElem(e.target.value)
    }
    
    const onChangeImageElement = (e) => {
        let base64string = "";
        const files = e.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>{
            base64string = reader.result;
            console.log('B64: ' + base64string)
            
            props.onChangeInfoElem(base64string)
        }
    }


    if(valueTypeElem == "image"){
        return(
            <>
            Image:
            <div>
                <input type='file' name='infoElem' value={valueInfoElem} onChange={onChangeImageElement}/>
            </div>
            </>
        )
    } else {
        return (
            <>
            Texte:
            <div>
                <input type='text'name='infoElem' value={valueInfoElem} onChange={onChangeTextElement}/>
            </div>
            </>
        )
    }

} export default Element;