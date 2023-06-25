
import {db} from "../database.js";
import nodemailer from "nodemailer";
import Mailgen from 'mailgen';

export const verify = async (req,res,next)=>{

    
    const Email='pasindugura123@gmail.com';
    const Password='uaboerybjbjphlir';
  
    const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: Email,
            pass: Password
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Daily Tuition",
            intro: "Your bill has arrived!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : Email,
        to : userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
}