const express = require("express");
const fs = require("fs");
const fsPromises = require("fs/promises");
const app = express();
const cors = require("cors");
const { Readable } = require("stream");
const { webmToMonoWav, runAudioToText, runVideoMaker } = require("./Functions");
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("server listening on port 8080");
});

app.get("/api/video/create/:length/:steps/:topic", async (req, res) => {
  const vidLength = req.params.length;
  const vidTopic = req.params.topic;
  const vidSteps = req.params.steps;
  res.send({ video: await runVideoMaker(vidLength, vidSteps, vidTopic) });
});

app.get("/api/audio/tts/:length/:steps/:topic", async (req, res) => {
  const audioName = req.params.audioName;
  const audiText = req.params.audiText;
  res.send({ video: await runTTSMaker(audioName, audiText) });
});

const FILE_UPLOADS_DIR = "./audiofiles";
const MAX_UPLOAD_SIZE = 2 * 1024 * 1024;
const parseRawReqBody = express.raw({
  limit: MAX_UPLOAD_SIZE,
  type: [
    "text/plain",
    "audio/webm",
    "application/octet-stream",
    "multipart/form-data",
  ],
});

app.post("/audio/upload", parseRawReqBody, async (req, res) => {
  const filename = "abcdef.webm",
    filepath = FILE_UPLOADS_DIR + "/" + filename;

  try {
    console.log("filepath", filepath);
    // const newBuffer = JSON.stringify(req.body);
    //const newBufferBin = Buffer.from(req.body);
    // console.log("TYP", typeof req.body, newBufferBin);
    /*for (const pair of req.body) {
      console.log("formData", pair);
    }*/
    const parsedData = req.body;
    console.dir(parsedData);
    //console.dir(parsedData.chunks, { depth: null });
    // await fsPromises.writeFile(filepath, newBufferBin);

    await fsPromises.writeFile(filepath, Buffer.from(parsedData));
    console.log("WRITTEN");
  } catch (error) {
    console.log("error", error);
    // respond with a 500 Internal Server Error if something goes wrong
    return res.status(500).json({
      status: "error",
      message: "Error while writing the binary file to disk.",
      error,
    });
  }
  const newFile = await webmToMonoWav(filepath);
  console.log("newFile", newFile);
  res.send({ text: await runAudioToText(newFile) });
});

app.get("/video/:vidUrl", async (req, res) => {
  console.log("video sending started");
  let rangeHeader = req.headers.range;
  if (!rangeHeader) {
    res.status(400).send("Requires Range header");
  }

  const videoPath = decodeURIComponent(req.params.vidUrl);
  console.log("videoPath", videoPath);
  const fileData = await fsPromises.stat(videoPath);
  const videoSize = fileData.size;

  // split the range header
  const splittedRange = rangeHeader.replace(/bytes=/, "").split("-");

  // get the starting byte from req header's range
  const start = parseInt(splittedRange[0]);

  // decide the end byte considering chunk size
  const end = splittedRange[1] ? parseInt(splittedRange[1], 10) : videoSize - 1;

  // calculate content length
  const contentLength = end - start + 1;

  // create and set response headers
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  // const remaining = videoSize - start

  // mark the current contet as completed if this is the latest chunk
  // if (remaining < chunkSize) {
  //     userCourseService.updateUserProgress(userId, courseId, contentId)
  // }

  // create a read stream and pipe it ro the res object
  const videoStream = fs.createReadStream(videoPath, { start, end });

  res.writeHead(206, headers);
  videoStream.pipe(res);
});
