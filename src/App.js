import React, { useState } from 'react'
import axios from 'axios'
import ShowTemp from './ShowTemp'
function App() {
    const [city, setCity] = useState("")
    const [data, setData] = useState({
        description: "",
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        sunrise: 0,
        sunset: 0,
        country: "",
    })

    const handleClick = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a9049863e496234da216b4560b485eab&units=metric`)
            .then((response) => {
                setData({
                    description: response.data.weather[0].description,
                    temp: response.data.main.temp,
                    temp_max: response.data.main.temp_max,
                    temp_min: response.data.main.temp_min,
                    humidity: response.data.main.humidity,
                    sunrise: response.data.sys.sunrise,
                    sunset: response.data.sys.sunset,
                    country: response.data.sys.country,
                })
            })
        }

        //Date
        let d=new Date();
        let date =d.getDate();
        let year=d.getFullYear();
        let month=d.toLocaleString("default",{month:'long'});
        let day=d.toLocaleString("default",{weekday:'long'});

        //Time
        let time=d.toLocaleString([],{
            hour:'2-digit',
            minute:'2-digit',
        })

    return (
        <>
           
            <div className='container text-center my-2'>
                <h1>Weather App</h1>
                <input type="text" className='from-control my-4' value={city} onChange={(e) => {
                    setCity(e.target.value);
                }} />
                
                <button className='btn btn-primary mx-2' type='submit' onClick={handleClick}>Search</button>
            

                <div className="bg-grey bg-opacity-50 py-5 justify-center">
                    <p className="card-title"></p>
                    <div className="card-text lead">
                        <p>{day}</p>
                        {date} {month} {year}
                        <br/>
                        {time}
                        
                    </div>
                    <hr/>
                
                    <h1 className="card-text">{data.temp}&deg;C </h1> 
                    <p className="card-text">{data.temp_min}&deg;C | {data.temp_max}&deg;C</p>
                    
                    
                </div>


            </div>
            <hr/>
          

            <ShowTemp text ={data}></ShowTemp>
        </>
    )
}

export default App;
