const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/NotificationController');


router.post('/', NotificationController.save);
router.get('/', NotificationController.getAll);
router.get('/:id', NotificationController.getById);
router.put('/:id', NotificationController.update);
router.delete('/:id', NotificationController.delete);

module.exports = router;