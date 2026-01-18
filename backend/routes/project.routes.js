const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/project.controller');

router.post('/', auth, controller.createProject);
router.get('/', auth, controller.getProjects);
router.put('/:id', auth, controller.renameProject);
router.delete('/:id', auth, controller.deleteProject);
module.exports = router;