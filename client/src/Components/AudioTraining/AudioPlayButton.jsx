import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
const AudioPlayButton = ({ isPlaying, playAudio }) => {
  return (
    <Button onClick={playAudio}>
      {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
    </Button>
  );
};
export default AudioPlayButton;
