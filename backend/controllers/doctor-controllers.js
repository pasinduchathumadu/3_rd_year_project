import { db } from '../database.js'


export const get_pets = async(req,res,next)=>{
    const id = req.params.email;
    const sqlQuery = "SELECT *FROM client WHERE email = ?"
    const value = [
        id
    ]
    db.query(sqlQuery,value,(err,data1)=>{
        if(err){
            return res.json({message:'There is an error'})
        }

        const sqlQuery1 = "SELECT *FROM pet WHERE client_id = ?"
        const value1 = [
            data1[0].client_id
        ]
        db.query(sqlQuery1,value1,(err,data)=>{
            if(err){
                return res.json({message:'There is an internel error'})
            }
            return res.json({data})

        })
    })
}

export const get_medi = async (req, res, next) => {
    const sqlquery = "SELECT *FROM vet"
    db.query(sqlquery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        return res.json({ data })
    })
}

export const leave = async (req, res, next) => {
    const { id, dateStart, dateEnd } = req.body
    const sqlQuery = "UPDATE vet SET unfree_date_start = ? , unfree_date_end = ? WHERE vet_id = ?"
    const value = [
        dateStart,
        dateEnd,
        id
    ]
    db.query(sqlQuery, value, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        return res.json({ message: 'updated' })
    })
}

export const set_count = async (req, res, next) => {
    const { count, id } = req.body
    const sqlQuery = "UPDATE vet SET daily_count = ? WHERE vet_id = ?"
    const value = [
        count,
        id
    ]
    db.query(sqlQuery, value, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        return res.json({ message: "updated" })
    })
}
export const setprice = async (req, res, next) => {
    const { price, id } = req.body
    const sqlQuery = "UPDATE vet SET fee = ? WHERE vet_id = ?"
    const value = [
        price,
        id
    ]
    db.query(sqlQuery, value, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel error' })
        }
        return res.json({ message: 'updated' })
    })
}

export const add_vet = async (req, res, next) => {
    const { first, second, starttime, fee, contact, countnew, image, working } = req.body
    var status = ""
    if (working === 10) {
        status = "week"
    }

    if (working === 20) {
        status = "weekend"
    }

    const sqlquery = "INSERT INTO vet (first_name,last_name,contact_number,working,start_time,img,fee,daily_count) VALUES(?,?,?,?,?,?,?,?)"
    const values = [
        first,
        second,
        contact,

        status,
        starttime,
        image,
        fee,
        countnew
    ]

    db.query(sqlquery, values, (err, data) => {
        if (err) {
            console.log("ksksk")
            return res.json({ message: 'There is an internel error' })
        }
        return res.json({ message: 'Added' })
    })
}


// --- COMPLAINS ---
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
        const role = 'medi_help_manager'
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
        const role = 'medi_help_manager'
        const sqlQuery = 'SELECT complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM manager_complain WHERE manager_role = ? AND complain_status = ?';
        const values = [role, status]
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        });

    } else if (id === '3') {
        const status = 'completed'
        const role = 'medi_help_manager'
        const sqlQuery = 'SELECT complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM manager_complain WHERE manager_role = ? AND complain_status = ?';
        const values = [role, status]
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
        const role = "medi_help_manager"
        const sqlQuery = 'SELECT client_id, complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM client_complain WHERE manager_role = ? ';
        const values = [role]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
    } else if (id === '2') {
        const role = "medi_help_manager"
        const status = 'pending'
        const sqlQuery = 'SELECT client_id, complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM client_complain WHERE manager_role = ? AND complain_status = ? ';
        const values = [role, status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
    } else if (id === '3') {
        const role = "medi_help_manager"
        const status = 'completed'
        const sqlQuery = 'SELECT client_id, complain_id, complain_txt, com_date, com_time, complain_status, response_txt FROM client_complain WHERE manager_role = ? AND complain_status = ? ';
        const values = [role, status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })

    }

}


// add response - view client response details
export const complainDetails = async (req, res, next) => {
    const id = req.params.id
    const role = 'medi_help_manager'
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

// DASHBOARD
// doctors analyse
export const systemDoctors = async (req, res, next) => {
    const status1 = 'week'
    const status2 = 'weekend'
    const sqlQuery = 'SELECT(SELECT COUNT(vet_id) FROM vet WHERE working = ?) AS week, (SELECT COUNT(vet_id) FROM vet WHERE working = ?) AS weekend ';
    const values = [status1, status2]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// view pending appointment list
export const pendingRequest = async (req, res, next) => {
    const status = 'pending'
    const sqlQuery = 'SELECT * FROM medi_appointment WHERE appointment_status = ? ';
    const values = [status]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// pending appointment count
export const pendingBox = async (req, res, next) => {
    const status = 'pending'
    const sqlQuery = 'SELECT COUNT(appointment_id) as totalpending FROM medi_appointment WHERE appointment_status = ? '
    const values = [status]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// completed appointment count
export const completedBox = async (req, res, next) => {
    const status = 'completed'
    const sqlQuery = 'SELECT COUNT(appointment_id) as totalcompleted FROM medi_appointment WHERE appointment_status = ? '
    const values = [status]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

export const complainsCount = async(req,res, next) => {
    const status1 = 'pending'
    const status2 = 'completed'
    const role = 'medi_help_manager'
    const sqlQuery = 'SELECT (SELECT COUNT(complain_id) FROM client_complain WHERE complain_status = ? AND manager_role =? ) AS pendingCount, (SELECT COUNT(complain_id) FROM client_complain WHERE complain_status = ? AND manager_role = ?) AS completedCount'
    const values = [status1, role, status2, role]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// AAPOINTMENTS
// pending appointments
export const PendingAppointments = async(req,res,next) => {
    const status = 'pending'
    const sqlQuery ='SELECT m.appointment_id, m.vet_id, m.appointment_status,  m.pet_id, m.placed_date, c.client_id, m.client_email,  c.contact_number FROM medi_appointment m INNER JOIN client c  ON c.email = m.client_email WHERE m.appointment_status = ?'
    const values = [status]

    db.query(sqlQuery, values,(err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// completed & uncompleted appointments
export const completedAppointments = async(req,res,next) => {
    const id = req.params.id

    if(id === '1') {
        const status1 = 'completed'
        const status2 = 'uncompleted'
        const sqlQuery ='SELECT m.appointment_id, m.vet_id, m.appointment_status, m.pet_id, m.placed_date, c.client_id, m.client_email,  c.contact_number FROM medi_appointment m INNER JOIN client c  ON c.email = m.client_email WHERE m.appointment_status = ? || m.appointment_status = ?'
        const values =  [status1, status2 ]

        db.query(sqlQuery, values, (err,data) => {
            if(err) {
                return res.json({message:'There is an internal error'})
            }
            return res.json({data})
        })
    }
    else if(id === '2') {
        const status = 'completed'
        const sqlQuery ='SELECT m.appointment_id, m.vet_id, m.appointment_status,  m.pet_id, m.placed_date, c.client_id, m.client_email,  c.contact_number FROM medi_appointment m INNER JOIN client c  ON c.email = m.client_email WHERE m.appointment_status = ?'
        const values =  [status ]

        db.query(sqlQuery, values, (err,data) => {
            if(err) {
                return res.json({message:'There is an internal error'})
            }
            return res.json({data})
        })

    }
    else if(id === '3') {
        const status = 'uncompleted'
        const sqlQuery ='SELECT m.appointment_id, m.vet_id, m.appointment_status,  m.pet_id, m.placed_date, c.client_id, m.client_email,  c.contact_number FROM medi_appointment m INNER JOIN client c  ON c.email = m.client_email WHERE m.appointment_status = ?'
        const values =  [status ]

        db.query(sqlQuery, values, (err,data) => {
            if(err) {
                return res.json({message:'There is an internal error'})
            }
            return res.json({data})
        })
    }
}

//  pending to completed
export const PendingtoCompeleted = async(req,res,next) => {
    const id = req.params.id
    console.log(id)
    const status = 'completed'
    const sqlQuery = 'UPDATE medi_appointment SET appointment_status = ? WHERE appointment_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err,data) => {
        if(err){
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'completed'})
    })
}

//  pending to uncompleted
export const PendingtoUncompeleted = async(req,res,next) => {
   const id = req.params.id

    const status = 'uncompleted'
    const sqlQuery = 'UPDATE medi_appointment SET appointment_status = ? WHERE appointment_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err,data) => {
        if(err){
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'uncompleted'})
    })
}

// PET PROFILES MAINTAINING
// get pet ids
export const addMedical = async(req,res,next) => {
    const sqlQuery = 'SELECT DISTINCT pet_id FROM medi_appointment'

    db.query(sqlQuery, (err, data) => {
        if(err){
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// add new vaccine to schedule
export const submitNewVaccine = async(req,res,next) => {
    const {
        name,
        category,
        time,
    } = req.body;

    try {
        var originalCategory = ""
        if(category === 10) {
            originalCategory = "Cat"
        }else if(category === 20) {
            originalCategory = "Dog"
        }

        const sqlQuery = 'INSERT INTO vaccine_details(name, category, period) VALUES(?, ?, ?)'
        const values = [name, originalCategory, time]

        db.query(sqlQuery, values,(err,data) => {
            if(err){
                return res.json({message:'There is an internal error'})
            }
            return res.json({message:'success'})
        })
    }catch(err){
        console.log(err)
    }  
}

// view dogs vaccine shedules
export const DogVaccine = async(req,res,next) => {
    const category = "Dog"
    const sqlQuery = 'SELECT * FROM vaccine_details WHERE category = ?'
    const values = [category]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// view cats vaccine shedules
export const CatVaccine = async(req,res,next) => {
    const category = "Cat"
    const sqlQuery = 'SELECT * FROM vaccine_details WHERE category = ?'
    const values = [category]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// delete a vaccine
export const deleteVaccine = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'DELETE FROM vaccine_details WHERE vaccine_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'Deleted'})
    })
}

// get details for update form
export const getDetailsforUpdate =async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT * FROM vaccine_details WHERE vaccine_id = ?'
    const values = [id]
     db.query(sqlQuery, values, (err,data) => {
         if(err) {
             return res.json({message:'There is an internal error'})
         }
         return res.json({data})
     })
}

//submit update vaccine 
export const updateVaccine = async(req,res,next) => {
    const {
        id2,
        newtime,
    } = req.body;

    try {
        const sqlQuery = 'UPDATE vaccine_details SET period = ? WHERE vaccine_id = ?'
        const values = [newtime, id2]

        db.query(sqlQuery, values, (err, data) => {
            if(err){
                return res.json({message:'There is an internal error'})
            }
            return res.json({message:'success'})
        })

    }catch(err) {
        console.log(err)
    }
}


