import express from "express";
import { get_medi, leave, set_count, setprice } from "../controllers/doctor-controllers";


const medi_help_manager = express.Router()

medi_help_manager.get('/get_medi',get_medi)
medi_help_manager.post('/leave',leave)
medi_help_manager.post('/setcount',set_count)
medi_help_manager.post('/setprice',setprice)


export default medi_help_manager