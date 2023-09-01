import express from "express";
import {viewmycomplain, viewClientcomplains} from "../controllers/carecenter-controller.js";
const care_center_route = express.Router()

care_center_route.get('/viewmycomplain',viewmycomplain)
care_center_route.get('/viewClientcomplains',viewClientcomplains)


export default care_center_route;


