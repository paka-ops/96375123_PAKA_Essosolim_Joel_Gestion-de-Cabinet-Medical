const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticateToken } = require('../middleware/auth'); // Import correct
const roleAuth = require('../middleware/roleAuth');

router.get('/', authenticateToken, doctorController.getAll);
router.post('/', authenticateToken, roleAuth('admin'), doctorController.create);
router.get('/:id', authenticateToken, doctorController.getById);
router.put('/:id', authenticateToken, roleAuth('admin'), doctorController.update);
router.delete('/:id', authenticateToken, roleAuth('admin'), doctorController.delete);
router.patch('/:id', authenticateToken, roleAuth('admin'), doctorController.partialUpdate);
module.exports = router;
