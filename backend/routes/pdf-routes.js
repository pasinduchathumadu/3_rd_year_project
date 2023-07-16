import express from "express";
import {card} from "../controllers/pdf-controllers.js"
const pdf_route = express.Router();

pdf_route.post('/card',card);

export default pdf_route;