import express from "express";
import user_route from "./routes/user-routes.js"
import email_route from "./routes/email-routes.js"
import pdf_route from "./routes/pdf-routes.js";
import payment_route from "./routes/payment-routes.js";
// //calling database firstly
import {db} from './database.js';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/pet_care/user",user_route);
app.use("/pet_care/email",email_route);
app.use("/pet_care/pdf",pdf_route);
app.use("/pet_care/payment",payment_route);


app.listen(5000,()=>{
    console.log("Listening Port Number : 5000")
})