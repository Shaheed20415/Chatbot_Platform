const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/chat.controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


router.post('/', auth, controller.chat);


router.post('/file', auth, upload.single('file'), controller.chat);

module.exports = router;


// const router = require('express').Router();
// const auth = require('../middleware/auth.middleware');
// const upload = require('../middleware/upload.middleware');
// const controller = require('../controllers/chat.controller');

// router.post(
//   '/',
//   auth,
//   upload.single('file'), // ✅ REQUIRED
//   controller.sendMessage
// );

// module.exports = router;


// const router = require('express').Router();
// const auth = require('../middleware/auth.middleware');
// const controller = require('../controllers/chat.controller');

// router.post('/', auth, controller.chat);

// module.exports = router;