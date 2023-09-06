import pkg from 'object-hash'
import { db } from '../database.js'

import QRCode from 'qrcode'
import nodemailer from "nodemailer"
import Mailgen from 'mailgen'

// ---- USERS ----
export const registration = async (req, res, next) => {
    const { email, first, second, id, contact, city, Street, role } = req.body;
    try {
        const hash = pkg;
        const date = new Date();
        const date_joined = date.toLocaleDateString();
        const status = 'Active';

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const verify_no = getRandomNumber(1000, 10000);

        const hashedPassword = hash.MD5(verify_no.toString());
        console.log(hashedPassword)
        const qrCodeValue = `Your Login Password : ${verify_no} `;

        const query1 = 'SELECT * FROM users WHERE email = ?';
        const values2 = [email];

        db.query(query1, values2, (err, data) => {
            if (err) {
                return res.json({ message: "There is an internal error" });
            }

            if (data.length > 0) {
                return res.json({ message: "Email already exists" });
            }

            const query2 = 'SELECT * FROM manager WHERE manager_id = ?';
            const records = [id];


            var user_role = " "
            if (role === 30) {
                user_role = "online_store_manager"
            }
            else if (role === 20) {
                user_role = "boarding_house_manager"
            }
            else if (role === 40) {
                user_role = "care_center_manager"
            }
            else if (role === 10) {
                user_role = "medi_help_manager"
            }
            else if (role === 50) {
                user_role = "company_manager"
            }
            db.query(query2, records, (err, managerData) => {
                if (err) {
                    return res.json({ message: "There is an internal error" });
                }

                if (managerData.length > 0) {
                    return res.json({ message: "Manager ID already exists" });
                }

                const sqlQuery =
                    'INSERT INTO users (email, password, first_name, last_name, user_role, date_joined, status, verify_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [
                    email,
                    hashedPassword,
                    first,
                    second,
                    user_role,
                    date_joined,
                    status,
                    verify_no
                ];

                db.query(sqlQuery, values, (err, userData) => {
                    if (err) {
                        return res.json({ message: "There is an internal error" });
                    }

                    const query = 'INSERT INTO manager (email,manager_id, user_role, contact_number, street, city) VALUES (?, ?, ?, ?, ?, ?)';
                    const values1 = [
                        email,
                        id,
                        user_role,
                        contact,
                        Street,
                        city
                    ];

                    db.query(query, values1, async (err, managerData) => {
                        if (err) {
                            return res.json({ message: "Failed to insert into manager" });
                        }

                        try {
                            const Email = 'happytails.pethub123@gmail.com';
                            const Password = 'cjzwypoirwdcvpai';


                            const transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: Email,
                                    pass: Password
                                }
                            });
                            const qrCodeDataURL = await QRCode.toDataURL(qrCodeValue)


                            const mailOptions = {
                                from: Email,
                                to: email,
                                subject: 'QR Code Email',
                                html: '<p>Please find the QR code attached.</p>',
                                attachments: [
                                    {
                                        filename: 'qrcode.png',
                                        content: qrCodeDataURL.split(';base64,').pop(),
                                        encoding: 'base64'
                                    }
                                ]
                            }
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    return res.json({ message: "message not send" })

                                } else {
                                    return res.json({ message: "success" })
                                }
                            })
                        } catch (err) {
                            console.log(err)

                        }

                    });
                });
            });
        });

    } catch (err) {
        console.log(err)
    }

};
export const get_manager = async (req, res, next) => {
    const role = 'client'
    const sqlQuery = 'SELECT manager.manager_id,users.email , CONCAT(users.first_name," ",users.last_name) AS full_name ,manager.user_role , manager.contact_number,CONCAT(manager.city," ",manager.street) AS address FROM users INNER JOIN manager ON users.email = manager.email where manager.user_role != ?'
    const values = [
        role
    ]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internel an error' })
        }
        return res.json({ data })
    })
}

export const get_client = async (req, res, next) => {
    const role = 'client'
    const sqlQuery = 'SELECT c.client_id as id, c.email as email, c.contact_number as contact, CONCAT(c.street," ",c.city) as address, c.status as category, CONCAT(u.first_name, " ", u.last_name) as name FROM client as c INNER JOIN  users as u ON c.email = u.email WHERE u.user_role=? ';
    const values = [role]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })

}

// get detaisl for update manager
export const ManagerDetails = async (req, res, next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT CONCAT(u.first_name, " ", u.last_name) as name, u.email, m.manager_id, m.contact_number, m.street, m.city from users u INNER JOIN manager m ON u.email=m.email WHERE m.manager_id = ? '
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })

}

// update a manager
export const FinishUpdate = async (req, res, next) => {
    const {
        id,
        newcontact,
        newstreet,
        newcity,
    } = req.body;

    const sqlQuery = 'UPDATE manager SET contact_number = ? , street = ?, city =? WHERE manager_id = ?'
    const values = [newcontact, newstreet, newcity, id]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Updated' })
    })
}

// delete a manager
export const deleteManager = async (req, res, next) => {
    const id = req.params.id

    const checkQuery = 'SELECT email FROM manager WHERE manager_id = ?'
    const checkValues = [id]

    db.query(checkQuery, checkValues, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }

        const sqlQuery = 'DELETE FROM users WHERE email = ?'
        const values = [data[0].email]

        db.query(sqlQuery, values, (err, data) => {
            if (err) {
                return res.json({ message: 'There is an internal error' })
            }
            return res.json({ message: 'Deleted Successfully' })
        })

    })
}

// delete client
export const deleteClient = async(req,res,next) => {
    const id = req.params.id

    const checkQuery = 'SELECT email FROM client WHERE client_id = ?'
    const checkValues = [id]

    db.query(checkQuery, checkValues, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal errrrrrror'})
        }
        const sqlQuery = 'DELETE FROM users where email = ?'
        const values = [data[0].email]
        // console.log(values[0])

        db.query(sqlQuery, values,(err,data) => {
            if(err) {
                return res.json({message:'There is an internal error'})
            }
            return res.json({message:'Deleted Successfully'})
        })
    })
}

// clients pet viewing
export const viewPetDetails = async(req,res, next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT * FROM pet WHERE client_id = ? '
    const values = [id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
    
}

// --- DASHBOARD ---
// count managers
export const countManagers = async (req, res, next) => {
    const sqlQuery = 'SELECT COUNT(manager_id) as count from manager;'

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// count managers
export const countClients = async (req, res, next) => {
    const sqlQuery = 'SELECT COUNT(client_id) as count from client;'

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })

}

// count managers complains separetly
export const countComplains = async (req, res, next) => {
    const sqlQuery = 'SELECT (SELECT COUNT(manager_id) FROM manager_complain WHERE complain_status = "pending") AS pending_com, (SELECT COUNT(manager_id) FROM manager_complain WHERE complain_status = "completed") AS completed_com';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// all refund verfication count 
export const countRefund = async (req, res, next) => {
    const sqlQuery = 'SELECT (SELECT COUNT(refund_id) FROM boarding_refund WHERE admin_verification = "pending" AND refund_status = "completed") AS boarding_pending, (SELECT COUNT(refund_id) FROM boarding_refund WHERE admin_verification != "pending" AND refund_status = "completed") AS boarding_completed, (SELECT COUNT(refund_id) FROM carecenter_refund WHERE admin_verification = "pending" AND refund_status = "completed") AS carecenter_pending, (SELECT COUNT(refund_id) FROM carecenter_refund WHERE admin_verification != "pending" AND refund_status = "completed") AS carecenter_completed'

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
      
        return res.json({ data})
    })
}

// count clients pets
export const countClientPets = async(req,res,next) => {
    const sqlQuery = 'SELECT COUNT(pet_id) AS count FROM pet';

    db.query(sqlQuery, (err, data) => {
        if(err) {
            return res.json({message: 'There is an internal error'})
        }
        return res.json({data})
    })
}

// --- COMPLAINS ---
// view clients complains
export const clientComplains = async (req, res, next) => {
    const sqlQuery = 'SELECT * from client_complain';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// view managers complains
export const managerComplains = async (req, res, next) => {
    const sqlQuery = 'SELECT * from manager_complain';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// add response for manager complain - view details
export const addResponse = async (req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT * FROM manager_complain WHERE complain_id = ?'
    const values = [id]

    db.query(sqlQuery, values,(err, data) => {
        if(err) {
            return res.json({message: 'There is an internal error'})
        }
        return res.json({data})
    })
}

// add response for manager complain - add response
export const submitResponse = async (req,res,next) => {
    const {
        id1,
        addres
    } = req.body;

    console.log(id1)

    const current = new Date()
    const currentdate = current.toDateString()
    const status = 'completed'

    const sqlQuery = 'UPDATE manager_complain SET response_txt = ? , response_date = ?, complain_status = ? WHERE complain_id = ?'
    const values = [addres, currentdate, status, id1]

    db.query(sqlQuery, values,(err,data) => {
        if(err) {
            return res.json({message:'There is an internal errrrror'})
        }
        return res.json({message:'Added response'})
    })
}

// --- REFUND VERIFICATIONS --- / BOARDING HOUSE
// boarding - refund viewing
export const boardingRefund = async (req, res, next) => {
    const sqlQuery = 'SELECT * FROM boarding_refund WHERE refund_status = "completed" ';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// view refunded verification done details
export const viewRefundDetails = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_slip, r.admin_verification, b.acc_no, b.branch, b.bank FROM boarding_refund r INNER JOIN client_bankdetails b ON r.client_id = b.client_id WHERE r.refund_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}

// view bank slips for verifications
export const viewSlipDetails = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_id, r.refund_slip,  b.acc_no, b.branch, b.bank FROM boarding_refund r INNER JOIN client_bankdetails b ON r.client_id = b.client_id WHERE r.refund_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// admin verified the bank slip
export const AdminVerify = async(req,res,next) => {
    const {
        id 
    } = req.body;

    const status = 'verified'
    const sqlQuery = 'UPDATE boarding_refund SET admin_verification = ? WHERE refund_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'verified'})
    })
}

// admin rejected the bank slip
export const AdminRejected = async(req,res,next) => {
    const {
        id
    } = req.body ;

    const status = 'rejected'
    const sqlQuery = 'UPDATE boarding_refund SET admin_verification = ? WHERE refund_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'rejected'})
    })

}

// --- REFUND VERIFICATIONS --- /  CARE CENTER
// care center - refund viewing
export const carecenterRefund = async (req, res, next) => {
    const sqlQuery = 'SELECT * FROM carecenter_refund WHERE refund_status = "completed" ';

    db.query(sqlQuery, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// view refunded verification done details
export const viewRefundccDetails = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_slip, r.admin_verification, b.acc_no, b.branch, b.bank FROM carecenter_refund r INNER JOIN client_bankdetails b ON r.email = b.email WHERE r.refund_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}

// view bank slips for verifications
export const viewSlipDetailscc = async(req,res,next) => {
    const id = req.params.id
    const sqlQuery = 'SELECT r.refund_id, r.refund_slip,  b.acc_no, b.branch, b.bank FROM carecenter_refund r INNER JOIN client_bankdetails b ON r.email = b.email WHERE r.refund_id = ?'
    const values = [id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })
}

// admin verified the bank slip
export const AdminVerifycc = async(req,res,next) => {
    const {
        id 
    } = req.body;

    const status = 'verified'
    const sqlQuery = 'UPDATE carecenter_refund SET admin_verification = ? WHERE refund_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err, data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'verified'})
    })
}

// admin rejected the bank slip
export const AdminRejectedcc = async(req,res,next) => {
    const {
        id
    } = req.body ;

    const status = 'rejected'
    const sqlQuery = 'UPDATE carecenter_refund SET admin_verification = ? WHERE refund_id = ?'
    const values = [status, id]

    db.query(sqlQuery, values, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({message:'rejected'})
    })

}