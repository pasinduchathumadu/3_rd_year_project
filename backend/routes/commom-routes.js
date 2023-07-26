import express from "express";
import {blog,comment,get_comment} from "../controllers/common-controllers.js"
const common_route = express.Router()
common_route.get('/blog',blog)
common_route.post('/comment',comment)
common_route.get('/comment/:id',get_comment)

export default common_route;