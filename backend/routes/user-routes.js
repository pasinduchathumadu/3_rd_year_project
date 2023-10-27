import express from "express";

import {login,signup,forget_password,reset_password,forget_confirmation,upload_file,get_store, temp_cart, load_cart,increase, decrease,total, load_payement, load_total,delete_cart,final_payment, back,date_client,confirm,generate , client_load, delete_order, random_assistant, get_allpackage, get_package, timeslot, delete_order_care,addpet, view_pets,get_appointment_id,cancel_appointment, care_orders,delete_appointment,edit_appointment,get_doctors,book_doctor,get_medi_user,check_appointment,medi_payment, pet_trainning, pet_booking, get_breed, get_medi_orders, training_orders, delete_appointment_training, blog_post,deletePet,viewmyComplains,addNewComplain,deleteMyComplain, getPackageid, AssignCage, getallpets,getMindRealxingPets, getprice, getallcages, insert, getTimeSlots,SubmitForm, getDetails, boardreport, onlinereport, medireport, carecenter, viewBuyPets, viewOwnPets, submitAddForm, getDetailsforUpdate, submitUpdateForm, deleteSellPet,getclientcategory, loadfinal} from "../controllers/users-controllers.js";

const user_route = express.Router();

user_route.post('/login',login);
user_route.post('/signup',signup);
user_route.post('/forget',forget_password);
user_route.post('/reset',reset_password);
user_route.post('/verify',forget_confirmation);
user_route.post('/upload',upload_file)
user_route.post('/get_store/:id',get_store)
user_route.post('/temp_cart',temp_cart)
user_route.get('/load_cart/:id',load_cart)
user_route.post('/increase',increase)
user_route.post('/decrease',decrease)
user_route.post('/total',total)
user_route.get('/load_payment/:id',load_payement)
user_route.get('/load_total/:id',load_total)
user_route.post('/delete_cart',delete_cart)
user_route.post('/final_payment',final_payment)
user_route.post('/back',back)
user_route.post('/date_client',date_client)
user_route.get('/confirm/:id',confirm)
user_route.get('/generate/:id',generate)
user_route.get('/client_load/:id',client_load)
user_route.get('/delete_order/:id',delete_order)
user_route.post('/delete_appointment',delete_appointment)
user_route.post('/random_assistant',random_assistant)
user_route.get('/get_allpackages',get_allpackage)
user_route.get('/get_package/:id',get_package)
user_route.get('/get_timeslot/:id',timeslot)
user_route.get('/delete_order_care/:id',delete_order_care)
user_route.get('/cancel_appointment/:id',cancel_appointment)
user_route.post('/addpet', addpet)
user_route.get('/view_pets/:email', view_pets)
user_route.get('/deletePet/:id',deletePet)
user_route.post('/get_appointment_id',get_appointment_id)
user_route.get('/care_orders/:email',care_orders)
user_route.post('/edit_appointment',edit_appointment)
user_route.get('/get_doctors',get_doctors)
user_route.get('/get_medi_user/:id',get_medi_user)
user_route.get('/book_doctor/:id',book_doctor)
user_route.post('/check_appointment',check_appointment)
user_route.post('/medi_payment',medi_payment)
user_route.get('/pet_trainning',pet_trainning)
user_route.post('/pet_booking',pet_booking)
user_route.get('/get_breed',get_breed)
user_route.get('/get_medi_orders/:email',get_medi_orders)
user_route.get('/training_orders/:email',training_orders)
user_route.post('/delete_appointment_training',delete_appointment_training)
user_route.post('/blog_post',blog_post)
user_route.post('/viewmyComplains', viewmyComplains)
user_route.post('/addNewComplain',addNewComplain)
user_route.get('/deleteMyComplain/:id',deleteMyComplain)
user_route.get('/getPackageid',getPackageid)
user_route.post('/AssignCage',AssignCage)
user_route.get('/getallpets/:email',getallpets)

user_route.post('/getprice',getprice)
user_route.post('/getallcages',getallcages)
user_route.post('/insert',insert)
user_route.get('/boardreport/:email',boardreport)
user_route.get('/onlinereport/:email',onlinereport)
user_route.get('/getMindRealxingPets',getMindRealxingPets)
user_route.get('/getTimeSlots',getTimeSlots)
user_route.get('/getDetails/:id',getDetails)
user_route.get('/medireport/:email',medireport)
user_route.post('/SubmitForm/:id',SubmitForm)

user_route.get('/carecenter/:email',carecenter)

// buy and sell pets shop
user_route.get('/viewBuyPets',viewBuyPets)
user_route.post('/viewOwnPets/:id',viewOwnPets)
user_route.post('/submitAddForm',submitAddForm)
user_route.get('/getDetailsforUpdate/:id',getDetailsforUpdate)
user_route.post('/submitUpdateForm',submitUpdateForm)
user_route.get('/deleteSellPet/:id2',deleteSellPet)


user_route.get('/loadfinal/:id',loadfinal)
user_route.get('/getclientcategory/:email',getclientcategory)




export default user_route;
