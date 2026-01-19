const express = require('express');
const router = express.Router();
const {
    registerTeam,
    getMyTeam,
    getTeams,
    updateTeamStatus
} = require('../controllers/teamController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .post(protect, upload.single('paymentProof'), registerTeam)
    .get(protect, admin, getTeams);

router.get('/me', protect, getMyTeam);

router.put('/:id/status', protect, admin, updateTeamStatus);

module.exports = router;
