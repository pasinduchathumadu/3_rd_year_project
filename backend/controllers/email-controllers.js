import { db } from "../database.js"
import nodemailer from "nodemailer";
import Mailgen from 'mailgen';
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage('./scratch');
export const verify = async (req, res, next) => {

    const { entered_no } = req.body;

    const email = localStorage.getItem("Temp_email");


    try {
        const sqlQuery = 'SELECT  *from users WHERE email = ? ';
        const records = [
            email
        ]

        db.query(sqlQuery, records, (err, data) => {
            const verify_no = data[0].verify_no;

            if (verify_no === entered_no) {

                const update_query = "UPDATE users SET status = 'Active' WHERE email = ?";

                db.query(update_query, records, (err, data) => {
                    if (err) {
                        return res.json({ message: "There is an Enternal error" })

                    }
                    else {
                        localStorage.removeItem("Temp_email");
                        return res.json({ message: "Registered Succeed" })
                    }

                })
            }
            else {
                return res.json({ message: "Registration Failed" });
            }
        });
    } catch (err) {
        return res.json({ message: "There is an internel error" })

    }

}
export function sendmailer(res, req, verify_no, email, first_name) {
    const Email = 'happytails.pethub123@gmail.com';
    const Password = 'cjzwypoirwdcvpai';

    let config = {
        service: 'gmail',
        auth: {
            user: Email,
            pass: Password
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Happt Tails Pet-Hub",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: `${first_name}`,
            intro: "Registration Confimation Code",

            outro: `You are verification code : ${verify_no}`
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: Email,
        to: email,
        subject: "Account Verification",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.json({ message: "Registration Successful" })
    }).catch((err) => {
        return res.json({ message: "message not send" })
    })



}
export function confirmation(res, req, email) {
    const Email = 'happytails.pethub123@gmail.com';
    const Password = 'cjzwypoirwdcvpai';

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const verify_no = getRandomNumber(1000, 10000);

    let config = {
        service: 'gmail',
        auth: {
            user: Email,
            pass: Password
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Happt Tails Pet-Hub",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: `Verification Code`,


            outro: `You are verification code : ${verify_no}`
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: Email,
        to: email,
        subject: "Verify the Email",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        localStorage.setItem("Temp_otp", verify_no)
        return res.json({ message: "Message send" })
    }).catch((err) => {
        return res.json({ message: "Message not send" })
    })



};