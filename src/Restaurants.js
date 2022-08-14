import firebase from "./firebase";
import { getDatabase, ref, push, remove, update } from "firebase/database";
import Form from "./Form";
import { useState, useEffect, } from "react"

function Restaurants(props){
    const [userRestaurantInput, setUserRestaurantInput] = useState("")
    const [restaurants, setRestaurants] = useState([])

    const [userUrlInput, setUserUrlInput] = useState("")
    const [urls, setUrls] = useState("")

    const handleRestaurantChange = (e) => {
        setUserRestaurantInput(e.target.value)
    }

    const handleUrlChange =(e) =>{
        setUserUrlInput(e.target.value)
    }

    const handleRemoveRestaurant = (restaurantId) => {
        const database = getDatabase(firebase)
        const restaurantRef = ref(database, `cities/${props.cityId}/restaurants/${restaurantId}`)
        
        remove(restaurantRef)
        
    }
    
    const handleRestaurantSubmit = (e, restaurantInfo) => {
        e.preventDefault()
        const database = getDatabase(firebase)
        const restaurantRef = ref(database, `cities/${props.cityId}/restaurants`)
        // const name = { name: userRestaurantInput }
        
        push(restaurantRef, `${restaurantInfo}`)
    }

    
    
    useEffect( ()=>{
        const restaurantInfo = []
    
        for (let restaurant in props.restaurants){
            const restaurantObj ={
                restaurantKey:restaurant,
                restaurantName: props.restaurants[restaurant].name,
                restaurantUrl:props.restaurants[restaurant].url
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
                />
            <label htmlFor="restaurantUrl">Url</label>
                <input type="text"
                    id="restaurantUrl"
                    onChange={handleUrlChange}
                    value={userUrlInput}
            />
            
                  <ul>
                    {restaurants.map((restaurant)=>{
                      return(
                        
                            <li key={restaurant.restaurantKey}>
                              <Form url={restaurant.restaurantUrl}/>
                                <p>{restaurant.restaurantName}</p>
                                <button onClick={() => {handleRemoveRestaurant(restaurant.restaurantKey) }}>Delete Restaurant</button> 
                            </li>
                      )
                    })}
                  </ul>
                  <button onClick={handleRestaurantSubmit}>Submit</button>
                  
        </div>
    )
}

export default Restaurants