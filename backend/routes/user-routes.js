import express from "express";
import {login,signup,forget_password,reset_password,forget_confirmation} from "../controllers/users-controllers.js";
const user_route = express.Router();

user_route.post('/login',login);
user_route.post('/signup',signup);
user_route.post('/forget',forget_password);
user_route.post('/reset',reset_password);
user_route.post('/verify',forget_confirmation);

export default user_route;
