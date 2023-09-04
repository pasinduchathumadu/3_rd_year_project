import express from "express";
import {blog,comment,get_comment,ManagerProfile} from "../controllers/common-controllers.js"
const common_route = express.Router()
common_route.get('/blog',blog)
common_route.post('/comment',comment)
common_route.get('/comment/:id',get_comment)
common_route.get('/ManagerProfile/:email',ManagerProfile)


export default common_route;