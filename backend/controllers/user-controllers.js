import bcrypt from "bcryptjs";
import {db} from "../database.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const sqlQuery = 'SELECT * FROM all_user WHERE email = ?';
      const values = [email,password];
      db.query(sqlQuery,[values[0]], (error, results) => {
        if (results.length==0) {
         
          return res.json({ message: 'Username or password incorrect' });
        }
  
        // Login successful
        return res.json({results});
      });
    } catch (error) {
      console.log('Error executing query:', error);
      res.json({ error: 'Internal server error' });
    }
  };
  