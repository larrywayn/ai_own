import { Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RawStorage } from "src";
import { setAudioChunksAction } from "src/StoreContainer/audioStore";
const useAudioPermissionHook = () => {
  const [permission, setPermission] = useState(false);
  const [mediaRecorder, setMediaRecord] = useState(null);

  const { audioChunksUUID } = useSelector(
    // @ts-ignore
    (state) => state.audioStore
  );

  const dispatch = useDispatch();

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        if (mediaStream) {
          const mediaRecorder = new MediaRecorder(mediaStream);
          mediaRecorder.ondataavailable = (e) => {
            if (!audioChunksUUID) {
              const uuidForBlobStore = RawStorage.pushToBlobStore(e.data, true);
              dispatch(setAudioChunksAction(uuidForBlobStore));
            } else {
              RawStorage.appendToBlobStore(audioChunksUUID, e.data);
            }
          };
          setMediaRecord(mediaRecorder);
          setPermission(true);
        }
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  return [
    permission,
    mediaRecorder,
    !permission && (
      <Button onClick={getMicrophonePermission}>Get Microphone</Button>
    ),
  ];
};
export default useAudioPermissionHook;
