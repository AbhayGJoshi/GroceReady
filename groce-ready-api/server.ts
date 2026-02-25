import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dbPA from "./config/dbConfig";
import groceryRoute from "./routes/groceryItems";

//****To check the table names ain the database */

async function startServer() {
  const tables = await dbPA.raw(
    "select name from sqlite_master where type='table'",
  );
  console.log(tables);
}
//******************************************* */

console.log("SQLite connected & tables readable ✅");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", groceryRoute);

app.listen(1337, () => {
  console.log(`server running on port 1337 | ${new Date().toLocaleString()}`);
});
startServer();
