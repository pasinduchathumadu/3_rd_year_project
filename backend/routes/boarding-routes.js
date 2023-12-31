import express from "express";
import { view_requests, view_allclients, add_complain, viewmyComplains, viewClientsComplains, packageUsage, viewCurrent, viewRequested, viewBoarded, refund_requests, pendingRequest, view_refundDetails,toRefund, viewPetDetails,refundAdding, complainDetails, addingResponse, deleteMyComplain,PendingToAccepted, AcceptedToCompleted,filterbox1,filterbox2, getCages,CagesCount} from '../controllers/boarding-controller';
import {submitBasicDetails, getBasicDetails, submitFacilityForm, viewFacilities, getPrice, SubmitNewPrice, deletePackage} from '../controllers/boarding-controller';
const boarding_house_manager = express.Router()

// packages
boarding_house_manager.post('/submitBasicDetails',submitBasicDetails)
boarding_house_manager.get('/getBasicDetails',getBasicDetails)
boarding_house_manager.post('/submitFacilityForm',submitFacilityForm)
boarding_house_manager.get('/viewFacilities/:id',viewFacilities)
boarding_house_manager.get('/getPrice/:id',getPrice)
boarding_house_manager.post('/SubmitNewPrice',SubmitNewPrice)
boarding_house_manager.get('/deletePackage/:id1',deletePackage)


// boaridng requets
boarding_house_manager.get('/view_requests/:id',view_requests)
boarding_house_manager.get('/view_allclients/:id',view_allclients)
boarding_house_manager.get('/refund_requests/:id',refund_requests)
boarding_house_manager.get('/view_refundDetails/:id',view_refundDetails) 
boarding_house_manager.get('/toRefund/:id',toRefund) 
boarding_house_manager.get('/viewPetDetails/:id',viewPetDetails) 
boarding_house_manager.post('/refundAdding',refundAdding) 
boarding_house_manager.post('/PendingToAccepted',PendingToAccepted) 
boarding_house_manager.post('/AcceptedToCompleted',AcceptedToCompleted) 


// complains
boarding_house_manager.post('/add_complain',add_complain)
boarding_house_manager.get('/viewmyComplains/:id',viewmyComplains)
boarding_house_manager.get('/viewClientsComplains/:id',viewClientsComplains)
boarding_house_manager.get('/complainDetails/:id',complainDetails)
boarding_house_manager.post('/addingResponse/',addingResponse)
boarding_house_manager.get('/deleteMyComplain/:id',deleteMyComplain)

// boarding pets
boarding_house_manager.get('/viewCurrent',viewCurrent)
boarding_house_manager.get('/viewRequested/:id',viewRequested)
boarding_house_manager.get('/viewBoarded',viewBoarded)

// dashboard
boarding_house_manager.get('/packageUsage',packageUsage)
boarding_house_manager.get('/pendingRequest',pendingRequest)
boarding_house_manager.get('/CagesCount',CagesCount)
boarding_house_manager.get('/filterbox1/:id',filterbox1) 
boarding_house_manager.get('/filterbox2/:id',filterbox2)

// cages
boarding_house_manager.get('/getCages', getCages)


export default boarding_house_manager;

