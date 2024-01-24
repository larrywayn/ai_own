function Video({
    videoUrl
}) {
    console.log("videoUrl B:",videoUrl)
    if (!videoUrl) {
        return
    }
    return <video key={videoUrl} autoPlay controls loop width="750" height="500"  >
        <source src={`http://localhost:8080/video/${encodeURIComponent(videoUrl)}`} type="video/webm" />
    </video>;
}

export default Video;