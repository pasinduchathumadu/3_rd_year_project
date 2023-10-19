import { db } from "../database";

export const add_competition = async (req, res, next) => {
  const {
    compName,
    compDes,
    compDate,
    compTime,
    compVenue,
    compPay,
    compFile,
  } = req.body;
  const sqlquery =
    "INSERT INTO company_competitions (name,description,date,time,venue,pay,file) VALUES (?,?,?,?,?,?,?) ";
  const value = [
    compName,
    compDes,
    compDate,
    compTime,
    compVenue,
    compPay,
    compFile,
  ];
  db.query(sqlquery, value, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" });
    } else {
      return res.json({ message: "successfully added" });
    }
  });
};

export const add_complaint = async (req, res, next) => {
  const role = "company_manager";
  const { compDes, compDate, compTime, email } = req.body;

  console.log(compDes, compDate, compTime, email);

  try {
    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Query to fetch manager data by email
    const sqlQuery = "SELECT * FROM manager WHERE email = ?";
    const values = [email];

    // Execute the query to get manager data
    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Check if a manager with the provided email exists
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Manager not found" });
      }

      // Get the manager_id from the retrieved data
      const manager_id = data[0].manager_id;

      // Insert the complaint into manager_complain table
      const sqlquery1 =
        "INSERT INTO manager_complain (manager_id, complain_txt, com_date, com_time, manager_role) VALUES (?, ?, ?, ?, ?)";
      const value1 = [manager_id, compDes, compDate, compTime, role];

      db.query(sqlquery1, value1, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }

        return res.json({ message: "successfully added" });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const get_competitions = async (req, res, next) => {
  const sqlquery = "SELECT * FROM company_competitions order by notice_id desc";
  db.query(sqlquery, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" });
    } else {
      return res.json({ data });
    }
  });
};

export const get_complaints = async (req, res, next) => {
  const sqlquery = "SELECT * FROM manager_complain order by complain_id desc";
  db.query(sqlquery, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" });
    } else {
      return res.json({ data });
    }
  });
};

export const update_blog = async (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  const status = "posted";
  const sqlquery = "UPDATE client_post SET blog_status = ? WHERE post_id = ?";
  const values = [status, id];
  db.query(sqlquery, values, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" });
    }
    return res.json({ message: "Updated" });
  });
};

export const update_blog_reject = async (req, res, next) => {
  const { id1 } = req.body;
  console.log(id1);
  const status = "rejected";
  const sqlquery = "UPDATE client_post SET blog_status = ? WHERE post_id = ?";
  const values = [status, id1];
  db.query(sqlquery, values, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" });
    }
    return res.json({ message: "Rejected" });
  });
};
export const blog = async (req, res, next) => {
  const status = "pending";

  const sqlQuery = "select *from client_post WHERE blog_status = ?";
  const values = [status];

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: "there is internal error" });
    }
    return res.json({ data });
  });
};

// SHOP
// view pets details
export const petsViewing = async(req,res,next) => {
  const id = req.params.id

  if(id === '1'){
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell'

    db.query(sqlQuery, (err,data) => {
      if(err){
        return res.json({message:'There is an internal error'})
      }
      return res.json({data})
    })

  }else if(id === '2'){
    const status = 'pending'
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell WHERE status = ?'
    const values = [status]

    db.query(sqlQuery, values, (err,data) => {
      if(err){
        return res.json({message:'There is an internal error'})
      }
      return res.json({data})
    })

  }else if(id === '3'){
    const status = 'sold'
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell WHERE status = ?'
    const values = [status]

    db.query(sqlQuery, values, (err,data) => {
      if(err){
        return res.json({message:'There is an internal error'})
      }
      return res.json({data})
    })
  } 
}
