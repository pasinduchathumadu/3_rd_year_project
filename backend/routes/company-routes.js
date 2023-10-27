import express from "express";
import {
  add_competition,
  add_complaint,
  blog,
  get_competitions,
  get_complaints,
  update_blog,
  update_blog_reject,
  petsViewing,
  clientsComplains,
  complainDetails,
  addingResponse,
  deleteMyComplain,
  incomingCompetitions,
  pendingComplains,
  pendingBlogs,
  petShopCount,
  categorizeClients,
  clientCount
} from "../controllers/company-controllers";

const company_manager = express.Router();

company_manager.post("/add_competition", add_competition);
company_manager.post("/add_complaint", add_complaint);
company_manager.get("/get_competitions/:id", get_competitions);
company_manager.get("/get_complaints/:id", get_complaints);
company_manager.get("/clientsComplains/:id", clientsComplains);
company_manager.get('/complainDetails/:id',complainDetails)
company_manager.post('/addingResponse/',addingResponse)
company_manager.get('/deleteMyComplain/:id',deleteMyComplain)

company_manager.post("/update_blog", update_blog);
company_manager.post("/update_blog_reject", update_blog_reject);

company_manager.get("/blog", blog);

company_manager.get("/petsViewing/:id", petsViewing);

// DASHBOARD
company_manager.get("/incomingCompetitions", incomingCompetitions);
company_manager.get("/pendingComplains", pendingComplains);
company_manager.get("/pendingBlogs", pendingBlogs);
company_manager.get("/petShopCount", petShopCount);
company_manager.get("/clientCount", clientCount);

// CATEGORIZATION
company_manager.get("/categorizeClients", categorizeClients);


export default company_manager;
