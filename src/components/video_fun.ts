type WeatherKey =
  | "Rain"
  | "Mist"
  | "Clouds"
  | "Clear"
  | "Snow"
  | "Default";

type VideoMap = Record<WeatherKey, string[]>;

export function video_fun(videoObj:VideoMap, weatherKey:WeatherKey) {
    const video = videoObj[weatherKey];

    return video[
        Math.floor(Math.random() * video.length)
    ]
}
