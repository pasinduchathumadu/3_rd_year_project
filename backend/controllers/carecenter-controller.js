import pkg from 'object-hash'
import { db } from '../database.js'

// COMPLAINS
// view my complains
export const viewmycomplain = async (req, res, next) => {
    const sqlQuery = 'SELECT complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM manager_complain WHERE manager_role = "care_center_manager" ';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// add new complain
export const add_complain = async(req,res,next) => {
    const {
        email,
        complain,
    } = req.body;

    const date = new Date()
    const placed_date = date.toLocaleDateString()
    const placed_time = date.toLocaleTimeString()
    const status = 'pending'

    try {
        const checkQuery = 'SELECT * FROM manager WHERE email = ?'
        const checkValues = [email]

        db.query(checkQuery, checkValues, (err,data) => {
            if(err) {
                return res.json({message:'There is an internal error'})
            }
            const sqlQuery = 'INSERT INTO manager_complain (manager_id, complain_txt, com_date, com_time, complain_status, manager_role) VALUES (?,?,?,?,?,?)';
            const values = [
                data[0].manager_id,
                complain,
                placed_date,
                placed_time,
                status,
                data[0].user_role,
            ]

            db.query(sqlQuery, values, (err,data) => {
                if(err) {
                    return res.json({message:'There is an internal error'})
                }
                return res.json({message:'success'})
            })
        })
    }catch(err) {
        console.log(err)
    }
}

// view clients complains
export const viewClientcomplains = async (req, res, next) => {
    const sqlQuery = 'SELECT client_id, complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM client_complain WHERE manager_role = "care_center_manager" ';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// add response - view complain details  
export const complainDetails = async (req,res,next) => {
    const id = req.params.id
    const role = 'care_center_manager'
    const sqlQuery = 'SELECT * FROM client_complain WHERE complain_id = ?  AND manager_role =? '
    const values = [id,role]
    console.log(id)

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// response adding
export const addResponse = async (req,res,next) => {
    const {
        id,
        newres,
    } = req.body;

    const status = 'completed'
    const  current = new Date()
    const currentDate = current.toDateString()

    const sqlQuery = 'UPDATE client_complain SET response_txt = ? , response_date = ?, complain_status = ? WHERE complain_id = ?'
    const values = [newres, currentDate, status, id]

    db.query(sqlQuery, values,(err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'Added response'})
    })
}

// delete my complain
export const deleteMyComplain = async (req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'DELETE FROM manager_complain WHERE complain_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'Deleted'})
    })
}
