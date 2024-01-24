import { Space } from "antd";
import { useSelector } from "react-redux";
import AudioPlayButton from "./AudioPlayButton";
import AudioResetButton from "./AudioResetButton";
import useAudioDisplay from "./useAudioDisplay";
const AudioPlayer = () => {
  // @ts-ignore
  const { audioPlayableUUID } = useSelector((state) => state.audioStore);
  const { isPlaying, playAudio, Element: audioElement } = useAudioDisplay();

  if (!audioPlayableUUID) {
    return;
  }

  return (
    <Space size={[8, 16]} wrap>
      <AudioPlayButton isPlaying={isPlaying} playAudio={playAudio} />
      <AudioResetButton />
      {audioElement}
    </Space>
  );
};
export default AudioPlayer;
