const asyncHandler = require('express-async-handler');
const SiteContent = require('../models/SiteContent');

// @desc    Get all public site content
// @route   GET /api/v1/content
// @access  Public
const getContent = asyncHandler(async (req, res) => {
    let content = await SiteContent.findOne({ identifier: 'main' });

    // Return empty structure if not found (or could seed it here)
    if (!content) {
        content = {};
    }

    res.status(200).json(content);
});

module.exports = {
    getContent
};
