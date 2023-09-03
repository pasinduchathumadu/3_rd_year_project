import express from "express";
import {get_client, get_manager, registration, countManagers, countClients, clientComplains, managerComplains, countComplains, boardingRefund, countRefund, countPendingrefund, ManagerDetails, FinishUpdate, deleteManager,addResponse, submitResponse,viewPetDetails, deleteClient, viewRefundDetails, viewSlipDetails, AdminVerify, AdminRejected,carecenterRefund,viewSlipDetailscc,AdminVerifycc,AdminRejectedcc,viewRefundccDetails} from "../controllers/admin-controllers.js"
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
admin_route.get('/deleteManager/:id',deleteManager)
admin_route.get('/addResponse/:id',addResponse)
admin_route.post('/submitResponse',submitResponse)
admin_route.get('/viewPetDetails/:id',viewPetDetails)
admin_route.get('/deleteClient/:id',deleteClient)
admin_route.get('/viewRefundDetails/:id',viewRefundDetails)
admin_route.get('/viewSlipDetails/:id',viewSlipDetails)
admin_route.post('/AdminVerify',AdminVerify)
admin_route.post('/AdminRejected',AdminRejected)
admin_route.get('/carecenterRefund',carecenterRefund)
admin_route.get('/viewSlipDetailscc/:id',viewSlipDetailscc)
admin_route.post('/AdminVerifycc',AdminVerifycc)
admin_route.post('/AdminRejectedcc',AdminRejectedcc)
admin_route.get('/viewRefundccDetails/:id',viewRefundccDetails)




export default admin_route;