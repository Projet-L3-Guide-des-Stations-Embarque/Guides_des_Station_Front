import { Link } from "react-router-dom"

function Reinitialiser(){

    const reset = (password) => {
        console.log("reset");
        const formData = new FormData();
        formData.append("password", password)
        fetch('api/resetAllData', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error(error));
    }


    return(
        <>
            <form onSubmit={e => {e.preventDefault(); reset(document.getElementById("password").value)}}>
                <input type="password" id="password" placeholder="Mot de passe" />
                <input type="submit" value="Réinitialiser" className="submitButton"/>
            </form>
        </>
    )
} export default Reinitialiser;