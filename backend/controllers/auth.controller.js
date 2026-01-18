const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Email & password required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ ok: false, message: 'Password must be at least 6 characters' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ ok: false, message: 'Email already exists' });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  res.json({ ok: true, user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Missing credentials' });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ ok: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.json({ ok: true, token });
};