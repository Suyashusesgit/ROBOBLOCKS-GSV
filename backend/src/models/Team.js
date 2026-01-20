const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    teamName: {
        type: String,
        required: [true, 'Please add a team name'],
        unique: true,
        trim: true
    },
    institute: {
        type: String,
        required: [true, 'Please add your institute/college name']
    },
    leaderPhone: {
        type: String,
        required: [true, 'Please add leader phone number']
    },
    members: [{
        name: String,
        email: String,
        phone: String
    }],
    paymentProof: {
        type: String, // URL/Path to file
        required: [true, 'Please upload payment proof']
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },

    // Phase 3: Project Submissions
    abstractFile: { type: String }, // Path to abstract PDF
    cadFile: { type: String },      // Path to CAD zip
    submissionStatus: {
        type: String,
        enum: ['pending', 'submitted', 'reviewing', 'approved'],
        default: 'pending'
    },

    score: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', teamSchema);
