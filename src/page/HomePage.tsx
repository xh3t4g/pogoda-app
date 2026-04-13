import '../css/index.css'
import css from '../css/HomePage.module.css'

export function HomePage() {
    return <>
    
            <div className={css["container"]}>
            <form className="form">
                <input type="text" name="inputCity" id={css["inputCity"]} placeholder="Введите город..." />
            </form>

            <span className={css["WeatherIcone"]}>
                ⛅
            </span>

            <span className={css["WeatherTemp"]}>
                +15
            </span>

            <div className={css["ContainerCity"]}>
                <span className={css["TitleCity"]}>
                    Москва
                </span>

                <span className={css["ParametrCity"]}>
                    Переменная облочность 
                </span>
            </div>

            <div className={css["ContainerParameters"]}>
                <div className={css["card"]}>
                    <h5>Ощущается</h5>
                    <span>+11°</span>
                </div>

                <div className={css["card"]}>
                    <h5>Влажность</h5>
                    <span>68%</span>
                </div>

                <div className={css["card"]}>
                    <h5>Ветер</h5>
                    <span>5 м/с</span>
                </div>
            </div>
        </div>
    
    </>
}
