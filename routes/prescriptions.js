const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { authenticateToken } = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

router.get('/', authenticateToken, prescriptionController.getAll);
router.post('/', authenticateToken, roleAuth('doctor'), prescriptionController.create);
router.get('/:id', authenticateToken, prescriptionController.getById);
router.delete('/:id', authenticateToken, roleAuth('doctor'), prescriptionController.delete);
router.put('/:id', authenticateToken, roleAuth('doctor'), prescriptionController.update);
router.patch('/:id', authenticateToken, roleAuth('doctor'), prescriptionController.partialUpdate);


module.exports = router;
