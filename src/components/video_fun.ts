export function video_fun(videoObj, weatherKey) {
    const video = videoObj[weatherKey];

    return video[
        Math.floor(Math.random() * video.length)
    ]
}
