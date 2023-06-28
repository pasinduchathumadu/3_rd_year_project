import pkg from "object-hash";
import { LocalStorage } from "node-localstorage";
import { db } from "../database.js";
import { sendmailer } from '../controllers/email-controllers.js';

const localStorage = new LocalStorage('./scratch');
export const login = async (req, res, next) => {

  try {
    const hash = pkg;
    const { email, password } = req.body;

    const sqlQuery = 'SELECT * FROM users WHERE email = ? AND status = "Active"';
    const values = [email];

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
  const { email, password, user_role, first_name, last_name } = req.body;

  try {
    const hash = pkg;
    const date = new Date();
    const date_joined = date.toLocaleDateString();
    //status is not defined yet
    const status = "De-Active";



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
            localStorage.setItem("Temp_email", email);
           // console.log(localStorage.getItem("Temp_email"))

            sendmailer(req, res, verify_no, email, first_name);
            return res.json({ message: "Registration successful" });
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
