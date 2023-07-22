
import { db } from '../database.js'

export const get_item = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    var item_catogery = ""
    if (id === '0') {
        item_catogery = "foods";
    }
    if (id === '1') {
        item_catogery = "accessories"
    }
    if (id === '2') {
        item_catogery = "others"
    }

    const sqlQuery = 'select *from item where catogories = ?'
    const values = [
        item_catogery
    ]
    db.query(sqlQuery, values, (err, data) => {
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
    const { item_code, reason } = req.body;
    const values = [
        item_code,
        reason
    ]

    const sqlQuery = 'DELETE FROM table WHERE item_code = ?'

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internal error" })
        }
        return res.json({ message: "deleted succcessfully" })
    })

}

export const view_complain = async (req, res, next) => {
    const status = 'pending'
    const sqlQuery = 'SELECT *FROM TABLE WHERE status = ?'
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

