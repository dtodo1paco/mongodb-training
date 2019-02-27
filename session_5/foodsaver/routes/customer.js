var express = require('express');
var router = express.Router();
var verifyToken = require(".....dondeTuTengasTuTokenModule");
const customerController = require('../controllers/customer');

router.get('/:username', customerController.findByUsername);
router.get('/', customerController.findAll);
router.post('/', customerController.update);
router.get('/group/:category/', customerController.groupBy);
router.get('/group/:category/:id', customerController.groupBy);
router.post('/:id', customerController.update);


module.exports = router;
