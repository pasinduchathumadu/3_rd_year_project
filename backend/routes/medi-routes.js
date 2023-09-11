import express from "express";
import { get_medi, leave, set_count, setprice,add_complain,viewmyComplains,viewClientsComplains,complainDetails,addingResponse,deleteMyComplain} from "../controllers/doctor-controllers";


const medi_help_manager = express.Router()

medi_help_manager.get('/get_medi',get_medi)
medi_help_manager.post('/leave',leave)
medi_help_manager.post('/setcount',set_count)
medi_help_manager.post('/setprice',setprice)

// complains
medi_help_manager.post('/add_complain',add_complain)
medi_help_manager.get('/viewmyComplains/:id',viewmyComplains)
medi_help_manager.get('/viewClientsComplains/:id',viewClientsComplains)
medi_help_manager.get('/complainDetails/:id',complainDetails)
medi_help_manager.post('/addingResponse/',addingResponse)
medi_help_manager.get('/deleteMyComplain/:id',deleteMyComplain)


export default medi_help_manager