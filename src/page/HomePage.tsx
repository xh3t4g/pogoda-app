import { useState, useEffect } from 'react'
import '../css/index.css'
import css from '../css/HomePage.module.css'

export function HomePage() {
    const [city, setCity] = useState('Москва');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ce399fe4e8b9c5ee720e4b99ef9a67f&units=metric&lang=ru`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404"){
                alert("город не найден")
                return
            }

            setWeather(data);
        })
    }, [city])

    let videoSrc = '/default.mp4'

    if (weather) {
        switch (weather.weather[0].main) {
            case "Rain":
                videoSrc = '/Rain.mp4'
                break;
            case "Mist":
                videoSrc = '/Mist.mp4'
                break;
            case "Clouds":
                videoSrc = '/Clouds.mp4'
                break;
            case "Clear":
                videoSrc = '/clear.mp4'
                break;

            default:
                videoSrc = '/default.mp4'
        }

    }
    return <>

            <video key={videoSrc} autoPlay muted loop>
                <source src={videoSrc} type="video/mp4" />
            </video>

    
            <div className={css["container"]}>
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                setCity(e.target.inputCity.value)
            }}>
                <input type="text" name="inputCity" id={css["inputCity"]} placeholder="Введите город..." />
            </form>

            {weather && <>
                <span className={css["WeatherIcone"]}>
                    ⛅
                </span>

                <span className={css["WeatherTemp"]}>
                    {Math.round(weather.main.temp)}°
                </span>

                <div className={css["ContainerCity"]}>
                    <span className={css["TitleCity"]}>
                        {weather.name}
                    </span>

                    <span className={css["ParametrCity"]}>
                        {weather.weather[0].description}
                    </span>
                </div>

                <div className={css["ContainerParameters"]}>
                    <div className={css["card"]}>
                        <h5>Ощущается</h5>
                        <span>{Math.round(weather.main.feels_like)}°</span>
                    </div>

                    <div className={css["card"]}>
                        <h5>Влажность</h5>
                        <span>{weather.main.humidity}%</span>
                    </div>

                    <div className={css["card"]}>
                        <h5>Ветер</h5>
                        <span>{Math.round(weather.wind.speed)} м/с</span>
                    </div>
                </div>
            </>}
        </div>
    
    </>
}
