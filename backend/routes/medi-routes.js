import express from "express";

import { get_medi, leave, set_count, setprice,add_complain,viewmyComplains,viewClientsComplains,complainDetails,addingResponse,deleteMyComplain,add_vet,systemDoctors ,pendingRequest,completedBox,pendingBox,get_pets, complainsCount,addMedical, submitNewVaccine, DogVaccine, CatVaccine, deleteVaccine, getDetailsforUpdate, updateVaccine, getVaccineDetails, submitAddMedical, pastVaccinationDetails,getDetails,remove, remove_final,getnextvaccineid, ViewAppointments, assigned} from "../controllers/doctor-controllers";


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
medi_help_manager.get('/ViewAppointments',ViewAppointments) 



// pet profiles
medi_help_manager.get('/addMedical',addMedical) 
medi_help_manager.get('/getVaccineDetails',getVaccineDetails) 
medi_help_manager.post('/submitNewVaccine',submitNewVaccine) 
medi_help_manager.get('/DogVaccine',DogVaccine) 
medi_help_manager.get('/CatVaccine',CatVaccine) 
medi_help_manager.get('/deleteVaccine/:id',deleteVaccine) 
medi_help_manager.get('/getDetailsforUpdate/:id',getDetailsforUpdate) 
medi_help_manager.post('/updateVaccine',updateVaccine) 
medi_help_manager.post('/submitAddMedical',submitAddMedical) 
medi_help_manager.get('/pastVaccinationDetails/:id',pastVaccinationDetails) 
medi_help_manager.get('/getDetails',getDetails) 


medi_help_manager.get('/remove',remove)
medi_help_manager.post('/remove_final',remove_final)
medi_help_manager.get('/assign/:id',assigned)
medi_help_manager.get('/getnextvaccineid/:nextVaccine',getnextvaccineid)

export default medi_help_manager