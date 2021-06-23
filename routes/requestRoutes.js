const { Router } = require('express');
const requestController = require('../controllers/requestController');

const router = Router();

router.get('/requests', requestController.request_index);
router.get('/create', requestController.request_create_get);
router.post('/requests', requestController.request_create_post);
router.get('/:id', requestController.request_details);
router.delete('/:id', requestController.request_delete);

module.exports = router;