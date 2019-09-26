const modelStore = require("../Models/store");
const formResponse = require("../Helpers/formResponse");

module.exports = {
  getAllStore: (req, res) => {
    const param = {
      page: req.params.page || 1,
      limit: req.query.limit || 10,
      id: req.query.id,
      name: req.query.name,
      type: req.query.type,
      branch: req.query.branch
    };
    modelStore
      .getAllStore(param)
      .then(response => {
        formResponse.getItem(res, 200, response, param);
      })
      .catch(error => console.log(error));
  },
  getCategory: (req, res) => {
    modelStore
      .getCategory()
      .then(response => {
        formResponse.getCategory(res, 200, response);
      })
      .catch(error => console.log(error));
  },
  getBranch: (req, res) => {
    modelStore
      .getBranch()
      .then(response => {
        formResponse.getCategory(res, 200, response);
      })
      .catch(error => console.log(error));
  },
  postStore: (req, res) => {
    const body = {
      data: req.body
    };
    modelStore
      .postStore(body)
      .then(response => {
        formResponse.post(res, 200, response);
      })
      .catch(error => console.log(error));
  },
  postCcatgory: (req, res) => {
    const body = {
      data: req.body
    };
    modelStore
      .postCategory(body)
      .then(response => {
        formResponse.post(res, 200, response);
      })
      .catch(error => console.log(error));
  },
  updateItem: async (req, res) => {
    const body = {
      id: req.params.id,
      data: req.body
    };
    const id = {
      page: req.params.page || 1,
      limit: req.query.limit || 10,
      id: req.params.id
    };
    await modelStore
      .updateItem(body)
      .then(async response => {
        await modelStore
          .getAllStore(id)
          .then(response => {
            formResponse.getResult(res, 200, response);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  },
  deleteItem: (req, res) => {
    const id = req.params.id;
    modelStore
      .deleteItem(id)
      .then(response => {
        formResponse.delete(res, 200, response, id);
      })
      .catch(error => console.log(error));
  }
};
