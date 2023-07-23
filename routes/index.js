const express = require('express');
const router = express.Router();

//require controller modules
const auth_controller = require('../controllers/authController');
const message_controller = require('../controllers/messageController')

/* GET home page. */
router.get('/', message_controller.get_message_list);

router.get('/sign-up', auth_controller.signup_get);

router.post('/sign-up', auth_controller.signup_post);

router.get('/log-in', auth_controller.login_get);

router.post('/log-in', auth_controller.login_post);

router.post('/log-out', auth_controller.logout_post);

router.post('/join-club', auth_controller.join_club_post);

router.post('/new-message/:id', message_controller.new_message_post);

module.exports = router;
