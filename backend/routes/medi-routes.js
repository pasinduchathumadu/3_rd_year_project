import express from "express";
import { get_medi, leave, set_count, setprice,add_complain,viewmyComplains,viewClientsComplains,complainDetails,addingResponse,deleteMyComplain,add_vet,systemDoctors ,pendingRequest,completedBox,pendingBox,PendingAppointments,get_pets, completedAppointments,PendingtoCompeleted,PendingtoUncompeleted, complainsCount,addMedical, submitNewVaccine, DogVaccine, CatVaccine, deleteVaccine, getDetailsforUpdate, updateVaccine} from "../controllers/doctor-controllers";

const medi_help_manager = express.Router()
medi_help_manager.get('/get_pets/:email',get_pets)
medi_help_manager.get('/get_medi',get_medi)
medi_help_manager.post('/leave',leave)
medi_help_manager.post('/setcount',set_count)
medi_help_manager.post('/setprice',setprice)
medi_help_manager.post('/add_vet',add_vet)

// complains
medi_help_manager.post('/add_complain',add_complain)
medi_help_manager.get('/viewmyComplains/:id',viewmyComplains)
medi_help_manager.get('/viewClientsComplains/:id',viewClientsComplains)
medi_help_manager.get('/complainDetails/:id',complainDetails)
medi_help_manager.post('/addingResponse/',addingResponse)
medi_help_manager.get('/deleteMyComplain/:id',deleteMyComplain)

// dashboard
medi_help_manager.get('/systemDoctors',systemDoctors )
medi_help_manager.get('/pendingRequest',pendingRequest )
medi_help_manager.get('/pendingBox',pendingBox) 
medi_help_manager.get('/completedBox',completedBox)
medi_help_manager.get('/complainsCount',complainsCount)

// appointments
medi_help_manager.get('/PendingAppointments',PendingAppointments)
medi_help_manager.get('/completedAppointments/:id',completedAppointments)
medi_help_manager.get('/pending/:id',PendingtoCompeleted) 
medi_help_manager.get('/pending1/:id',PendingtoUncompeleted) 

// pet profiles
medi_help_manager.get('/addMedical',addMedical) 
medi_help_manager.post('/submitNewVaccine',submitNewVaccine) 
medi_help_manager.get('/DogVaccine',DogVaccine) 
medi_help_manager.get('/CatVaccine',CatVaccine) 
medi_help_manager.get('/deleteVaccine/:id',deleteVaccine) 
medi_help_manager.get('/getDetailsforUpdate/:id',getDetailsforUpdate) 
medi_help_manager.post('/updateVaccine',updateVaccine) 






export default medi_help_manager