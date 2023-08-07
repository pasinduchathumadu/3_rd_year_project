
import { db } from '../database.js'
import pkg from "object-hash"
import QRCode from 'qrcode'
import nodemailer from "nodemailer"
import Mailgen from 'mailgen'
export const registration = async (req, res, next) => {
    const { email, first, second, id, contact, city, Street, role } = req.body;
    const hash = pkg;
    const date = new Date();
    const date_joined = date.toLocaleDateString();
    const status = 'Active';

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const verify_no = getRandomNumber(1000, 10000);
    const hashedPassword = hash.MD5(verify_no);
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
        if(role === 30){
            user_role = "online_store_manager"
        }
        else if(role === 20){
            user_role = "boarding_house_manager"
        }
        else if(role === 40){
            user_role = "care_center_manager"
        }
        else if(role === 10){
            user_role = "medi_help_manager"
        }
        else if(role === 50){
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
                               return res.json({message:"success"})
                            }
                        })
                    } catch (err) {
                        console.log(err)

                    }

                });
            });
        });
    });
};
export const get_manager = async(req,res,next)=>{
    const role = 'client'
    const sqlQuery = 'SELECT manager.manager_id,users.email , CONCAT(users.first_name," ",users.last_name) AS full_name ,manager.user_role , manager.contact_number,CONCAT(manager.city," ",manager.street) AS address FROM users INNER JOIN manager ON users.email = manager.email where manager.user_role != ?'
    const values = [
        role
    ]
    db.query(sqlQuery,values,(err,data)=>{
        if(err){
            return res.json({message:'There is an internel an error'})
        }
        return res.json({data})
    })
}