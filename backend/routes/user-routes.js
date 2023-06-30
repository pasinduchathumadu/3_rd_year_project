import express from "express";
import {login} from "../controllers/user-controllers.js";
const user_route = express.Router();

user_route.post('/login',login);

export default user_route;
