import { useSelector } from "react-redux";

function AudioTextCreator() {
  const { audioText } = useSelector(
    // @ts-ignore
    (state) => state.audioStore
  );

  return <div>Erkannter Text: {audioText ? audioText : ""}</div>;
}

export default AudioTextCreator;
