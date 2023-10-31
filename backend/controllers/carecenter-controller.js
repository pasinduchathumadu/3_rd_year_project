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
    const id = req.params.id
    if(id === '1'){
        const sqlQuery = 'SELECT r.refund_id, r.appointment_id, r.email, r.payment, r.refund_status, r.admin_verification, a.package_id, a.appointment_status FROM carecenter_appointment a INNER JOIN carecenter_refund r ON a.appointment_id = r.appointment_id '
      
    
        db.query(sqlQuery,(err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
        
    }
    else if(id === '2'){
        const status = "pending"
        const sqlQuery = 'SELECT r.refund_id, r.appointment_id, r.email, r.payment, r.refund_status, r.admin_verification, a.package_id, a.appointment_status FROM carecenter_appointment a INNER JOIN carecenter_refund r ON a.appointment_id = r.appointment_id where r.refund_status = ?'
      
        const values = [status]
        db.query(sqlQuery,values,(err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })

    }
    else if(id === '3'){
        const status = "completed"
        const sqlQuery = 'SELECT r.refund_id, r.appointment_id, r.email, r.payment, r.refund_status, r.admin_verification, a.package_id, a.appointment_status FROM carecenter_appointment a INNER JOIN carecenter_refund r ON a.appointment_id = r.appointment_id where r.refund_status = ?'
      
        const values = [status]
        db.query(sqlQuery,values,(err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })

    }
 
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
        image
    } = req.body;

    const status = 'completed'
    const current = new Date() //get the current date and time
    const currentDate = current.toDateString() //current date
    const currentTime = current.toLocaleTimeString() //current time

    const sqlQuery = 'UPDATE carecenter_refund SET refund_mny = ?, refund_status = ?, date =?, time =? , refund_slip = ? WHERE refund_id = ?'
    const values = [amount, status, currentDate, currentTime,image, id]

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
        image
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
        const sqlQuery = 'INSERT INTO mind_relaxing_pets (breed, name,  category, sex,image) VALUES(?,?,?,?,?)';
        const values = [
            breed,
            name,
            OriginalCategory,
            OriginalSex,
            image
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
export const petViewing = async (req, res, next) => {
    // const id = req.params.id
    const sqlQuery = 'SELECT * FROM mind_relaxing_pets'
    // const values = [id]

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// pet deleting
export const petDeleteing = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'DELETE FROM mind_relaxing_pets WHERE pet_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Deleted Successfully' })
    })
}

export const submit = async (req, res, next) => {
    const { first, last, email } = req.body
    console.log(first)
    const sqlQuery = "INSERT INTO employee(first_name,last_name,email)VALUES(?,?,?)"
    const checkvalue = [
        first,
        last,
        email
    ]
    db.query(sqlQuery, checkvalue, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internel error" })
        }
        return res.json({ message: "insert" })
    })
}

//grooming appointments viewing
export const get_groom_apo = async (req, res, next) => {
    const id = req.params.id

    if (id === '1') {
        const sqlQuery = "SELECT a.appointment_id,a.appointment_status,a.placed_date,a.client_email,a.verify_cancel_date ,a.early_cancel_date, p.price FROM carecenter_appointment a INNER JOIN carecenter_package p on a.package_id = p.package_id "

        db.query(sqlQuery, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    }
    if (id === '2') {
        const status = 'pending'
        const sqlQuery = "SELECT a.appointment_id,a.appointment_status,a.placed_date,a.client_email,a.verify_cancel_date ,a.early_cancel_date, p.price FROM carecenter_appointment a INNER JOIN carecenter_package p on a.package_id = p.package_id AND a.appointment_status = ?"
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    }
    if (id === '3') {
        const status = 'completed'
        const sqlQuery = "SELECT a.appointment_id,a.appointment_status,a.placed_date,a.client_email,a.verify_cancel_date ,a.early_cancel_date, p.price FROM carecenter_appointment a INNER JOIN carecenter_package p on a.package_id = p.package_id AND a.appointment_status = ?"
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    }
}
// GROOMING -> pending to completed
export const GroomingPendingToComplete = async(req,res,next) => {
    const {
        id
    } = req.body;
    const status = 'completed'

    const sqlQuery = 'UPDATE carecenter_appointment SET appointment_status = ? WHERE appointment_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values,(err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'completed'})
    })

}

// exercising appointments viewing
export const get_training = async (req, res, next) => {
    const id = req.params.id

    if (id === '1') {
        const sqlQuery = "SELECT t.id,t.placed_date,t.day,t.breed,t.client_email,t.early_cancel_date, t.verify_cancel_date, p.price,p.start,p.end, t.status FROM pet_trainning_payment t INNER JOIN pet_trainning_shedule p ON p.day = t.day"

        db.query(sqlQuery, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    }
    else if (id === '2') {
        const status = 'pending'
        const sqlQuery = "SELECT t.id,t.placed_date,t.day,t.breed,t.client_email,t.early_cancel_date, t.verify_cancel_date, p.price,p.start,p.end, t.status FROM pet_trainning_payment t INNER JOIN pet_trainning_shedule p ON p.day = t.day AND t.status = ?"
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    }
    else if (id === '3') {
        const status = 'completed'
        const sqlQuery = "SELECT t.id,t.placed_date,t.day,t.breed,t.client_email,t.early_cancel_date, t.verify_cancel_date, p.price,p.start,p.end, t.status FROM pet_trainning_payment t INNER JOIN pet_trainning_shedule p ON p.day = t.day AND t.status = ?"
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    }
    else if (id === '4') {
        const status = 'cancelled'
        const sqlQuery = "SELECT t.id,t.placed_date,t.day,t.breed,t.client_email,t.early_cancel_date, t.verify_cancel_date, p.price,p.start,p.end, t.status FROM pet_trainning_payment t INNER JOIN pet_trainning_shedule p ON p.day = t.day AND t.status = ?"
        const values = [status]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internel error' })
            }
            return res.json({ data })
        })
    }
}

// TRAINING -> pending to completed
export const TrainingPendingToComplete = async(req,res,next) => {
    const {
        id
    } = req.body;
    const status = 'completed'

    const sqlQuery = 'UPDATE pet_trainning_payment SET status = ? WHERE id = ?'
    const values = [status, id]

    db.query(sqlQuery, values,(err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'completed'})
    })

}


// get all emplyees
export const get_employee = async (req, res, next) => {
    // const id = req.params.id
    const status = 'active'
    const new_status = "working"
    const sqlQuery = "SELECT *FROM employee WHERE status = ? "
    const values = [status]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internel error" })
        }

        return res.json({ data })
    })
}


// set leave to emplyees
export const leave = async (req, res, next) => {
    const { id, dateStart, dateEnd } = req.body
    const sqlQuery = "UPDATE employee SET unfree_date_start = ? , unfree_date_end = ? WHERE emp_id = ?"
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

// mind relaxing apppointments viewing
export const mind_relaxing = async (req, res, next) => {
    const id = req.params.id

    if (id === '1') {
        const sqlQuery = 'SELECT a.appointment_id, a.timeslot_id, a.date, a.email, a.pet_id, a.status, t.start_time, t.end_time FROM mindrelaxing_appointments a INNER JOIN mind_relaxing_timeslots t WHERE a.timeslot_id = t.id'
        db.query(sqlQuery, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
    }
    else if (id === '2') {
        const status = 'pending'
        const sqlQuery = 'SELECT a.appointment_id, a.timeslot_id, a.date, a.email, a.pet_id, a.status, t.start_time, t.end_time FROM mindrelaxing_appointments a INNER JOIN mind_relaxing_timeslots t WHERE a.timeslot_id = t.id AND a.status = ?'
        const values = [status]
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })

    }
    else if (id === '3') {
        const status = 'completed'
        const sqlQuery = 'SELECT a.appointment_id, a.timeslot_id, a.date, a.email, a.pet_id, a.status, t.start_time, t.end_time FROM mindrelaxing_appointments a INNER JOIN mind_relaxing_timeslots t WHERE a.timeslot_id = t.id AND a.status = ?'
        const values = [status]
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })

    }
    else if (id === '4') {
        const status = 'cancelled'
        const sqlQuery = 'SELECT a.appointment_id, a.timeslot_id, a.date, a.email, a.pet_id, a.status, t.start_time, t.end_time FROM mindrelaxing_appointments a INNER JOIN mind_relaxing_timeslots t WHERE a.timeslot_id = t.id AND a.status = ?'
        const values = [status]
        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ data })
        })
    }
}

// complete pending appointment (pending -> completed)
export const CompletePending = async (req, res, next) => {
    const {
        id
    } = req.body;

    const status = 'completed'
    const sqlQuery = 'UPDATE mindrelaxing_appointments SET status = ? WHERE appointment_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'completed' })
    })
}

// remove all uncompleted appointments
export const removeUncompleted = async (req, res, next) => {
    const currentDate = new Date()
    const currentDateMinusOneDay = new Date(currentDate);
    currentDateMinusOneDay.setDate(currentDate.getDate() - 1);
    const status = 'pending'

    const sqlQuery = 'DELETE FROM mindrelaxing_appointments WHERE status = ? AND date < ?'
    const values = [status, currentDateMinusOneDay]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
        return res.json({message: 'There is an internal error'})
        }
        return res.json({message:'Deleted'})

    })
}

// submit add new emplyee form
export const submitNewEmployee = async(req,res,next) => {
    const {
        first,
        last,
        contact,
        empemail,
        type,
        image
    } = req.body;

    try {
        var originalType = ""
        if(type === 10) {
            originalType = "BATH"
        }else if(type === 20) {
            originalType = "BATH AND HAIR CUTS"
        }else if(type === 30) {
            originalType = "MINI GROOMING"
        }else if (type === 40) {
            originalType = "TRAINING"
        }

        const sqlQuery = 'INSERT INTO employee(first_name, last_name, email, contact_number, type,img) VALUES(?,?,?,?,?,?)'
        const values = [first, last, empemail, contact, originalType,image]
    
        db.query(sqlQuery, values,(err,data) => {
            if(err) {
                return res.json({message:'There is an internal error'})
            }
            return res.json({message:'success'})
        })
    }catch(err) {
        console.log(err)
    }  
}

// get id for confirmation box
export const getEmplyeeID =async(req,res,next) => {
    const id = req.params.id

    const sqlQuery = 'SELECT * FROM employee WHERE emp_id = ?'
    const values = [id]

    db.query(sqlQuery, values,(err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

} 

// submit confirmation form
export const submitConfirmationForm = async(req,res, next) => {
    const {
        id,
        reason
    } = req.body;

    const status = "removed"
    const sqlQuery = 'UPDATE employee SET status = ?, reason = ? WHERE emp_id = ?'
    const values = [status, reason, id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'Removed Successfully!'})
    })
}

export const assigned = async(req,res,next)=>{
    const {assigned}= req.body;
    const status = "working"
    const sqlQuery = "UPDATE employee SET unfree_date_start = ? , unfree_date_end = ? WHERE emp_id = ?"
    const values = [status,status,assigned]
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({message:'assigned'})
    })
}

// PACKAGES
// submit a new package - basic details
export const SubmitAddPackage = async(req,res,next) => {
    const {
        name,
        price,
        image
        
    } = req.body;

    const checkQuery = 'SELECT COUNT(package_id) AS count FROM carecenter_package'
    
    db.query(checkQuery,(err,data1) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }else if(data1[0].count === 3) {
           return res.json({message:'Already have 3 packages'})
       }

       const sqlQuery = 'INSERT INTO carecenter_package(package_name, price,symbol) VALUES (?,?,?)'
       const values = [name, price,image]

       db.query(sqlQuery, values, (err,data2) => {
           if(err) {
               return res.json({message:'There is an internal error'})
           }
           return res.json({message:'success'})
       })
    })
}

// get id and name for add facility form
export const getDetails = async(req,res,next) => {
    const sqlQuery = 'SELECT * FROM carecenter_package'

    db.query(sqlQuery, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// submit add facility form
export const submitFacilityForm = async(req,res,next) => {
    const {
        bpckg,
        newfacility
    }= req.body;

   

    const sqlQuery = 'INSERT INTO carecenter_package_facility (package_id, facility) VALUES(?,?)'
    const values = [bpckg, newfacility]

    db.query(sqlQuery, values,(err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'success'})
    })
}

// view facilities
export const viewFacilities = async(req,res,next) => {
    const id = req.params.id

    const sqlQuery = 'SELECT * FROM carecenter_package_facility WHERE package_id = ?'
    const values = [id]
    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}


// get price for update form
export const getPrice = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT * FROM carecenter_package WHERE package_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// submit price changes form
export const SubmitNewPrice = async(req,res,next) => {
    const {
        id,
        newprice,
    } = req.body;

    const sqlQuery = 'UPDATE carecenter_package SET price = ? WHERE package_id = ?'
    const values = [newprice, id]

    db.query(sqlQuery, values,(err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'updated'})
    })
}

// delete a package
export const deletePackage = async(req,res,next) => {
    const id = req.params.id1

    const sqlQuery = 'DELETE FROM carecenter_package WHERE package_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'deleted'})
    })

}
export const get_employee1 = async(req,res,next)=>{
    const status = "working"
    const new_status = "active"
    const sqlQuery = "select *from employee WHERE unfree_date_start !=? AND unfree_date_start !=? AND status = ?"
    const values = [status,status,new_status]
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel error'})
        }
        return res.json({data})
    })
}
