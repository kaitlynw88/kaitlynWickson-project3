import firebase from "./firebase";
import { getDatabase, ref, push, remove } from "firebase/database";
// import Form from "./Form";
import { useState, useEffect, } from "react"

function Restaurants(props){
    const [userRestaurantInput, setUserRestaurantInput] = useState("")
    const [restaurants, setRestaurants] = useState([])


    const handleRestaurantChange = (e) => {
        setUserRestaurantInput(e.target.value)
    }

    const handleRemoveRestaurant = (restaurantId) => {
        const database = getDatabase(firebase)
        const restaurantRef = ref(database.cities.key, `/${restaurantId}`)
        remove(restaurantRef)
    }

    const handleRestaurantSubmit = (e) => {
        e.preventDefault()
    
        // const database = getDatabase(firebase)
        // const restaurantRef = ref(database, "cities/city1/restaurants")
        const restaurantRef = ref(props.restaurants)

        const name = { name: userRestaurantInput }

        push(restaurantRef, name)
        setUserRestaurantInput("")
        console.log(props.restaurants)
    }

    useEffect( ()=>{
        const restaurantInfo = []
    
        for (let restaurant in props.restaurants){
            const restaurantObj ={
                restaurantKey:restaurant,
                restaurantName: props.restaurants[restaurant].name
            }
            restaurantInfo.push(restaurantObj)
        }
        // console.log(props.restaurants)
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
                  <ul>
                    {restaurants.map((restaurant)=>{
                      return(
                        
                            <li key={restaurant.restaurantKey}>
                                <p>{restaurant.restaurantName}</p>
                                <button onClick={() => {handleRemoveRestaurant(restaurant.key) }}>Delete Restaurant</button> 
                            </li>
                      )
                    })}
                  </ul>
                  <button onClick={handleRestaurantSubmit}>Submit</button>
                  
        </div>
    )
}

export default Restaurants