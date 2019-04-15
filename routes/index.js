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

router.get('/create', (req, res) => {
	res.render('create')
})

router.post('/create', (req, res) => {
	const { nama, alamat, pelajaran, kelas } = req.body
	models.Guru.create({nama, alamat, pelajaran, kelas}).then(guru => {
		res.redirect('/')
	}).catch(err => {
		console.log(err)
		res.redirect('/')
	})
})

router.get('/edit/:id', (req, res) => {
	const guruId = req.params.id
	models.Guru.findOne({where: {id: guruId}}).then(guru => {
		res.render('edit', {guru: guru})
	}).catch(err => {
		console.log(err)
		res.redirect('/')
	})
})

router.post('/edit/:id', (req, res) => {
	const guruId = req.params.id
	const {nama, alamat, pelajaran, kelas} = req.body
	models.Guru.findOne({where: {id: guruId}}).then(guru => {
		return guru.update({
			nama,
			alamat,
			pelajaran,
			kelas
		})
	}).then(updatedGuru => {
		res.redirect('/')
	}).catch(err => {
		console.log(err)
		res.redirect('/')
	})
})

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
