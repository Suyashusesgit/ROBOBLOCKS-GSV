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
        { year: "Phase 1", title: "Registration", desc: "Teams can start registering on the portal." },
        { year: "Phase 2", title: "Idea Submission", desc: "Submission of robot design, workflow and algorithm documentation." },
        { year: "Phase 3", title: "ROS Simulation", desc: "Simulate your bot in the provided ROS environment." },
        { year: "Phase 4", title: "Offline Round", desc: "Grand Finale with working bots at the arena." }
    ],
    sponsors: [
        { name: "TECH GIANT 1", tier: "Title" },
        { name: "TECH GIANT 2", tier: "Title" },
        { name: "INNOVATE 1", tier: "Gold" },
        { name: "INNOVATE 2", tier: "Gold" }
    ],
    organizers: [
        { name: "Aman Choudhary", role: "Event Head", contact: "aman.choudhary_btech23@gsv.ac.in" },
        { name: "Pranjal Chaturvedi", role: "Event Head", contact: "pranjal.chaturvedi_btech24@gsv.ac.in" },
        { name: "Ayush Aditya", role: "Event Coordinator", contact: "ayush.aditya_btech24@gsv.ac.in" },
        { name: "Arunodya Sharma", role: "Event Coordinator", contact: "arunodya.sharma_btech24@gsv.ac.in" },
        { name: "Shashank Savarkar", role: "Event Technical Head", contact: "shashank.savarkar_btech24@gsv.ac.in" },
        { name: "Suyash Srivastav", role: "Event Technical Head", contact: "suyash.srivastav_btech24@gsv.ac.in" }
    ],

    // OTHER PAGES
    about: {
        mission: "INITIATIVE 2140: THE CYBERGRID",
        story: "In the wake of the Silicon Collapse of 2099, the world's infrastructure is managed by autonomous sentinels. To ensure only the most resilient algorithms govern our future, the Global Sentinel Vault (GSV) established **ROBOBLOCKS**.\n\nSet in the year 2140, teams must engineer units capable of traversing the \"CyberGrid\"—a shifting, hazardous digital-physical terrain where code dictates survival. This is not just a game; it is the proving ground for the architects of tomorrow.",
        callToAction: "The Grid awaits. Will your code endure, or will it be purged?"
    },
    rules: [
        { text: "PROTOCOL 01: SQUAD INTEGRITY. Max 4 Operators per unit. No external comms allowed during combat phase." },
        { text: "PROTOCOL 02: DIMENSIONAL LIMITS. Robot chassis must fit within a 30x30x30cm bounding box. Expanding mechanisms allowed post-deployment." },
        { text: "PROTOCOL 03: MASS RESTRICTIONS. Wired units < 5kg. Autonomous units < 4kg. Excess mass results in immediate disqualification." },
        { text: "PROTOCOL 04: ENERGY SOURCE. On-board DC sources only (Max 12V). Combustion or nuclear cells prohibited." },
        { text: "PROTOCOL 05: INTERFERENCE. Jamming enemy signals is strictly prohibited. Electronic warfare suites must be disabled." },
        { text: "PROTOCOL 06: FAILSAFE. Emergency kill-switch must be physically accessible and clearly marked in RED." },
        { text: "PROTOCOL 07: KINETIC DAMAGE. Projectiles are allowed but must not penetrate standard polycarbonate shields." },
        { text: "PROTOCOL 08: ARENA BOUNDARIES. Leaving the CyberGrid (Arena) results in a 10-second penalty lockout." },
        { text: "PROTOCOL 09: AUTONOMY. During 'Glitch Hour', no manual control is permitted. Bots must rely on sensor fusion." },
        { text: "PROTOCOL 10: SPORTSMANSHIP. Any physical altercation between operators results in a lifetime ban from GSV events." }
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
    { name: 'Admin User', email: 'admin@roboblocks.com', password: 'password123', role: 'admin' },
    { name: 'Demo User', email: 'demo@user.com', password: 'password123', role: 'user' }
];

// 3. TEAMS
const seedTeams = [
    {
        teamName: 'Alpha Squad',
        institute: 'IIT Bombay',
        leaderPhone: '9876543210',
        leaderEmail: 'demo@user.com',
        paymentProof: 'uploads/proof_alpha.jpg',
        paymentStatus: 'verified',
        score: 2450,
        submissionStatus: 'submitted',
        members: [
            { name: 'John Doe', email: 'john@iitb.ac.in', phone: '9000000001' },
            { name: 'Jane Smith', email: 'jane@iitb.ac.in', phone: '9000000002' }
        ]
    },
    {
        teamName: 'Beta Bots',
        institute: 'NIT Trichy',
        leaderPhone: '9123456789',
        leaderEmail: '',
        paymentProof: 'uploads/proof_beta.jpg',
        paymentStatus: 'verified',
        score: 1890,
        submissionStatus: 'submitted',
        members: [{ name: 'Alice Brown', email: 'alice@nitt.edu', phone: '8000000001' }]
    },
    {
        teamName: 'Cyber Centurions',
        institute: 'BITS Pilani',
        leaderPhone: '9988776655',
        paymentProof: 'uploads/proof_cyber.jpg',
        paymentStatus: 'verified',
        score: 2100,
        submissionStatus: 'submitted',
        members: [{ name: 'Neo', email: 'neo@bits.edu' }]
    },
    {
        teamName: 'Delta Force',
        institute: 'Delhi Tech Univ',
        leaderPhone: '8877665544',
        paymentProof: 'uploads/proof_delta.jpg',
        paymentStatus: 'verified',
        score: 1650,
        submissionStatus: 'submitted',
        members: [{ name: 'Trinity', email: 'trin@dtu.ac.in' }]
    },
    {
        teamName: 'Echo Engineers',
        institute: 'VIT Vellore',
        leaderPhone: '7766554433',
        paymentProof: 'uploads/proof_echo.jpg',
        paymentStatus: 'pending',
        score: 1200,
        submissionStatus: 'pending',
        members: [{ name: 'Cipher', email: 'cipher@vit.ac.in' }]
    },
    {
        teamName: 'Falcon Dynamics',
        institute: 'Manipal Univ',
        leaderPhone: '6655443322',
        paymentProof: 'uploads/proof_falcon.jpg',
        paymentStatus: 'verified',
        score: 1980,
        submissionStatus: 'submitted',
        members: [{ name: 'Switch', email: 'switch@manipal.edu' }]
    },
    {
        teamName: 'Gamma Rays',
        institute: 'SRM Chennai',
        leaderPhone: '5544332211',
        paymentProof: 'uploads/proof_gamma.jpg',
        paymentStatus: 'rejected',
        score: 0,
        submissionStatus: 'pending',
        members: [{ name: 'Dozer', email: 'dozer@srm.edu' }]
    },
    {
        teamName: 'Omega Protocol',
        institute: 'IIIT Hyderabad',
        leaderPhone: '4433221100',
        paymentProof: 'uploads/proof_omega.jpg',
        paymentStatus: 'verified',
        score: 2300,
        submissionStatus: 'submitted',
        members: [{ name: 'Oracle', email: 'oracle@iiit.ac.in' }]
    }
];
// ============================================================

const seedData = async () => {
    try {
        console.log('🌱 Starting Seed Process...');

        // 1. Seed Site Content (Upsert Singleton)
        console.log(`\nUpdating Site Content...`);
        const content = await SiteContent.findOneAndUpdate(
            { identifier: 'main' },
            seedContent,
            { new: true, upsert: true }
        );
        console.log('   Updated Site Content');


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
