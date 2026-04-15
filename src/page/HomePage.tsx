import { useState, useEffect } from 'react'
import '../css/index.css'
import css from '../css/HomePage.module.css'
import { useRef } from 'react';
import { BASE_URL } from '../data/Videoelements';
import { Videoelements } from '../data/Videoelements';
import { video_fun } from '../components/video_fun';

export function HomePage() {

    interface Weather {
        name: string;
        main: {
            temp: number;
            feels_like: number;
            humidity: number;
        };
        weather: {
            main: string;
            description: string;
        }[];
        wind: {
            speed: number;
        };
    }
    
    const [city, setCity] = useState('Москва');
    const [weather, setWeather] = useState<Weather | null>(null)
    const [isInvalid, setIsInvalid] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

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

    useEffect(() => {
        
    })


    let videoSrc = `${BASE_URL}default.mp4`


    if (weather) {
        switch (weather.weather[0].main) {
            case "Rain":
                videoSrc = video_fun(Videoelements, "Rain");
                break;
            case "Mist":
                videoSrc =  video_fun(Videoelements, "Mist");
                break;
            case "Clouds":
                videoSrc =  video_fun(Videoelements, "Clouds");
                break;
            case "Clear":
                videoSrc = video_fun(Videoelements, "Clear")
                break;
            case "Snow":
                videoSrc = video_fun(Videoelements, "Snow")
                break;

            default:
                videoSrc = video_fun(Videoelements, "Default")
        }

    }

    useEffect(() => {
        const handleKeyDown = () => {
            inputRef.current?.focus();
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
                    if (inputRef.current) {
                        inputRef.current.value = ''
                    };
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
