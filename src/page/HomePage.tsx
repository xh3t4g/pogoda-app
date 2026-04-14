import { useState, useEffect } from 'react'
import '../css/index.css'
import css from '../css/HomePage.module.css'
import { useRef } from 'react';

export function HomePage() {
    const [city, setCity] = useState('Москва');
    const [weather, setWeather] = useState(null);
    const [isInvalid, setIsInvalid] = useState(false);
    const inputRef = useRef(null)

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ce399fe4e8b9c5ee720e4b99ef9a67f&units=metric&lang=ru`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404"){
                setIsInvalid(true)
                return
            }
            
            setIsInvalid(false)
            setWeather(data);
        })
    }, [city])

    const BASE_URL = import.meta.env.BASE_URL;

    let videoSrc = `${BASE_URL}default.mp4`

    if (weather) {
        switch (weather.weather[0].main) {
            case "Rain":
                videoSrc = `${BASE_URL}Rain.mp4`
                break;
            case "Mist":
                videoSrc = `${BASE_URL}Mist.mp4`
                break;
            case "Clouds":
                videoSrc = `${BASE_URL}Clouds.mp4`
                break;
            case "Clear":
                videoSrc = `${BASE_URL}clear.mp4`
                break;

            default:
                videoSrc = `${BASE_URL}default.mp4`
        }

    }

    useEffect(() => {
        const handleKeyDown = () => {
            inputRef.current.focus();
        } 

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [])

    return <>

            <video key={videoSrc} autoPlay muted loop>
                <source src={videoSrc} type="video/mp4" />
            </video>

    
            <div className={css["container"]} key={weather?.name}>
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                const value = e.target.inputCity.value.trim();
                if (value) {
                    setIsInvalid(false)
                    setCity(value)
                    inputRef.current.value = '';
                }
            }}>
                <input ref={inputRef} type="text" name="inputCity" className={`${css["inputCity"]} ${isInvalid ? css['red'] : ''}`} placeholder="Введите город..." />
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
