import firebase from "./firebase";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import Form from "./Form";
import { useState, useEffect,  } from "react"
import './App.css';
import Restaurants from "./Restaurants";

function App() {
  // set state for the cities and restaurants
  const [cities, setCities] = useState([])
  
  // set a state for users input for Cities and Restaurants
  const [userCitiesInput, setUserCitiesInput] = useState("")

  
  useEffect( ()=>{
    const database = getDatabase(firebase)
    const dbRef = ref(database,"cities")

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
    })
  }, [])

  const handleCityChange = (e) =>{
    setUserCitiesInput(e.target.value)
  }
  const handleCitySubmit = (e)=>{
    e.preventDefault()
    
    const database = getDatabase(firebase)
    const cityRef = ref(database, "cities")

    const name = { name: userCitiesInput}

    push(cityRef, name )
    setUserCitiesInput("")
  }

  const handleRemoveCity = (cityId) =>{
    const database = getDatabase(firebase)
    const cityRef = ref(database, `cities/${cityId}`)

    remove(cityRef )
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
        {cities.map((city, cityIndex)=>{
          return(
            <li key={city.key}>
              <h2>{city.name.name}</h2>
              <button onClick={() => handleRemoveCity(city.key)}>Delete City</button>
              <Restaurants cityId = {city.key} restaurants={cities[cityIndex].name.restaurants}/>
            </li>
          )
          
        })}
      </ul>
    </div>
  );
}

export default App;
