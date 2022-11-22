const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();

app.use(cors());

const downloadMp4 = async (request, response) => {  
  ytdl(request.query.URL, { quality: 'lowestvideo'}).pipe(response)
}

const downloadMp3 = async (request, response) => {
  ytdl(request.query.URL, { quality: 'highestaudio'}).pipe(response)
}

app.get("/info", async (request, response) => {
  const URL = request.query.URL;
  const videoInfo = await ytdl.getInfo(URL);
  return response.json(videoInfo);
});

app.get("/download", (request, response) => {
  const fileFormat = request.query.FORMAT; 
  const videoName = request.query.NAME;
  const filename = `${videoName}.${fileFormat}`;
  response.header("Content-Disposition", `attachment; filename=${filename}`);
  fileFormat === "MP3" ? downloadMp3(request, response) : downloadMp4(request, response);
});

app.listen(3333, () => console.log("Server running"));
