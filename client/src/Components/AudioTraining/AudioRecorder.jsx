import { Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RawStorage } from "src";
import {
  setBlobAudioAction,
  setPlayableAudioAction,
} from "src/StoreContainer/audioStore";
import AudioPlayer from "./AudioPlayer";
import AudioRecorderButton from "./AudioRecordButton";
import useAudioPermissionHook from "./useAudioPermissionHook";

const AudioRecorder = () => {
  const [recordFinished, setRecordFinished] = useState(false);
  const [permission, mediaRecorder, permissionButton] =
    useAudioPermissionHook();

  const { audioChunksUUID } = useSelector(
    // @ts-ignore
    (state) => state.audioStore
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (recordFinished && audioChunksUUID) {
      const parsedChunks = RawStorage.getFromBlobStore(audioChunksUUID);
      if (parsedChunks.length) {
        // @ts-ignore
        async function bla() {
          const blob = new Blob(parsedChunks, {
            type: "audio/ogg; codecs=opus",
          });
          console.log("parsedChunks", blob, parsedChunks, typeof parsedChunks);

          const dataToSend = await blob.arrayBuffer();

          const uuidForBlobInBlobStore = RawStorage.pushToBlobStore(dataToSend);
          const audioURL = window.URL.createObjectURL(blob);

          console.log("audioURL", audioURL);
          const uuidForBlobStore = RawStorage.pushToBlobStore(audioURL);
          dispatch(setPlayableAudioAction(uuidForBlobStore));
          dispatch(setBlobAudioAction(uuidForBlobInBlobStore));
        }
        bla();
      }
    }
  }, [audioChunksUUID, recordFinished]);

  return (
    <div>
      <h2>Audio Recorder</h2>
      <Space size={[8, 16]} wrap>
        {permissionButton}
        {permission && (
          <AudioRecorderButton
            mediaRecorder={mediaRecorder}
            setRecordFinished={setRecordFinished}
          />
        )}
        <AudioPlayer />
      </Space>
    </div>
  );
};
export default AudioRecorder;
