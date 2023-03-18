const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/auth");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email,mobile, password } = req.body;

  // check all the missing fields.
  if (!name || !email || !mobile || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required field.` });

  // name validation.
  if (name.length > 25)
    return res
      .status(400)
      .json({ error: "Name can only be less than 25 characters" });

  // mobile validation
  if(mobile.length <10)
    return res
    .status(400)
    .json({ error: "Mobile number length should be 10" });
     

  // email validation.
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "please enter a valid email address." });

  // validation of password.
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be atleast 6 characters long" });
  try {
    const doesUserAlreadyExist = await User.findOne({mobile});

    if (doesUserAlreadyExist)
      return res.status(400).json({
        error: `a user with that email [${mobile}] already exists so please try another one.`,
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email,mobile, password: hashedPassword });

    // save the user.
    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required fields!" });

  try {
    const doesUserExits = await User.findOne({ mobile });

    if (!doesUserExits)
      return res.status(400).json({ error: "Invalid email or password!" });

    // if there were any user present.
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ error: "Invalid email or password!" });

    const payload = { _id: doesUserExits._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const user = { ...doesUserExits._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

module.exports = router;
