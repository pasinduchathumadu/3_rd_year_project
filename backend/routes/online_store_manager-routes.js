import express from "express"
import {add_store,update_store,delete_store,handling_complain,view_complain,get_item,get_cart,add_response,add_complain,getclients,get_view_response, get_count,get_count1,get_count2, get_order, get_orders,accept,handover} from '../controllers/online_store_manager-controllers.js'

const online_store_manager = express.Router()
online_store_manager.post('/add',add_store)
online_store_manager.post('/delete',delete_store)
online_store_manager.post('/update',update_store)
online_store_manager.get('/view/:id',view_complain)
online_store_manager.post('/response',handling_complain)
online_store_manager.get('/get_item',get_item)
online_store_manager.get('/update_cart_load/:id',get_cart)
online_store_manager.post('/add_response',add_response)
online_store_manager.post('/add_complain',add_complain)
online_store_manager.get('/get_clients',getclients)
online_store_manager.get('/view_response/:id',get_view_response)
online_store_manager.get('/get_count',get_count)
online_store_manager.get('/get_count1',get_count1)
online_store_manager.get('/get_count2',get_count2)
online_store_manager.get('/get_order',get_order)
online_store_manager.get('/view_orders',get_orders)
online_store_manager.get('/accept/:id',accept)
online_store_manager.get('/handover/:id',handover)
export default online_store_manager