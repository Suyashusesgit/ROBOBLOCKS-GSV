const asyncHandler = require('express-async-handler');
const Team = require('../models/Team');

// @desc    Register a new team
// @route   POST /api/v1/teams
// @access  Private (User)
const registerTeam = asyncHandler(async (req, res) => {
    const { teamName, institute, leaderPhone, members } = req.body;

    if (!req.file) {
        res.status(400);
        throw new Error('Please upload payment proof');
    }

    const paymentProof = req.file.path;

    // Check if user already has a team
    const existingTeam = await Team.findOne({ user: req.user.id });
    if (existingTeam) {
        res.status(400);
        throw new Error('User already has a registered team');
    }

    // Parse members if it comes as string (multipart/form-data)
    let parsedMembers = [];
    if (typeof members === 'string') {
        try {
            parsedMembers = JSON.parse(members);
        } catch (error) {
            // Handle case where it might be just one member or invalid json
            parsedMembers = [];
        }
    } else {
        parsedMembers = members;
    }

    const team = await Team.create({
        user: req.user.id,
        teamName,
        institute,
        leaderPhone,
        members: parsedMembers,
        paymentProof
    });

    res.status(201).json(team);
});

// @desc    Get current user's team
// @route   GET /api/v1/teams/me
// @access  Private
const getMyTeam = asyncHandler(async (req, res) => {
    const team = await Team.findOne({ user: req.user.id });

    if (!team) {
        res.status(404);
        throw new Error('Team not found');
    }

    res.status(200).json(team);
});

// @desc    Get all teams (Admin)
// @route   GET /api/v1/teams
// @access  Private/Admin
const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find().populate('user', 'name email');
    res.status(200).json(teams);
});

// @desc    Update team status
// @route   PUT /api/v1/teams/:id/status
// @access  Private/Admin
const updateTeamStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const team = await Team.findById(req.params.id);

    if (!team) {
        res.status(404);
        throw new Error('Team not found');
    }

    team.paymentStatus = status;
    await team.save();

    res.status(200).json(team);
});

module.exports = {
    registerTeam,
    getMyTeam,
    getTeams,
    updateTeamStatus
};
