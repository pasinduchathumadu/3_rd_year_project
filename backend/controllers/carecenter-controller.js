import pkg from 'object-hash'
import { db } from '../database.js'

// ***** COMPLAINS *****
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
export const add_complain = async (req, res, next) => {
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

        db.query(checkQuery, checkValues, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
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

            db.query(sqlQuery, values, (err, data) => {
                if (err) {
                    return res.json({ message: 'There is an internal error' })
                }
                return res.json({ message: 'success' })
            })
        })
    } catch (err) {
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
export const complainDetails = async (req, res, next) => {
    const id = req.params.id
    const role = 'care_center_manager'
    const sqlQuery = 'SELECT * FROM client_complain WHERE complain_id = ?  AND manager_role =? '
    const values = [id, role]
    console.log(id)

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// response adding
export const addResponse = async (req, res, next) => {
    const {
        id,
        newres,
    } = req.body;

    const status = 'completed'
    const current = new Date()
    const currentDate = current.toDateString()

    const sqlQuery = 'UPDATE client_complain SET response_txt = ? , response_date = ?, complain_status = ? WHERE complain_id = ?'
    const values = [newres, currentDate, status, id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Added response' })
    })
}

// delete my complain
export const deleteMyComplain = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'DELETE FROM manager_complain WHERE complain_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Deleted' })
    })
}

// ***** REFUND *****
export const refund_appointments = async (req, res, next) => {
    const status1 = 'incompleted'
    const status2 = 'cancelled'
    const sqlQuery = 'SELECT r.refund_id, r.appointment_id, r.email, r.payment, r.refund_status, r.admin_verification, a.package_id, a.appointment_status FROM carecenter_appointment a INNER JOIN carecenter_refund r ON a.appointment_id = r.appointment_id WHERE a.appointment_status = ? OR a.appointment_status = ? '
    const values = [status1, status2]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// place refund - get details for form
export const toRefund = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_id, r.appointment_id, r.email, r.refund_mny, b.acc_no, b.bank, b.branch FROM carecenter_refund r INNER JOIN client_bankdetails b ON r.email = b.email WHERE r.refund_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}
// place refund - adding
export const refundAdding = async (req, res, next) => {
    const {
        id,
        amount,
    } = req.body;

    const status = 'completed'
    const current = new Date() //get the current date and time
    const currentDate = current.toDateString() //current date
    const currentTime = current.toLocaleTimeString() //current time

    const sqlQuery = 'UPDATE carecenter_refund SET refund_mny = ?, refund_status = ?, date =?, time =?  WHERE refund_id = ?'
    const values = [amount, status, currentDate, currentTime, id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Refund Added' })
    })
}

export const ViewRefundDetails = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_id, r.appointment_id, r.email,  r.refund_slip, r.date, r.time, r.refund_mny, b.acc_no, b.bank, b.branch FROM carecenter_refund r INNER JOIN client_bankdetails b ON r.email = b.email WHERE r.refund_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })

}

// ***** MIND RELAXING PETS *****
// pet adding
export const addingpet = async (req, res, next) => {
    const {
        petcategory,
        name,
        breed,
        petsex,
    } = req.body;

    try {
        var OriginalCategory = ""
        if (petcategory === 10) {
            OriginalCategory = "Cat"
        } else if (petcategory === 20) {
            OriginalCategory = "Dog"
        }

        var OriginalSex = ""
        if (petsex === 10) {
            OriginalSex = "Male"
        } else if (petsex === 20) {
            OriginalSex = "Female"
        }
        const sqlQuery = 'INSERT INTO mind_relaxing_pets (breed, name,  category, sex) VALUES(?,?,?,?)';
        const values = [
            breed,
            name,
            OriginalCategory,
            OriginalSex
        ];

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: "There is an internal error" })
            }
            return res.json({ message: 'success' })
        })
    } catch (err) {
        console.log(err)
    }
}

// pet viewing
export const petViewing = async(req,res,next) => {
    // const id = req.params.id
    const sqlQuery = 'SELECT * FROM mind_relaxing_pets'
    // const values = [id]

    db.query(sqlQuery,  (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// pet deleting
export const petDeleteing = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'DELETE FROM mind_relaxing_pets WHERE pet_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'Deleted Successfully'})
    })
}

