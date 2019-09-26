const modelCart = require("../Models/cart");
const formResponse = require("../Helpers/formResponse");

module.exports = {
  getCart: (req, res) => {
    modelCart
      .getCart(req.params.id_user)
      .then(response => {
        formResponse.getResult(res, 200, response);
      })
      .catch(err => {
        console.log(err);
      });
  },
  postCart: (req, res) => {
    modelCart
      .postCart(req.params.id_user, req.params.id_item)
      .then(response => {
        formResponse.getResult(res, 200, response);
      })
      .catch(err => {
        console.log(err);
      });
  },

  deleteCart: (req, res) => {
    modelCart
      .deleteCart(req.params.id_user, req.params.id_item)
      .then(response => {
        formResponse.getResult(res, 200, response);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
