import pkg from 'object-hash'
import { db } from '../database.js'

//  ----- PACKAGES -----

// add new package 
export const AddNewPackage = async (req, res, next) => {
    const {
        name,
        price,
        facilities,
    } = req.body;

    // console.log(facilities); 

    if (!Array.isArray(facilities)) {
        return res.json({ message: 'Facilities should be an array' })
    }

    const sqlQuery = 'INSERT INTO boarding_package(package_name, price) VALUES(?,?)'
    const values = [name, price]

    db.query(sqlQuery, values, (err, packageData) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        // return res.json({message:'success'})/
        const packageid = packageData.insertID;

        const sqlQuery2 = 'INSERT INTO boarding_package_facility(package_id, facility) VALUES (?,?)';
        const values2 = facilities.map((facility) => [packageid, facility])

        db.query(sqlQuery2, values2, (facilityerr, facilitydata) => {
            if (facilityerr) {
                return res.json({ message: 'There is an internal errorrr' })
            }
            return res.json({ message: 'success' })
        })
    })
}

export const BasicPackageDetails = async(req,res,next) => {
    const sqlQuery = 'SELECT * FROM boarding_package'

    db.query(sqlQuery, (err,data) => {
        if(err){
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}

// get package  facility details
// export const PackageFacilities = async (req,res,next) => {
//     const id = req.params.id
//     const sqlQuery = 'SELECT p.package_name, p.color, p.package_id, f.facility FROM boarding_package p INNER JOIN boarding_package_facility f ON p.package_id = f.package_id WHERE p.package_id = ? '
//     const values = [id]

//     db.query(sqlQuery, values, (err, data) => {
//         if(err){
//             return res.json({message:'There is an internal error'})
//         }
//         return res.json({data})
//     })
   
// }
export const PackageFacilities = async (req, res, next) => {
    const id = req.params.id;
    const sqlQuery =
        'SELECT p.package_name, p.color, p.package_id, GROUP_CONCAT(f.facility) AS facilities ' +
        'FROM boarding_package p ' +
        'INNER JOIN boarding_package_facility f ON p.package_id = f.package_id ' +
        'WHERE p.package_id = ? ' +
        'GROUP BY p.package_name, p.color, p.package_id';
    const values = [id];

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' });
        }

        // Transform the result to have facilities as an array
        const transformedData = data.map((item) => ({
            package_name: item.package_name,
            color: item.color,
            package_id: item.package_id,
            facilities: item.facilities.split(', ').map((facility) => facility.trim()), // Split facilities into an array
        }));

        return res.json({ data: transformedData });
    });
};


// ---------BOARDING REQUESTS---------------------------------

// boarding requests viewing - filter applied
export const view_requests = async (req, res, next) => {
    const id = req.params.id
    if (id === '1') {
        const status1 = 'completed'
        const status2 = 'pending'
        const status3 = 'accepted'
        const status4 = 'arrived'
        const sqlQuery = 'SELECT r.request_id, r.client_id, r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.request_status, p.package_name FROM boarding_request r INNER JOIN boarding_package p ON p.package_id = r.package_id WHERE request_status = ? OR request_status = ? OR request_status = ? OR request_status = ?';
        const values = [status1, status2, status3, status4]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    } else if (id === '2') {
        const status = 'pending'
        const sqlQuery = 'SELECT r.request_id, r.client_id, r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.request_status, p.package_name FROM boarding_request r INNER JOIN boarding_package p ON p.package_id = r.package_id WHERE request_status = ? ';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    } else if (id === '3') {
        const status = 'accepted'
        const sqlQuery = 'SELECT r.request_id, r.client_id, r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.request_status, p.package_name FROM boarding_request r INNER JOIN boarding_package p ON p.package_id = r.package_id WHERE request_status = ? ';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });

    } else if (id === '4') {
        const status = 'arrived'
        const sqlQuery = 'SELECT r.request_id, r.client_id, r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.request_status, p.package_name FROM boarding_request r INNER JOIN boarding_package p ON p.package_id = r.package_id WHERE request_status = ? ';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });

    } else if (id === '5') {
        const status = 'completed'
        const sqlQuery = 'SELECT r.request_id, r.client_id, r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.request_status, p.package_name FROM boarding_request r INNER JOIN boarding_package p ON p.package_id = r.package_id WHERE request_status = ? ';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    }
}

// view incompleted & cancelled requests (for refund)
export const refund_requests = async (req, res, next) => {
    const id = req.params.id

    if (id === '1') {
        const status1 = 'pending'
        const status2 = 'completed'
        const sqlQuery = 'SELECT f.refund_id, f.client_id, f.request_id, f.admin_verification, f.refund_status, q.cancelled_date, q.price, q.request_status FROM boarding_refund f INNER JOIN boarding_request q ON f.request_id = q.request_id WHERE f.refund_status  = ? OR f.refund_status  = ? ';
        const values = [status1, status2]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    } else if (id === '2') {
        const status = 'pending'
        const sqlQuery = 'SELECT f.refund_id, f.client_id, f.request_id, f.admin_verification, f.refund_status, q.cancelled_date, q.price, q.request_status FROM boarding_refund f INNER JOIN boarding_request q ON f.request_id = q.request_id WHERE f.refund_status  = ? ';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });

    } else if (id === '3') {
        const status = 'completed'
        const sqlQuery = 'SELECT f.refund_id, f.client_id, f.request_id, f.admin_verification, f.refund_status, q.cancelled_date, q.price, q.request_status FROM boarding_refund f INNER JOIN boarding_request q ON f.request_id = q.request_id WHERE f.refund_status = ? ';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    }
}

// view all clients get services from  boarding house - filter applied
export const view_allclients = async (req, res, next) => {
    const id = req.params.id

    if (id === '1') {
        const sqlQuery = 'SELECT c.client_id, CONCAT(c.street, " ", c.city) as address, c.contact_number, c.status, CONCAT(u.first_name, " ", u.last_name) as name FROM client c INNER JOIN users u ON c.email = u.email WHERE c.client_id IN (SELECT client_id FROM boarding_request)';

        db.query(sqlQuery, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    } else if (id === '2') {
        const status = 'premium'
        const sqlQuery = 'SELECT c.client_id, CONCAT(c.street, " ", c.city) as address, c.contact_number, c.status, CONCAT(u.first_name, " ", u.last_name) as name FROM client c INNER JOIN users u ON c.email = u.email WHERE c.client_id IN (SELECT client_id FROM boarding_request) AND c.status = ?';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });

    } else if (id === '3') {
        const status = 'regular'
        const sqlQuery = 'SELECT c.client_id, CONCAT(c.street, " ", c.city) as address, c.contact_number, c.status, CONCAT(u.first_name, " ", u.last_name) as name FROM client c INNER JOIN users u ON c.email = u.email WHERE c.client_id IN (SELECT client_id FROM boarding_request) AND c.status = ?';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    }
}

// viewing refund details of completed refund
export const view_refundDetails = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_id, r.request_id, r.client_id,  r.refund_slip, r.date, r.time, r.refund_mny, b.acc_no, b.bank, b.branch FROM boarding_refund r INNER JOIN client_bankdetails b ON r.client_id = b.client_id WHERE r.refund_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// view refund details before add refund (pending refund)
export const toRefund = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_id, r.request_id, r.client_id,  r.refund_mny, b.acc_no, b.bank, b.branch FROM boarding_refund r INNER JOIN client_bankdetails b ON r.client_id = b.client_id WHERE r.refund_id = ?'
    const values = [id]


    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}
// get details from post - pending refund
export const refundAdding = async (req, res, next) => {
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
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Refund Added' })
    })
}

// clients pets viewing
export const viewPetDetails = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT * FROM pet WHERE client_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// clients request => from accepted to arrived
export const AcceptedtoArrived = async (req, res, next) => {
    const {
        id
    } = req.body;

    const status = 'Arrived'
    const sqlQuery = 'UPDATE boarding_request SET request_status = ? WHERE request_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'arrived' })
    })
}

// clients request => from arrvied to completed
export const ArrviedtoCompleted = async (req, res, next) => {
    const {
        id
    } = req.body;

    const status = 'Completed'
    const sqlQuery = 'UPDATE boarding_request SET request_status = ? WHERE request_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'completed' })
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
    const id = req.params.id

    if (id === '1') {
        const role = 'boarding_house_manager'
        const sqlQuery = 'SELECT complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM manager_complain WHERE manager_role = ? ';
        const values = [role]
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    } else if (id === '2') {
        const status = 'pending'
        const role = 'boarding_house_manager'
        const sqlQuery = 'SELECT complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM manager_complain WHERE manager_role = ? AND complain_status = ?';
        const values = [role,status]
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });

    } else if (id === '3') {
        const status = 'completed'
        const role = 'boarding_house_manager'
        const sqlQuery = 'SELECT complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM manager_complain WHERE manager_role = ? AND complain_status = ?';
        const values = [role,status]
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    }
}


// view clients complains
export const viewClientsComplains = async (req, res, next) => {
    const id = req.params.id

    if (id === '1') {
        const role = "boarding_house_manager"
        const sqlQuery = 'SELECT client_id, complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM client_complain WHERE manager_role = ? ';
        const values = [role]

        db.query(sqlQuery, values, (err,data) => {
            if(err){
                return res.json({message:'There is an internal error'})
            }
            return res.json({data})
        })
    }else if(id === '2') {
        const role = "boarding_house_manager"
        const status = 'pending'
        const sqlQuery = 'SELECT client_id, complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM client_complain WHERE manager_role = ? AND complain_status = ? ';
        const values = [role, status]

        db.query(sqlQuery, values, (err,data) => {
            if(err){
                return res.json({message:'There is an internal error'})
            }
            return res.json({data})
        })
    }else if(id === '3') {
        const role = "boarding_house_manager"
        const status = 'completed'
        const sqlQuery = 'SELECT client_id, complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM client_complain WHERE manager_role = ? AND complain_status = ? ';
        const values = [role, status]

        db.query(sqlQuery, values, (err,data) => {
            if(err){
                return res.json({message:'There is an internal error'})
            }
            return res.json({data})
        })

    }

}

// add response - view client response details
export const complainDetails = async (req, res, next) => {
    const id = req.params.id
    const role = 'boarding_house_manager'
    const sqlQuery = 'SELECT * FROM client_complain WHERE complain_id = ?  AND manager_role =? '
    const values = [id, role]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}
// add response - update table with response details
export const addingResponse = async (req, res, next) => {
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
    const sqlQuery = 'DELETE FROM manager_complain WHERE complain_id = ? '
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal errrror' })
        }
        return res.json({ message: 'Deleted' })
    })

}

// --- BOARIDNG PETS ---- 
// view current boarding pets
export const viewCurrent = async (req, res, next) => {

    const sqlQuery = 'SELECT r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.client_id, p.category FROM boarding_request r INNER JOIN pet p ON r.pet_id = p.pet_id WHERE r.request_status = "arrived"  ';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// view pending requests (pending & accepted)
export const viewRequested = async (req, res, next) => {
    const id = req.params.id;

    if (id === '1') { //all
        const status1 = 'Pending'
        const status2 = 'Accepted'
        const sqlQuery = 'SELECT r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.client_id, r.request_status, p.category FROM boarding_request r INNER JOIN pet p ON r.pet_id = p.pet_id WHERE r.request_status = ? OR r.request_status = ? ';
        const values = [status1, status2]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    } else if (id === '2') { //pending
        const status = 'Pending'
        const sqlQuery = 'SELECT r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.client_id, r.request_status, p.category FROM boarding_request r INNER JOIN pet p ON r.pet_id = p.pet_id WHERE r.request_status = ? ';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });

    } else if (id === '3') {
        const status = 'Accepted'
        const sqlQuery = 'SELECT r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date, r.board_time, r.client_id, r.request_status, p.category FROM boarding_request r INNER JOIN pet p ON r.pet_id = p.pet_id WHERE r.request_status = ? ';
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });
    }
}

// view past boarded pets
export const viewBoarded = async (req, res, next) => {
    const sqlQuery = 'SELECT r.pet_id, r.package_id, r.board_arrival_date, r.board_carry_date,  r.board_time, r.client_id, p.category FROM boarding_request r INNER JOIN pet p ON r.pet_id = p.pet_id WHERE r.request_status = "completed" ';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })

}

// --- DAHSBOARD ----
// current & completed count of pets - boarding - WITH FILTERING

// analytical overview - completed 
export const filterbox1 = async (req, res, next) => {
    const id = req.params.id;
    const currentDate = new Date();
    let startDate = new Date(currentDate);

    if (id === "1") { //today
        startDate = new Date(currentDate);
        const status = 'Completed';
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = 'SELECT COUNT(request_id) as totalcompleted,request_status FROM boarding_request WHERE request_status = ? AND board_carry_date = ?';
        const values = [status, startDateOnly];

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' });
            }
            return res.json({ data });
        });
    } else if (id === "2") { //last 7 days
        startDate.setDate(currentDate.getDate() - 7);
        const status = 'Completed';
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = 'SELECT COUNT(request_id) as totalcompleted,request_status FROM boarding_request WHERE board_carry_date >= ? AND request_status = ?';
        const values = [startDateOnly, status];

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' });
            }
            return res.json({ data });
        });
    } else if (id === "3") { //last month
        startDate.setMonth(currentDate.getMonth() - 1);
        const status = 'Completed';
        const startDateOnly = startDate.toISOString().substr(0, 10);
        const sqlQuery = 'SELECT COUNT(request_id) as totalcompleted,request_status  FROM boarding_request WHERE request_status = ? AND board_carry_date >= ?';
        const values = [status, startDateOnly];

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' });
            }
            return res.json({ data });
        });
    }
};

// analytical overview - cancelled 
export const filterbox2 = async (req, res, next) => {
    const id = req.params.id
    const currentDate = new Date()
    let startDate = new Date(currentDate);

    if (id === "1") { //today
        startDate = new Date(currentDate)
        const status = 'Cancelled'
        const startDateOnly = startDate.toISOString().substr(0, 10)
        const sqlQuery = 'SELECT COUNT(request_id) as totalcancelled FROM boarding_request WHERE request_status = ? AND board_carry_date = ?'
        const values = [status, startDateOnly]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
    } else if (id === "2") { //last 7 days
        startDate.setDate(currentDate.getDate() - 7);
        const status = 'Cancelled'
        const startDateOnly = startDate.toISOString().substr(0, 10)
        const sqlQuery = 'SELECT COUNT(request_id) as totalcancelled FROM boarding_request WHERE request_status = ? AND board_carry_date >= ?'
        const values = [status, startDateOnly]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
    } else if (id === "3") { //last month
        startDate.setMonth(currentDate.getMonth() - 1);
        const status = 'Cancelled'
        const startDateOnly = startDate.toISOString().substr(0, 10)
        const sqlQuery = 'SELECT COUNT(request_id) as totalcancelled FROM boarding_request WHERE request_status = ? AND board_carry_date >= ?'
        const values = [status, startDateOnly]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
    }
}


// get package usage  [PACKAGES - view popularity]
export const packageUsage = async (req, res, next) => {
    const sqlQuery = 'SELECT (SELECT COUNT(package_id) FROM boarding_request WHERE package_id = "1") AS silver, (SELECT COUNT(package_id) FROM boarding_request WHERE package_id = "2") AS platinum, (SELECT COUNT(package_id) FROM boarding_request WHERE package_id = "3") AS gold ';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// get pending  boarding requests
export const pendingRequest = async (req, res, next) => {
    const sqlQuery = 'SELECT * FROM boarding_request WHERE request_status = "pending" ';
    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

