import { db } from '../database.js'

export const get_medi= async(req,res,next)=>{
    const sqlquery = "SELECT *FROM vet"
    db.query(sqlquery,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({data})
    })
}

export const leave = async(req,res,next)=>{
    const {id , dateStart,dateEnd} = req.body
    const sqlQuery = "UPDATE vet SET unfree_date_start = ? , unfree_date_end = ? WHERE vet_id = ?"
    const value = [
        dateStart,
        dateEnd,
        id
    ]
    db.query(sqlQuery,value,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({message:'updated'})
    })
}

export const set_count = async(req,res,next)=>{
    const {count , id} = req.body
    const sqlQuery = "UPDATE vet SET daily_count = ? WHERE vet_id = ?"
    const value = [
        count,
        id
    ]
    db.query(sqlQuery,value,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({message:"updated"})
    })
}
export const setprice = async(req,res,next)=>{
   const {price,id} = req.body
   const sqlQuery = "UPDATE vet SET fee = ? WHERE vet_id = ?"
   const value = [
    price,
    id
   ]
   db.query(sqlQuery,value,(err,data)=>{
    if(err){
        return res.json({message:'There is an internel error'})
    }
    return res.json({message:'updated'})
   })
}