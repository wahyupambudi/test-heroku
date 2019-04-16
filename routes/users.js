var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt')
// const mysql = require('mysql2')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/regis', (req, res) =>{
	res.render('auth/regis')
})
router.post('/regis', (req, res) => {
	const {username} = req.body
	const password = bcrypt.hashSync(req.body.password, 10)
	models.User.create({username, password}).then(user => {
		res.redirect('/users/login')
	}).catch(err => {
		console.log(err)
		res.redirect('/auth/err')
	})
})

router.get('/login', (req, res) => {
	res.render('auth/login')
})

router.post('/login', (req, res) => {
	const {username, password} = req.body
	models.User.findOne({
		where: {
			username : username
		}
	}).then(user => {
		console.log(user.username)
		if(user != null){
			const checkPassword = bcrypt.compareSync(password, user.password);
			if(checkPassword === true) {
				req.session.user = {
					username: user.username
				}

				res.redirect('/')
			}else {
				res.redirect('/users/login')
			}

		}else{
			res.redirect('/users/login')
		}
	})

})

router.get('/logout', (req, res) => {
	req.session.destroy(function(err){
	if(err) {
		console.log(err)
	}else{
		res.redirect('/users/login')
		}
	})
})

module.exports = router;
