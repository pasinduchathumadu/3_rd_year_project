import {db} from '../database.js';

export const blog = async(req,res,next)=>{

    const sqlQuery = "select *from client_post"

    db.query(sqlQuery,(err,data)=>{
        if(err){
            return res.json({message:'there is internal error'})
        }
        return res.json({data})
    })
    
}
export const comment = async(req,res,next)=>{
    const {id,comments} = req.body
    const values =[
        id,
        comments
    ]
    const sqlQuery = "insert into comments (post_id,comments) values(?,?)"

    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:"There is an internal error"})
        }
        else{
            return res.json({message:'submit'})
        }
    })

}
export const get_comment = async(req,res,next)=>{
    const id = req.params.id;
    const sqlQuery = "SELECT *FROM comments where post_id = ?"
    const values = [
        id
    ]
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:"There is an internel error"})
        }
     
        return res.json({data})
    })
}