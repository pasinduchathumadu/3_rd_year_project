import express from "express"
import {add_store,update_store,delete_store,handling_complain,view_complain,get_item,get_cart} from '../controllers/online_store_manager-controllers.js'

const online_store_manager = express.Router()
online_store_manager.post('/add',add_store)
online_store_manager.post('/delete',delete_store)
online_store_manager.post('/update',update_store)
online_store_manager.get('/view',view_complain)
online_store_manager.post('/response',handling_complain)
online_store_manager.get('/get_item/:id',get_item)
online_store_manager.get('/update_cart_load/:id',get_cart)

export default online_store_manager