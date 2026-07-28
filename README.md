# NSHIMIYIMANA Jean Damour — Personal Developer Portfolio

A premium 3D developer portfolio built with the MERN stack, featuring a futuristic dark UI with glassmorphism, smooth animations, Three.js 3D scenes, and a full admin dashboard.

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Three.js / React Three Fiber, React Router, Lucide Icons

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth, Multer (file uploads)

**Deployment:** Vercel (frontend), Render / Railway (backend), MongoDB Atlas (database)

---

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create `server/.env` from the example:

```bash
cp server/.env.example server/.env
```

Then edit `server/.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Seed the Database

```bash
cd server
npm run seed
```

This creates:
- **Admin account:** jeandamour157@gmail.com / admin123
- Default profile, skills, and projects

### Run Development

```bash
# Terminal 1 — Server
cd server
npm run dev

# Terminal 2 — Client
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
portfolio/
├── client/                     # React frontend
│   ├── public/
│   │   └── uploads/           # Uploaded images
│   ├── src/
│   │   ├── components/        # UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ParticleBackground.jsx
│   │   │   ├── Scene3D.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   ├── SkillCard.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── AnimatedCard.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   └── useScrollAnimation.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Express backend
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/           # Route handlers
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── skillController.js
│   │   ├── projectController.js
│   │   ├── messageController.js
│   │   └── certificateController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT middleware
│   │   └── upload.js          # Multer config
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Skill.js
│   │   ├── Project.js
│   │   ├── Message.js
│   │   └── Certificate.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── profile.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   ├── messages.js
│   │   └── certificates.js
│   ├── uploads/               # Server-side uploads
│   ├── index.js               # Entry point
│   ├── seed.js                # Database seeder
│   └── package.json
│
└── README.md
```

---

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Set root directory to `client/`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable: `VITE_API_URL` → your backend URL (e.g., `https://portfolio-api.onrender.com/api`)

### Backend (Render)

1. Go to [render.com](https://render.com) → New Web Service
2. Connect GitHub repo
3. Root directory: `server/`
4. Build command: `npm install`
5. Start command: `node index.js`
6. Add environment variables from `.env`
7. Set `FRONTEND_URL` to your Vercel frontend URL

### Database (MongoDB Atlas)

1. Create a free cluster at [mongodb.com](https://mongodb.com)
2. Create a database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get the connection string and add to `MONGODB_URI`

---

## Admin Dashboard

Navigate to `/admin` to access the admin dashboard.

- **Email:** jeandamour157@gmail.com
- **Password:** admin123

Features:
- Update profile information
- Upload profile/about images
- Add, edit, delete projects
- Add, edit, delete skills
- Add, delete certificates
- View and manage contact messages
- Change password

---

## Key Features

- **3D Interactive Hero** — Three.js scene with floating laptop and code elements
- **Particle Background** — Animated 3D particle system
- **Glassmorphism UI** — Frosted glass card effects throughout
- **Smooth Animations** — Framer Motion scroll-triggered transitions
- **Dark Premium Theme** — Purple-to-cyan gradient color palette
- **Responsive Design** — Mobile-first, works on all devices
- **SEO Optimized** — Open Graph tags, semantic HTML
- **Admin Dashboard** — Full CRUD for portfolio content
- **JWT Authentication** — Secure admin access
- **File Uploads** — Image upload for projects, certificates, profile
- **Contact Form** — Messages saved to MongoDB

---

## License

Built with passion by **NSHIMIYIMANA Jean Damour**

© 2026 Jean Damour. All rights reserved.
