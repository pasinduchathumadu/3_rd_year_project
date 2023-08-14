import express from "express";
import {get_client, get_manager, registration } from "../controllers/admin-controllers.js"
const admin_route = express.Router()

admin_route.post('/registration',registration)
admin_route.get('/get_managers',get_manager)
admin_route.get('/get_client',get_client)

export default admin_route;