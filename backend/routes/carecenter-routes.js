import express from "express";
import {viewmycomplain, viewClientcomplains, complainDetails, addResponse, add_complain, deleteMyComplain,refund_appointments, refundAdding,toRefund,ViewRefundDetails, addingpet,petViewing,petDeleteing,submit, get_training, get_groom_apo, get_employee, leave,mind_relaxing, CompletePending} from "../controllers/carecenter-controller.js";
const care_center_route = express.Router()

// COMPLAINS 
care_center_route.get('/viewmycomplain',viewmycomplain)
care_center_route.get('/viewClientcomplains',viewClientcomplains)
care_center_route.get('/complainDetails/:id',complainDetails)
care_center_route.post('/addResponse',addResponse)
care_center_route.post('/add_complain',add_complain)
care_center_route.get('/deleteMyComplain/:id',deleteMyComplain)

// REFUND
care_center_route.get('/refund_appointments',refund_appointments)
care_center_route.get('/toRefund/:id',toRefund)
care_center_route.post('/refundAdding',refundAdding)
care_center_route.get('/ViewRefundDetails/:id',ViewRefundDetails) 

// MIND RELAXING
care_center_route.post('/addingpet', addingpet);
care_center_route.get('/petViewing', petViewing);
care_center_route.get('/petDeleteing/:id', petDeleteing);
care_center_route.get('/get_employee',get_employee)
care_center_route.post('/submit',submit)

// APPOINTMENTS
care_center_route.get('/get_groom_apo',get_groom_apo)
care_center_route.get('/get_training',get_training)
care_center_route.get('/mind_relaxing/:id',mind_relaxing)
care_center_route.post('/CompletePending',CompletePending)

// 
care_center_route.post('/leave',leave)

export default care_center_route;


