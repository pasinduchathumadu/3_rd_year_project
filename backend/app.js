import express from "express";
import user_route from "./routes/user-routes.js"
import email_route from "./routes/email-routes.js"
import pdf_route from "./routes/pdf-routes.js";
import admin_route from "./routes/admin-routes.js";
import common_route from "./routes/commom-routes.js";
import payment_route from "./routes/payment-routes.js";
import online_store_manager from "./routes/online_store_manager-routes.js";
import boarding_house_manager from "./routes/boarding-routes.js";
import company_manager from "./routes/company-routes.js";
import medi_help_manager from "./routes/medi-routes.js";
import care_center_manager from "./routes/carecenter-routes.js";
// //calling database firstly
import {db} from './database.js';
import cors from "cors";
import session from "express-session"
const app = express();
app.use(cors());
app.use(express.json());
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
    })
  );
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
     res.json({message:"logout"}) // Redirect to the home page or login page
    });
});
app.use("/pet_care/user",user_route);
app.use("/pet_care/email",email_route);
app.use("/pet_care/pdf",pdf_route);
app.use("/pet_care/payment",payment_route);
app.use("/pet_care/admin",admin_route);
app.use("/pet_care/common",common_route);
app.use("/pet_care/online_store_manager",online_store_manager);
app.use("/pet_care/boarding_house_manager", boarding_house_manager);
app.use("/pet_care/company_manager",company_manager)
app.use("/pet_care/care_center_manager",care_center_manager)
app.use("/pet_care/medi_help_manager",medi_help_manager)


app.listen(5000,()=>{
    console.log("Listening Port Number : 5000")
})