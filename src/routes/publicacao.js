var express = require('express');
var router = express.Router();
var upload = require('../config/configUpload');
var pubController = require('../controllers/pubController');

// upload.single('foto') vai buscar no json alguma propriedade chamada foto 
router.post('/cadastrar', upload.single('foto'), (req, res) => {
  pubController.cadastrar(req, res);
});


router.get('/listar', function(req, res){
  pubController.listar(req, res)
});

router.put('/curtir/:id', function(req, res){
  pubController.curtir(req, res)
});

router.put('/descurtir/:id', function(req, res){
  pubController.descurtir(req, res)
})


module.exports = router;