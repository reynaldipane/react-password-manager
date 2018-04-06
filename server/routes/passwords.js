const express        = require('express');
const router         = express.Router();
const passwordController = require('../controllers/PasswordController');


router.post('/findbyuserid', passwordController.readByUserId);
router.post('/', passwordController.create);
router.put('/:id', passwordController.update);
router.delete('/:id', passwordController.delete);

module.exports = router;
