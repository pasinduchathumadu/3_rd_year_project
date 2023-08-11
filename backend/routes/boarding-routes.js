import express from "express";
import {addPackage} from '../controllers/boarding-controller'
const boarding_house_manager = express.Router()
boarding_house_manager.post('/addpackage',addPackage)

export default boarding_house_manager;

