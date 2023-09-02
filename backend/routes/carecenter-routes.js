import express from "express";
import {viewmycomplain, viewClientcomplains, complainDetails, addResponse, add_complain, deleteMyComplain} from "../controllers/carecenter-controller.js";
const care_center_route = express.Router()

// COMPLAINS routes
care_center_route.get('/viewmycomplain',viewmycomplain)
care_center_route.get('/viewClientcomplains',viewClientcomplains)
care_center_route.get('/complainDetails/:id',complainDetails)
care_center_route.post('/addResponse',addResponse)
care_center_route.post('/add_complain',add_complain)
care_center_route.get('/deleteMyComplain/:id',deleteMyComplain)



export default care_center_route;


