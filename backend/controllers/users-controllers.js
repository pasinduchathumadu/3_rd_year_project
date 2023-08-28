import pkg from 'object-hash';
import { LocalStorage } from "node-localstorage";
import { db } from "../database.js";
import { sendmailer } from '../controllers/email-controllers.js';
import { confirmation } from "../controllers/email-controllers.js";
import multer from 'multer'




const localStorage = new LocalStorage('./scratch');
export const login = async (req, res, next) => {

  try {
    const hash = pkg;
    const { email, password } = req.body;
    console.log(password)
    const sqlQuery = 'SELECT * FROM users WHERE email = ? AND status = "Active"';
    const values = [
      email,
      password
    ];

    const query3 = "DELETE FROM users WHERE status = 'De-Active'"

    db.query(query3, (err, data) => {
      if (err) {

        return res.json({ message: "There is an internal error" })
      }
    })

    db.query(sqlQuery, [values[0]], (err, data) => {

      if (data.length === 0) {
        return res.status(200).json({ message: "User not found" });
      } else {
        const original = data[0].password;
        const userInputHash = hash.MD5(password)
        if (userInputHash === original) {
          console.log(userInputHash)
          console.log(original)


          return res.json({ data });
        } else {
          console.log(userInputHash)
          console.log(original)
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
                sendmailer(res, req, verify_no, email, first_name)

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
  db.query(query, values, (err, data) => {
    if (data.length === 0) {
      return res.json({ message: "Not in system" })
    }
    else {
      localStorage.setItem("Forget_email", email)
      confirmation(res, req, email)
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

export const upload_file = async (req, res, next) => {

  const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/store');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
      console.log(file.originalname)
    },


  });

  const upload = multer({ storage: filestorage })
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

export const get_store = async (req, res, next) => {
  const id = req.params.id;
  var item_catogery = ""
  if (id === '0') {
    item_catogery = "Dogs"
  }
  else if (id === '1') {
    item_catogery = "Cats"
  }
  const sqlQuery = "SELECT * FROM item WHERE item = ?"
  const values = [
    item_catogery
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    else {
      return res.json({ data })
    }
  })
}

export const temp_cart = async (req, res, next) => {
  const { id, email, price } = req.body
  const status = "pending"
  const sqlQuery1 = "SELECT *FROM temporary_card WHERE email = ? AND item_id = ? AND status = ?"
  const values1 = [
    email,
    id,
    status
  ]
  db.query(sqlQuery1, values1, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an error' })
    }
    else if (data.length > 0) {
      return res.json({ message: 'already in the cart' })
    }
    else {
      const sqlQuery = "Insert Into temporary_card (item_id,email,total)VALUES(?,?,?)"
      const values = [
        id,
        email,
        price
      ]
      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          return res.json({ message: 'There is an internel error' })
        }
        else {
          return res.json({ message: 'added' })
        }
      })

    }
  })

}

export const load_cart = async (req, res, next) => {
  const email = req.params.id
  const status = "pending"

  const sqlQuery = "SELECT item.item_id, item.name, item.unit_price, item.image, item.description, temporary_card.quantity FROM item INNER JOIN temporary_card ON item.item_id = temporary_card.item_id where temporary_card.email = ? AND temporary_card.status = ? ";


  const values = [
    email,
    status
  ]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    else {
      return res.json({ data })
    }
  })
}

export const increase = async (req, res, next) => {
  const { email, itemId, quantity, price } = req.body
  const new_quantity = quantity + 1
  const new_price = price * new_quantity
  const status = "pending"


  const sqlQuery1 = "SELECT *FROM item WHERE item_id = ?"
  const values1 = [
    itemId
  ]

  db.query(sqlQuery1, values1, (err, data) => {
    if (new_quantity <= data[0].quantity) {
      const sqlQuery = "UPDATE temporary_card SET quantity = ? , total = ? WHERE email = ? AND item_id = ? AND status = ?"
      const values = [
        new_quantity,
        new_price,
        email,
        itemId,
        status

      ]
      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          return res.json({ message: 'There is an internel error' })
        }
        else {
          return res.json({ message: 'updated' })
        }
      })

    }
  })






}
export const decrease = async (req, res, next) => {
  const { email, itemId, quantity, price } = req.body
  const status = "pending"
  var new_quantity = 0
  if (quantity === 1) {
    new_quantity = 1
  }
  else {
    new_quantity = quantity - 1
  }

  const new_price = price * new_quantity



  const sqlQuery = "UPDATE temporary_card SET quantity = ? , total = ?  WHERE email = ? AND item_id = ? AND status = ?"
  const values = [
    new_quantity,
    new_price,
    email,
    itemId,
    status
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    else {
      return res.json({ message: 'updated' })
    }
  })
}

export const total = async (req, res, next) => {
  const { email } = req.body
  const status = "pending"
  const sqlQuery = "SELECT SUM(total) AS total FROM temporary_card WHERE email = ? AND status = ?"
  const values = [
    email,
    status
  ]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    else {
      return res.json({ data })
    }
  })
}

export const load_payement = async (req, res, next) => {
  const id = req.params.id
  const status = "pending"
  const values = [id, status]

  const sqlQuery = "SELECT  temporary_card.quantity,temporary_card.total,item.name,item.unit_price FROM temporary_card INNER JOIN item ON item.item_id = temporary_card.item_id WHERE temporary_card.email = ? AND temporary_card.status = ?"
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an error' })
    }
    else {
      return res.json({ data })
    }
  })
}

export const load_total = async (req, res, next) => {
  const id = req.params.id
  const status = "pending"
  const values = [id, status]

  const sqlQuery = "SELECT SUM(total) AS new2 FROM temporary_card WHERE email = ? AND status = ?"
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    else {
      return res.json({ data })
    }
  })
}

export const delete_cart = async (req, res, next) => {
  const { id, email } = req.body
  const status = "pending"
  const sqlQuery = "DELETE FROM temporary_card WHERE item_id = ? AND email = ? AND status = ?"
  const values = [
    id,
    email,
    status
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" })
    }
    else {
      return res.json({ message: 'deleted' })
    }
  })
}

export const final_payment = async (req, res, next) => {

  const { date, time, shipping, contact, delivery, card, email, payment } = req.body;
  var original_delivery = ""
  if (delivery === '10') {
    original_delivery = "Currier"
  }
  else if (delivery === '20') {
    original_delivery = "Physically"
  }
  var original_card = ""
  if (card === "30") {
    original_card = "Credit"
  }
  else if (card === "40") {
    original_card = "Debit"
  }
  const sqlQuery = 'INSERT INTO purchase_order (collecting_method,payment,placed_time,placed_date,shipping_address,shipping_number,payment_method,order_email)VALUES(?,?,?,?,?,?,?,?)'
  const values = [original_delivery, payment, time, date, shipping, contact, original_card, email];
  db.query(sqlQuery, values, (err, data) => {
    if (err) {

      return res.json({ message: "There is an internel error" })
    }
    else {

      return res.json({ message: "success" })
    }
  })
}

export const back = async (req, res, next) => {
  const { id } = req.body;
  const status = "pending"
  const sqlQuery = "DELETE FROM purchase_order WHERE order_email = ? AND po_status = ?"
  const values = [
    id,
    status
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    else {
      return res.json({ message: 'back' })
    }
  })
}

export const date_client = async (req, res, next) => {
  const { selectedDateString, Id , choose_package } = req.body
  const status = 'completed'
  //get the count of employee
  const sqlQuery1 = "SELECT COUNT(emp_id) AS count2 FROM employee WHERE type = ? AND  ? > unfree_date_start AND ? > unfree_date_end";
  const value = [
    choose_package,
    selectedDateString,
    selectedDateString
  ]
  db.query(sqlQuery1,value,(err,data1)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    const sqlQuery = "SELECT COUNT(time_slot) AS count1 FROM carecenter_appointment WHERE placed_date = ? AND time_slot = ? AND appointment_status = ?"
    const values = [
      selectedDateString,
      Id,
      status
    ]
    db.query(sqlQuery, values, (err, data) => {
      if(err){
        return res.json({message:'There is an internel error'})
      }
      if (data[0].count1 >= data1[0].count2) {
        return res.json({ message: 'already filled' })
      }

      else {
        return res.json({ message: "added" })
      }
    })
  })
  
 


}

export const confirm = async (req, res, next) => {
  const id = req.params.id
  const status = "completed"
  const re_status = "pending"

  const status2 = "waitting"
  const sqlQuery2 = "UPDATE purchase_order SET po_status = ? WHERE order_email = ?"
  const values2 = [
    status2,
    id
  ]
  db.query(sqlQuery2, values2, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
  })

  const sqlQuery1 = "UPDATE temporary_card SET po_id = (SELECT po_id FROM purchase_order WHERE po_status = ? AND order_email = ? ORDER BY po_id DESC LIMIT 1),status =? WHERE email = ? AND status = ?";
  const values1 = [
    status2,
    id,
    status,
    id,
    re_status
  ]
  db.query(sqlQuery1, values1, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" })
    }
  })


}

export const generate = async (req, res, next) => {
  const id = req.params.id;

  const status = "completed"
  const sqlQuery =
    `
  SELECT i.name,tc.quantity,i.unit_price,tc.total,po.po_id,po.po_status,po.payment
  FROM temporary_card tc
  JOIN purchase_order po ON tc.po_id = po.po_id
  JOIN item i ON tc.item_id = i.item_id
  WHERE tc.email = ? AND tc.status = ? AND po.order_email = ? 
  ORDER BY po.po_id DESC
  

`;
  const values = [
    id,
    status,
    id
 
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }

    return res.json({ data });
  });

}

export const client_load = async (req, res, next) => {
  const id = req.params.id

  const status2 = "handed"
  const sqlQuery = 'SELECT *FROM purchase_order WHERE order_email = ? AND po_status = ?'
  const values = [
    id,
    status2
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })

}
export const delete_order = async (req, res, next) => {
  const id = req.params.id
  const status = "accept"
  const status1 = "handed"
  const sqlQuery = 'DELETE FROM purchase_order WHERE po_id =? AND po_status = ? AND po_status = ?'
  const values = [
    id,
    status,
    status1
  ]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }

    return res.json({ message: "deleted" })

  })



}

export const random_assistant = async (req, res, next) => {

  const { Id, selectedDateString, email, package_id,choose_package } = req.body
  if(selectedDateString === null || Id === null){
    return res.json({message:"There is an internel error"})
  }
  const sqlQuery = "INSERT INTO carecenter_appointment (placed_date,client_email,package_id,time_slot)VALUES(?,?,?,?)"
  const values = [
    selectedDateString,
    email,
    package_id,
    Id
  ]


  db.query(sqlQuery, values, (err, data) => {
    if (err) {
  
      return res.json({ message: 'There is an internel error' })
    }
    const sqlQuery2 =
      "SELECT CONCAT(first_name, ' ', last_name)AS full_name, email,contact_number, img FROM employee WHERE type = ? AND ? > unfree_date_start AND ? > unfree_date_end"
    const value2 = [
      choose_package,
      selectedDateString,
      selectedDateString
    ]

    db.query(sqlQuery2,value2,(err, data) => {
      if (err) {
        return res.json({ message: 'There is an internel error' })
      }
      return res.json({ data })
    })


  })
}

export const get_allpackage = async (req, res, next) => {

  const sqlQuery = "SELECT *FROM carecenter_package "
  db.query(sqlQuery, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}

export const get_package = async (req, res, next) => {
  const id = req.params.id
  const sqlQuery = "SELECT *FROM carecenter_package WHERE package_id = ?"
  const values = [
    id
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an error' })
    }
    return res.json({ data })
  })
}

export const delete_order_care = async (req, res, next) => {
  const id = req.params.id;
  const sqlQuery = "DELETE FROM carecenter_appointment WHERE appointment_id = ?"
  const values = [
    id
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ message: 'deleted' })
  })
}

export const timeslot = async (req, res, next) => {
  const id = req.params.id

  const sqlQuery = "SELECT *FROM carecenter_timeslot WHERE package_name = ?"
  const values = [
    id
  ]
  db.query(sqlQuery,values,(err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}
// pet adding
export const addpet = async (req, res, next) => {
  const {
    email,
    petcategory,
    name,
    breed,
    petsex,
  } = req.body;

  try {
    var OriginalCategory = ""
    if (petcategory === 10) {
      OriginalCategory = "Cat"
    } else if (petcategory === 20) {
      OriginalCategory = "Dog"
    }

    var OriginalSex = ""
    if (petsex === 10) {
      OriginalSex = "Male"
    } else if (petsex === 20) {
      OriginalSex = "Female"
    }

    const checkQuery = 'SELECT client_id FROM client WHERE email = ?';
    const checkValues = [email];

    db.query(checkQuery, checkValues, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internal error" })
      }
      // id = data[0].client_id;
      const sqlQuery = 'INSERT INTO pet (client_id, breed, name,  category, sex) VALUES(?,?,?,?,?)';
      const values = [
        data[0].client_id,
        breed,
        name,
    
        OriginalCategory,
        OriginalSex
      ];
   
      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          return res.json({ message: "There is an internal error" })
        }
        return res.json({ message: 'success' })
      })
    })
  } catch (err) {
    console.log(err)
  }

}

// view pets
export const view_pets = async (req, res, next) => {
  const email = req.params.email

  const checkQuery = 'SELECT client_id FROM client WHERE email = ? '
  const checkValues = [email];

  db.query(checkQuery, checkValues, (err, data) => {
    if (err) {
      return res.json({ message: 'Internal error' })
    }
    const sqlQuery = 'SELECT pet_id, breed, name, category, sex, image from pet WHERE client_id = ? ';
    const values = [data[0].client_id]
    // console.log(data[0].client_id)

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })
  })
}




export const get_appointment_id = async(req,res,next)=>{
  const id = req.params.id
  const sqlQuery = "SELECT *FROM carecenter_appointment WHERE client_email = ? ORDER BY appointment_id DESC LIMIT 1"
  const value = [
    id
  ]
  db.query(sqlQuery,value,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    const status = "completed"
    const sqlQuery = "UPDATE carecenter_appointment SET appointment_status = ? WHERE appointment_id = ?"
    const values = [
      status,
      data[0].appointment_id
    ]
    db.query(sqlQuery,values,(err,data)=>{
      if(err){
        return res.json({message:'There is an internel error'})
      }
      return res.json({message:'success'})
    })
    
  })
}

export const cancel_appointment = async(req,res,next)=>{

  const id = req.params.id
  const sqlQuery = "DELETE FROM carecenter_appointment WHERE client_email = ? ORDER BY appointment_id DESC LIMIT 1"
  const values = [
    id
  ]
  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:"There is an internel error"})
    }
    return res.json({message:"deleted"})

  })
  
}

export const care_orders = async(req,res,next)=>{
  const status = "completed"
  const sqlQuery = "SELECT *FROM carecenter_appointment WHERE appointment_status = ?"
  const value = [
    status
  ]
  db.query(sqlQuery,value,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    if(data.length === 0){
      return res.json({data})
    }
    const sqlQuery1 = "SELECT a.appointment_id,a.placed_date,p.package_name,p.price FROM carecenter_appointment a INNER JOIN carecenter_package p ON p.package_id = a.package_id WHERE a.appointment_id = ?"
    const values = [
      data[0].appointment_id

    ]
    db.query(sqlQuery1,values,(err,data)=>{
      if(err){
        return res.json({message:'There is an internel error'})
      }
      return res.json({data})
    })
  })
}
export const delete_appointment = async(req,res,next)=>{
  const id = req.params.id
  const sqlQuery ="DELETE FROM carecenter_appointment WHERE appointment_id = ?"
  const value = [
    id
  ]
  db.query(sqlQuery,value,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({message:'deleted'})
  })
}

export const edit_appointment = async(req,res,next)=>{
  const{ id,selectedDate} = req.body
  const sqlQuery = "UPDATE carecenter_appointment SET placed_date = ?,package_id = ?"
  const value = [
    id,
    selectedDate,
  ]
  db.query(sqlQuery,value,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({message:'success'})
  })
}

export const get_doctors = async(req,res,next)=>{
  const sqlQuery = 'SELECT *FROM vet'
  db.query(sqlQuery,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({data})
  })
}

export const book_doctor = async(req,res,next)=>{
  const id = req.params.id

  const sqlQuery = "SELECT *FROM vet WHERE vet_id = ?"
  const value = [
    id
  ]
  db.query(sqlQuery,value,(err,data)=>{
    if(err){
      return res.json({message:'There is an internal error'})
    }
    return res.json({data})
  })
}

export const check_appointment = async(req,res,next)=>{
  const {date_medi,email,id} = req.body;
  const sqlQuery = "SELECT COUNT(a.appointment_id) AS appointment_count,v.daily_count  FROM vet v INNER JOIN medi_appointment a ON v.vet_id = a.vet_id WHERE a.placed_date = ? AND a.client_email = ? AND v.vet_id = ?"
  const values = [
    date_medi,
    email,
    id
  ]
  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }

    if(data[0].appointment_count>data[0].daily_count){
      return res.json({message:'Appoinments are over'})
    }
  })
    const sqlQuery1 = "SELECT *FROM vet WHERE vet_id = ? AND  ? >= unfree_date_start AND ? <=unfree_date_end"
    const value2 = [
      id,
      date_medi,
      date_medi
    
    ]
    db.query(sqlQuery1,value2,(err,data1)=>{
      if(err){
        return res.json({message:'There is an internel error'})
      }
      if(data1.length >0){
        return res.json({message:'doctors is not free'})
      }
      return res.json({message:'added'})
    })
   


  

}

export const medi_payment = async(req,res,next)=>{
  const {id,date_medi,email} = req.body
  const status = "confirm"
  const sqlQuery = 'INSERT INTO medi_appointment (appointment_status , placed_date , client_email , vet_id) VALUES (?,?,?,?) '
  const values = [
    status,
    date_medi,
    email,
    id
  ]
  db.query(sqlQuery,values,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({message:'success'})
  })

}

export const get_medi_user = async(req,res,next)=>{
  const email= req.params.id
  const sqlQuery = "SELECT *FROM users WHERE email = ?"
  const value =[
    email
  ]
  db.query(sqlQuery,value,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({data})
  })
}

export const pet_trainning = async(req,res,next)=>{
  const sqlQuery = "SELECT p.start,p.end,p.day,p.count,e.first_name,e.last_name,e.img,e.contact_number,e.email,p.price FROM pet_trainning_shedule p INNER JOIN employee e ON p.emp_id = e.emp_id"
  db.query(sqlQuery,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({data})
  })

}

export const pet_booking = async(req,res,next)=>{
  const {selectedDate,email,age,value} = req.body
  console.log("dkdkdk")
  var day = ""
  if(value === "1"){
    day = "Monday"
  }
  if(value === "2"){
    day = "Friday"
  }
  if(value === "3"){
    day = "Sunday"
  }
  const sqlQuery = "SELECT COUNT(b.id)AS count1,s.count,s.emp_id FROM pet_trainning_shedule s INNER JOIN pet_trainning_payment b ON b.day = s.day WHERE b.day = ? AND b.placed_date = ? "
  const values1 = [
    day,
    selectedDate
  ]
  db.query(sqlQuery,values1,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    const sqlQuery1 = "SELECT *FROM employee WHERE unfree_date_start <= ? AND unfree_date_end <= ? AND emp_id = ?"
    const values = [
      selectedDate,
      selectedDate,
      data[0].emp_id
    ]
    db.query(sqlQuery1,values,(err,data1)=>{
      if(err){
        return res.json({message:'There is an internel error'})
      }
      if (data1.length > 0 && data1[0].unfree_date_start !== "" && data1[0].unfree_date_end !== "") {
        return res.json({ data1 });
    }
    
      if(data[0].count1 > data[0].count){
        return res.json({message:'No more appointments are available'})
      }
      const sqlQuery2 = "INSERT INTO pet_trainning_payment (placed_date,day,breed,client_email) VALUES(?,?,?,?)"
      const values2 = [
        selectedDate,
        day,
        age,
        email
      ]
      db.query(sqlQuery2,values2,(err,data)=>{
        if(err){
          return res.json({message:'There is an internel error'})
        }
        return res.json({message:'added'})
      })
    })
  })
  
}

export const get_breed = async(req,res,next) =>{

  const sqlQuery ="SELECT *FROM dog_breed "
  db.query(sqlQuery,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({data})
  })
}



