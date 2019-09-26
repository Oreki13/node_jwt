const db = require("../Config/dbConnect");

const transactionsModel = {
  getTransaction: id_user => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT transactions.id as id_transaction, transactions.date, user.name, user.email, user.image FROM transactions JOIN user ON transactions.id_user = user.id WHERE transactions.id_user=?",
        id_user,
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

  getEnrollment: id_transaction => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT item.id as id_item, item.name, item.img, item.price FROM enrollment JOIN item ON enrollment.id_item = item.id WHERE enrollment.id_transaction=?",
        id_transaction,
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

  getTransactionsByMonth: month => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT transactions.id as id_transaction, transactions.date, user.name, user.email, user.image FROM transactions JOIN user ON transactions.id_user = user.id WHERE MONTH(transactions.date)=?",
        month,
        (err, result) => {
          console.log(result);

          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  postTransaction: id_user => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO transactions (id_user) VALUES (?)",
        id_user,
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

  getLastID: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT MAX(id) FROM transactions", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  postEnrollent: (id_transaction, id_item) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO enrollment (id_transaction, id_item) VALUES (?,?)",
        [id_transaction, id_item],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  }
};

module.exports = transactionsModel;
