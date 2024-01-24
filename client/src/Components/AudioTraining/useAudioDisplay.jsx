import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RawStorage } from "src";
const useAudioDisplay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const { audioPlayableUUID } = useSelector(
    // @ts-ignore
    (state) => state.audioStore
  );

  const playAudio = () => {
    if (!isPlaying) {
      audioRef.current.muted = false;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const finalAudioURL = RawStorage.getFromBlobStore(audioPlayableUUID);

  function handleEnded() {
    setIsPlaying(false);
  }

  return {
    isPlaying,
    playAudio,
    Element: audioPlayableUUID ? (
      <audio onEnded={handleEnded} ref={audioRef} src={finalAudioURL} />
    ) : null,
  };
};
export default useAudioDisplay;
