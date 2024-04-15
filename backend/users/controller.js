const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("./model")
const Role = require("../roles/model");
//User registration
exports.registerUser = async (req, res) => {

    const role = await Role.findOne({ name: req.body.role });
    if (!role) {
      console.log(`Role ${req.body.role} not found, please create it first`);
      return;
    }

  const existUser = await User.findOne({username:req.body.username});
  if(existUser) {
    return res.status(200).json({ success:false, message: "this user already exists"});
  }
  const newUser = new User({
    // fullName: req.body.fullName,
    username: req.body.username,
    password:req.body.password,   
    role:role._id,
    accessiblePages:req.body.pages
  });

  
  try {
    const savedUser = await newUser.save();
    if (!savedUser) {
      // return res.json({
      //   message: "User not saved ",
      //   status: "fail",
      // });
    }
    return res.json({
      message: "User saved successfully",
      status: "success",
      savedUser: {
        _id:savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
        accessiblePages: savedUser.accessiblePages,
        token:generateToken(savedUser._id)
      },
    });
  } catch (error) {
    return res.json({
      message:
        error.code == 11000 ? "user name  already exists" : "User not saved ",
      status: "fail",
      error: error.message,
    });
  }
};
exports.login = async(req,res)=>{

console.log(req.body)
// const { username, password } = req.body;
try {
  
  const user = await User.findOne({ username }).populate('role');
  if (!user || password != user.password) {

    return res.status(401).send({ message: 'Login failed' });
  }

  const token = generateToken(user._id)
  res.send({ user, token,message:"User logged in successfully.", status:"success" });
} catch (error) {
  res.status(500).send({ message: 'Internal server error' });
}
}

exports.verify = async(req,res)=>{
  const userId = req.user._id; // Assume you have user ID from session or JWT token
  const page = req.query.page; // Assume the page they are trying to access is passed as a query parameter

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    if (user.accessiblePages.includes(page)) {
      res.send('Access granted to ' + page);
    } else {
      res.status(403).send('Access denied');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}
exports.getSingleUser = async(req,res)=>{
try {
  const user = await User.findById(req.params.id).populate('role');
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  res.send(user);
} catch (error) {
  res.status(500).send({ message: 'Internal server error' });
}
}
// generate token
const generateToken =(id)=>{
  return jwt.sign(
    { _id: id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

}