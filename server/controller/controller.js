var Userdb = require("../model/model");

//create and save a new user//

exports.create = (req, res) => {
  //validate request and make sure is not empty
  if (!req.body) {
    res.status(400).send({ message: "content can not be empty" });
    return;
  }
  //new user//
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  //save user in the database//
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured when creating the user",
      });
    });
};

//find a user//
exports.find = (req, res) => {
  //find a single user using a query ..not param//
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status.send({ message: `no user found with the id:${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `error retrieving the user with:${id} ` });
      });
    //all users now
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "error while retrieving users" });
      });
  }
};

//update student using userid//

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "data to update cannot be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `cannot update user with ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating user info" });
    });
};

//delete student using an id//
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "you need data to delete..maybe wrong id" });
      } else {
        res.send({
          message: "user was deleted succesfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `could not delete the user with ${id}` });
    });
};
