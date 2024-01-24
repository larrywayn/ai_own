import { useSelector } from "react-redux";
import Video from "./Video";
import VideoCreator from "./VideoCreator";

function VideoView() {
  // @ts-ignore
  const videoUrl = useSelector((state) => state.videoStore.videoUrl);
  console.log("videoUrl", videoUrl);
  return (
    <>
      <VideoCreator />
      <Video videoUrl={videoUrl} />
    </>
  );
}

export default VideoView;
