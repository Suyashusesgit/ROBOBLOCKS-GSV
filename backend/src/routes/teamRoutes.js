const express = require('express');
const router = express.Router();
const {
    registerTeam,
    getMyTeam,
    getTeams,
    getPublicTeams,

    updateTeamStatus,
    updateTeamScore,
    uploadSubmission
} = require('../controllers/teamController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .post(upload.single('paymentProof'), registerTeam)
    .get(protect, admin, getTeams);

router.get('/public', getPublicTeams);

router.get('/me', protect, getMyTeam);

router.put('/:id/status', protect, admin, updateTeamStatus);
router.put('/:id/score', protect, admin, updateTeamScore);
router.post('/:id/upload', protect, upload.single('file'), uploadSubmission);

module.exports = router;
