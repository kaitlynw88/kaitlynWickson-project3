// import firebase from "./firebase";
// import { getDatabase, ref, push, remove, onValue } from "firebase/database";

function Form (props){
    console.log(props.url)

    return(
        <a href={props.url}>{props.url}</a>
    )
}

export default Form;