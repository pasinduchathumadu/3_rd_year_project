import express from "express";
import { get_medi, leave, set_count, setprice,add_vet } from "../controllers/doctor-controllers";


const medi_help_manager = express.Router()

medi_help_manager.get('/get_medi',get_medi)
medi_help_manager.post('/leave',leave)
medi_help_manager.post('/setcount',set_count)
medi_help_manager.post('/setprice',setprice)
medi_help_manager.post('/add_vet',add_vet)


export default medi_help_manager