const userModels = require("../Models/users");
const jwt = require("jsonwebtoken");
const MiscHelper = require("../Helpers/helpers");
const helper = require("../Helpers/formResponse");

module.exports = {
  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userModels
      .getByEmail(email)
      .then((result) => {
        const dataUser = result[0];
        // console.log(dataUser);

        // const cek = dataUser.salt;

        if (dataUser !== undefined) {
          const usePassword = MiscHelper.setPassword(password, dataUser.salt)
            .passwordHash;
          console.log(usePassword);
          console.log(dataUser.password);
          console.log("sat", dataUser.salt);

          if (dataUser.password === usePassword) {
            dataUser.token = jwt.sign(
              {
                userid: dataUser.userId,
              },
              process.env.SECRET_KEY,
              { expiresIn: "2m" }
            );

            delete dataUser.salt;
            delete dataUser.password;
            // delete dataUser.token

            return MiscHelper.response(res, dataUser, 200);
          } else {
            return MiscHelper.response(res, null, 200, "Wrong password!");
          }
        } else {
          return MiscHelper.response(res, null, 200, "Wrong password!");
        }

        // if (dataUser !== undefined) {
        //   dataUser.token = jwt.sign(
        //     {
        //       userid: dataUser.userId
        //     },
        //     process.env.SECRET_KEY,
        //     { expiresIn: "30s" }
        //   );

        //   delete dataUser.salt;
        //   delete dataUser.password;
        //   // delete dataUser.token

        //   return MiscHelper.response(res, dataUser, 200);
        // } else {
        //   return MiscHelper.response(res, null, 200, "Wrong password!");
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  register: (req, res) => {
    const salt = MiscHelper.generateSalt(18);
    const passwordHash = MiscHelper.setPassword(req.body.password, salt);
    const type = req.body.type;
    const values = req.body.values;

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      // is_admin: req.body.is_admin,
      // is_director
      is_delete: "0",
      token: "slur",
    };
    data[type] = values;
    console.log(data);

    userModels
      .register(data)
      .then((resultRegister) => {
        MiscHelper.response(res, resultRegister, 200);
      })
      .catch((error) => {
        console.log(error);
        helper.sql(res, error);
      });
  },
  updateUser: (req, res) => {
    const ss = {
      id: req.params.id,
      dat: req.body,
    };
    const id = req.params.id;
    // const type = req.body.type;
    // const values = req.body.values;
    const data = req.body;
    // const data = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   is_admin: req.body.admin != undefined ? req.body.admin : "0",
    //   is_director: req.body.director != undefined ? req.body.director : "0",
    //   id_hoe: req.body.hoe != undefined ? req.body.hoe : "0",
    //   is_operator: req.body.operator != undefined ? req.body.operator : "0",
    // };
    // data[type] = values;
    console.log(ss);

    userModels
      .updateUser(id, data)
      .then((resultRegister) => {
        MiscHelper.response(res, resultRegister, 200);
      })
      .catch((error) => {
        console.log(error);
        helper.sql(res, error);
      });
  },
  getUser: (req, res) => {
    const idUser = req.params.id;
    userModels
      .getById(idUser)
      .then((result) => {
        MiscHelper.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  getAll: (req, res) => {
    userModels
      .getAll()
      .then((result) => {
        MiscHelper.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  updatePermission: (req, res) => {
    const id = req.body.id;
    const type = req.body.type;
    const values = req.body.values;

    userModels
      .updatePermission(id, type, values)
      .then((result) => {
        MiscHelper.response(res, result, 200);
      })
      .catch((err) => console.log(err));
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    userModels
      .DeleteUser(id)
      .then((result) => {
        MiscHelper.response(res, { id: id }, 200);
      })
      .catch((err) => console.log(err));
  },
  getUserTok: (req, res) => {
    const idUser = req.headers["x-control-user"];
    userModels
      .getById(idUser)
      .then((result) => {
        MiscHelper.response(res, result[0], 200);
      })
      .catch((err) => console.log(err));
  },
};
