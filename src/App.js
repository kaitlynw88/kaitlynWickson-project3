import firebase from "./firebase";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
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
    // check to see if userCities input is truthy, if so, push to database
    if (userCitiesInput){
      push(cityRef, name )
      setUserCitiesInput("")
    }else{
      alert("Please type in a city")
    }
  }

  const handleRemoveCity = (cityId) =>{
    const database = getDatabase(firebase)
    const cityRef = ref(database, `cities/${cityId}`)

    remove(cityRef )
  }

  return (
    <div>
      <header>
        <div className="wrapper">
          <div className="title">
            <h1>Restaurant Planner</h1>
            <h2>Cities you want to go to, places you want to eat</h2>
          </div>
        </div>
      </header>

      <main className="wrapper">
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
              <li className="cityName" key={city.key}>
                <div className="cityInfo">
                  <h3>{city.name.name}</h3>
                  <button onClick={() => handleRemoveCity(city.key)}>Delete City</button>
                </div>
                <Restaurants cityId = {city.key} userCity={city.name} restaurants={cities[cityIndex].name.restaurants}/>
              </li>
          )
          })}
        </ul>
      </main>
      <footer>
        <p>Created at Juno College 2022</p>
        <p>Made with React and Firebase</p>
      </footer>
    </div>
  );
}

export default App;
