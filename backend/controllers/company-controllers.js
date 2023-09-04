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
  const { compDes, compFile } = req.body;
  const sqlquery = "INSERT INTO company_complaints (des,file) VALUES (?,?) ";
  const value = [compDes, compFile];
  db.query(sqlquery, value, (err, data) => {
    if (err) {
      return res.json({ message: "There is an internel error" });
    } else {
      return res.json({ message: "successfully added" });
    }
  });
};

export const get_competitions = async (req, res, next) => {
  const sqlquery = "SELECT * FROM company_competitions";
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
