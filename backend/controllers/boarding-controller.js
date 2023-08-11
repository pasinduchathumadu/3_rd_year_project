import pkg from 'object-hash'
import { db } from '../database.js'

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