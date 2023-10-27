import { format } from "date-fns";
import { da } from "date-fns/locale";
import { db } from "../database";

export const add_competition = async (req, res, next) => {
  const {
    compName,
    compDes,
    compDate,
    compTime,
    compVenue,
    compPay,
    image,
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
    image,
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
  const { compDes, email } = req.body;

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

      // current date and time
      const date = new Date()
      const placed_date = date.toLocaleDateString()
      const placed_time = date.toLocaleTimeString()

      // Insert the complaint into manager_complain table
      const sqlquery1 =
        "INSERT INTO manager_complain (manager_id, complain_txt, com_date, com_time, manager_role,complain_status) VALUES (?, ?, ?,?, ?, ?)";
      const value1 = [manager_id, compDes, placed_date, placed_time, role, "pending"];

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
  const id = req.params.id

  if (id === "1") {
    const sqlquery = "SELECT * FROM company_competitions order by notice_id desc";
    db.query(sqlquery, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });

  } else if (id === "2") {
    const status = "pending"
    const sqlquery = "SELECT * FROM company_competitions WHERE status = ?";
    const values = [status]

    db.query(sqlquery, values, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });
  } else if(id === "3"){
    const status = "completed"
    const sqlquery = "SELECT * FROM company_competitions WHERE status = ?";
    const values = [status]

    db.query(sqlquery, values, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });
  }
};

// get company manager's complains
export const get_complaints = async (req, res, next) => {
  const id = req.params.id
  const role = 'company_manager'

  if (id === "1") {
    const sqlquery = "SELECT * FROM manager_complain WHERE manager_role = ?"
    const values = [role]

    db.query(sqlquery, values, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });

  } else if (id === "2") {
    const status = "pending"
    const sqlquery = "SELECT * FROM manager_complain WHERE manager_role = ? AND complain_status = ?"
    const values = [role, status]

    db.query(sqlquery, values, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });

  } else if (id === "3") {
    const status = "completed"
    const sqlquery = "SELECT * FROM manager_complain WHERE manager_role = ? AND complain_status = ?"
    const values = [role, status]

    db.query(sqlquery, values, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });
  }
};

// get clients complains
export const clientsComplains = async (req, res, next) => {
  const id = req.params.id
  const role = 'company_manager'

  if (id === "1") {
    const sqlquery = "SELECT * FROM client_complain WHERE manager_role = ?"
    const values = [role]

    db.query(sqlquery, values, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });

  } else if (id === "2") {
    const status = "pending"
    const sqlquery = "SELECT * FROM client_complain WHERE manager_role = ? AND complain_status = ?"
    const values = [role, status]

    db.query(sqlquery, values, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });

  } else if (id === "3") {
    const status = "completed"
    const sqlquery = "SELECT * FROM client_complain WHERE manager_role = ? AND complain_status = ?"
    const values = [role, status]

    db.query(sqlquery, values, (err, data) => {
      if (err) {
        return res.json({ message: "There is an internel error" });
      } else {
        return res.json({ data });
      }
    });
  }
}

// add response - view client response details
export const complainDetails = async (req, res, next) => {
  const id = req.params.id
  const role = 'company_manager'
  const sqlQuery = 'SELECT * FROM client_complain WHERE complain_id = ?  AND manager_role =? '
  const values = [id, role]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}

// add response - update table with response details
export const addingResponse = async (req, res, next) => {
  const {
    id,
    newres,
  } = req.body;

  const status = 'completed'
  const current = new Date()
  const currentDate = current.toDateString()

  const sqlQuery = 'UPDATE client_complain SET response_txt = ? , response_date = ?, complain_status = ? WHERE complain_id = ?'
  const values = [newres, currentDate, status, id]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ message: 'Added response' })
  })
}

// delete my complain
export const deleteMyComplain = async (req, res, next) => {
  const id = req.params.id
  const sqlQuery = 'DELETE FROM manager_complain WHERE complain_id = ? '
  const values = [id]

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal errrror' })
    }
    return res.json({ message: 'Deleted' })
  })

}


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
export const petsViewing = async (req, res, next) => {
  const id = req.params.id

  if (id === '1') {
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell'

    db.query(sqlQuery, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })

  } else if (id === '2') {
    const status = 'pending'
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell WHERE status = ?'
    const values = [status]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })

  } else if (id === '3') {
    const status = 'sold'
    const sqlQuery = 'SELECT * FROM pets_buy_and_sell WHERE status = ?'
    const values = [status]

    db.query(sqlQuery, values, (err, data) => {
      if (err) {
        return res.json({ message: 'There is an internal error' })
      }
      return res.json({ data })
    })
  }
}

// DASHBOARD
// incoming pet competitions count
export const incomingCompetitions = async(req, res, next) => {
  const status = "pending"
  const sqlQuery = 'SELECT COUNT(notice_id) as count FROM company_competitions WHERE status = ?'
  const values = [status]

  db.query(sqlQuery, values, (err,data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' })
    }
    return res.json({ data })
  })
}

// pending complains count
export const pendingComplains = async(req,res,next) => {
  const status = 'pending'
  const role = 'company_manager'
  const sqlQuery = 'SELECT COUNT(complain_id) as count FROM client_complain WHERE complain_status = ? AND manager_role = ?'
  const values = [status, role]

  db.query(sqlQuery, values, (err,data) => {
    if(err){
      return res.json({message:'There is an internal error'})
    }
    return res.json({data})
  })
}

// pending blogs verifications count
export const pendingBlogs = async(req,res,next) => {
  const status = 'pending'
  const sqlQuery = 'SELECT COUNT(post_id) as count FROM client_post WHERE blog_status = ?'
  const values = [status]

  db.query(sqlQuery, values, (err,data) => {
    if(err){
      return res.json({message:'There is an internal error'})
    }
    return res.json({data})
  })
}

// get count of buy and sold pets
export const petShopCount = async(req,res,next) => {
  const status1 = 'pending'
  const status2 = 'sold'
  const sqlQuery = 'SELECT (SELECT COUNT(pet_id) FROM pets_buy_and_sell WHERE status = ?) AS pendingcount, (SELECT COUNT(pet_id) FROM pets_buy_and_sell WHERE status = ?) AS soldcount'
  const values = [status1, status2]

  db.query(sqlQuery, values, (err,data) => {
    if(err) {
      return res.json({message:'There is an internal error'})
    }
    return res.json({data})
  })

}

// counts of regular and premium clients in online store
export const clientCount = async(req,res,next) => {
  const status1 = "premium"
  const status2 = "regular"
  const sqlQuery = 'SELECT (SELECT DISTINCT COUNT(c.client_id) FROM client c INNER JOIN purchase_order p ON c.email = p.order_email WHERE c.status = ? GROUP BY p.order_email) AS premiumCount, (SELECT DISTINCT COUNT(c.client_id) FROM client c INNER JOIN purchase_order p ON c.email = p.order_email WHERE c.status = ? GROUP BY p.order_email) AS regularCount'
  const values = [status1, status2]

  db.query(sqlQuery, values, (err, data) => {
    if(err) {
      return res.json({message:'There is an internal error'})
    }
    return res.json({data})
  })
}

// CATEGORIZATION

export const categorizeClients = async (req, res, next) => {
  const currentDate = new Date();
  const date = format(currentDate, 'yyy-MM-dd');
  const monthBeforeFromToday = new Date();
  monthBeforeFromToday.setDate(currentDate.getDate() - 30);
  const date_month = format(monthBeforeFromToday, 'yyy-MM-dd');

  const status = 'handed';
  const sqlQuery = 'SELECT p.order_email, COUNT(p.po_id) AS order_count, SUM(p.payment) AS total_amount, c.client_id, c.status FROM purchase_order p INNER JOIN client c ON c.email = p.order_email WHERE po_status = ? AND p.placed_date > ? AND p.placed_date < ? GROUP BY order_email';
  const values = [status, date_month, date];

  db.query(sqlQuery, values, (err, data) => {
    if (err) {
      return res.json({ message: 'There is an internal error' });
    }

    const status1 = "premium";
    const status2 = "regular";

    const results = []; // To collect results

    for (const order of data) {
      const orderCount = order.order_count;
      const totalAmount = order.total_amount;
      const email = order.order_email;
      const status = orderCount >= 2 && totalAmount >= 3000 ? status1 : status2;

      const checkQuery = 'UPDATE client SET status = ? WHERE email = ?';
      const checkValues = [status, email];

      db.query(checkQuery, checkValues, (err, data1) => {
        if (err) {
          // Handle the error, but do not send a response here.
          console.error('An error occurred:', err);
        } else {
          // Collect successful results
          results.push({ email, status });
        }

        // Check if all queries are done before sending the response
        if (results.length === data.length) {
          res.json({ data1: results,data:data });
        }
      });
    }
  });
};
