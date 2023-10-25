import express from "express";
import {card,card1,card2,card3} from "../controllers/pdf-controllers.js"
const pdf_route = express.Router();

pdf_route.post('/card',card);
pdf_route.post('/card1',card1)
pdf_route.post('/card2',card2)
pdf_route.post('/card3',card3)

export default pdf_route;