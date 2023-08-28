import express from "express";
import {get_client, get_manager, registration, countManagers, countClients, clientComplains, managerComplains, countComplains, boardingRefund, countRefund, countPendingrefund, ManagerDetails, FinishUpdate} from "../controllers/admin-controllers.js"
const admin_route = express.Router()

admin_route.post('/registration',registration)
admin_route.get('/get_managers',get_manager)
admin_route.get('/get_client',get_client)
admin_route.get('/countManagers',countManagers)
admin_route.get('/countClients',countClients)
admin_route.get('/clientComplains',clientComplains)
admin_route.get('/managerComplains',managerComplains)
admin_route.get('/countComplains',countComplains)
admin_route.get('/boardingRefund',boardingRefund)
admin_route.get('/countRefund',countRefund)
admin_route.get('/countPendingrefund',countPendingrefund)
admin_route.get('/ManagerDetails/:id',ManagerDetails)
admin_route.post('/FinishUpdate',FinishUpdate)

export default admin_route;