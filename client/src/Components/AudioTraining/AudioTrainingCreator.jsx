import { useSelector } from "react-redux";
import { AIApi, RawStorage } from "src";
import { setAudioTextAction } from "src/StoreContainer/audioStore";
import { store } from "src/StoreContainer/store";
import FormHolder from "../FormHolder";
import AudioRecorder from "./AudioRecorder";
import AudioTextCreator from "./AudioTextCreator";

function AudioTrainingCreator() {
  const { audioBlobUUID } = useSelector(
    // @ts-ignore
    (state) => state.audioStore
  );
  const dataAudio = RawStorage.getFromBlobStore(audioBlobUUID);
  function handleClick() {
    function setText(text) {
      console.log("text", text);
      store.dispatch(setAudioTextAction(text));
    }
    AIApi.createTextFromAudio(dataAudio, setText);
  }

  return (
    <FormHolder handleClick={handleClick}>
      <AudioRecorder />
      <AudioTextCreator />
    </FormHolder>
  );
}

export default AudioTrainingCreator;
