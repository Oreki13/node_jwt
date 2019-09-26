const db = require("../Config/dbConnect");

module.exports = {
  getAllStore: param => {
    return new Promise((resole, reject) => {
      let limit = param.limit * 1;
      let offset = (param.page - 1) * limit;
      console.log(param.name);

      if (param.id) {
        db.query(
          `SELECT item.id as id, item.name as name, item.quantity, item.price, item.img, item.detail, item.id_branch as id_branch, item.id_kategori as id_kategori, branch.name as branch, kategori.name as kategori FROM item JOIN branch ON item.id_branch = branch.id_branch JOIN kategori ON item.id_kategori = kategori.id_kategori WHERE item.id LIKE ? LIMIT ? OFFSET ?`,
          [param.id, limit, offset],
          (error, response) => {
            if (!error) {
              resole(response);
            } else {
              reject(error);
            }
          }
        );
      } else if (param.name) {
        db.query(
          `SELECT item.id as id, item.name as name, item.quantity, item.price,item.img, item.detail, branch.name as branch, kategori.name as kategori FROM item JOIN branch ON item.id_branch = branch.id_branch JOIN kategori ON item.id_kategori = kategori.id_kategori WHERE item.name LIKE '%${param.name}%' LIMIT ? OFFSET ?`,

          [limit, offset],
          (error, response) => {
            if (!error) {
              resole(response);
            } else {
              reject(error);
            }
          }
        );
      } else if (param.type) {
        db.query(
          `SELECT item.id as id, item.name as name, item.quantity, item.price,item.img, item.detail, branch.name as branch, kategori.name as kategori FROM item JOIN branch ON item.id_branch = branch.id_branch JOIN kategori ON item.id_kategori = kategori.id_kategori WHERE kategori.name LIKE '%${param.type}%' LIMIT ? OFFSET ?`,

          [limit, offset],
          (error, response) => {
            if (!error) {
              resole(response);
            } else {
              reject(error);
            }
          }
        );
      } else if (param.branch) {
        db.query(
          `SELECT item.id as id, item.name as name, item.quantity, item.price, item.img, item.detail, branch.name as branch, kategori.name as kategori FROM item JOIN branch ON item.id_branch = branch.id_branch JOIN kategori ON item.id_kategori = kategori.id_kategori WHERE branch.name LIKE '%${param.branch}%' LIMIT ? OFFSET ?`,

          [limit, offset],
          (error, response) => {
            if (!error) {
              resole(response);
            } else {
              reject(error);
            }
          }
        );
      } else {
        db.query(
          "SELECT item.id as id, item.name as name, item.quantity, item.price,item.img, item.detail,  branch.name as branch, kategori.name as kategori FROM item JOIN branch ON item.id_branch = branch.id_branch JOIN kategori ON item.id_kategori = kategori.id_kategori LIMIT ? OFFSET ? ",
          [limit, offset],

          (error, response) => {
            if (!error) {
              resole(response);
            } else {
              reject(error);
            }
          }
        );
      }
    });
  },
  getCategory: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id_kategori, name, img FROM kategori",
        (error, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  },

  getBranch: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT id, name FROM branch", (error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    });
  },

  postStore: body => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO item SET ?", [body.data], (error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    });
  },
  postCategory: body => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO kategori SET ?", [body.data], (error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    });
  },
  deleteItem: id => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM item WHERE item.id=?", [id], (error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(error);
        }
      });
    });
  },
  updateItem: body => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE item SET ? WHERE item.id=?",
        [body.data, body.id],
        (error, response) => {
          if (!error) {
            resolve(response);
          } else {
            reject(error);
          }
        }
      );
    });
  }
};
