const db = require("../Config/dbConnect");

const wishlist = {
  getWishlist: id_user => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT wishlist.*, item.name, item.img, item.price FROM wishlist INNER JOIN item ON wishlist.id_item=item.id WHERE wishlist.id_user = ?`,
        [id_user],
        (err, res) => {
          !err ? resolve(res) : reject(err);
        }
      );
    });
  },

  postWishlist: (id_user, id_item) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO wishlist SET id_user = ? , id_item = ?`,
        [id_user, id_item],
        (err, res) => {
          !err ? resolve(res) : reject(err);
        }
      );
    });
  },

  deleteWishlist: (id_user, id_item) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM wishlist WHERE id_user = ? AND id_item = ?`,
        [id_user, id_item],
        (err, res) => {
          !err ? resolve(res) : reject(err);
        }
      );
    });
  }
};

module.exports = wishlist;
