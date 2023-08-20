import express from "express";

import {login,signup,forget_password,reset_password,forget_confirmation,upload_file,get_store, temp_cart, load_cart,increase, decrease,total, load_payement, load_total,delete_cart,final_payment, back,date_client,confirm,generate , client_load, delete_order, random_assistant, get_allpackage, get_package, timeslot, delete_order_care,addpet, view_pets,get_appointment_id,cancel_appointment, care_orders,delete_appointment,edit_appointment} from "../controllers/users-controllers.js";

const user_route = express.Router();

user_route.post('/login',login);
user_route.post('/signup',signup);
user_route.post('/forget',forget_password);
user_route.post('/reset',reset_password);
user_route.post('/verify',forget_confirmation);
user_route.post('/upload',upload_file)
user_route.get('/get_store/:id',get_store)
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
user_route.get('/delete_appointment/:id',delete_appointment)
user_route.post('/random_assistant',random_assistant)
user_route.get('/get_allpackages',get_allpackage)
user_route.get('/get_package/:id',get_package)
user_route.get('/get_timeslot/:id',timeslot)
user_route.get('/delete_order_care/:id',delete_order_care)
user_route.get('/cancel_appointment/:id',cancel_appointment)
user_route.post('/addpet', addpet);
user_route.get('/view_pets/:email', view_pets);
user_route.get('/get_appointment_id/:id',get_appointment_id)
user_route.get('/care_orders',care_orders)
user_route.post('/edit_appointment',edit_appointment)

export default user_route;
