const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticateToken } = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

router.get('/', authenticateToken, appointmentController.getAll);
router.post('/', authenticateToken, roleAuth('secretary', 'admin'), appointmentController.create);
router.get('/:id', authenticateToken, appointmentController.getById);
router.put('/:id', authenticateToken, roleAuth('secretary', 'admin'), appointmentController.update);
router.patch('/:id', authenticateToken, roleAuth('secretary', 'admin'), appointmentController.updatePartial);
router.delete('/:id', authenticateToken, roleAuth('secretary', 'admin'), appointmentController.delete);

module.exports = router;
