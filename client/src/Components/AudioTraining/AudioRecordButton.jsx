import { Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const AudioRecorderButton = ({ mediaRecorder, setRecordFinished }) => {
  const [isRecording, setRecording] = useState(false);
  const { audioPlayableUUID } = useSelector(
    // @ts-ignore
    (state) => state.audioStore
  );

  const recordAudio = async () => {
    if (isRecording) {
      mediaRecorder.stop();
      setRecording(mediaRecorder?.state === "recording");
      setRecordFinished(true);
    } else {
      mediaRecorder.start();
      setRecording(mediaRecorder?.state === "recording");
    }
  };

  const danger = isRecording ? { danger: true } : {};
  return (
    <Button {...danger} onClick={recordAudio}>
      Aufnahme
      {isRecording
        ? " stoppen ◉"
        : audioPlayableUUID
        ? " hinzufügen"
        : " starten"}
    </Button>
  );
};
export default AudioRecorderButton;
