import { db } from '../database.js'
import pkg from "object-hash"
import QRCode from 'qrcode'
import nodemailer from "nodemailer"
import Mailgen from 'mailgen'



export const registration = async (req, res, next) => {

    const { email, contact_number, nic, user_role, manager_id, password, first, last } = req.body
    const hash = pkg
    const date = new Date()
    const date_joined = date.toLocaleDateString();
    const status = 'Active'
    const hashedPassword = hash.MD5(password)
    const qrCodeValue = `Your Login Password : ${password} `

    const query1 = 'SELECT *FROM users WHERE email = ?'
    const values2 = [
        email
    ]
    db.query(query1, values2, (err, data) => {
        if (data.length>0) {
            return res.json({ message: "exist this email" })
        }
        else {
            const query2 = 'select *from manager where user_id = ?'
            const records = [
                manager_id

            ]
            db.query(query2, records, (err, data) => {
                if (data.length>0) {
                    return res.json({ message: "id is exist" })
                }
            })


            const sqlQuery =
                'INSERT INTO users (email, password, user_role, status, date_joined, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?)'
            const values = [
                email,
                hashedPassword,
                user_role,
                status,
                date_joined,
                first,
                last,
            ]
            db.query(sqlQuery, values, (err, data) => {
                if (err) {
                    return res.json({ message: "There is an internel error" })
                }
                else {
                    const query = 'INSERT INTO manager (email,user_id,nic,user_role,contact_number)VALUES(?,?,?,?,?)'
                    const values1 = [
                        email,
                        manager_id,
                        nic,
                        user_role,
                        contact_number
                    ]
                    db.query(query, values1, async (err, data) => {
                        if (err) {

                            return res.json({ message: "failed" })

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


                    })
                }
            })

        }
    })
}

