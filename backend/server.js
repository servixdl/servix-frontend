import express from "express";
import  {envs}  from "./config/envs.js";

const app = express()
const port = envs.port

app.listen(port, () => {
    console.log(`Server on port : ${port}`);
  });
