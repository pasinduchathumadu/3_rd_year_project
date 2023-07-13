import express from "express";
import {verify} from "../controllers/email-controllers.js"
const email_route = express.Router();

email_route.post('/verify',verify);

export default email_route;
