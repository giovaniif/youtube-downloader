const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.use(cors());

app.get("/info", async (request, response) => {
  const URL = request.query.URL;

  const videoInfo = await ytdl.getInfo(URL);
  return response.json(videoInfo);
});

app.get("/download", (request, response) => {
  const URL = request.query.URL;
  response.header("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(URL, {
    format: "mp4",
  }).pipe(response);
});

app.listen(3333, () => console.log("Server running"));
