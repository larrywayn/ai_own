const path = require("node:path");
const {
  getReturnParameter,
  spawnBashScript,
  spawnFFMPEGScript,
} = require("./../../Common");

async function runVideoMaker(vidSteps, vidFrames, vidPrompt) {
  console.log("parameter", vidSteps, vidFrames, vidPrompt);
  console.log("script to run", path.normalize(`${__dirname}\\create_vid.sh`));
  const returnedVideoCreationData = await spawnBashScript([
    path.normalize(`${__dirname}\\create_vid.sh`),
    vidSteps,
    vidFrames,
    vidPrompt,
  ]);
  const extractedReturnValue = getReturnParameter(
    returnedVideoCreationData
  ).trim();
  console.log("data", extractedReturnValue);
  const outputConverted = `${extractedReturnValue}.webm`;
  const inputMp4 = `${extractedReturnValue}.mp4`;
  console.log("outputConverted", outputConverted);
  console.log("inputMp4", inputMp4);
  await spawnFFMPEGScript([
    ` -vcodec libvpx -qmin 0 -qmax 50 -crf 10 -b:v 1M -acodec libvorbis ${outputConverted} -y -i ${inputMp4}`,
  ]);
  console.log("outputConverted", outputConverted);
  return outputConverted;
}

module.exports = {
  runVideoMaker,
};
