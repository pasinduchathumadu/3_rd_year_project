import bcryptjs from "bcryptjs"

import { createPool } from 'mysql';
export const db = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"pet_care"
})

db.getConnection((err,connection)=>{
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
      }
      console.log('Connected to MySQL database!');
})
