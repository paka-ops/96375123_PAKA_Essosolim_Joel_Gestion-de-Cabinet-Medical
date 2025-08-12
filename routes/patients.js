

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const { authenticateToken } = require('../middleware/auth');


router.get('/', authenticateToken, patientController.getAll);
router.post('/', authenticateToken, roleAuth('secretary', 'admin'), patientController.create);
router.get('/:id', authenticateToken, patientController.getById);
router.put('/:id', authenticateToken, roleAuth('secretary', 'admin'), patientController.update);
router.delete('/:id', authenticateToken, roleAuth('admin'), patientController.delete);



module.exports = router;