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
export const myblog = async(req,res,next)=>{
    const email = req.params.email

    const sqlQuery = "select *from client_post WHERE client_email = ?"
    const value = [email]

    db.query(sqlQuery,value,(err,data)=>{
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

// managers profile viewing
export const ManagerProfile = async(req,res,next) => {
    const email = req.params.email;

    const sqlQuery = 'SELECT m.email, m.contact_number, CONCAT(m.street, " ", m.city) AS address, m.user_role, m.manager_id, CONCAT(u.first_name, " ", u.last_name) AS name FROM manager m INNER JOIN users u  ON m.email = u.email WHERE m.email = ?'
    const values = [email]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}