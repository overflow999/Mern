
import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import  {Errorhandler}  from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password:hashedPassword});
  try{
    await newUser.save();
    res.status(201).json('User created successfully!');
    console.log(newUser)
  }catch (error) {
    next(error);
  }

 
};



export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(Errorhandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(Errorhandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.OVERFLOW);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google = async (res,req,next) =>{
  try {
    const user = await User.findOne({email:req.body.email})
    if(user){
      const token = jwt.sign({id: user._id}, process.env.OVERFLOW);
      const{ password:pass , ...rest} = user._doc;
      res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    } else{
      const generatedpassword = Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedpassword,20);
      const newUser = new User({username:req.body.name.split(" ").join("").toLowercase()+Math.random().toString(36).slice(-5),email:req.body.email,password:hashedPassword , avatar: req.body.photo});
      await newUser.save();
      const token = jwt.sign({id: newUser._id},process.env.OVERFLOW);
      const { password:pass,...rest} = newUser._doc;
      res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    }

    
  } catch (error) {
    
  }
}