// import firebase from "./firebase";
// import { getDatabase, ref, push, remove, onValue } from "firebase/database";

function Form (props){
    const userUrl = props.url

    return(
        <div>
            <a href={userUrl}>Url link</a>
        </div>
    )
}

export default Form;