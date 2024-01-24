import axios from "axios";

export class AIPI {
  _host;
  _errorFunction;
  _prefix;
  constructor(host, errorFunction, prefix) {
    this._host = host;
    this._prefix = prefix ? prefix : "api";
    this._errorFunction = errorFunction
      ? errorFunction
      : (error) => {
          console.error("error in api call:", error);
          throw error;
        };
  }

  _requestPOST(request, fileData, setText, type) {
    try {
      console.log("fileData", fileData);

      const req = new XMLHttpRequest();
      req.open("POST", `${this._host}${request}`, true);
      req.onload = (event) => {
        const resultAnswer = JSON.parse(event.target["responseText"]);
        console.log("SENDED", resultAnswer.text);
        setText(resultAnswer[type]);
      };
      req.setRequestHeader("Content-Type", "application/octet-stream");
      req.send(fileData);
    } catch (error) {
      this._errorFunction(error);
    }
  }

  _request(request, setUrl, type) {
    return axios
      .get(`${this._host}${request}`)
      .then((data) => {
        setUrl(data.data?.[type]);
      })
      .catch(this._errorFunction);
  }

  createVideo(vidSteps, vidFrames, prompt, setUrl) {
    this._request(
      `${this._prefix}/video/create/${vidFrames}/${vidSteps}/${prompt}`,
      setUrl,
      "video"
    );
  }

  createAudio(voice, prompt, setUrl) {
    this._request(
      `${this._prefix}/audio/tts?voice=${voice}&prompt=${prompt}`,
      setUrl,
      "audio"
    );
  }

  createTextFromAudio(binaryData, setResponseText) {
    this._requestPOST(
      `${this._prefix}/audio/att/upload`,
      binaryData,
      setResponseText,
      "text"
    );
  }
}
