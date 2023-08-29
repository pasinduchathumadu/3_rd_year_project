import pkg from 'object-hash'
import { db } from '../database.js'

//  ----- PACKAGES -----

// add new package 
export const addPackage = async (req, res, next) => {
    const {
        packageName,
        price,
        first,
        second,
        third,
        fourth,
        fifth,
    } = req.body;

    try {
        const checkQuery = 'SELECT * FROM boarding_package WHERE package_name = ? ';
        const checkValues = [packageName];

        db.query(checkQuery, checkValues, (err, data) => {
            if (data.length > 0) {
                return res.json({ message: 'Package Name already exists' });
            }
        })

        const sqlQuery =
            'INSERT INTO boarding_package (package_name, price) VALUES (?,?)';

        const values = [
            packageName,
            price
        ];

        db.query(sqlQuery, values, (err, userData) => {
            if (err) {
                return res.json({ message: "There is an internal error" });
            }

            const query = 'INSERT INTO boarding_package_facility (package_id, facility) VALUES ((SELECT package_id FROM boarding_package ORDER BY package_id DESC LIMIT 1), ?), ((SELECT package_id FROM boarding_package ORDER BY package_id DESC LIMIT 1), ?), ((SELECT package_id FROM boarding_package ORDER BY package_id DESC LIMIT 1), ?), ((SELECT package_id FROM boarding_package ORDER BY package_id DESC LIMIT 1), ?),((SELECT package_id FROM boarding_package ORDER BY package_id DESC LIMIT 1), ?)';
            const values1 = [
                first,
                second,
                third,
                fourth,
                fifth
            ]

            db.query(query, values1, (err, data1) => {
                if (err) {
                    return res.json({ message: 'There is an internel error' })
                }
                return res.json({ message: 'success' })
            })
        })
    } catch (err) {
        console.log(err)
    }
}

// get and view details of packages
export const getPackage = async (req, res, next) => {
    const sqlQuery = 'SELECT package_name, price,symbol from boarding_package WHERE package_id = "1" ';
  

    db.query(sqlQuery,  (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })

}

// ---------BOARDING REQUESTS---------------------------------

// boarding requests viewing
export const view_requests = async (req, res, next) => {
    // const sqlQuery = 'SELECT * FROM boarding_request WHERE request_status = "completed" OR request_status = "pending" OR request_status = "accepted" OR request_status = "arrived"';
    const sqlQuery = 'SELECT r.request_id, r.client_id, r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.request_status, p.package_name, p.symbol FROM boarding_request r INNER JOIN boarding_package p ON p.package_id = r.package_id WHERE request_status = "completed" OR request_status = "pending" OR request_status = "accepted" OR request_status = "arrived"';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })

}

// view incompleted & cancelled requests (for refund)
export const refund_requests = async (req, res, next) => {
    const sqlQuery = 'SELECT f.refund_id, f.client_id, f.request_id, f.admin_verification, f.refund_status, q.cancelled_date, q.price, q.request_status FROM boarding_refund f INNER JOIN boarding_request q ON f.request_id = q.request_id WHERE q.request_status = "incompleted" OR q.request_status = "cancelled" ';

    db.query(sqlQuery, (err, data) => {
        if(err) {
            return res.json({message: 'There is an internal error'})
        }
        return res.json({ data })
    })    
}

// view all clients get services from  boarding house
export const view_allclients = async (req, res, next) => {
    const sqlQuery = 'SELECT c.client_id, CONCAT(c.street, " ", c.city) as address, c.contact_number, c.status, CONCAT(u.first_name, " ", u.last_name) as name FROM client c INNER JOIN users u ON c.email = u.email WHERE c.client_id IN (SELECT client_id FROM boarding_request)';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// viewing refund details of completed refund
export const view_refundDetails = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_id, r.request_id, r.client_id,  r.refund_slip, r.date, r.time, r.refund_mny, b.acc_no, b.bank, b.branch FROM boarding_refund r INNER JOIN client_bankdetails b ON r.client_id = b.client_id WHERE r.refund_id = ?'
    const values =[id]

    db.query(sqlQuery,values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// view refund details before add refund (pending refund)
export const toRefund = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_id, r.request_id, r.client_id,  r.refund_mny, b.acc_no, b.bank, b.branch FROM boarding_refund r INNER JOIN client_bankdetails b ON r.client_id = b.client_id WHERE r.refund_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}
// get details from post - pending refund
export const refundAdding = async(req,res,next) => {
    const {
        id,
        amount,
    } = req.body;

    const status = 'completed'
    const current = new Date() //get the current date and time
    const currentDate = current.toDateString() //current date
    const currentTime = current.toLocaleTimeString() //current time

    const sqlQuery = 'UPDATE boarding_refund SET refund_mny = ?, refund_status = ?, date =?, time =?  WHERE refund_id = ?'
    const values = [amount, status, currentDate, currentTime, id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'Refund Added'})
    })
}

// clients pets viewing
export const viewPetDetails = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT * FROM pet WHERE client_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message: 'There is an internal error'})
        }
        return res.json({data})
    })
}

// -------- COMPLAINS -----------------------
// add new complain
export const add_complain = async (req, res, next) => {
    const {
        email,
        complain,
    } = req.body;

    const date = new Date()
    const placed_date = date.toLocaleDateString()
    const placed_time = date.toLocaleTimeString()
    const status = 'pending';

    try {
        const checkQuery = 'SELECT * FROM manager WHERE email = ?';
        const checkValues = [email];

        db.query(checkQuery, checkValues, (err, data) => {
            if (err) {
                return res.json({ message: "There is an internal error" })
            }

            const sqlQuery = 'INSERT INTO manager_complain (manager_id, complain_txt, com_date, com_time, complain_status, manager_role) VALUES (?,?,?,?,?,?)';
            const values = [
                data[0].manager_id,
                complain,
                placed_date,
                placed_time,
                status,
                data[0].user_role,
            ];

            db.query(sqlQuery, values, (err, data) => {
                if (err) {
                    return res.json({ message: 'There is an internal errorrrr' })
                }
                return res.json({ message: 'success' })
            })
        })

    } catch (err) {
        console.log(err)
    }
}

// view my complains
export const viewmyComplains = async (req, res, next) => {
    const sqlQuery = 'SELECT complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM manager_complain WHERE manager_role = "boarding_house_manager" ';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}


// view clients complains
export const viewClientsComplains = async (req, res, next) => {
        const sqlQuery = 'SELECT client_id, complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM client_complain WHERE manager_role = "boarding_house_manager" ';
        db.query(sqlQuery, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
}

// add response - view client response details
export const complainDetails = async (req,res,next) => {
    const id = req.params.id
    const role = 'boarding_house_manager'
    const sqlQuery = 'SELECT * FROM client_complain WHERE complain_id = ?  AND manager_role =? '
    const values = [id, role]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}
// add response - update table with response details
export const addingResponse = async (req,res,next) => {
    const {
        id,
        newres,
    } = req.body;

    const status = 'completed'
    const current = new Date()
    const currentDate = current.toDateString()

    const sqlQuery = 'UPDATE client_complain SET response_txt = ? , response_date = ?, complain_status = ? WHERE complain_id = ?'
    const values = [newres, currentDate, status, id ]

    db.query(sqlQuery, values,(err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'Added response'})
    })    
}


// --- BOARIDNG PETS ---- 
// view current boarding pets
export const viewCurrent = async (req, res, next) => {

    const sqlQuery = 'SELECT r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.client_id, p.category FROM boarding_request r INNER JOIN pet p ON r.pet_id = p.pet_id WHERE r.request_status = "arrived"  ';
    db.query(sqlQuery, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// view pending requests (pending & accepted)
export const viewRequested = async(req,res,next) => {
    const sqlQuery = 'SELECT r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.client_id, r.request_status, p.category FROM boarding_request r INNER JOIN pet p ON r.pet_id = p.pet_id WHERE r.request_status = "pending" OR r.request_status = "accepted" ';
    db.query(sqlQuery, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}

// view past boarded pets
export const viewBoarded = async(req,res,next) => {
    const sqlQuery = 'SELECT r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date,  r.board_time, r.client_id, p.category FROM boarding_request r INNER JOIN pet p ON r.pet_id = p.pet_id WHERE r.request_status = "completed" ';
    db.query(sqlQuery, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}

// --- DAHSBOARD ----
// current & completed count of pets - boarding
export const countPets = async(req,res,next) => {
    const sqlQuery = 'SELECT (SELECT COUNT(pet_id) FROM boarding_request WHERE request_status = "completed") AS completedBoard, (SELECT COUNT(pet_id) FROM boarding_request WHERE request_status = "accepted") AS currentBoard';
    db.query(sqlQuery, (err, data) => {
        if(err) {
            return res.json({message: 'There is an internal error'})
        }
        return res.json({data})
    })

}

// get package usage  [PACKAGES - view popularity]
export const packageUsage = async(req,res, next) => {
    const sqlQuery = 'SELECT (SELECT COUNT(package_id) FROM boarding_request WHERE package_id = "1") AS silver, (SELECT COUNT(package_id) FROM boarding_request WHERE package_id = "2") AS platinum, (SELECT COUNT(package_id) FROM boarding_request WHERE package_id = "3") AS gold ';
    db.query(sqlQuery, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// get pending  boarding requests
export const pendingRequest = async(req,res,next) => {
    const sqlQuery = 'SELECT * FROM boarding_request WHERE request_status = "pending" ';
    db.query(sqlQuery, (err,data) => {
        if(err) {
            return res.json({message: 'There is an internal error'})
        }
        return res.json({data})
    })
}