import express from "express";
import {login,signup,forget_password,reset_password,forget_confirmation,upload_file,get_store, temp_cart, load_cart,increase, decrease,total} from "../controllers/users-controllers.js";
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

export default user_route;
