const db = require("../Config/dbConnect");

module.exports = {
  register: (data) => {
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
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET ? WHERE user.id = ?",
        [data, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id as userId, name, email, password, is_superadmin as superadmin, is_admin as admin, is_director as director, is_hoe as hoe, is_operator as operator, is_delete,  salt FROM user WHERE email = ?",
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
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id as userId, name, email, is_superadmin as superadmin, is_admin as admin, is_director as director, is_hoe as hoe, is_operator as operator ,is_delete FROM user WHERE id = ?",
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
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id as userId, name, email, is_superadmin as superadmin, is_admin as admin, is_director as director, is_hoe as hoe, is_operator as operator,is_delete   FROM user ",
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
  updatePermission: (id, type, values) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE user SET ${type} = ? WHERE id = ?`,
        [values, id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
  DeleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET is_delete = 1 WHERE id = ?",
        [id],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err.sqlMessage);
          }
        }
      );
    });
  },
};
