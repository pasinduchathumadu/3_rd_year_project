import pkg from 'object-hash'
import { db } from '../database.js'

//  ----- PACKAGES -----

// add new package 
export const addPackage = async (req, res, next) => {
    const {
        packageName,
        price,
        first,
        second,
        third,
    } = req.body;

    try {
        const checkQuery = 'SELECT * FROM boarding_package WHERE package_name = ? ';
        const checkValues = [ packageName ];

        db.query(checkQuery, checkValues,(err,data) => {
            if(data.length > 0 ) {
                return res.json({message:'Package Name already exists'});
            }
        })

        const sqlQuery = 
            'INSERT INTO boarding_package (package_name, price) VALUES (?,?)';

        const values = [
            packageName,
            price
        ];

        db.query(sqlQuery, values, (err, userData) => {
            if(err) {
                return res.json({message: "There is an internal error"});
            }

            const query ='INSERT INTO boarding_package_facility (package_id, facility) VALUES ((SELECT package_id FROM boarding_package ORDER BY package_id DESC LIMIT 1), ?), ((SELECT package_id FROM boarding_package ORDER BY package_id DESC LIMIT 1), ?), ((SELECT package_id FROM boarding_package ORDER BY package_id DESC LIMIT 1), ?)';
            const values1 = [
                first,
                second,
                third
            ]

            db.query(query,values1,(err,data1)=>{
                if(err){
                    return res.json({message:'There is an internel error'})
                }
                return res.json({message:'success'})
            })
        })    
    }catch(err) {
        console.log(err)
    }
}

// get and view details of packages
export const getPackage = async (req, res, next) => {
    const sqlQuery = 'SELECT p.package_name, p.price, f.facility from boarding_package as p INNER JOIN boarding_package_facility as f ON p.package_id = f.package_id';
    // const sqlQuery = 'SELECT p.id, p.package_name, p.price, f.facility_name FROM boarding_package p JOIN package_facility f ON p.id = f.package_id WHERE p.id = ?' ;

    db.query(sqlQuery, (err,data) => {
        if(err) {
            return res.json({message: 'There is an internal error'})
        }
        return res.json({data})
    })

}

// ---------CLIENTS---------------------------------

// boarding requests viewing
export const view_requests = async (req, res, next) => {
    // const sqlQuery ='SELECT r.request_id, r.request_status, r.board_date, r.board_time, c. '
    const sqlQuery ='SELECT request_id, request_status, board_date, board_time, client_id, package_id FROM boarding_request ';

    db.query(sqlQuery, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })

}
// view all clients get services from  boarding house
export const view_allclients = async(req, res, next) => {
    const sqlQuery = 'SELECT c.client_id, CONCAT(c.street, " ", c.city) as address, c.contact_number, c.status, CONCAT(u.first_name, " ", u.last_name) as name FROM client c INNER JOIN users u ON c.email = u.email WHERE c.client_id IN (SELECT client_id FROM boarding_request)';
    
    db.query(sqlQuery, (err,data) => {
        if(err) {
            return res.json({message:'There is an internal error'})
        }
        return res.json({data})
    })



}