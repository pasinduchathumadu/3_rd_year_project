import express from "express";
import {addPackage, getPackage} from '../controllers/boarding-controller';

const boarding_house_manager = express.Router()

// packages
boarding_house_manager.post('/addpackage',addPackage)
boarding_house_manager.get('/getPackage',getPackage)

export default boarding_house_manager;

