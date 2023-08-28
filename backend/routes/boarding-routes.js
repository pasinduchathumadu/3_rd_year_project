import express from "express";
import {addPackage, getPackage, view_requests, view_allclients, add_complain, viewmyComplains, viewResponse, viewClientsComplains, packageUsage, viewCurrent, viewRequested, viewBoarded, refund_requests, countPets, pendingRequest, view_refundDetails} from '../controllers/boarding-controller';

const boarding_house_manager = express.Router()

// packages
boarding_house_manager.post('/addpackage',addPackage)
boarding_house_manager.get('/getPackage',getPackage)

// boaridng requets
boarding_house_manager.get('/view_requests',view_requests)
boarding_house_manager.get('/view_allclients',view_allclients)
boarding_house_manager.get('/refund_requests',refund_requests)
boarding_house_manager.get('/view_refundDetails/:id',view_refundDetails) 

// complains
boarding_house_manager.post('/add_complain',add_complain)
boarding_house_manager.get('/viewmyComplains',viewmyComplains)
boarding_house_manager.get('/viewResponse',viewResponse)
boarding_house_manager.get('/viewClientsComplains',viewClientsComplains)

// boarding pets
boarding_house_manager.get('/viewCurrent',viewCurrent)
boarding_house_manager.get('/viewRequested',viewRequested)
boarding_house_manager.get('/viewBoarded',viewBoarded)

// dashboard
boarding_house_manager.get('/countPets',countPets)
boarding_house_manager.get('/packageUsage',packageUsage)
boarding_house_manager.get('/pendingRequest',pendingRequest)



export default boarding_house_manager;

