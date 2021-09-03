const User = require("../models/User");
const Review = require("../models/Review");
const Comment = require("../models/Comment");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const { json } = require("express");

const userController = {
  getAll(req, res) {
    User.find({})
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getByUsername(req, res) {
    const username = req.params.username;
    User.findOne({ username })
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getByEmail(req, res) {
    const email = req.params.email;
    User.findOne({ email })
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getById(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getByPermission(req, res) {
    const permission = req.params.permission;
    if (permission < 0 || permission > 2) {
      return res.status(500).json({ msg: "permission invalid" });
    }
    User.find({ permission })
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getMe(req, res) {
    const id = req.user.id;
    User.findById(id)
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err.message });
      });
  },
  getNotifications: async (req, res) => {
    try {
      const { idUser } = req.body;
      const user = await User.findById(idUser).populate({
        path: "notifications.review",
      });
      const notifications = user.notifications;
      return res.json({ notifications });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  register: async (req, res) => {
    try {
      const { username, name, password, email, permission } = req.body; // FrontEnd submit object to BackEnd

      let user = await User.findOne({ username });

      if (!user) {
        user = await User.findOne({ email });
      }

      if (user)
        return res.status(200).json({ msg: "This email or username is exist" });
      if (password.length < 6)
        return res.status(200).json({ msg: "Password must >= 6 characters" });

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        name: name,
        email: email,
        password: passwordHash,
      });

      if (req.file) newUser.avatar = req.file.path;

      await newUser.save();

      return res.json({ msg: "Success", id: newUser.id });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCoverImg: async (req, res) => {
    try {
      let user = await User.findById(req.body.id);
      if (!user) return res.status(500).json({ msg: "User not exist" });
      if (req.file) user.coverImg = req.file.path;
      console.log(req.file);
      await user.save();
      return res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      let id = req.params.id;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ msg: "Can't find user" });
      }
      await Review.deleteOne(user);
      return res.json({ msg: "Deleted user" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      let user = await User.findById(req.body.id);
      if (!user) return res.status(500).json({ msg: "User not exist" });
      if (req.file) user.avatar = req.file.path;
      console.log(req.file);
      await user.save();
      return res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.headers["x-refresh-token"];

      if (!rf_token)
        return res.status(400).json({ msg: "you need provide refresh token" });

      if (blackListRT.has(rf_token))
        return res
          .status(400)
          .json({ msg: "you are logout, please login again." });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: err });
        const accessToken = createAccessToken({ id: user.id });

        return res.json({ user, accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  ban: async (req, res) => {
    try {
      const { idAdmin, idUser } = req.body;
      let results = await Promise.all([
        await User.findOne({ _id: idAdmin }),
        await User.findOne({ _id: idUser }),
      ]);
      let admin = results[0];
      let user = results[1];
      if (admin.permission !== 1 || user.permission === 1)
        return res.status(500).json({
          msg: "You need permission to perform this action",
        });
      user.banned = true;
      await user.save();
      return res.json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  unBan: async (req, res) => {
    try {
      const { idAdmin, idUser } = req.body;
      let results = await Promise.all([
        await User.findOne({ _id: idAdmin }),
        await User.findOne({ _id: idUser }),
      ]);
      let admin = results[0];
      let user = results[1];
      if (admin.permission !== 1 || user.permission === 1)
        return res.status(500).json({
          msg: "You need permission to perform this action",
        });
      user.banned = false;
      await user.save();
      return res.json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User not exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.set({ "x-access-token": accessToken });

      res.set({ "x-refresh-token": refreshToken });

      return res.status(200).json({ msg: "Login successful!", data: user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      const rf_token = req.headers["x-refresh-token"];
      blackListRT.add(rf_token);
      return res.status(200).json({ msg: "Log out successful." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const id = req.params.id;
      let user = await User.findById(id);
      if (user) {
        user.name = name;
        user.email = email;
        if (password.length >= 6) {
          user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
      } else {
        return res.json({ code: 0, msg: "Can't not find this user" });
      }
      return res.json({ code: 1, msg: "Updated user", data: user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNotification: async (req, res) => {
    try {
      const { idReview, idUser } = req.body;
      let user = await User.findById(idUser);
      let notifications = user.notifications;
      let notification = notifications.find((item) => {
        if (item.review == idReview) return item;
      });
      if (notification == undefined) {
        notification = {
          review: idReview,
          seenNotification: false,
        };
        notifications.push(notification);
        user.notifications = notifications;
      } else {
        for (let i = 0; i < notifications.length; i++) {
          if (notifications[i].review == idReview) {
            notifications[i].seenNotification = false;
            user.notifications = notifications;
          }
        }
      }
      await user.save();
      return res.json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateNotification: async (req, res) => {
    try {
      const { idReview, idUser } = req.body;
      let user = await User.findById(idUser);
      let notifications = user.notifications;
      let notification = notifications.find((item) => {
        if (item.review == idReview) return item;
      });
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].review == idReview) {
          notifications[i].seenNotification = true;
          user.notifications = notifications;
        }
      }
      await user.save();
      return res.json({ user });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5h",
  }); // access token expires in 5 minutes
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20h",
  }); // refresh token expires in 1 hour => need login again
};

module.exports = userController;
