const {
  getReturnParameter,
  spawnBashScript,
  spawnFFMPEGScript,
} = require("./Common");
const { runVideoMaker } = require("./video/create/create_vid");

async function webmToMonoWav(filePath) {
  await spawnFFMPEGScript([
    ` -acodec pcm_s16le -ac 1 -ar 16000 ${filePath}.wav -y -i ${filePath}`,
  ]);
  console.log("converted");
  return `${filePath}.wav`;
}

async function runAudioToText(pathToAudio) {
  let textData = await spawnBashScript(["create_wav_tex.sh", pathToAudio]);
  const gatheredText = getReturnParameter(textData);
  console.log("TEXT", gatheredText, "TEXT");
  return gatheredText;
}

module.exports = {
  runAudioToText,
  runVideoMaker,
  webmToMonoWav,
};
