const User = require('../models/userModel');
const mongoose = require('mongoose');

/* GET all users */
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

/* GET a single user by ID */
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'No such user' });
  }

  res.status(200).json(user);
};

/* GET user by email */
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'No user found with that email' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* CREATE new user */
const createUser = async (req, res) => {
  const { email, password, firstname, lastname, age, role } = req.body;

  try {
    // simple check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create({
      email,
      password,
      firstname,
      lastname,
      age,
      role,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* LOGIN (simple comparison) */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // simple password check
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // login success
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getAllUsers,
  getUser,
  createUser,
  getUserByEmail,
  loginUser,
};
