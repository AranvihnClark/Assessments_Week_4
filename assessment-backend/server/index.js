const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {getCompliment, getFortune, addLanguage, showLinks, hideLinks, deleteLanguage, replaceLanguage } = require('./controller');

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api", showLinks);
app.get ("/api", hideLinks);
app.post("/api", addLanguage);
app.delete("/api/:language", deleteLanguage);
app.put("/api/:language", replaceLanguage);

app.listen(4000, () => console.log("Server running on 4000"));
