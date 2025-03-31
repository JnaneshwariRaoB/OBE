const express = require('express');
const HODController = require('../controllers/hodController');

const router = express.Router();

router.get('/', HODController.getHODs);
router.post('/', HODController.createHOD);

module.exports = router;
