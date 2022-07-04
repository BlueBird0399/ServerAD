const express = require('express');
const router = express.Router();

const BranchController = require('../controllers/BranchController');


router.post('/', BranchController.save);
router.get('/', BranchController.getAll);
router.get('/:id', BranchController.getById);
router.put('/:id', BranchController.update);
router.delete('/:id', BranchController.delete);

module.exports = router;