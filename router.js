const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use('/adyen', require('./lib/adyenEncrypt'));

module.exports = router;
