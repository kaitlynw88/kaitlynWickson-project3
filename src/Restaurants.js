import firebase from "./firebase";
import { getDatabase, ref, push, remove} from "firebase/database";
import DisplayMaps from "./DisplayMaps";
import { useState, useEffect, } from "react"

function Restaurants(props){
    const [userRestaurantInput, setUserRestaurantInput] = useState("")
    const [restaurants, setRestaurants] = useState([])

    const userCity = props.userCity

    const handleRestaurantChange = (e) => {
        setUserRestaurantInput(e.target.value)
    }

    const handleRemoveRestaurant = (restaurantId) => {
        const database = getDatabase(firebase)
        const restaurantRef = ref(database, `cities/${props.cityId}/restaurants/${restaurantId}`)
        
        remove(restaurantRef)
        
    }
    
    const handleRestaurantSubmit = (e) => {
        e.preventDefault()
        const database = getDatabase(firebase)
        const restaurantRef = ref(database, `cities/${props.cityId}/restaurants`)
        
        // make an object to store the restaurant name
        const restaurantData = { name:userRestaurantInput}
        if(userRestaurantInput){
            push(restaurantRef, restaurantData)
            setUserRestaurantInput("")
        }else{
            alert(`Whats your favourite restaurant in: ${userCity.name}`)
        }
    }

    useEffect( ()=>{
        const restaurantInfo = []
    
        for (let restaurant in props.restaurants){
            const restaurantObj ={
                restaurantKey:restaurant,
                restaurantName: props.restaurants[restaurant].name,
            }
            restaurantInfo.push(restaurantObj)
        }
        setRestaurants(restaurantInfo)

    }, [props.restaurants])

    return(
        <div>
            <label htmlFor="restaurantName">Restaurant Name</label>
                <input type="text"
                    id="restaurantName"
                    onChange={handleRestaurantChange}
                    value={userRestaurantInput}
                    className="restaurantLabel"
                />
                    <button onClick={handleRestaurantSubmit}>Submit</button>
                  <ul>
                    {/* Map through eacth restaurant in the restaurant state */}
                    {restaurants.map((restaurant)=>{
                      return(
                            // return the key and name from each restaurant item
                            <li className="restaurantList" key={restaurant.restaurantKey}>
                                <div className="info">
                                    <p>{restaurant.restaurantName}</p>
                                    <DisplayMaps name={restaurant.restaurantName} city={userCity}/>
                                </div>

                                <button onClick={() => {handleRemoveRestaurant(restaurant.restaurantKey) }}>Delete Restaurant</button> 
                            </li>
                      )
                    })}
                  </ul>
                  
        </div>
    )
}

export default Restaurants