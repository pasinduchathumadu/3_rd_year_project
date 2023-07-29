import express from "express"
import {add_store,update_store,delete_store,handling_complain,view_complain,get_item,get_cart,add_response,add_complain} from '../controllers/online_store_manager-controllers.js'

const online_store_manager = express.Router()
online_store_manager.post('/add',add_store)
online_store_manager.post('/delete',delete_store)
online_store_manager.post('/update',update_store)
online_store_manager.get('/view/:id',view_complain)
online_store_manager.post('/response',handling_complain)
online_store_manager.get('/get_item/:id',get_item)
online_store_manager.get('/update_cart_load/:id',get_cart)
online_store_manager.post('/add_response',add_response)
online_store_manager.post('/add_complain',add_complain)

export default online_store_manager