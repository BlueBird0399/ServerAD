const express = require('express');
const router = express.Router();

const HeadOfficeController = require('../controllers/HeadOfficeController');


router.post('/', HeadOfficeController.save);
router.get('/', HeadOfficeController.getAll);
router.get('/:id', HeadOfficeController.getById);
router.put('/:id', HeadOfficeController.update);
router.delete('/:id', HeadOfficeController.delete);

module.exports = router;