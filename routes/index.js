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

router.get('/delete/:id', (req, res) => {
	const guruId = req.params.id
	models.Guru.findOne({where: {id: guruId}}).then(guru => {
		return guru.destroy()
	}).then(guru => {
		res.redirect('/')
	}).catch(err => {
		console.log(err)
		res.redirect('/')
	})
});

module.exports = router;
