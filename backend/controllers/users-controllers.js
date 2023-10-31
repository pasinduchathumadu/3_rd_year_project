import pkg from 'object-hash';
import { LocalStorage } from "node-localstorage";
import { db } from "../database.js";
import { sendmailer } from '../controllers/email-controllers.js';
import { confirmation } from "../controllers/email-controllers.js";
import { sendvaccine1 } from '../controllers/email-controllers.js';
import multer from 'multer'
import { format } from 'date-fns'



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
  const { value_dog, new_value_dog1 } = req.body

  var item_catogery = ""
  if (id === '0') {
    item_catogery = "Dogs"
  }
  else if (id === '1') {
    item_catogery = "Cats"
  }

  if (value_dog === 10 && new_value_dog1 === "no") {
    const start = 100
    const end = 500
    const sqlQuery = "SELECT * FROM item WHERE item = ? AND unit_price >=? AND unit_price <?  "
    const values = [
      item_catogery,
      start,
      end
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
  if (value_dog === 10 && new_value_dog1 !== "no") {
    const start = 100
    const end = 500
    const sqlQuery = "SELECT * FROM item WHERE item = ? AND unit_price >=? AND unit_price <? AND catogories = ?  "
    const values = [
      item_catogery,
      start,
      end,
      new_value_dog1
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
  if (value_dog === 20 && new_value_dog1 === "no") {
    const start = 500
    const end = 1000
    const sqlQuery = "SELECT * FROM item WHERE item = ? AND unit_price >=? AND unit_price <? "
    const values = [
      item_catogery,
      start,
      end
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
  if (value_dog === 20 && new_value_dog1 !== "no") {
    const start = 500
    const end = 1000
    const sqlQuery = "SELECT * FROM item WHERE item = ? AND unit_price >=? AND unit_price <? AND catogories = ?"
    const values = [
      item_catogery,
      start,
      end,
      new_value_dog1
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
  if (value_dog === 30 && new_value_dog1 === "no") {
    const start = 1000
    const end = 5000
    const sqlQuery = "SELECT * FROM item WHERE item = ? AND unit_price >=? AND unit_price <? "
    const values = [
      item_catogery,
      start,
      end
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
  if (value_dog === 30 && new_value_dog1 !== "no") {
    const start = 1000
    const end = 5000
    const sqlQuery = "SELECT * FROM item WHERE item = ? AND unit_price >=? AND unit_price <? AND catogories = ? "
    const values = [
      item_catogery,
      start,
      end,
      new_value_dog1
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
  if (value_dog === 0 && new_value_dog1 !== "no") {

    const sqlQuery = "SELECT * FROM item WHERE item = ? AND catogories = ?"
    const values = [
      item_catogery,
      new_value_dog1
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
  if (value_dog === 0 && new_value_dog1 === "no") {

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

  const sqlQuery = "SELECT item.item_id, item.name, item.unit_price, item.image, item.description,item.discount, temporary_card.quantity FROM item INNER JOIN temporary_card ON item.item_id = temporary_card.item_id where temporary_card.email = ? AND temporary_card.status = ? ";


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
export const loadfinal = async (req, res, next) => {
  const id = req.params.id
  const sqlQuery = "SELECT *FROM purchase_order WHERE order_email = ? ORDER BY po_id DESC LIMIT 1"
  const values = [id]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
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
    return res.json({ data })
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
  const { selectedDateString, Id, choose_package } = req.body
  const status = "pending"
  const new_status = "working"
  const activestatus = "active"
  const sqlQuery1 = "SELECT COUNT(emp_id) AS count2 FROM employee WHERE type = ? AND unfree_date_start = ? AND status = ?";
  const value = [
    choose_package,
    new_status,
    activestatus
  ]
  db.query(sqlQuery1, value, (err, data1) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
   
      const sqlQuery = "SELECT COUNT(time_slot) AS count1 FROM carecenter_appointment WHERE placed_date = ? AND time_slot = ? AND appointment_status = ?"
      const values = [
      selectedDateString,
      Id,
      status
    ]
    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internel error' })
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
  const sqlQuery2 = "UPDATE purchase_order SET po_status = ? WHERE order_email = ? ORDER BY po_id DESC LIMIT 1"
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
  ORDER BY po.po_id DESC Limit 5
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

  const status = "active"
  const new_status = "working"
  const { Id, selectedDateString, choose_package } = req.body
  if (selectedDateString === null || Id === null) {
    return res.json({ message: "There is an internel error" })
  }
  const sqlQuery2 =
    "SELECT CONCAT(first_name, ' ', last_name)AS full_name, email,contact_number, img FROM employee WHERE type = ? AND unfree_date_start = ? AND status = ?"
  const value2 = [
    choose_package,
    new_status,
    status

  ]

  db.query(sqlQuery2, value2, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
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
  db.query(sqlQuery, values, (err, data) => {
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
    image
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
      const sqlQuery = 'INSERT INTO pet (client_id, breed, name,  category, sex,image) VALUES(?,?,?,?,?,?)';
      const values = [
        data[0].client_id,
        breed,
        name,

        OriginalCategory,
        OriginalSex,
        image
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

// delete pets
export const deletePet = async (req, res, next) => {
  // const email = req.params.email
  const id = req.params.id

  const sqlQuery = 'DELETE from pet WHERE pet_id = ?'
  const values = [id]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ message: 'Deleted' })
  })
}

export const get_appointment_id = async (req, res, next) => {
  const { selectedDateString, email, packageID, Id, new_cancel_date } = req.body


  const sqlQuery = "INSERT INTO carecenter_appointment (placed_date,client_email,package_id,time_slot,verify_cancel_date)VALUES(?,?,?,?,?)"
  const values = [
    selectedDateString,
    email,
    packageID,
    Id,
    new_cancel_date
  ]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      console.log(new_cancel_date)
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ message: 'success' })
  })
}

export const cancel_appointment = async (req, res, next) => {

  const id = req.params.id
  const sqlQuery = "DELETE FROM carecenter_appointment WHERE client_email = ? ORDER BY appointment_id DESC LIMIT 1"
  const values = [
    id
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" })
    }
    return res.json({ message: "deleted" })

  })

}

export const care_orders = async (req, res, next) => {
  const status = "pending"
  const email = req.params.email
  const sqlQuery1 = "SELECT a.appointment_id,a.placed_date,p.package_name,p.price FROM carecenter_appointment a INNER JOIN carecenter_package p ON p.package_id = a.package_id where a.appointment_status = ? AND a.client_email = ?"
  const values = [
    status,
    email
  ]
  db.query(sqlQuery1, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}
export const delete_appointment = async (req, res, next) => {
  const { rowId, date,email,price } = req.body
  const status = "cancelled"
  const sqlQuery = "UPDATE  carecenter_appointment SET early_cancel_date = ?,appointment_status = ? WHERE appointment_id = ? AND verify_cancel_date >= ?"
  const value = [
    date,
    status,
    rowId,
    date
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (data.affectedRows === 0) {
      return res.json({ message: 'cannot deleted' })
    }
    const sqlQuery1 = "INSERT INTO carecenter_refund (appointment_id,email,payment) VALUES (?,?,?)"
    const values2 = [ rowId , email , price]
    db.query(sqlQuery1,values2,(err,data)=>{
      if(err){
        return res.json({message:'There is an internel error'})
      }
      return res.json({ message: 'deleted' })

    })

    
  })
}

export const edit_appointment = async (req, res, next) => {
  const { id, selectedDate } = req.body
  const sqlQuery = "UPDATE carecenter_appointment SET placed_date = ?,package_id = ?"
  const value = [
    id,
    selectedDate,
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ message: 'success' })
  })
}

export const get_doctors = async (req, res, next) => {
  const status = "active"
  const new_status = "working"
  const sqlQuery = 'SELECT *FROM vet where status = ? AND unfree_date_start = ? AND unfree_date_end = ?'
  const values = [status,new_status,new_status]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}

export const book_doctor = async (req, res, next) => {
  const id = req.params.id

  const sqlQuery = "SELECT *FROM vet WHERE vet_id = ?"
  const value = [
    id
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}

export const check_appointment = async (req, res, next) => {
  const { date_medi, email, id , selectpet } = req.body;
  const sql1 ="SELECT *FROM medi_appointment WHERE pet_id = ? AND placed_date = ?"
  const value1 = [selectpet,date_medi]
  db.query(sql1,value1,(err,data)=>{
    if(data.length >0){
      return res.json({message:'exisit'})
    }
    const sqlQuery = "SELECT COUNT(a.appointment_id) AS appointment_count,v.daily_count  FROM vet v INNER JOIN medi_appointment a ON v.vet_id = a.vet_id WHERE a.placed_date = ? AND a.client_email = ? AND v.vet_id = ?"
    const values = [
      date_medi,
      email,
      id
    ]
    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internel error' })
      }
  
      if (data[0].appointment_count > data[0].daily_count) {
        return res.json({ message: 'Appoinments are over' })
      }
    })
    const sqlQuery1 = "SELECT *FROM vet WHERE vet_id = ? AND  ? >= unfree_date_start AND ? <=unfree_date_end"
    const value2 = [
      id,
      date_medi,
      date_medi
  
    ]
    db.query(sqlQuery1, value2, (err, data1) => {
      if (err) {
        return res.json({ message: 'There is an internel error' })
      }
      if (data1.length > 0) {
        return res.json({ message: 'doctors is not free' })
      }
      return res.json({ message: 'added' })
    })
    
  })
 

}

export const medi_payment = async (req, res, next) => {
  const { id, date_medi, email, payment_charge, selectpet } = req.body


  const status = "confirm"
  const sqlQuery = 'INSERT INTO medi_appointment (appointment_status , placed_date , client_email ,pet_id, vet_id,payment) VALUES (?,?,?,?,?,?) '
  const values = [
    status,
    date_medi,
    email,
    selectpet,
    id,
    payment_charge,
   
  ]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {

      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ message: 'success' })
  })
}

export const get_medi_user = async (req, res, next) => {
  const email = req.params.id
  const sqlQuery = "SELECT *FROM users WHERE email = ?"
  const value = [
    email
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}

export const pet_trainning = async (req, res, next) => {
  const status = "active"
  const sqlQuery = "SELECT p.start,p.end,p.day,p.count,e.first_name,e.last_name,e.img,e.contact_number,e.email,p.price FROM pet_trainning_shedule p INNER JOIN employee e ON p.emp_id = e.emp_id WHERE e.status = ?"
  const values = [status]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })

}

export const pet_booking = async (req, res, next) => {
  const { selectedDate, email, age, value, new_cancel_date } = req.body

  var day = ""
  if (value === "1") {
    day = "Monday"
  }
  if (value === "2") {
    day = "Friday"
  }
  if (value === "3") {
    day = "Sunday"
  }
  const sqlQuery = "SELECT COUNT(b.id)AS count1,s.count,s.emp_id FROM pet_trainning_shedule s INNER JOIN pet_trainning_payment b ON b.day = s.day WHERE b.day = ? AND b.placed_date = ? "
  const values1 = [
    day,
    selectedDate
  ]
  db.query(sqlQuery, values1, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    const sqlQuery1 = "SELECT *FROM employee WHERE unfree_date_start <= ? AND unfree_date_end <= ? AND emp_id = ?"
    const values = [
      selectedDate,
      selectedDate,
      data[0].emp_id
    ]
    db.query(sqlQuery1, values, (err, data1) => {
      if (err) {
        return res.json({ message: 'There is an internel error' })
      }
      if (data1.length > 0 && data1[0].unfree_date_start !== "" && data1[0].unfree_date_end !== "") {
        return res.json({ data1 });
      }

      if (data[0].count1 > data[0].count) {
        return res.json({ message: 'No more appointments are available' })
      }
      const sqlQuery2 = "INSERT INTO pet_trainning_payment (placed_date,day,breed,client_email,verify_cancel_date) VALUES(?,?,?,?,?)"
      const values2 = [
        selectedDate,
        day,
        age,
        email,
        new_cancel_date
      ]
      db.query(sqlQuery2, values2, (err, data) => {
        if (err) {
          return res.json({ message: 'There is an internel error' })
        }
        return res.json({ message: 'added' })
      })
    })
  })

}

export const get_breed = async (req, res, next) => {

  const sqlQuery = "SELECT *FROM dog_breed "
  db.query(sqlQuery, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}

export const get_medi_orders = async (req, res, next) => {
  const email = req.params.email
  const sqlQuery = "SELECT v.first_name,v.last_name,v.fee,a.appointment_id,a.placed_date FROM vet v INNER JOIN medi_appointment a ON v.vet_id = a.vet_id where a.client_email = ?"
  const value = [
    email
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}

export const training_orders = async (req, res, next) => {
  const email = req.params.email
  const status = "cancelled"
  const sqlQuery = "SELECT v.breed,a.price,a.start,a.end,v.day,v.id,v.placed_date FROM pet_trainning_payment v INNER JOIN pet_trainning_shedule a ON v.day = a.day WHERE client_email = ? AND status != ?"
  const value = [
    email,
    status
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })

}

export const delete_appointment_training = async (req, res, next) => {
  const { rowId, date } = req.body
  const status = "cancelled"
  const sqlQuery = "UPDATE pet_trainning_payment SET status = ?,early_cancel_date = ? WHERE id = ? AND verify_cancel_date >= ?"
  const value = [
    status,
    date,
    rowId,
    date
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (data.affectedRows === 0) {
      return res.json({ message: 'cannot deleted' })
    }

    return res.json({ message: 'deleted' })
  })

}

export const blog_post = async (req, res, next) => {
  const { email, description, title, Categories, date, image } = req.body
  function formatTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    return formattedTime;
  }
  var content = ""

  const time = formatTime();
  if (Categories === 10) {
    content = "Health of Pets"
  }
  if (Categories === 20) {
    content = "Harassment of Pets"
  }
  if (Categories === 30) {
    content = "Charityable Posts"
  }
  const sqlQuery = "INSERT INTO client_post(client_email,image,name,description,content,posted_time,posted_date)VALUES(?,?,?,?,?,?,?)";
  const value = [
    email,
    image,
    title,
    description,
    content,
    time,
    date
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ message: "Added" })
  })

}

// CLIENTS COMPLAINS
// view complains
export const viewmyComplains = async (req, res, next) => {
  const {
    email,
    clients
  } = req.body;

  if (clients === 1) {
    const checkQuery = 'SELECT client_id FROM client WHERE email = ?'
    const checkValues = [email]

    db.query(checkQuery, checkValues, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }

      const sqlQuery = 'SELECT * FROM client_complain WHERE client_id = ?'
      const values = [data[0].client_id]

      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
      })
    })
  } else if (clients === 2) {
    const status = 'pending'
    const checkQuery = 'SELECT client_id FROM client WHERE email = ?'
    const checkValues = [email]

    db.query(checkQuery, checkValues, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }

      const sqlQuery = 'SELECT * FROM client_complain WHERE client_id = ? AND complain_status = ?'
      const values = [data[0].client_id, status]

      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
      })
    })
  } else if (clients === 3) {
    const status = 'replied'
    const checkQuery = 'SELECT client_id FROM client WHERE email = ?'
    const checkValues = [email]

    db.query(checkQuery, checkValues, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }

      const sqlQuery = 'SELECT * FROM client_complain WHERE client_id = ? AND complain_status = ?'
      const values = [data[0].client_id, status]

      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
      })
    })

  }

}

// adding new complain
export const addNewComplain = async (req, res, next) => {
  const current = new Date()
  const currentDate = current.toDateString()
  const status = 'pending'
  const date = format(current, 'yyy-MM-dd')


  const {
    email,
    role,
    text,
  } = req.body;

  try {
    var originalRole = ""
    if (role === 10) {
      originalRole = "boarding_house_manager"
    } else if (role === 20) {
      originalRole = "medi_help_manager"
    } else if (role === 30) {
      originalRole = "online_store_manager"
    } else if (role === 40) {
      originalRole = "care_center_manager"
    } else if (role === 50) {
      originalRole = "company_manager"
    }
    const checkQuery = 'SELECT client_id FROM client WHERE email = ?'
    const checkValues = [email]

    db.query(checkQuery, checkValues, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }

      const sqlQuery = 'INSERT INTO client_complain (client_id, complain_txt, com_date, complain_status, manager_role) VALUES (?,?,?,?,?)'
      const values = [
        data[0].client_id,
        text,
        date,
        status,
        originalRole
      ]

      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'success' })
      })
    })
  } catch (err) {
    console.log(err)
  }
}

// delete clients pending complain
export const deleteMyComplain = async (req, res, next) => {
  const id = req.params.id

  const sqlQuery = 'DELETE FROM client_complain WHERE complain_id = ?'
  const values = [id]

  console.log(id)

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ message: 'Deleted' })
  })
}

// BOARDING - 
// assign a random 

export const AssignCage = async (req, res, next) => {
  const {
    selectpackage
  } = req.body;

  const status = 'free'

  const sqlQuery = 'SELECT * FROM boarding_cages WHERE  status = ? AND package_id = ? ORDER BY RAND() LIMIT 1';
  const values = [status, selectpackage]

  db.query(sqlQuery, values, (err, data) => {
    if (data.length === 0) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  }
  )
}
export const getprice = async (req, res, next) => {
  const {
    startdate,
    enddate,
    selectpackage,
    selectpet
  } = req.body
  const sqlQuery = 'SELECT *FROM boarding_request WHERE pet_id = ? AND board_arrival_date <= ? AND board_carry_date >=? '
  const values = [ selectpet , startdate,enddate]

  db.query(sqlQuery,values,(err,data1)=>{
    if(data1.length>0){
      return res.json({message:'exisit'})
    }
    const sqlQuery1 = 'SELECT *FROM boarding_request WHERE pet_id = ? AND board_carry_date >=? '
    const values1 = [ selectpet , startdate]
    db.query(sqlQuery1,values1,(err,data2)=>{
      if(data2.length>0){
        return res.json({message:'exisit'})
      }
      const check1 = 'SELECT *FROM boarding_package WHERE package_id = ?'
      const checkValues1 = [selectpackage]
      db.query(check1, checkValues1, (err, data) => {
        if (err) {
          return res.json({ message: "There is an internel error" })
        }
        return res.json({ data })
      })
  
    })
   
  
  })


 
}


export const getallcages = async (req, res, next) => {
  const { selectpackage } = req.body
  const sqlQuery = "SELECT *FROM boarding_cages WHERE package_id = ?"
  const value = [selectpackage]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })

}


// get package details
export const getPackageid = async (req, res, next) => {
  const sqlQuery = 'SELECT * FROM boarding_package'

  db.query(sqlQuery, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}
export const getallpets = async (req, res, next) => {
  const email = req.params.email

  const checkSql = 'SELECT * FROM client WHERE email = ?'
  const checkValues = [email]

  db.query(checkSql, checkValues, (err, data1) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    const sqlQuery = 'SELECT * FROM pet WHERE client_id = ?'
    const values = [data1[0].client_id]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })
  })
}

export const insert = async (req, res, next) => {
  const { email,
    startdate,
    enddate,
    selectpackage,
    selectpet,
    originalprice,
    originalcage } = req.body
  console.log(originalcage)

  const input = new Date()
  const date = format(input, 'yyy-MM-dd')

  const cancel_date = new Date(date);
  cancel_date.setDate(cancel_date.getDate() + 2);
  const new_cancel_date = cancel_date.toISOString().substr(0, 10)
  const checkSql = 'SELECT * FROM client WHERE email = ?'
  const checkValues = [email]

  db.query(checkSql, checkValues, (err, data) => {
    const sqlQuery1 = 'INSERT INTO boarding_request (placed_date, verify_cancel_date,  package_id, client_id, board_arrival_date, board_carry_date, pet_id, price, cage_id ) VALUES (?,?,?,?,?,?,?,?,?)'
    const value = [
      date,
      new_cancel_date,
      selectpackage,
      data[0].client_id,
      startdate,
      enddate,
      selectpet,
      originalprice,
      originalcage
    ]
    db.query(sqlQuery1, value, (err, data) => {
      const status = "reserved"
      if (err) {
        return res.json({ message: 'There is an internel error' })
      }
      const sqlQuery2 = "update boarding_cages SET status = ? WHERE cage_id = ?"
      const values = [status,originalcage]
      db.query(sqlQuery2,values,(err,data)=>{
        if(err){
          return res.json({message:'There is an internel error'})
        }
        return res.json({ message: 'insert' })
      })
     
    })

  })



}

// MIND RELAXING
// get pets from db
export const getMindRealxingPets = async (req, res, next) => {
  const sqlQuery = 'SELECT * FROM mind_relaxing_pets'

  db.query(sqlQuery, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}

// get mind relaxing time slots
export const getTimeSlots = async (req, res, next) => {
  const sqlQuery = 'SELECT * FROM mind_relaxing_timeslots'

  db.query(sqlQuery, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })

}

// get pet details for form
export const getDetails = async (req, res, next) => {
  const id = req.params.id

  const sqlQuery = 'SELECT * FROM mind_relaxing_pets WHERE pet_id = ?'
  const values = [id]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}


export const boardreport = async (req, res, next) => {
  const email = req.params.email
  const status = "completed"
  const sqlQuery = "SELECT *FROM client WHERE email = ?"
  const value = [
    email
  ]
  db.query(sqlQuery, value, (err, data1) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    const sqlQuery1 = "SELECT b.request_id,b.placed_date,b.verify_cancel_date,b.package_id,b.client_id,b.board_arrival_date,b.board_carry_date,b.pet_id,b.price,p.package_name FROM boarding_package p INNER JOIN  boarding_request b ON b.package_id = p.package_id  WHERE b.client_id = ? AND b.request_status = ? ORDER BY b.request_id DESC LIMIT 1"
    const value1 = [
      data1[0].client_id,
      status
    ]
    db.query(sqlQuery1, value1, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internel error' })
      }
      return res.json({ data })
    })
  })

}
export const onlinereport = async (req, res, next) => {
  const email = req.params.email
  const status = "handed"
  const sqlQuery = "Select *FROM purchase_order WHERE order_email = ? AND po_status = ? ORDER BY po_id DESC LIMIT 1"
  const value = [
    email,
    status
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}

// place the mind relaxing appointment 
export const SubmitForm = async (req, res, next) => {
  const pet_id = req.params.id

  const {
    email,
    day,
    time
  } = req.body;

  const checkQuery1 = 'SELECT COUNT(id) as idcount FROM reserve_mindrelaxing_pets WHERE date = ? AND pet_id = ?'
  const checkValues1 = [day, pet_id]

  db.query(checkQuery1, checkValues1, (err, data1) => {
    if (data1[0].idcount > 0) {
      return res.json({ message: 'Pet already reserved' })
    }

    const sql2 = 'INSERT INTO mindrelaxing_appointments (timeslot_id, date, email, pet_id) VALUES (?,?,?,?)'
    const value2 = [time, day, email, pet_id]

    db.query(sql2, value2, (err, data2) => {
      if (err) {
        return res.json({ message: 'There is an internal errorrrr' })
      }

      const sql3 = 'INSERT INTO reserve_mindrelaxing_pets (pet_id, date) VALUES (?,?)'
      const value3 = [pet_id, day]

      db.query(sql3, value3, (err, data3) => {
        if (err) {
          return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Successfully Done!' })
      })
    })
  })
}

export const medireport = async (req, res, next) => {
  const email = req.params.email
  const sqlQuery = "SELECT a.appointment_id , a.payment,a.placed_date ,a.pet_id,a.client_email,v.first_name,v.last_name FROM medi_appointment a INNER JOIN vet v ON v.vet_id = a.vet_id WHERE a.client_email = ? ORDER BY a.appointment_id DESC LIMIT 1 "
  const value = [
    email
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })

}

export const carecenter = async (req, res, next) => {
  const email = req.params.email
  const status = "pending"
  const sqlQuery = "SELECT a.appointment_id ,a.appointment_status,a.early_cancel_date, a.placed_date , a.client_email ,p.package_name , p.price FROM carecenter_appointment a INNER JOIN carecenter_package p ON a.package_id = p.package_id WHERE a.appointment_status != ? AND a.client_email = ?"
  const value = [
    status,
    email
  ]
  db.query(sqlQuery, value, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}

// BUY AND SELL PETS - SHOP

// view pets for buying
export const viewBuyPets = async (req, res, next) => {
  const email = req.params.email
  const status = "pending"
  const sqlQuery = 'SELECT u.first_name, u.last_name,b.pet_id, b.email,b.category, b.sex, b.price,b.status, b.image FROM pets_buy_and_sell b INNER JOIN users u ON u.email=b.email AND b.status = ? where u.email !=?'
  const sqlValues = [status, email]

  db.query(sqlQuery, sqlValues, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}

// view clients own pets that are in selling pending status
export const viewOwnPets = async (req, res, next) => {
  const {
    email

  } = req.body
  const box = req.params.id

  if (box === '1') {
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell WHERE email=?'
    const values = [email]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })
  }
  else if (box === '2') {
    const status = 'pending'
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell WHERE email=? AND status =?'
    const values = [email, status]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })
  }
  else if (box === '3') {
    const status = 'sold'
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell WHERE email=? AND status = ?'
    const values = [email, status]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })
  }
}

// add new pets for selling
export const submitAddForm = async (req, res, next) => {
  const {
    email,
    breed,
    sex,
    category,
    price,
    image

  } = req.body;

  try {
    var newCategory = ""
    if (category === 10) {
      newCategory = "Cat"
    } else if (category === 20) {
      newCategory = "Dog"
    }

    var newSex = ""
    if (sex === 10) {
      newSex = "Male"
    } else if (sex === 20) {
      newSex = "Female"
    }

    const sqlQuery = 'INSERT INTO pets_buy_and_sell (email, breed, category, sex, price,image) VALUES (?,?,?,?,?,?)'
    const values = [email, breed, newCategory, newSex, price, image]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ message: 'success' })
    })
  } catch (err) {
    console.log(err)
  }
}

// get details for update form
export const getDetailsforUpdate = async (req, res, next) => {
  const id = req.params.id

  const sqlQuery = 'SELECT * FROM pets_buy_and_sell WHERE pet_id = ? '
  const values = [id]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}

// submit the update form
export const submitUpdateForm = async (req, res, next) => {
  const {
    id1,
    newprice
  } = req.body;

  try {
    const sqlQuery = 'UPDATE pets_buy_and_sell SET price = ? WHERE pet_id = ?'
    const values = [newprice, id1]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ message: 'success' })
    })

  } catch (err) {
    console.log(err)
  }
}

// delete selling pets
export const deleteSellPet = async (req, res, next) => {
  const id = req.params.id2
  const sqlQuery = 'DELETE FROM pets_buy_and_sell WHERE pet_id = ?'
  const values = [id]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ message: 'Deleted' })
  })
}
export const getclientcategory = async (req, res, next) => {
  const email = req.params.email
  const sqlQuery = 'SELECT *FROM client WHERE email = ?'
  const values = [email]
  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internel error' })
    }
    return res.json({ data })
  })
}

export const sendvaccine = async (req, res, next) => {
  const { name, period, pet_id, email } = req.body
  sendvaccine1(res, req, name, period, pet_id, email)

}
// VIEW PAST VACCINE RECORDS
// viewing pets
export const viewPets = async (req, res, next) => {
  const email = req.params.email

  const sql1 = 'SELECT * FROM client WHERE email = ?'
  const value1 = [email]

  db.query(sql1, value1, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    const client_id = data[0].client_id

    const sqlQuery = 'SELECT * FROM pet WHERE client_id = ?'
    const value = [client_id]

    db.query(sqlQuery, value, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })
  })

}

export const buypets = async (req, res, next) => {
  const { petid } = req.body;
  const status = "sold"
  const sqlquery = "UPDATE pets_buy_and_sell SET status = ? WHERE pet_id = ?"
  const values = [status, petid]
  db.query(sqlquery, values, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" })
    }
    return res.json({ message: 'updated' })
  })
}



// get details of selected pets
export const displayRecords = async (req, res, next) => {
  const id = req.params.id //pet id
  const sqlQuery = 'SELECT p.vaccine_id, p.pet_id, p.vaccined_date, v.name FROM past_vaccine_records p INNER JOIN vaccine_details v ON v.vaccine_id = p.vaccine_id WHERE p.pet_id = ?'
  const values = [id]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}

// APPOINTMENTS VIEWING
// boarding appointments viewing
export const boardingRequestsViewing = async (req, res, next) => {
  const email = req.params.email

  const sql1 = 'SELECT client_id FROM client WHERE email = ?'
  const value1 = [email]

  db.query(sql1, value1, (err, data1) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    const client_id = data1[0].client_id
    const sqlQuery = 'SELECT * FROM boarding_request b INNER JOIN boarding_package p ON b.package_id = p.package_id WHERE b.client_id = ? '
    const values = [client_id]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })
  })
}


// cancel boarding request
export const cancelBoarding = async (req, res, next) => {
  const id = req.params.id2 //request id
  const input = new Date()
  const date = format(input, 'yyy-MM-dd')

  const sql1 = 'SELECT * FROM boarding_request WHERE request_id = ? '
  const value1 = [id]

  db.query(sql1, value1, (err, data1) => {
    if (err) {
      return res.json({ message: 'There is an internal errrrrror' })
    }
    const cage = data1[0].cage_id
    const cagestatus = 'free'

    const sql2 = 'UPDATE boarding_cages SET status = ? WHERE cage_id = ?'
    const value2 = [cagestatus, cage]

    db.query(sql2, value2, (err, data2) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      const newstatus = 'cancelled'
      const sql3 = 'UPDATE boarding_request SET request_status = ?,early_cancel_date = ? WHERE request_id = ?'
      const value3 = [newstatus,date,id]

      db.query(sql3, value3, (err, data3) => {
        if (err) {
          return res.json({ message: 'There is an internal error' })
        }
        const sql4 = 'SELECT * FROM boarding_request WHERE request_id = ?'
        const value4 = [id]

        db.query(sql4, value4, (err, data4) => {
          if (err) {
            return res.json({ message: 'There is an internal error' })
          }
          const req_id = data4[0].request_id
          const client_id = data4[0].client_id
          const payment = data4[0].price

          const sql5 = 'INSERT INTO boarding_refund(request_id, client_id, payment) VALUES(?, ?, ?)'
          const value5 = [req_id, client_id, payment]

          db.query(sql5, value5, (err, data5) => {
            if (err) {
              return res.json({ message: 'There is an internal error' })
            }
            return res.json({ message: 'Removed Successfully' })
          })
        })
      })
    })
  })
}

// view mind relaxing appointments
export const mindrelaxingAppointments = async (req, res, next) => {
  const email = req.params.email
  const sqlQuery = 'SELECT * FROM mindrelaxing_appointments a INNER JOIN mind_relaxing_timeslots m ON m.id = a.timeslot_id WHERE a.email = ?'
  const values = [email]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })

}

// cancel mind relaxing appointment
export const cancelMindRelaxingAppointment = async (req, res, next) => {
  const id = req.params.id1 //appointemnt id
  const newstatus = 'cancelled'

  const sqlQuery1 = 'UPDATE mindrelaxing_appointments SET status = ? WHERE appointment_id = ?'
  const values1 = [newstatus, id]

  db.query(sqlQuery1, values1, (err, data1) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }

    const sqlQuery2 = 'SELECT * FROM mindrelaxing_appointments WHERE appointment_id = ? '
    const values2 = [id]

    db.query(sqlQuery2, values2, (err, data2) => {
      if (err) {
        return res.json({ message: 'There is an internal eriiiror' })
      }
      const pet_id = data2[0].pet_id
      const date = data2[0].date

      const sqlQuery3 = 'DELETE FROM reserve_mindrelaxing_pets WHERE pet_id = ? AND date = ?'
      const values3 = [pet_id, date]

      db.query(sqlQuery3, values3, (err, data3) => {
        if (err) {
          return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'Removed Successfully' })

      })

    })
  })
}

// BANK DETAILS

// add bank details
export const SubmitBankDetails = async (req, res, next) => {
  const {
    email,
    num,
    branch,
    bank
  } = req.body;

  const checkQuery = 'SELECT COUNT(acc_no) as count FROM client_bankdetails WHERE email = ?'
  const checkvalues = [email]

  db.query(checkQuery, checkvalues, (err, data1) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    } else if (data1[0].count > 0) {
      return res.json({ message: 'Already added bank details' })
    }

    const sql1 = 'SELECT * FROM client WHERE email = ?'
    const values1 = [email]

    db.query(sql1, values1, (err, data2) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      const client_id = data2[0].client_id
      const sqlQuery = 'INSERT INTO client_bankdetails(email, client_id, acc_no, bank, branch) VALUES (?,?,?,?,?)'
      const values = [email, client_id, num, bank, branch]

      db.query(sqlQuery, values, (err, data3) => {
        if (err) {
          return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'added' })
      })

    })
  })
}

// get bank detals
export const getBankDetails = async (req,res,next) => {
  const email = req.params.email

  const sqlQuery = 'SELECT * FROM client_bankdetails WHERE email = ?'
  const values = [email]

  db.query(sqlQuery, values, (err,data) => {
    if(err) {
      return res.json({message:'There is an internal error'})
    }
    return res.json({data})
  })

}

// delete bank details
export const deleteBankDetails = async(req,res,next) => {
  const email = req.params.email

  const sqlQuery = 'DELETE FROM client_bankdetails WHERE email = ?'
  const values = [email]

  db.query(sqlQuery, values,(err, data) => {
    if(err) {
      return res.json({message:'There is an internal error'})
    }
    return res.json({message:'Deleted'})
  })
}
export const getfacilities = async(req,res,next)=>{
  const sqlQuery = "SELECT *FROM boarding_package_facility"
  db.query(sqlQuery,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({data})
  })
}
export const getfacilities1 = async(req,res,next)=>{
  const sqlQuery = "SELECT *FROM carecenter_package_facility"
  db.query(sqlQuery,(err,data)=>{
    if(err){
      return res.json({message:'There is an internel error'})
    }
    return res.json({data})
  })
}