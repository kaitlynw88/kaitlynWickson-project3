function DisplayMaps (props){
    const name = props.name
    const city = props.city
    const type = props.type
    console.log(type)

    return(
        <div className="display">
            <a href={`http://www.google.com/maps/search/${name}+${city.name}`}>Find it on google maps</a>
            <p>Type of Establishment: {type}</p>
        </div>
    )
}

export default DisplayMaps;