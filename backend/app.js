import express from "express";
import {db} from "./database.js";

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.listen(5000,()=>{
    console.log("Listening Port Number : 5000")
})