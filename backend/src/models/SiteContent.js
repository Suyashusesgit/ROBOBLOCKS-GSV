const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
    // Singleton ID constraint (we usually just have one doc)
    identifier: { type: String, default: 'main', unique: true },

    about: {
        mission: String,
        story: String,
        callToAction: String
    },

    rules: [{
        text: String
    }],

    schedule: [{
        time: String,
        title: String,
        desc: String
    }],

    faqs: [{
        q: String,
        a: String
    }],

    gallery: [{
        url: String,
        caption: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
