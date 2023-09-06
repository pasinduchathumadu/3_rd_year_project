import express from "express";
import {
  add_competition,
  add_complaint,
  blog,
  get_competitions,
  get_complaints,
  update_blog,
  update_blog_reject,
} from "../controllers/company-controllers";

const company_manager = express.Router();

company_manager.post("/add_competition", add_competition);
company_manager.post("/add_complaint", add_complaint);
company_manager.get("/get_competitions", get_competitions);
company_manager.get("/get_complaints", get_complaints);

company_manager.post("/update_blog", update_blog);
company_manager.post("/update_blog_reject", update_blog_reject);

company_manager.get("/blog", blog);

export default company_manager;
