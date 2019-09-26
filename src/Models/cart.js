const db = require("../Config/dbConnect");

module.exports = {
  getCart: id_user => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT cart.*, item.name, item.price, item.img FROM cart INNER JOIN item ON cart.id_item = item.id WHERE cart.id_user = ?`,
        [id_user],
        (err, res) => {
          !err ? resolve(res) : reject(err);
        }
      );
    });
  },

  postCart: (id_user, id_item) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO cart SET id_user = ? , id_item = ?`,
        [id_user, id_item],
        (err, res) => {
          !err ? resolve(res) : reject(err);
        }
      );
    });
  },

  deleteCart: (id_user, id_item) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM cart WHERE id_user = ? AND id_item = ?`,
        [id_user, id_item],
        (err, res) => {
          !err ? resolve(res) : reject(err);
        }
      );
    });
  }
};
