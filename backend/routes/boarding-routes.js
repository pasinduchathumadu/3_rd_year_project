import express from "express";
import {addPackage, getPackage, view_requests, view_allclients, add_complain} from '../controllers/boarding-controller';

const boarding_house_manager = express.Router()

// packages
boarding_house_manager.post('/addpackage',addPackage)
boarding_house_manager.get('/getPackage',getPackage)

// clients
boarding_house_manager.get('/view_requests',view_requests)
boarding_house_manager.get('/view_allclients',view_allclients)

// complains
boarding_house_manager.post('/add_complain',add_complain)


export default boarding_house_manager;

