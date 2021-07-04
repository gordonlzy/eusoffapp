const { Router } = require('express');
const requestController = require('../controllers/requestController');

const router = Router();

router.get('', requestController.request_index);
router.get('/create', requestController.request_create_get);
router.post('', requestController.request_create_post);
router.get('/:id', requestController.request_details);
router.delete('/:id', requestController.request_delete);
router.post('/:id', requestController.request_edit_post);
router.post('/take-request/:id', requestController.request_takeRequest_post);
router.post('/remove/:id', requestController.request_remove_post);
router.post('/complete/:id', requestController.request_complete_post);

module.exports = router;