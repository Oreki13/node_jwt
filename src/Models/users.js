const db = require("../Config/dbConnect");

module.exports = {
  register: data => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO user SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err.sqlMessage);
        }
      });
    });
  },
  getByEmail: email => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id as userId, name, email, password, image, salt, date, role_id FROM user WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getById: id => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id as userId, name, email, image, date, role_id FROM user WHERE id = ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
