import { db } from '../database.js'


export const get_pets = async (req, res, next) => {
    const id = req.params.email;
    const sqlQuery = "SELECT *FROM client WHERE email = ?"
    const value = [
        id
    ]
    db.query(sqlQuery, value, (err, data1) => {
        if (err) {
            return res.json({ message: 'There is an error' })
        }

        const sqlQuery1 = "SELECT *FROM pet WHERE client_id = ?"
        const value1 = [
            data1[0].client_id
        ]
        db.query(sqlQuery1, value1, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })

        })
    })
}

export const get_medi = async (req, res, next) => {
    const status = "active"
    const sqlquery = "SELECT *FROM vet WHERE status = ?"
    const values = [status]
    db.query(sqlquery, values,(err, data) => {
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
    const { first, second, starttime, fee, contact, countnew, image, working , qualifications } = req.body
    var status = ""
    if (working === 10) {
        status = "week"
    }

    if (working === 20) {
        status = "weekend"
    }

    const sqlquery = "INSERT INTO vet (first_name,last_name,contact_number,working,start_time,img,fee,daily_count,qualifications) VALUES(?,?,?,?,?,?,?,?,?)"
    const values = [
        first,
        second,
        contact,

        status,
        starttime,
        image,
        fee,
        countnew,
        qualifications
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

// appointment count
export const appointmentCount = async(req,res,next) => {
    const sqlQuery = 'SELECT COUNT(appointment_id) AS appointment_count FROM medi_appointment'

    db.query(sqlQuery, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// vaccination counts for cats, dogs
export const vaccineCount= async(req,res,next) => {
    const category1 = 'Dog'
    const category2 = 'Cat'
    const sqlQuery = 'SELECT (SELECT COUNT(vaccine_id) FROM vaccine_details WHERE category = ? ) AS dogCount, (SELECT COUNT(vaccine_id) FROM vaccine_details  WHERE category = ?) AS catCount';
    const values = [category1, category2]

    db.query(sqlQuery, values, (err, data) => {
        if(err){
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}



// cmplains count
export const complainsCount = async (req, res, next) => {
    const status1 = 'pending'
    const status2 = 'completed'
    const role = 'medi_help_manager'
    const sqlQuery = 'SELECT (SELECT COUNT(complain_id) FROM client_complain WHERE complain_status = ? AND manager_role =? ) AS pendingCount, (SELECT COUNT(complain_id) FROM client_complain WHERE complain_status = ? AND manager_role = ?) AS completedCount'
    const values = [status1, role, status2, role]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// AAPOINTMENTS
//  appointments viewing
export const ViewAppointments = async(req,res,next) => {
    const status = 'confirm'
    const sqlQuery = 'SELECT * FROM medi_appointment WHERE appointment_status = ?'
    const values = [status]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}

// PET PROFILES MAINTAINING
// get pet ids
export const addMedical = async (req, res, next) => {
    const sqlQuery = 'SELECT DISTINCT pet_id FROM medi_appointment'

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}
// get vaccine id and name
export const getVaccineDetails = async (req, res, next) => {
    const sqlQuery = 'SELECT * FROM vaccine_details'

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.data({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// submit add new vaccine record form
export const submitAddMedical = async (req, res, next) => {
    const {
        selectpetid,
        selectvaccine,
        vaccinedate,
    } = req.body;

    const sqlQuery1 = 'SELECT *FROM past_vaccine_records WHERE pet_id = ? AND vaccine_id = ?'
    const values1 = [selectpetid,selectvaccine]
    db.query(sqlQuery1,values1,(err,data1)=>{
        if(data1.length === 1){
            return res.json({message:'already exisit'})
        }
        try {
            const sqlQuery = 'INSERT INTO past_vaccine_records(vaccine_id, pet_id, vaccined_date) VALUES(?,?,?)'
            const values = [selectvaccine, selectpetid, vaccinedate]
    
            db.query(sqlQuery, values, (err, data) => {
                if (err) {
                    return res.json({ message: 'There is an internal error' })
                }
                return res.json({ message: 'success' })
            })
        } catch (err) {
            console.log(err)
        }
       
    })

   
}

// add new vaccine to schedule
export const submitNewVaccine = async (req, res, next) => {
    const {
        name,
        category,
        time,
    } = req.body;

    try {
        var originalCategory = ""
        if (category === 10) {
            originalCategory = "Cat"
        } else if (category === 20) {
            originalCategory = "Dog"
        }

        const sqlQuery = 'INSERT INTO vaccine_details(name, category, period) VALUES(?, ?, ?)'
        const values = [name, originalCategory, time]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ message: 'success' })
        })
    } catch (err) {
        console.log(err)
    }
}

// view dogs vaccine shedules
export const DogVaccine = async (req, res, next) => {
    const category = "Dog"
    const sqlQuery = 'SELECT * FROM vaccine_details WHERE category = ?'
    const values = [category]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// view cats vaccine shedules
export const CatVaccine = async (req, res, next) => {
    const category = "Cat"
    const sqlQuery = 'SELECT * FROM vaccine_details WHERE category = ?'
    const values = [category]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// delete a vaccine
export const deleteVaccine = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'DELETE FROM vaccine_details WHERE vaccine_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Deleted' })
    })
}

// get details for update form
export const getDetailsforUpdate = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT * FROM vaccine_details WHERE vaccine_id = ?'
    const values = [id]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

//submit update vaccine 
export const updateVaccine = async (req, res, next) => {
    const {
        id2,
        newtime,
    } = req.body;

    try {
        const sqlQuery = 'UPDATE vaccine_details SET period = ? WHERE vaccine_id = ?'
        const values = [newtime, id2]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ message: 'success' })
        })

    } catch (err) {
        console.log(err)
    }
}

// view past vaccine records 
export const pastVaccinationDetails = async(req,res,next) => {
    const id = req.params.id

    const sqlQuery = 'SELECT p.vaccine_id,p.vaccined_date,v.name from past_vaccine_records p INNER JOIN vaccine_details v ON v.vaccine_id = p.vaccine_id WHERE p.pet_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}


export const remove = async(req,res,next)=>{
    const status = "active"
    const sqlQuery = "Select *FROM vet WHERE status = ?"
    const value = [status]
    db.query(sqlQuery,value,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({data})
    })
}

export const remove_final = async (req,res,next)=>{
    const status = "removed"
    const { selectedID,reason} = req.body
    const sqlQuery = "update vet SET status = ? , reason = ? WHERE vet_id = ?"
    const value = [status,reason,selectedID]

    db.query(sqlQuery,value,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({message:'Deleted'})
    })}

// get details for main page (pet profile)
export const getDetails = async(req,res,next) => {
    const sqlQuery = 'SELECT DISTINCT (pet_id) FROM medi_appointment'

    db.query(sqlQuery, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}
export const getnextvaccineid = async(req,res,next)=>{
  
    const id = req.params.nextVaccine
    const sqlQuery = "SELECT *FROM past_vaccine_records WHERE pet_id = ? ORDER BY id DESC LIMIT 1"
    const value = [id];
    db.query(sqlQuery,value,(err,data1)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        const sqlQuery1 = "select *from vaccine_details WHERE vaccine_id = ?"
        const values = [data1[0].vaccine_id+1]
        db.query(sqlQuery1,values,(err,data)=>{
            if(err){
                return res.json({message:'There is an internel errokkkr'})
            }
            return res.json({data})
        })
    })
}
export const assigned = async(req,res,next)=>{
    const {assigned}= req.body;
    const status = "working"
    const sqlQuery = "UPDATE vet SET unfree_date_start = ? , unfree_date_end = ? WHERE vet_id = ?"
    const values = [status,status,assigned]
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({message:'assigned'})
    })
   
}

export const get_employee1 = async(req,res,next)=>{
    const status = "working"
    const new_status = "active"
    const sqlQuery = "select *from vet WHERE unfree_date_start !=? AND unfree_date_end !=? AND status = ?"
    const values = [status,status,new_status]
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({data})
    })
}




