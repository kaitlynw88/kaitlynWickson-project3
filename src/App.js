import firebase from "./firebase";
import { getDatabase, ref, onValue, push, remove, set} from "firebase/database";
// import Form from "./Form";
import { useState, useEffect,  } from "react"
import './App.css';

function App() {
  // set state for the cities and restaurants
  const [cities, setCities] = useState([])
  const [restaurants, setRestuarants] = useState([])
  
  // set a state for users input for Cities and Restaurants
  const [userCitiesInput, setUserCitiesInput] = useState("")
  const [userRestaurantInput, setUserRestaurantInput] = useState("")

  useEffect( ()=>{
    const database = getDatabase(firebase)
    const dbRef = ref(database)

    onValue(dbRef, (response) =>{
    const newState =[];

    const data = response.val()

    for (let fbkey in data){
      newState.push({
        key:fbkey,
        name:data[fbkey]
      })
    }
    setCities(newState)
    setRestuarants(newState)
    })
  }, [])

  const handleCityChange = (e) =>{
    setUserCitiesInput(e.target.value)
  }
  const handleCitySubmit = (e)=>{
    e.preventDefault()

    const database = getDatabase(firebase)
    const dbRef = ref(database)

    push(dbRef, userCitiesInput)
    // setUserCitiesInput("")
  }

  const handleRemoveCity = (cityId) =>{
    const database = getDatabase(firebase)
    const dbRef = ref(database, `/${cityId}`)
    remove(dbRef)
  }

  const handleRestaurantChange = (e) =>{
    setUserRestaurantInput(e.target.value)
  }

  const handleRestaurantSubmit = (e) => {
    e.preventDefault()

    const database = getDatabase(firebase)
    const restaurantRef = ref(database)

    push(dbRef.restaurant, userRestaurantInput)
    // setUserCitiesInput("")
  }

  const handleRemoveRestaurant = (restaurantId) => {
    const database = getDatabase(firebase)
    const restaurantRef = ref(database.cityId, `/${restaurantId}`)
    remove(restaurantRef)
  }
  


  return (
    <div>
      <h1>Restaurant Planner</h1>

      <form action="submit">
        <label htmlFor="cityName">City Name</label>
        <input type="text"
          id="cityName"
          onChange={handleCityChange}
          value={userCitiesInput}
        />
        <button onClick={handleCitySubmit}>Submit</button>
      </form>

      <ul>
        {cities.map((city)=>{
          return(
            <li key={city.key}>
              <h2>{city.name}</h2>
              <button onClick={() => { handleRemoveCity(city.key) }}>Delete City</button>
              <label htmlFor="restaurantName">Restaurant Name</label>
              <input type="text"
                id="restaurantName"
                onChange={handleRestaurantChange}
                value={userRestaurantInput}
              />
              <ul>
                {restaurants.map((restaurant)=>{
                  return(
                    <li key={restaurant.key}>
                      <p>{restaurant.name}</p>
                    </li>
                  )
                })}
              </ul>
                
              
              <button onClick={handleRestaurantSubmit}>Submit</button>
              <button onClick={() => {handleRemoveRestaurant(restaurants.key) }}>Delete Restaurant</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
