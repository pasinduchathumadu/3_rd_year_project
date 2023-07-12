import express from "express";
import {card} from "../controllers/payment-controllers.js"
const payment_route = express.Router();
payment_route.post('/confirm',card);

export default payment_route;