import { da } from 'date-fns/locale';
import { db } from '../database.js';

export const blog = async (req, res, next) => {
    const status = "posted"

    const sqlQuery = "select *from client_post WHERE blog_status = ?"
    const value = [
        status
    ]
    db.query(sqlQuery,value,(err, data) => {
        if (err) {
            return res.json({ message: 'there is internal error' })
        }
        return res.json({ data })
    })

}

export const myblog = async (req, res, next) => {
    const email = req.params.email

    const sqlQuery = "select *from client_post WHERE client_email = ?"
    const value = [email]

    db.query(sqlQuery, value, (err, data) => {
        if (err) {
            return res.json({ message: 'there is internal error' })
        }
        return res.json({ data })
    })

}

export const comment = async (req, res, next) => {
    const { id, comments } = req.body
    const values = [

        id,
        comments
    ]
    const sqlQuery = "insert into comments (post_id,comments) values(?,?)"

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internal error" })
        }
        else {
            return res.json({ message: 'submit' })
        }
    })

}
export const get_comment = async (req, res, next) => {
    const id = req.params.id;
    const sqlQuery = "SELECT *FROM comments where post_id = ?"
    const values = [
        id
    ]
    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: "There is an internel error" })
        }

        return res.json({ data })
    })
}

//  profile viewing -MANAGER
export const ManagerProfile = async (req, res, next) => {
    const email = req.params.email;

    const sqlQuery = 'SELECT m.email, m.contact_number, CONCAT(m.street, " ", m.city) AS address, m.user_role, m.manager_id, CONCAT(u.first_name, " ", u.last_name) AS name, u.profile_image FROM manager m INNER JOIN users u  ON m.email = u.email WHERE m.email = ?'
    const values = [email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// update profile - view detaILS - MANAGER
export const DisplayManagerDetails = async (req, res, next) => {
    const email = req.params.email;

    const sqlQuery = 'SELECT u.profile_image, CONCAT(u.first_name, " ", u.last_name) as name, m.manager_id, m.street, m.city, m.contact_number, m.user_role, m.email FROM users u INNER JOIN manager m ON m.email = u.email WHERE m.email = ? '
    const values = [email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// update profile - MANAGER
export const UpdateManager = async (req, res, next) => {
    const {
        email,
        contact,
        street,
        city,
    } = req.body;

    const sqlQuery = 'UPDATE manager SET contact_number = ?, street = ?, city = ? WHERE email = ? '
    const values = [contact, street, city, email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'success' })
    })
}

// view profile - CLIENT
export const ClientProfile = async (req, res, next) => {
    const email = req.params.email;

    const sqlQuery = 'SELECT c.email, c.contact_number, CONCAT(c.street, " ", c.city) AS address, c.client_id, CONCAT(u.first_name, " ", u.last_name) AS name, u.profile_image FROM client c INNER JOIN users u  ON c.email = u.email WHERE c.email = ?'
    const values = [email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })
}

// update profile - view client details on update form
export const DisplayClientDetails = async (req, res, next) => {
    const email = req.params.email;

    const sqlQuery = 'SELECT u.profile_image, CONCAT(u.first_name, " ", u.last_name) as name, c.client_id, c.street, c.city, c.contact_number, c.email FROM users u INNER JOIN client c ON c.email = u.email WHERE c.email = ? '
    const values = [email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ data })
    })

}

// updating profile of CLIENT
export const updateClient = async (req, res, next) => {
    const {
        email,
        contact,
        street,
        city
    } = req.body;

    const sqlQuery = 'UPDATE client SET contact_number = ?, street = ?, city = ? WHERE email = ? '
    const values = [contact, street, city, email]

    db.query(sqlQuery, values, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        }
        return res.json({ message: 'success' })
    })

}

export const likefunc = async (req, res, next) => {
    try {
      const { likes, index } = req.body;
      const sqlQuery = "UPDATE client_post SET likes = ? WHERE post_id = ?";
      const values = [likes, index];


      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          console.error(err); // Log the error
          return res.json({ message: 'There was an internal error' });
        }
        return res.json({ message: 'Updated like count successfully' });
      });
    } catch (err) {
      console.error(err);
      return res.json({ message: 'Internal server error' });
    }
  };
  
  export const heartfunc = async (req, res, next) => {
    try {
      const { hearts, index } = req.body;
    
      const sqlQuery = "UPDATE client_post SET heart = ? WHERE post_id = ?";
      const values = [hearts, index];
      db.query(sqlQuery, values, (err, data) => {
        if (err) {
          console.error(err); // Log the error
          return res.json({ message: 'There was an internal error' });
        }
        return res.json({ message: 'Updated heart count successfully' });
      });
    } catch (err) {
      console.error(err);
      return res.json({ message: 'Internal server error' });
    }
  };


  

// delete client profile
export const deleteProfile = async (req, res, next) => {
    const email = req.params.email
    const getQuery = 'SELECT client_id FROM client WHERE email = ?'
    const getValues = [email]

    db.query(getQuery, getValues, (err, data) => {
        if (err) {
            return res.json({ message: 'There is an internal error' })
        } else {
           
            const clientid = data[0].client_id
            const sqlQuery = 'DELETE FROM pet WHERE client_id = ?'
            const values = [clientid]

            db.query(sqlQuery, values, (err, data) => {
                if (err) {
                    return res.json({ message: 'There is an internal error' })
                }
                else {
                    const sqlQuery2 = 'DELETE FROM users WHERE email = ?  '
                    const values2 = [email]

                    db.query(sqlQuery2, values2, (err, data) => {
                        if (err) {
                            return res.json({ message: 'There is an internal error' })
                        }
                        return res.json({ message: 'Deleted' })
                    })
                }
            })
        }
    })
}


