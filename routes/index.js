var express = require('express');
var router = express.Router();
const models = require('../models')
const {checkAuth} = require('../middlewares/auth')


//Menampilkan data
router.get('/', checkAuth, function(req, res, next) {
	const user = req.session.user
	models.Guru.findAll().then(gurus => {
		res.render('index',{gurus: gurus, user: user})
	}).catch(err => {
		console.log(err)
		res.render('index')
	})
});

//Membuat data guru baru
router.get('/create', (req, res) => {
	res.render('create')
})

router.post('/create', checkAuth, (req, res) => {
	const { nama, alamat, pelajaran, kelas } = req.body
	models.Guru.create({nama, alamat, pelajaran, kelas}).then(guru => {
		res.redirect('/')
	}).catch(err => {
		console.log(err)
		res.redirect('/')
	})
})

//Mengedit Data Guru
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

//Menghapus Data Guru
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
