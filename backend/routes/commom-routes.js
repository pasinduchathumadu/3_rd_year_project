import express from "express";

import {blog,comment,get_comment,ManagerProfile,DisplayManagerDetails,UpdateManager,myblog,ClientProfile,DisplayClientDetails,updateClient,deleteProfile} from "../controllers/common-controllers.js"

const common_route = express.Router()
common_route.get('/blog',blog)
common_route.post('/comment',comment)
common_route.get('/comment/:id',get_comment)
common_route.get('/ManagerProfile/:email',ManagerProfile)

common_route.get('/myblog/:email',myblog)

common_route.get('/DisplayManagerDetails/:email',DisplayManagerDetails)
common_route.post('/UpdateManager/',UpdateManager)

common_route.get('/ClientProfile/:email',ClientProfile)
common_route.get('/DisplayClientDetails/:email',DisplayClientDetails)
common_route.post('/updateClient/',updateClient)
common_route.get('/deleteProfile/:email',deleteProfile)









export default common_route;