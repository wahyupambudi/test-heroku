var express = require('express');
var router = express.Router();
const models = require('../models')


/* GET home page. */
router.get('/', function(req, res, next) {
models.Guru.findAll().then(gurus => {
		res.render('index',{gurus: gurus})
	}).catch(err => {
		console.log(err)
		res.render('index')
	})
});

module.exports = router;
