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
      .then(result => {
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
                userid: dataUser.userId
              },
              process.env.SECRET_KEY,
              { expiresIn: "30m" }
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
      .catch(error => {
        console.log(error);
      });
  },
  register: (req, res) => {
    const salt = MiscHelper.generateSalt(18);
    const passwordHash = MiscHelper.setPassword(req.body.password, salt);

    const data = {
      name: req.body.fullname,
      email: req.body.email,
      password: passwordHash.passwordHash,
      image: req.body.image,
      salt: passwordHash.salt,
      role_id: req.body.role_id,
      token: "slur"
    };
    userModels
      .register(data)
      .then(resultRegister => {
        MiscHelper.response(res, resultRegister, 200);
      })
      .catch(error => {
        console.log(error);
        helper.sql(res, error);
      });
  },
  getUser: (req, res) => {
    const idUser = req.params.id;
    userModels
      .getById(idUser)
      .then(result => {
        MiscHelper.response(res, result, 200);
      })
      .catch(err => console.log(err));
  }
};
