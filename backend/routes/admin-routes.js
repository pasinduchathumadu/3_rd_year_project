import express from "express";
import {get_client, get_manager, registration, countManagers, countClients} from "../controllers/admin-controllers.js"
const admin_route = express.Router()

admin_route.post('/registration',registration)
admin_route.get('/get_managers',get_manager)
admin_route.get('/get_client',get_client)
admin_route.get('/countManagers',countManagers)
admin_route.get('/countClients',countClients)

export default admin_route;