const responses = require("../Helpers/formResponse");
const wishlistModel = require("../Models/wishlist");

const wishlist = {
  getWishlist: (req, res) => {
    wishlistModel
      .getWishlist(req.params.id_user)
      .then(response => {
        responses.getResult(res, 200, response);
      })
      .catch(err => {
        console.log(err);
      });
  },

  postWishlist: (req, res) => {
    wishlistModel
      .postWishlist(req.params.id_user, req.params.id_item)
      .then(response => {
        responses.getResult(res, 200, response);
      })
      .catch(err => {
        console.log(err);
      });
  },

  deleteWishlist: (req, res) => {
    const idItem = req.params.id_item;
    const idUser = req.params.id_user;
    wishlistModel
      .deleteWishlist(idUser, idItem)
      .then(response => {
        responses.getResult(res, 200, response, idItem);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = wishlist;
