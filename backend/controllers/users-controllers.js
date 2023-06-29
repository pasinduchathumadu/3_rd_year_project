import pkg from "object-hash";
import { LocalStorage } from "node-localstorage";
import { db } from "../database.js";
import { sendmailer} from '../controllers/email-controllers.js';
import { confirmation } from "../controllers/email-controllers.js";


const localStorage = new LocalStorage('./scratch');
export const login = async (req, res, next) => {

  try {
    const hash = pkg;
    const { email, password } = req.body;

    const sqlQuery = 'SELECT * FROM users WHERE email = ? AND status = "Active"';
    const values = [email];

    const query3 = "DELETE FROM users WHERE status = 'De-Active'"
  
    db.query(query3,(err,data)=>{
      if(err){
        return res.json({message:"There is an internal error"})
      }
    })

    db.query(sqlQuery, values, async (err, data) => {
      // console.log(data)
      if (data.length === 0) {
        return res.json({ message: "User not found" });
      } else {
        const original = data[0].password;
        const userInputHash = hash.MD5(password)
        if (userInputHash === original) {
          return res.json({ message: "Password Match" });
        } else {
          return res.json({ message: "Password didn't Matched" });
        }

      }
    })

  } catch (err) {
    console.log('Error executing query:', err);
    res.json({ message: 'Internal server error' });
  }
};

export const signup = async (req, res, next) => {
  const { email, password, user_role, first_name, last_name, street, city, contact_number, nic, account_number, bank, branch } = req.body;

  try {
    const hash = pkg;
    const date = new Date();
    const date_joined = date.toLocaleDateString();
    //status is not defined yet
    const status = "De-Active";



    //random number
    const hashedPassword = hash.MD5(password);

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
   
    const verify_no = getRandomNumber(1000, 10000);

    const query1 = 'SELECT * FROM users WHERE email = ?';
    const first_records = [email];

    db.query(query1, first_records, (err, data) => {
      if (data.length === 0) {
        const sqlQuery =
          'INSERT INTO users (email, password, user_role, status, date_joined, first_name, last_name, verify_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const records = [
          email,
          hashedPassword,
          user_role,
          status,
          date_joined,
          first_name,
          last_name,
          verify_no,
        ];

        db.query(sqlQuery, records, (err, data) => {
          if (err) {
            console.log("Registration failed:", err);
            return res.json({ message: "Registration failed" });
          } else {
            //set temporary email to confirmation registration

            localStorage.setItem("Temp_email", email)
            const query2 = "INSERT INTO client (email,contact_number,street,city,nic,account_number,bank,branch)VALUES(?,?,?,?,?,?,?,?)";
            const values1 = [
              email,
              contact_number,
              street,
              city,
              nic,
              account_number,
              bank,
              branch
            ]
            db.query(query2, values1, (err, data) => {
              if (err) {
                return res.json({ message: "There is an internal error!!" })
              }
              else {
                sendmailer(res,req,verify_no, email, first_name)
                 
              }
            })


          }
        });
      } else {
        return res.json({ message: "This email is already exist!!!" });
      }
    });

  } catch (err) {
    console.log(err);
    return res.json({ error: "Internal server error" });
  }
};
export const forget_password = async (req, res, next) => {
  const { email } = req.body;
  const query = 'select *from users WHERE email = ?';
  const values = [
    email
  ]
  db.query(query,values,(err,data)=>{
    if(data.length===0){
      return res.json({message:"Not in system"})
    }
    else{
      localStorage.setItem("Forget_email",email)     
      confirmation(res,req,email)
    }
  })
  
}
export const reset_password = async (req, res, next) => {
  const hash = pkg;
  const {new_password, old_password} = req.body
  const email = localStorage.getItem("Forget_email")
 
  if(new_password == old_password){
    
    
    const hashedPassword = hash.MD5(new_password);

    const sqlQuery = "UPDATE users SET password = ? WHERE email = ?"
    const values = [
      hashedPassword,
      email
      
    ]
    db.query(sqlQuery,values,(err,data)=>{
    
      if(err){
        return res.json({message:"Password iS not changed"})
      }
      else{
        localStorage.removeItem("Forget_email")
        
        return res.json({message:"Password Changed"})
      }
    })
  }




}
export const forget_confirmation = async (req, res, next) => {
  const { otp } = req.body
  const verify_no = localStorage.getItem("Temp_otp")
  console.log(verify_no)
  console.log(otp)
  if (otp == verify_no) {
    localStorage.removeItem("Temp_otp")
    return res.json({ message: "Valid Number" })
  }
  return res.json({ message: "Invalid Number" })
}
