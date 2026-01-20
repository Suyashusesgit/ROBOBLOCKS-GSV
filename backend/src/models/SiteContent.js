const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
    hero: {
        title: String,
        subtitle: String,
        countdownTarget: Date
    },

    timeline: [{
        year: String,
        title: String,
        desc: String
    }],

    sponsors: [{
        name: String,
        tier: { type: String, enum: ['Title', 'Gold', 'Silver'] }
    }],

    organizers: [{
        name: String,
        role: String,
        contact: String
    }],

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
