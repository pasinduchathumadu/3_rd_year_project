

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
    const { deleteid } = req.body;
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
    if (id === '0') {
        status = "pending"
    }
    else if (id === '1') {
        status = "replied"
    }


    const sqlQuery = 'SELECT *FROM client_complain WHERE complain_status = ? && manager_role = "online_store_manager"'
    const records = [
        status
    ]
    db.query(sqlQuery, records, (err, data) => {
        if (data.length < 1) {
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

export const add_response = async (req, res, next) => {
    const { id, response, newdate } = req.body;

    const values = [
        newdate,
        response,

        id
    ]
    const sqlQuery = "Update client_complain set response_date = ? , response_txt = ?, complain_status = 'replied'  where complain_id = ?"
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal an error' })
        }
        return res.json({ message: 'Added' })
    })

}

export const add_complain = async (req, res, next) => {
    const { addsubject, complain_message, image } = req.body;

    const values = [
        addsubject,
        complain_message,
        image
    ]



}

export const getclients = async (req, res, next) => {
    const sqlQuery = 'SELECT concat(users.first_name," ",users.last_name) AS name,client.email,concat(client.city," ",client.street) AS address,client.client_id,client.status from users INNER JOIN client ON users.email = client.email '
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json("There is an internel error")
        }
        else {
            return res.json({ data })
        }
    })
}


export const get_view_response = async (req, res, next) => {
    const id = req.params.id
    const values = [
        id
    ]
    const sqlQuery = "SELECT *FROM client_complain WHERE complain_id = ? "
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internel error" })
        }
        else {
            return res.json({ data })
        }
    })
}

export const get_count = async (req, res, next) => {
    const sqlQuery = "SELECT COUNT(complain_id) AS total FROM client_complain WHERE complain_status = 'pending' ";
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        else {

            return res.json({ data })
        }
    })
}

export const get_count1 = async (req, res, next) => {
    const sqlQuery = "SELECT COUNT(complain_id) AS total FROM client_complain WHERE complain_status = 'replied' ";
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        else {

            return res.json({ data })
        }
    })
}

export const get_count2 = async (req, res, next) => {
    const sqlQuery = 'SELECT COUNT(*) AS total_item, catogories FROM item WHERE catogories IN (?,?,?) GROUP BY catogories';
    const values = [
        'foods',
        'accessories',
        'toys'
    ]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        else {
            return res.json({ data })
        }
    })


}

export const get_order = async (req, res, next) => {
    const sqlQuery = 'SELECT COUNT(*) AS count_order,po_status FROM purchase_order WHERE po_status IN (?,?,?) GROUP BY po_status ';
    const values = [
        'pending',
        'accept',
        'refund'
    ]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        else {
            return res.json({ data })
        }
    })
}

export const get_orders = async (req, res, next) => {
    const id = req.params.age
    const currentDate = new Date();
    let startDate = new Date(currentDate);

    if(id === "1"){
        startDate = new Date(currentDate);
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = 'SELECT * FROM purchase_order p INNER JOIN users u ON u.email = p.order_email where placed_date = ?'
        const values = [
            startDateOnly
        ]
        db.query(sqlQuery,values,(err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            else {
                return res.json({ data })
            }
        })

    }
    if(id === "2"){
        startDate.setDate(currentDate.getDate() - 7);
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = 'SELECT * FROM purchase_order p INNER JOIN users u ON u.email = p.order_email where placed_date >=?'
        const values = [
            startDateOnly
        ]
        db.query(sqlQuery,values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            else {
                return res.json({ data })
            }
        })

    }
    if(id === "3"){
        startDate.setMonth(currentDate.getMonth() - 1); 
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = 'SELECT * FROM purchase_order p INNER JOIN users u ON u.email = p.order_email where placed_date >=?'
        const values = [
            startDateOnly
        ]

        db.query(sqlQuery,values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            else {
                return res.json({ data })
            }
        })

    }
 

 
}

export const accept = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = "UPDATE purchase_order SET po_status = 'accept' WHERE po_id = ?"
    const values = [
        id
    ]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        return res.json({ message: 'Successfully Changed' })
    })

}

export const handover = async (req, res, next) => {
    const { id, date } = req.body
    const sqlQuery = "UPDATE purchase_order SET po_status = 'handed',handover_date = ? WHERE po_id = ?"
    const values = [
        date,
        id
    ]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        return res.json({ message: 'Successfully Changed' })
    })


}

export const filter = async (req, res, next) => {
    const id = req.params.id
    const currentDate = new Date();
    let startDate = new Date(currentDate);
 

    if (id === "1") {
        startDate = new Date(currentDate);
        const status = 'pending'
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = "SELECT COUNT(com_date)AS total FROM client_complain WHERE complain_status = ? AND com_date = ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel errossr' })
            }
            return res.json({ data })
        })
    } else if (id === "2") {
        startDate.setDate(currentDate.getDate() - 7);
        const status = 'pending'
        //this is the status of the client complain
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = "SELECT COUNT(com_date)AS total FROM client_complain WHERE complain_status = ? AND com_date >= ?"
        const values = [
            status,
            startDateOnly
        ]
    
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
         // Last week
    } else if (id === "3") {
        startDate.setMonth(currentDate.getMonth() - 1); 
        const status = 'pending'
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = "SELECT COUNT(com_date)AS total FROM client_complain WHERE complain_status = ? AND com_date >= ?"
        const values = [
            status,
            startDateOnly
        ]
    
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })// Last month
    }

   
}


export const filterreply = async (req, res, next) => {
    const id = req.params.id
    const currentDate = new Date();
    let startDate = new Date(currentDate);
    

    if (id === "1") {
        startDate = new Date(currentDate)
        const status = 'replied'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(com_date)AS total FROM client_complain WHERE complain_status = ? AND com_date = ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    } else if (id === "2") {
        startDate.setDate(currentDate.getDate() - 7);
        const status = 'replied'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(com_date)AS total FROM client_complain WHERE complain_status = ? AND com_date >= ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
        // Last week
    } else if (id === "3") {
        startDate.setMonth(currentDate.getMonth() - 1);
        const status = 'replied'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(com_date)AS total FROM client_complain WHERE complain_status = ? AND com_date >= ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
        // Last month
    }
}

export const filtercomplain1 = async(req,res,next)=>{
    const id = req.params.id
    const currentDate = new Date();
    let startDate = new Date(currentDate);
    

    if (id === "1") {
        startDate = new Date(currentDate)
        const status = 'waitting'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(po_id)AS total,po_status FROM purchase_order WHERE po_status = ? AND placed_date = ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    } else if (id === "2") {
        startDate.setDate(currentDate.getDate() - 7);
        const status = 'waitting'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(po_id)AS total,po_status FROM purchase_order WHERE po_status = ? AND placed_date >= ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
        // Last week
    } else if (id === "3") {
        startDate.setMonth(currentDate.getMonth() - 1);
        const status = 'waitting'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(po_id)AS total,po_status FROM purchase_order WHERE po_status = ? AND placed_date >= ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
        // Last month
    }

}
export const filtercomplain2 = async(req,res,next)=>{
    const id = req.params.id
    const currentDate = new Date();
    let startDate = new Date(currentDate);
    

    if (id === "1") {
        startDate = new Date(currentDate)
        const status = 'handed'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(po_id)AS total,po_status FROM purchase_order WHERE po_status = ? AND handover_date = ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    } else if (id === "2") {
        startDate.setDate(currentDate.getDate() - 7);
        const status = 'handed'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(po_id)AS total,po_status FROM purchase_order WHERE po_status = ? AND handover_date  >= ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
        // Last week
    } else if (id === "3") {
        startDate.setMonth(currentDate.getMonth() - 1);
        const status = 'handed'
        const startDateOnly = startDate.toISOString().substr(0, 10);

        const sqlQuery = "SELECT COUNT(po_id)AS total,po_status FROM purchase_order WHERE po_status = ? AND handover_date >= ?"
        const values = [
            status,
            startDateOnly
        ]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
        // Last month
    }

}
export const removeitem = async(req,res,next)=>{
    const sqlQuery = "select *from item";
    db.query(sqlQuery,(err,data)=>{
        if(err){
            res.json({message:'There is an internel error'})
        }
        return res.json({data})
    })
}
export const remove_item_finally = async(req,res,next)=>{
    const selectedremove = req.params.selectedremove;

    const sqlQuery = "Delete from item WHERE item_id = ?"
    const checkarray = [selectedremove]
    db.query(sqlQuery,checkarray,(err,data)=>{
        if(err){
            res.json({message:"There is an internel error"})
        }
        return res.json({message:"Deleted"})
    })

}
export const discount = async(req,res,next)=>{
    const {selectedremove, discountitem} = req.body
    const sqlQuery = "Update item SET discount = ? WHERE item_id = ?"
    const value = [discountitem , selectedremove]
    db.query(sqlQuery,value,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({message:'updated'})
    })

}

export const offer = async(req,res,next)=>{
    const id = req.params.offer
    const status = "premium"
    const sqlQuery = "Update client SET offer = ? WHERE status = ?"
    const values = [id,status]
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({message:'updated'})
    })
}
