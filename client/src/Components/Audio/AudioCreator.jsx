import { useSelector } from "react-redux";
import { AIApi } from "src";
import { useRequiredInput } from "src/Functions/Commons";
import { setPlayableAudioAction } from "src/StoreContainer/audioStore";
import { store } from "src/StoreContainer/store";
import FormHolder from "../FormHolder";
import { audioInputs } from "../Inputs/AudioInputs";

function AudioCreator() {
  // @ts-ignore
  const audioUrl = useSelector((state) => state.audioStore.audio);
  const [audioPrompt, audioPromptInput] = useRequiredInput(
    audioInputs.audioControl1
  );
  function handleClick() {
    function setAudioUrl(url) {
      store.dispatch(setPlayableAudioAction(url));
    }
    AIApi.createAudio("", audioPrompt, setAudioUrl);
  }
  console.log("audioUrl", audioUrl);
  return <FormHolder handleClick={handleClick}>{audioPromptInput}</FormHolder>;
}

export default AudioCreator;
