function DisplayMaps (props){
    const name = props.name
    const city = props.city

    return(
        <a href={`http://www.google.com/maps/search/${name}+${city.name}`}>Find it on google maps</a>
    )
}

export default DisplayMaps;