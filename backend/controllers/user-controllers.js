import bcrypt from "bcryptjs";
import {db} from "../database.js";

export const login = async (req, res, next) => {
    try {
      const sqlQuery = 'SELECT * FROM all_user where (email = ? AND password = ?)AND status = 1 Limit 1';
      const values = [
        req.body.email,
        req.body.password

      ]
      db.query(sqlQuery,values,(err, data)=> {
        if (data.length==0) {
         
          return res.json({ message: 'Username or password incorrect!!' });
        }

       
        const role = data[0].user_role;
        if(role == "manager"){
          return res.json({message:"manager"});
        }
        // Login successful
        return res.json({data});
      });
    } catch (error) {
      console.log('Error executing query:', error);
      res.json({ error: 'Internal server error' });
    }
  };
  