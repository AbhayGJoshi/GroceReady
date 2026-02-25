import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ status: "server running" });
});

app.listen(1337, () => {
  console.log(`server running on port 1337 | ${new Date().toLocaleString()}`);
});
