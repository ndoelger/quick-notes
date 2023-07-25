const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { redirect } = require("react-router-dom");

module.exports = {
  create,
  login,
  checkToken,
};

async function create(req, res) {
  try {
    // Add user to the db
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

// Helper Functions //
function createJWT(user) {
  return jwt.sign(
    // Data Payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
