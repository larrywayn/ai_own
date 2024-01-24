import { AIApi } from "src";
import { useRequiredInput } from "src/Functions/Commons";
import { store } from "src/StoreContainer/store";
import { setVideoUrlAction } from "src/StoreContainer/videoStore";
import FormHolder from "../FormHolder";
import { videoInputs } from "../Inputs/VideoInputs";

function VideoCreator() {
  const [vidPrompt, vidPromptInput] = useRequiredInput(
    videoInputs.videoControl1
  );
  const [vidFrames, vidFramesInput] = useRequiredInput(
    videoInputs.videoControl2
  );
  const [vidSteps, vidStepsInput] = useRequiredInput(videoInputs.videoControl3);

  function handleClick() {
    function setVideoUrl(url) {
      store.dispatch(setVideoUrlAction(url));
    }
    AIApi.createVideo(vidSteps, vidFrames, vidPrompt, setVideoUrl);
  }

  return (
    <FormHolder handleClick={handleClick}>
      <>
        {vidPromptInput}
        {vidFramesInput}
        {vidStepsInput}
      </>
    </FormHolder>
  );
}

export default VideoCreator;
