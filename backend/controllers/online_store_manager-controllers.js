

import { db } from '../database.js'

export const get_item = async (req, res, next) => {
   
    const sqlQuery = 'select *from item'
  
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        else if (data.length < 1) {
            return res.json({ message: 'No records' })
        }
        return res.json({ data })
    })
}
export const add_store = async (req, res, next) => {
    const { name, price, description, quantity, item, Categories, image } = req.body
    const values = [

        name,
        price,
        image,
        description,
        quantity,
        item,
        Categories
    ]


    const sqlQuery1 = "INSERT INTO item (name,unit_price,image,description,quantity,item,catogories) VALUES (?,?,?,?,?,?,?)"
    db.query(sqlQuery1, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internal error" })
        }

        return res.json({ message: "added successfully" })
    })

}

export const update_store = async (req, res, next) => {
    const { id, updatedescription, updateavailibility, updateprice } = req.body
   
    const values = [
        updateprice,
        updateavailibility,
        updatedescription,
        id
    ]
    const sqlQuery = 'UPDATE item SET unit_price = ? , quantity = ?,description = ? WHERE item_id = ? '

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internal error" })
        }
        return res.json({ message: "update successfully" })
    })
}

export const delete_store = async (req, res, next) => {
    const { deleteid} = req.body;
    const values = [
       deleteid
    ]

    const sqlQuery = 'DELETE FROM item WHERE item_id = ?'

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internal error" })
        }
        return res.json({ message: "deleted succcessfully" })
    })

}

export const view_complain = async (req, res, next) => {
    const id = req.params.id 
 
    var status = ""
    if(id === '0'){
        status = "pending"
    }
    else if(id === '1'){
        status = "replied"
    }

    
    const sqlQuery = 'SELECT *FROM complain WHERE status = ? && user_role = "online_store_manager"'
    const records = [
        status
    ]
    db.query(sqlQuery, records, (err, data) => {
        if (data.length == 0) {
            return res.json({ message: "No records" })
        }
        return res.json({ data })
    })
}
export const get_cart = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = "select *from item where item_id = ?"
    const values = [
        id
    ]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'there is an error' })
        }
        return res.json({ data })
    })

}
export const handling_complain = async (req, res, next) => {
    const { user_id, response_txt } = req.body

    const date = new Date()
    const response_date = date.toLocaleDateString()
    const response_time = date.toLocaleTimeString()
    const status = 'replied'
    const sqlQuery = 'UPDATE TABLE SET response_txt = ? , response_date = ? , response_time = ? status = ? WHERE user_id = ?'

    const records = [
        response_txt,
        response_date,
        response_time,
        status,
        user_id
    ]

    db.query(sqlQuery, records, (err, data) => {
        if (err) {
            res.json({ message: "There is an internal error" })
        }
        return res.json({ message: "responsed_successfully" })
    })
}

export const add_response = async (req,res,next) => {
    const{id,response,newdate} = req.body;
  
    const values = [
        newdate,
        response,
     
        id
    ] 
    const sqlQuery = "Update complain set response_date = ? , response_txt = ?, status = 'replied'  where complain_id = ?"
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internal an error'})
        }
        return res.json({message:'Added'})
    })

}

export const add_complain = async(req,res,next) => {
    const {addsubject,complain_message,image} = req.body;

    const values = [
        addsubject,
        complain_message,
        image
    ]

    

}

export const getclients = async(req,res,next) =>{
    const sqlQuery = 'SELECT concat(users.first_name," ",users.last_name) AS name,client.email,concat(client.city," ",client.street) AS address,client.client_id,client.status from users INNER JOIN client ON users.email = client.email '
    db.query(sqlQuery,(err,data)=>{
        if(err){
            return res.json("There is an internel error")
        }
        else{
            return res.json({data})
        }
    })
}


export const get_view_response = async(req,res,next)=>{
    const id = req.params.id
    const values = [
        id
    ]
    const sqlQuery = "SELECT *FROM complain WHERE complain_id = ? "
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:"There is an internel error"})
        }
        else{
            return res.json({data})
        }
    })
}

export const get_count = async(req,res,next) => {
    const sqlQuery ="SELECT COUNT(status) AS total FROM complain WHERE status = 'pending' ";
    db.query(sqlQuery,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        else{
           
            return res.json({data})
        }
    })
}

export const get_count1 = async(req,res,next) => {
    const sqlQuery ="SELECT COUNT(status) AS total FROM complain WHERE status = 'replied' ";
    db.query(sqlQuery,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        else{
           
            return res.json({data})
        }
    })
}

export const get_count2 = async(req,res,next)=>{
    const sqlQuery = 'SELECT COUNT(*) AS total_item, catogories FROM item WHERE catogories IN (?,?,?) GROUP BY catogories';
    const values = [
        'foods',
        'accessories',
        'toys'
    ]

    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        else{
            return res.json({data})
        }
    })

    
}

export const get_order = async(req,res,next) =>{
    const sqlQuery = 'SELECT COUNT(*) AS count_order,po_status FROM purchase_order WHERE po_status IN (?,?,?) GROUP BY po_status ';
    const values = [
        'pending',
        'accept',
        'refund'
    ]
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        else{
            return res.json({data})
        }
    })
}

export const get_orders = async(req,res,next)=>{
    const sqlQuery = 'SELECT *FROM purchase_order INNER JOIN client ON purchase_order.client_id = client.client_id'
    db.query(sqlQuery,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        else{
            return res.json({data})
        }
    })
}