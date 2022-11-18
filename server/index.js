const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.use(cors());

app.get("/info", async (request, response) => {
  const URL = request.query.URL;

  console.log(URL)
  const videoInfo = await ytdl.getInfo(URL);
  console.log(videoInfo)
  return response.json(videoInfo);
});

app.get("/download", (request, response) => {
  const URL = request.query.URL;
  const fileFormat = request.query.FORMAT;
  const filename = `archive.${fileFormat}`
  response.header("Content-Disposition", `attachment; filename=${filename}`);
  ytdl(URL, {
    format: fileFormat,
  }).pipe(response);
});

app.listen(3333, () => console.log("Server running"));
