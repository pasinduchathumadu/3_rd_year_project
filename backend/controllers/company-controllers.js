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
