import express from "express";
import {registration } from "../controllers/admin-controllers.js"
const admin_route = express.Router()

admin_route.post('/registration',registration)

export default admin_route;