import { StopOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RawStorage } from "src";
import { resetAudioAction } from "src/StoreContainer/audioStore";

const AudioResetButton = () => {
  const dispatch = useDispatch();
  const { audioChunksUUID, audioPlayableUUID } = useSelector(
    // @ts-ignore
    (state) => state.audioStore
  );

  function resetAudio() {
    RawStorage.removeFromBlobStore(audioPlayableUUID);
    RawStorage.removeFromBlobStore(audioChunksUUID);
    dispatch(resetAudioAction());
  }

  return (
    <Button onClick={resetAudio}>
      <StopOutlined />
    </Button>
  );
};
export default AudioResetButton;
