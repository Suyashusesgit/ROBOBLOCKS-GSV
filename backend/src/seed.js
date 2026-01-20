const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');
const Team = require('./models/Team');
const SiteContent = require('./models/SiteContent');

// Load env vars from the backend root (one level up from src)
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to DB
connectDB();

// DATA TO SEED
// ============================================================
// Add your real data below. 
// TIP: Use distinct emails for users and distinct teamNames for teams.

// 1. SITE CONTENT (Home, About, Schedule, FAQ, Gallery)
const seedContent = {
    identifier: 'main', // Singleton ID

    // HOME PAGE
    hero: {
        title: "ROBOBLOCKS",
        subtitle: "National Level Robotics Event",
        countdownTarget: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    },
    timeline: [
        { year: "PHASE 1", title: "Registration", desc: "Teams register and submit their initial robot concepts for review. Access to documentation and grid specs." },
        { year: "PHASE 2", title: "Idea Submission", desc: "Detailed CAD designs and strategy documents are submitted. Top 50 teams qualify for the technical interview." },
        { year: "PHASE 3", title: "Grand Finale", desc: "The final showdown. 48 hours of non-stop robotics action in the RoboBlocks Arena." }
    ],
    sponsors: [
        { name: "TECH GIANT 1", tier: "Title" },
        { name: "TECH GIANT 2", tier: "Title" },
        { name: "INNOVATE 1", tier: "Gold" },
        { name: "INNOVATE 2", tier: "Gold" },
        { name: "INNOVATE 3", tier: "Gold" },
        { name: "STARTUP 1", tier: "Silver" },
        { name: "STARTUP 2", tier: "Silver" },
        { name: "STARTUP 3", tier: "Silver" },
        { name: "STARTUP 4", tier: "Silver" }
    ],
    organizers: [
        { name: "Alex Chen", role: "Event Lead", contact: "alex@roboblocks.com" },
        { name: "Sarah Jones", role: "Technical Head", contact: "sarah@roboblocks.com" },
        { name: "Mike Ross", role: "Operations", contact: "mike@roboblocks.com" }
    ],

    // OTHER PAGES
    about: {
        mission: "**RoboBlocks** is the premier national-level robotics event designed to test the limits of mechanical engineering and autonomous code.",
        story: "Set in the year 2140, teams must engineer units capable of navigating the \"CyberGrid\"—a hazardous digital-physical terrain.",
        callToAction: "Join us in the arena. Prove your logic."
    },
    rules: [
        { text: "Squad Size: Max 4 Operators per unit." },
        { text: "Dimensions: Robot must fit within a 30x30x30cm bounding box." },
        { text: "Weight Limit: Wired units < 5kg, Autonomous units < 4kg." },
        { text: "Power: On-board DC sources only. No combustion engines." },
        { text: "Conduct: Sabotage of enemy signals (jamming) is strictly prohibited." },
        { text: "Safety: Emergency kill-switch must be accessible at all times." }
    ],
    schedule: [
        { time: "08:00", title: "System Initialization", desc: "All units power on. Network handshake protocols initiated." },
        { time: "09:30", title: "Diagnostic Checks", desc: "Mandatory hardware inspection. Laser calibration." },
        { time: "10:00", title: "Sector A: Obstacle Matrix", desc: "First wave of autonomous navigation." },
        { time: "12:00", title: "Coolant Refresh", desc: "Scheduled downtime for biomass (human) refueling." },
        { time: "13:30", title: "Sector B: Combat Logic", desc: "Competitive algorithms activated. Capture-the-flag." },
        { time: "15:00", title: "Glitch Hour", desc: "Surprise random variable injection." },
        { time: "17:00", title: "Final Compile", desc: "Score aggregation. Top 8 advance." },
        { time: "19:00", title: "System Shutdown", desc: "Award ceremony and data archiving." }
    ],
    faqs: [
        { q: "INIT_PARAMETER: PARTICIPATION_CRITERIA", a: "Target demographic: Students aged 14-22. Status: High School or Undergraduate." },
        { q: "UNIT_CONFIGURATION: SQUAD_SIZE", a: "Squad limits: Min 3 / Max 5 units per team." },
        { q: "RESOURCE_ALLOCATION: ENTRY_FEE", a: "Processing fee: $50 credits per team. Includes hardware kit." },
        { q: "HARDWARE_SPECS: BYOD_POLICY", a: "Basic toolsets provided. Custom modules must be provisioned by the team." },
        { q: "LOGISTICS: ACCOMMODATION", a: "Dormitory access provided for out-of-sector teams." }
    ],
    gallery: [
        { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", caption: "Arena View" },
        { url: "https://images.unsplash.com/photo-1535378437323-9555f3e7f667?w=800&q=80", caption: "Unit 01" },
        { url: "https://images.unsplash.com/photo-1518674660708-312141344184?w=800&q=80", caption: "Code Matrix" },
        { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", caption: "Finals" },
        { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", caption: "Workshop" }
    ]
};

// 2. USERS
const seedUsers = [
    {
        name: 'Admin User',
        email: 'admin@roboblocks.com',
        password: 'password123', // Will be hashed if created/updated
        role: 'admin'
    },
    {
        name: 'Demo User',
        email: 'demo@user.com',
        password: 'password123',
        role: 'user'
    }
];

// 3. TEAMS
const seedTeams = [
    {
        // Metadata
        teamName: 'Alpha Squad',
        institute: 'IIT Bombay',
        leaderPhone: '9876543210',

        // Link to a User (Optional: matched by email above)
        leaderEmail: 'demo@user.com',

        // Payment Info
        paymentProof: 'uploads/proof_alpha.jpg',
        paymentStatus: 'verified', // 'pending', 'verified', 'rejected'

        // Game Data
        score: 100,

        // Members
        members: [
            { name: 'John Doe', email: 'john@iitb.ac.in', phone: '9000000001' },
            { name: 'Jane Smith', email: 'jane@iitb.ac.in', phone: '9000000002' }
        ]
    },
    {
        teamName: 'Beta Bots',
        institute: 'NIT Trichy',
        leaderPhone: '9123456789',
        leaderEmail: '', // Leave empty if no user linkage required
        paymentProof: 'uploads/proof_beta.jpg',
        paymentStatus: 'pending',
        score: 0,
        members: [
            { name: 'Alice Brown', email: 'alice@nitt.edu', phone: '8000000001' }
        ]
    }
];
// ============================================================

const seedData = async () => {
    try {
        console.log('🌱 Starting Seed Process...');

        // 1. Seed Site Content (Upsert Singleton)
        console.log(`\nUpdating Site Content...`);
        let content = await SiteContent.findOne({ identifier: 'main' });
        if (content) {
            Object.assign(content, seedContent);
            await content.save();
            console.log('   Updated Site Content');
        } else {
            await SiteContent.create(seedContent);
            console.log('   Created Site Content');
        }


        // 2. Seed Users
        console.log(`\nProcessing ${seedUsers.length} Users...`);
        for (const userData of seedUsers) {
            let user = await User.findOne({ email: userData.email });

            if (user) {
                // Update existing user properties
                user.name = userData.name;
                user.role = userData.role;
                if (userData.password) {
                    user.password = userData.password; // Triggers pre-save hash
                }
                await user.save();
                console.log(`   Updated User: ${userData.email}`);
            } else {
                // Create new user
                await User.create(userData);
                console.log(`   Created User: ${userData.email}`);
            }
        }

        // 3. Seed Teams
        console.log(`\nProcessing ${seedTeams.length} Teams...`);
        for (const teamData of seedTeams) {
            // Check existence
            let team = await Team.findOne({ teamName: teamData.teamName });

            // Prepare team object for update/create
            const updatePayload = {
                teamName: teamData.teamName,
                institute: teamData.institute,
                leaderPhone: teamData.leaderPhone,
                paymentProof: teamData.paymentProof,
                paymentStatus: teamData.paymentStatus,
                score: teamData.score,
                members: teamData.members
            };

            // Link User if leaderEmail is provided
            if (teamData.leaderEmail) {
                const leaderUser = await User.findOne({ email: teamData.leaderEmail });
                if (leaderUser) {
                    updatePayload.user = leaderUser._id;
                } else {
                    console.log(`   ⚠️  Warning: User with email ${teamData.leaderEmail} not found. Linking skipped.`);
                }
            }

            if (team) {
                // Update existing team
                Object.assign(team, updatePayload);
                await team.save();
                console.log(`   Updated Team: ${teamData.teamName}`);
            } else {
                // Create new team
                await Team.create(updatePayload);
                console.log(`   Created Team: ${teamData.teamName}`);
            }
        }

        console.log('\n✅ Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`\n❌ Error with seed script: ${error.message}`);
        process.exit(1);
    }
};

seedData();
