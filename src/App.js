 import React, {useState} from "react";


const api={
  key: "94a73d1c3df1e1fc0c6a0f090b3ccc24",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e =>{
    if(e.key ==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json() ).then(result => { 
        setWeather(result);
        setQuery('');
        

        if(result.cod === '404'){
          alert("Sorry! Please enter a city or country");
        }
      
      });
   

    }
  }

  const dateFunc = (todayDate)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"];

    let day = days[todayDate.getDay()];
    let date = todayDate.getDate();
    let month = months[todayDate.getMonth()];
    let year = todayDate.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp >16 && weather.main.temp <29 ) ? 'App sunny': (weather.main.temp < 16) ? 'App cold' : 'App'):'App'}>
      <main>
        <div className="search-box">
        <input type="input" className="search-bar" placeholder="Hey! Check out the weather in your city"
        onChange={e =>setQuery(e.target.value)} value={query} onKeyDown={search}/>
        </div>
          {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box ">
            <div className="location"  onInvalid={() => alert}>{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateFunc(new Date())} </div>
        </div>

        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
      </div>
         ): ('')}
      </main> 
    </div>
  );
}

export default App;
