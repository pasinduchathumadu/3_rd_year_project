import express from "express";
import user_route from "./routes/user-routes.js"
import email_route from "./routes/email-routes.js"
import pdf_route from "./routes/pdf-routes.js";
import admin_route from "./routes/admin-routes.js";
import common_route from "./routes/commom-routes.js";
import payment_route from "./routes/payment-routes.js";
import online_store_manager from "./routes/online_store_manager-routes.js";
import boarding_house_manager from "./routes/boarding-routes.js";
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
app.use("/pet_care/admin",admin_route);
app.use("/pet_care/common",common_route);
app.use("/pet_care/online_store_manager",online_store_manager);
app.use("/pet_care/boarding_house_manager", boarding_house_manager);


app.listen(5000,()=>{
    console.log("Listening Port Number : 5000")
})