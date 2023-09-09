import { db } from '../database.js';

export const blog = async (req, res, next) => {

    const sqlQuery = "select *from client_post"

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'there is internal error' })
        }
        return res.json({ data })
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

export const comment = async (req, res, next) => {
    const { id, comments } = req.body
    const values = [

        id,
        comments
    ]
    const sqlQuery = "insert into comments (post_id,comments) values(?,?)"

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internal error" })
        }
        else {
            return res.json({ message: 'submit' })
        }
    })

}
export const get_comment = async (req, res, next) => {
    const id = req.params.id;
    const sqlQuery = "SELECT *FROM comments where post_id = ?"
    const values = [
        id
    ]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internel error" })
        }

        return res.json({ data })
    })
}

//  profile viewing -MANAGER
export const ManagerProfile = async (req, res, next) => {
    const email = req.params.email;

    const sqlQuery = 'SELECT m.email, m.contact_number, CONCAT(m.street, " ", m.city) AS address, m.user_role, m.manager_id, CONCAT(u.first_name, " ", u.last_name) AS name, u.profile_image FROM manager m INNER JOIN users u  ON m.email = u.email WHERE m.email = ?'
    const values = [email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// update profile - view detaILS - MANAGER
export const DisplayManagerDetails = async (req, res, next) => {
    const email = req.params.email;

    const sqlQuery = 'SELECT u.profile_image, CONCAT(u.first_name, " ", u.last_name) as name, m.manager_id, m.street, m.city, m.contact_number, m.user_role, m.email FROM users u INNER JOIN manager m ON m.email = u.email WHERE m.email = ? '
    const values = [email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// update profile - MANAGER
export const UpdateManager = async (req, res, next) => {
    const {
        email,
        contact,
        street,
        city,
    } = req.body;

    const sqlQuery = 'UPDATE manager SET contact_number = ?, street = ?, city = ? WHERE email = ? '
    const values = [contact, street, city, email]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'success'})
    })
}

// view profile - CLIENT
export const ClientProfile = async (req, res, next) => {
    const email = req.params.email;

    const sqlQuery = 'SELECT c.email, c.contact_number, CONCAT(c.street, " ", c.city) AS address, c.client_id, CONCAT(u.first_name, " ", u.last_name) AS name, u.profile_image FROM client c INNER JOIN users u  ON c.email = u.email WHERE c.email = ?'
    const values = [email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}