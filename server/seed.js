const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    await User.deleteMany({});
    await Profile.deleteMany({});
    await Skill.deleteMany({});
    await Project.deleteMany({});

    const admin = await User.create({
      username: 'admin',
      email: 'jeandamour157@gmail.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created');

    const profile = await Profile.create({
      name: 'NSHIMIYIMANA Jean Damour',
      title: 'Software Development Student | MERN Stack Developer | Python Developer | AI Enthusiast',
      description: 'I build modern web applications, AI-powered solutions, and practical software systems using modern technologies.',
      email: 'jeandamour157@gmail.com',
      phone: '+250 795 452 115',
      location: 'Rwanda',
      profileImage: '',
      aboutImage: '',
      resumeUrl: '',
      socialLinks: {
        instagram: 'https://www.instagram.com/jayd3_12/',
        facebook: 'https://web.facebook.com/nshimiyimana.nshimiyimanajdamour',
        linkedin: 'https://www.linkedin.com/in/nshimiyimana-jean-damour-67a721316/',
        x: 'https://x.com/jeandamour157',
        whatsapp: 'https://wa.me/250795452115',
        telegram: 'https://t.me/jayd3_12'
      },
      education: [
        {
          school: 'University of Rwanda',
          level: "Bachelor's Degree in Computer Science",
          startYear: '2021',
          endYear: '2025',
          image: '',
          description: 'Studied computer science with a focus on software engineering and artificial intelligence. Active participant in coding clubs and hackathons.'
        },
        {
          school: 'APTC Kigali',
          level: 'Advanced Level Certificate',
          startYear: '2018',
          endYear: '2020',
          image: '',
          description: 'Completed advanced level studies with a focus on mathematics, physics, and computer science.'
        }
      ],
      stats: {
        projectsCount: 15,
        technologiesCount: 20,
        experience: '3+ years',
        gpa: '3.8/4.0'
      }
    });
    console.log('Default profile created');

    const skills = await Skill.insertMany([
      { name: 'HTML5', category: 'frontend', level: 95, icon: 'html5' },
      { name: 'CSS3', category: 'frontend', level: 90, icon: 'css3' },
      { name: 'JavaScript', category: 'frontend', level: 88, icon: 'javascript' },
      { name: 'React.js', category: 'frontend', level: 85, icon: 'react' },
      { name: 'Tailwind CSS', category: 'frontend', level: 90, icon: 'tailwindcss' },
      { name: 'Node.js', category: 'backend', level: 82, icon: 'nodejs' },
      { name: 'Express.js', category: 'backend', level: 80, icon: 'express' },
      { name: 'REST API', category: 'backend', level: 85, icon: 'api' },
      { name: 'MongoDB', category: 'database', level: 78, icon: 'mongodb' },
      { name: 'PostgreSQL', category: 'database', level: 70, icon: 'postgresql' },
      { name: 'JavaScript', category: 'programming', level: 88, icon: 'javascript' },
      { name: 'Python', category: 'programming', level: 75, icon: 'python' },
      { name: 'Git', category: 'tools', level: 85, icon: 'git' },
      { name: 'GitHub', category: 'tools', level: 88, icon: 'github' },
      { name: 'VS Code', category: 'tools', level: 92, icon: 'vscode' },
      { name: 'Postman', category: 'tools', level: 80, icon: 'postman' },
      { name: 'Machine Learning Basics', category: 'ai', level: 65, icon: 'ml' },
      { name: 'AI APIs', category: 'ai', level: 72, icon: 'ai' },
      { name: 'AI Application Development', category: 'ai', level: 70, icon: 'ai-dev' }
    ]);
    console.log(`${skills.length} skills created`);

    const projects = await Project.insertMany([
      {
        title: 'AI Study Assistant',
        description: 'An intelligent study companion that uses AI to help students learn more effectively. Features include personalized study plans, smart note summarization, interactive quizzes, and progress tracking. Built with React.js frontend and Node.js backend integrated with OpenAI API.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'OpenAI API', 'MongoDB', 'Tailwind CSS'],
        githubUrl: 'https://github.com/jeandamour/ai-study-assistant',
        liveUrl: '',
        image: '',
        featured: true,
        order: 1
      },
      {
        title: 'CreatorConnect',
        description: 'A social platform connecting content creators with their audience. Features include content scheduling, analytics dashboard, real-time messaging, and monetization tools. Designed to help creators grow their personal brand.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Cloudinary'],
        githubUrl: 'https://github.com/jeandamour/creatorconnect',
        liveUrl: '',
        image: '',
        featured: true,
        order: 2
      },
      {
        title: 'Customer Support Chatbot SaaS',
        description: 'A SaaS platform that enables businesses to deploy AI-powered customer support chatbots on their websites. Features include custom training, multi-language support, analytics, and seamless handoff to human agents.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'WebSocket'],
        githubUrl: 'https://github.com/jeandamour/support-chatbot-saas',
        liveUrl: '',
        image: '',
        featured: true,
        order: 3
      },
      {
        title: 'FoodieApp',
        description: 'A food delivery and restaurant discovery application. Users can browse restaurants, view menus, place orders, track deliveries in real-time, and leave reviews. Features a clean UI with smooth animations.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Google Maps API', 'Stripe'],
        githubUrl: 'https://github.com/jeandamour/foodieapp',
        liveUrl: '',
        image: '',
        featured: true,
        order: 4
      },
      {
        title: 'AgriConnect Rwanda',
        description: 'A digital platform connecting Rwandan farmers with buyers and providing agricultural resources. Features include market price tracking, weather forecasts, farming tips, and direct farmer-to-consumer sales.',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'SMS API', 'Chart.js'],
        githubUrl: 'https://github.com/jeandamour/agriconnect-rwanda',
        liveUrl: '',
        image: '',
        featured: true,
        order: 5
      }
    ]);
    console.log(`${projects.length} projects created`);

    console.log('\nSeeding completed successfully!');
    console.log('Admin credentials:');
    console.log('  Email: jeandamour157@gmail.com');
    console.log('  Password: admin123');

    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seed();
