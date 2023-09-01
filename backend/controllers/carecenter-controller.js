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