const transactionsModel = require("../Models/transaction");
const formResponse = require("../Helpers/formResponse");

module.exports = {
  getTransaction: async (req, res) => {
    const id_user = req.params.id_user;
    await transactionsModel
      .getTransaction(id_user)
      .then(async result => {
        let temp = result;
        let tmp = [];
        //adding courses to json result
        await temp.map(async (transaction, index) => {
          await transactionsModel
            .getEnrollment(transaction.id_transaction)
            .then(resultEnroll => {
              transaction = {
                ...transaction,
                enrollment: resultEnroll
              };
              tmp.push(transaction);
            })
            .catch(error => {
              res.json(error);
            });

          //send result at the last index of iteration
          if (index == temp.length - 1) {
            formResponse.getTransaction(res, 200, tmp);
          }
        });
      })
      .catch(error => {
        res.json(error);
      });
  },

  getTransactionsByMonth: async (req, res) => {
    const month = req.params.month;
    // console.log(month);

    await transactionsModel
      .getTransactionsByMonth(month)
      .then(async result => {
        let temp = result;
        let tmp = [];

        //adding courses to json result
        await temp.map(async (transaction, index) => {
          await transactionsModel
            .getEnrollment(transaction.id_transaction)
            .then(resultEnroll => {
              transaction = {
                ...transaction,
                enrollment: resultEnroll
              };
              tmp.push(transaction);
            })
            .catch(error => {
              res.json(error);
            });

          //send result at the last index of iteration
          if (index == temp.length - 1) {
            formResponse.getTransaction(res, 200, tmp);
          }
        });
      })
      .catch(error => {
        res.json(error);
      });
  },

  postTransaction: async (req, res) => {
    const id_user = req.params.id_user;
    const id_items = req.body.id_items;
    await transactionsModel
      .postTransaction(id_user)
      .then(async result => {
        await transactionsModel
          .getLastID()
          .then(async transactionID => {
            // console.log(id_items);

            await id_items.map(async (id_item, index) => {
              console.log(transactionID[0]["MAX(id)"], " ", id_item);
              await transactionsModel
                .postEnrollent(transactionID[0]["MAX(id)"], id_item)
                .then(resultEnroll => {
                  if (index == id_items.length - 1) {
                    formResponse.getTransaction(res, 200, resultEnroll);
                  }
                });
            });
          })
          .catch(error => {
            res.json(error);
          });
      })
      .catch(error => {
        res.json(error);
      });
  }
};
