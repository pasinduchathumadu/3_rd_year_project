import { createPool } from 'mysql';
export const db = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"pet_care"
})
db.query(`select *from all_user`,(err,result)=>{
    if(err){
        console.log("Database Is Not Connected!!!");
    }
    else{
        console.log("Established the database connection successfully!!!!");
    }
})

