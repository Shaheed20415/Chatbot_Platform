const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");
const ctrl = require("../controllers/chat.controller");

/**
 * TEXT CHAT (ChatGPT-style)
 */
router.post("/", auth, ctrl.chat);

/**
 * FILE + CHAT
 */
router.post("/upload", auth, upload.single("file"), ctrl.chatWithFile);

module.exports = router;


// const router = require("express").Router();
// const auth = require("../middleware/auth.middleware");
// const upload = require("../middleware/upload");
// const ctrl = require("../controllers/chat.controller");

// router.get("/", auth, ctrl.getChats);
// router.post("/", auth, ctrl.createChat);
// router.get("/:chatId", auth, ctrl.getChat);
// router.post("/:chatId/message", auth, ctrl.sendMessage);
// router.patch("/:chatId/title", auth, ctrl.renameChat);
// router.delete("/:chatId", auth, ctrl.deleteChat);
// router.delete("/", auth, ctrl.clearChats);
// router.post("/:chatId/upload", auth, upload.single("file"), ctrl.uploadFile);

// module.exports = router;


// const router = require('express').Router();
// const auth = require('../middleware/auth.middleware');
// const controller = require('../controllers/chat.controller');
// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });


// router.post('/', auth, controller.chat);


// router.post('/file', auth, upload.single('file'), controller.chat);

// module.exports = router;


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