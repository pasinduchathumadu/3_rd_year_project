import express from "express";
import {viewmycomplain} from "../controllers/carecenter-controller.js";
const carecenter_route = express.Router()

carecenter_route.get('/viewmycomplain',viewmycomplain)


export default carecenter_route;


