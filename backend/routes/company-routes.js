import express from "express";
import {
  add_competition,
  add_complaint,
  get_competitions,
} from "../controllers/company-controllers";

const company_manager = express.Router();

company_manager.post("/add_competition", add_competition);
company_manager.post("/add_complaint", add_complaint);
company_manager.get("/get_competitions", get_competitions);

export default company_manager;
