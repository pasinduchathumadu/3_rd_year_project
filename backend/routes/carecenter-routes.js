import express from "express";
import {viewmycomplain, viewClientcomplains, complainDetails, addResponse, add_complain, deleteMyComplain,refund_appointments, refundAdding,toRefund,ViewRefundDetails} from "../controllers/carecenter-controller.js";
const care_center_route = express.Router()

// COMPLAINS routes
care_center_route.get('/viewmycomplain',viewmycomplain)
care_center_route.get('/viewClientcomplains',viewClientcomplains)
care_center_route.get('/complainDetails/:id',complainDetails)
care_center_route.post('/addResponse',addResponse)
care_center_route.post('/add_complain',add_complain)
care_center_route.get('/deleteMyComplain/:id',deleteMyComplain)

// refund
care_center_route.get('/refund_appointments',refund_appointments)
care_center_route.get('/toRefund/:id',toRefund)
care_center_route.post('/refundAdding',refundAdding)
care_center_route.get('/ViewRefundDetails/:id',ViewRefundDetails) 




export default care_center_route;


