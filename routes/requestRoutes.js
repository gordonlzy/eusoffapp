const { Router } = require('express');
const requestController = require('../controllers/requestController');

const router = Router();

router.get('', requestController.request_index);
router.get('/create', requestController.request_create_get);
router.post('', requestController.request_create_post);
router.get('/:id', requestController.request_details);
router.delete('/:id', requestController.request_delete);
// router.post('/:id', requestController.request_take_post);

module.exports = router;