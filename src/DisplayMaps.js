function DisplayMaps (props){
    const name = props.name
    const city = props.city
    let type = props.type

    if(type === ""){
        type = "Restaurant"
    }else{
        type = props.type
    }

    return(
        <div className="display">
            <a href={`http://www.google.com/maps/search/${name}+${city.name}`}>Find it on google maps</a>
            <p>Type of Establishment: {type}</p>
        </div>
    )
}

export default DisplayMaps;