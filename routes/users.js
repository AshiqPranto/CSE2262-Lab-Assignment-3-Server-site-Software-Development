var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var userRouter = express.Router();
var User = require('../models/users');
const verifyUser = require('../middlewears/verifyUser');
const verifyAdmin = require('../middlewears/verifyAdmin');

userRouter.route('/')
.get(verifyUser, verifyAdmin, (req,res,next) => {
	User.find({})
	.then((user) => {
		res.json(user);
	})
	.catch((err) => next(err));
});

userRouter.route('/signup')
.post((req,res,next) => {
	bcrypt.hash(req.body.password,10)
	.then((hashedPassword) => {
		const newUser = new User({
			name: req.body.name,
			username: req.body.username,
			password: hashedPassword
		});
		newUser.save()
		.then((user) => {
			res.json({
				message: "Signup was Successful !",
			});
		})
		.catch((err) => next(err));
	})
	.catch((err) => next(err));
});
userRouter.route('/login')
.post((req,res,next) => {
	
	console.log('login post');
	User.find({username: req.body.username},null,{limit:1})
	.then((user) => {
		if(user.length<1)
		{
			res.json('authentication fail');
		}else{
			bcrypt.compare(req.body.password,user[0].password)
			.then((validPassword) => {
				if(validPassword)
				{
					// console.log("inside login "+user[0]);
					var token = jwt.sign({
						username: user[0].username,
						admin: user[0].admin,
						userId: user[0]._id,
					},process.env.JWT_SECRET,{
						expiresIn: '1h'
					});
					res.status(200).json({
						"access_token": token,
						"message": "Login successful!"
					});
				}
			})
		}
	})
	.catch((err) => next(err));
});


module.exports = userRouter;
