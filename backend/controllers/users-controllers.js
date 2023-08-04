import pkg from 'object-hash';
import { LocalStorage } from "node-localstorage";
import { db } from "../database.js";
import { sendmailer} from '../controllers/email-controllers.js';
import { confirmation } from "../controllers/email-controllers.js";
import multer from 'multer'




const localStorage = new LocalStorage('./scratch');
export const login = async (req, res, next) => {

  try {
    const hash = pkg;
    const { email, password } = req.body;

    const sqlQuery = 'SELECT * FROM users WHERE email = ? AND status = "Active"';
    const values = [
      email,
      password
    ];

    const query3 = "DELETE FROM users WHERE status = 'De-Active'"
  
    db.query(query3,(err,data)=>{
      if(err){
        return res.json({message:"There is an internal error"})
      }
    })

    db.query(sqlQuery,[values[0]],(err, data) => {
    
      if (data.length === 0) {
        return res.status(200).json({ message: "User not found" });
      } else {
        const original = data[0].password;
        const userInputHash = hash.MD5(password)
        if (userInputHash === original) {
         
          return res.status(200).json({data});
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
  const { email, password, first_name, last_name, street, city, contact_number } = req.body;

  try {
    const hash = pkg;
    const date = new Date();
    const date_joined = date.toLocaleDateString();
    const user_role = 'client'
  
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
          'INSERT INTO users (email, password,first_name, last_name, user_role, status, date_joined,verify_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const records = [
          email,
          hashedPassword,
          first_name,
          last_name,
          user_role,
          status,
          date_joined,
          verify_no
        ];

        db.query(sqlQuery, records, (err, data) => {
          if (err) {
            console.log("Registration failed:", err);
            return res.json({ message: "Registration failed" });
          } else {
            //set temporary email to confirmation registration

            localStorage.setItem("Temp_email", email)
            const query2 = "INSERT INTO client (email,contact_number,street,city)VALUES(?,?,?,?)";
            const values1 = [
              email,
              contact_number,
              street,
              city
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
  const { new_password, confirm } = req.body;
  const email = localStorage.getItem('Forget_email');
 
  // Validate input data
  if (!new_password || !confirm) {
    
    return res.json({ message: 'All fields are required.' });
  }

   

    // If the new password and confirm password match
    if (new_password === confirm) {
      const hashedPassword = hash.MD5(new_password);

      const sqlQuery = 'UPDATE users SET password = ? WHERE email = ?';
      const updateValues = [hashedPassword, email];

      db.query(sqlQuery, updateValues, (err, data) => {
        if (err) {
          console.error('Database error:', err);
          return res.json({ message: 'Password was not changed.' });
        } else {
          localStorage.removeItem('Forget_email');
          return res.json({ message: 'Password Changed.' });
        }
      });
    } else {
      return res.json({ message: 'New password and confirm password do not match.' });
    }

   
  
  
  
      
 
}
export const forget_confirmation = async (req, res, next) => {
  const { otp } = req.body
  const verify_no = localStorage.getItem("Temp_otp")
 
  if (otp == verify_no) {
    localStorage.removeItem("Temp_otp")
    return res.json({ message: "Valid Number" })
  }
  return res.json({ message: "Invalid Number" })
}

export const upload_file = async(req,res,next)=>{

  const filestorage =multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'images/store');
    },
    filename:(req,file,cb)=>{
      cb(null,  file.originalname);
      console.log(file.originalname)
    },
  
    
  });

  const upload = multer({storage:filestorage})
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      // Handle the error accordingly.
      console.error(err);
      return res.json({ error: 'Multer error occurred' });
    } else if (err) {
      // An unknown error occurred when uploading.
      // Handle the error accordingly.
      console.error(err);
      return res.json({ error: 'Unknown error occurred' });
    }

    // File upload was successful.
    // Access the uploaded file using `req.file`.
    // Process the file and send the response.

    return res.json({ message: 'File uploaded successfully' });
  });

}

export const get_store = async(req,res,next) =>{
  const id = req.params.id;
  var item_catogery = ""
  if(id === '0'){
    item_catogery = "Dogs"
  }
  else if(id === '1'){
    item_catogery = "Cats"
  }
  const sqlQuery ="SELECT * FROM item WHERE item = ?"
  const values = [
    item_catogery
  ]
  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    else{
      return res.json({data})
    }
  })
}

export const temp_cart = async(req,res,next)=>{
  const {id , email,price } = req.body
  const sqlQuery1 = "SELECT *FROM temporary_card WHERE email = ? AND item_id = ?"
  const values1 = [
    email,
    id
  ]
  db.query(sqlQuery1,values1,(err,data)=>{
    if(err){
      return res.json({message:'There is an error'})
    }
    else if(data.length>0){
      return res.json({message:'already in the cart'})
    }
    else{
      const sqlQuery = "Insert Into temporary_card (item_id,email,total)VALUES(?,?,?)"
      const values = [
        id,
        email,
        price
      ]
      db.query(sqlQuery,values,(err,data)=>{
        if(err){
          return res.json({message:'There is an internel error'})
        }
        else{
          return res.json({message:'added'})
        }
      })

    }
  })
 
}

export const load_cart = async(req,res,next) =>{
  const email = req.params.id


  const sqlQuery = "SELECT item.item_id, item.name, item.unit_price, item.image, item.description, temporary_card.quantity FROM item INNER JOIN temporary_card ON item.item_id = temporary_card.item_id where temporary_card.email = ? ";


  const values = [
    email
  ]

  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    else{
      return res.json({data})
    }
  })
}

export const increase = async(req,res,next)=>{
  const {email,itemId,quantity,price} = req.body
  const new_quantity = quantity+1
  const new_price = price * new_quantity

 
  const sqlQuery = "UPDATE temporary_card SET quantity = ? , total = ? WHERE email = ? AND item_id = ?"
  const values = [
    new_quantity,
    new_price,
    email,
    itemId
  ]
  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    else{
      return res.json({message:'updated'})
    }
  })
}
export const decrease = async(req,res,next)=>{
  const {email,itemId,quantity,price} = req.body
  var new_quantity = 0
  if(quantity === 1){
    new_quantity =1
  }
  else{
    new_quantity = quantity-1
  }

  const new_price = price * new_quantity


 
  const sqlQuery = "UPDATE temporary_card SET quantity = ? , total = ?  WHERE email = ? AND item_id = ?"
  const values = [
    new_quantity,
    new_price,
    email,
    itemId
  ]
  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    else{
      return res.json({message:'updated'})
    }
  })
}

export const total = async(req,res,next) => {
  const {email} = req.body
  const sqlQuery = "SELECT SUM(total) AS total FROM temporary_card WHERE email = ?"
  const values = [
    email
  ]

  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    else{
      return res.json({data})
    }
  })
}

export const load_payement = async(req,res,next)=>{
  const id = req.params.id
  const values = [id]
  const sqlQuery = "SELECT  temporary_card.quantity,temporary_card.total,item.name,item.unit_price FROM temporary_card INNER JOIN item ON item.item_id = temporary_card.item_id WHERE temporary_card.email = ?"
  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an error'})
    }
    else{
      return res.json({data})
    }
  })
}

export const load_total = async(req,res,next)=>{
  const id = req.params.id
  const values = [id]
 
  const sqlQuery = "SELECT SUM(total) AS new2 FROM temporary_card WHERE email = ?"
  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    else{
      return res.json({data})
    }
  })
}