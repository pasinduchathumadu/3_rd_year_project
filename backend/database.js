import bcryptjs from "bcryptjs"

import { createPool } from 'mysql';
export const db = createPool({
    host:"sql6.freesqldatabase.com",
    user:"sql6630302",
    password:"ItT6U6JiGh",
    database:"sql6630302"
})

db.getConnection((err,connection)=>{
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
      }
      console.log('Connected to MySQL database!');

})
