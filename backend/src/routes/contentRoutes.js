const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getContent)
    .put(protect, admin, updateContent);

module.exports = router;
