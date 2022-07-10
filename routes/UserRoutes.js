const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');


router.post('/', UserController.save);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
// Login
router.post('/login', UserController.login);

module.exports = router;