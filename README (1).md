# ⚡ NxtBuild — AI-Powered Web App Builder

> Describe what you want in plain English. Get a working web app in seconds.

NxtBuild is a full-stack AI code generation platform inspired by Bolt.new and Lovable.dev. Users describe their app idea in a chat interface, and Google Gemini AI generates complete, self-contained HTML/CSS/JavaScript — with a live preview, version history, and one-click download.

![Built with](https://img.shields.io/badge/React-19-blue?logo=react) ![Express](https://img.shields.io/badge/Express-5-black?logo=express) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb) ![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-orange?logo=google)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure register/login with JWT tokens and bcrypt password hashing |
| 📁 **Project Management** | Create, rename, and delete web app projects stored in MongoDB |
| 🤖 **AI Code Generation** | Describe your app in natural language — Gemini generates complete HTML/CSS/JS |
| 💬 **Chat Interface** | Conversational UI to iteratively refine your app through follow-up prompts |
| 👁️ **Live Preview** | See your generated app rendered in real-time inside a sandboxed iframe |
| 🕐 **Version History** | Browse and restore previous versions of your generated app |
| 🔗 **Share Feature** | Generate a public URL to share your app with anyone — no login required |
| ⚡ **Prompt Templates** | One-click starter templates: portfolio, calculator, quiz app, and more |
| 💾 **Code Download** | Download the generated app as a standalone `.html` file |
| ✏️ **Code Editor** | View and manually edit the generated source code |

---

## 🏗️ Architecture

```
Browser
   │
   ▼
┌─────────────────────────────────────────────────┐
│         Frontend — React + Vite (5173)          │
│  Landing │ Dashboard │ Builder │ Shared View    │
└───────────────────┬─────────────────────────────┘
                    │ REST / JSON
                    ▼
┌─────────────────────────────────────────────────┐
│        Backend — Express + Node.js (5000)       │
│  /api/auth  │  /api/projects  │  /api/generate  │
│                               │  /api/share     │
└──────┬────────────────────────┬─────────────────┘
       │                        │
       ▼                        ▼
  MongoDB Atlas            Gemini AI
  (Users, Projects,        (gemini-2.5-flash)
   Messages, Versions)
```

### Tech Stack

**Frontend**
- React 19 + Vite 6
- React Router DOM 7 — client-side routing
- Axios — HTTP requests
- js-cookie — JWT token storage

**Backend**
- Express 5 — REST API
- Mongoose 9 — MongoDB ODM
- bcryptjs — password hashing
- jsonwebtoken — JWT auth
- @google/genai — Gemini AI SDK

**Database & AI**
- MongoDB Atlas — cloud database
- Google Gemini 2.5 Flash — code generation

---

## 📁 Project Structure

```
nxtbuild/
├── server/
│   ├── server.js                  # Entry point
│   └── src/
│       ├── app.js                 # Express setup
│       ├── config/
│       │   ├── db.config.js       # MongoDB connection
│       │   └── gemini.config.js   # Gemini AI client
│       ├── constants/
│       │   └── prompts.js         # AI system prompts
│       ├── controllers/           # Request handlers
│       │   ├── auth.controller.js
│       │   ├── project.controller.js
│       │   └── generation.controller.js
│       ├── middleware/
│       │   ├── auth.middleware.js  # JWT verification
│       │   └── error.middleware.js
│       ├── models/
│       │   ├── User.model.js
│       │   └── Project.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── project.routes.js
│       │   ├── generation.routes.js
│       │   ├── share.routes.js
│       │   └── index.js
│       ├── services/
│       │   ├── auth.service.js
│       │   ├── project.service.js
│       │   ├── gemini.service.js
│       │   └── generation.service.js
│       └── utils/
│           ├── jwt.utils.js
│           └── code.utils.js
│
└── client/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── context/
        │   ├── AuthContext.jsx     # Global auth state
        │   └── ToastContext.jsx    # Global notifications
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── ProjectCard.jsx
        │   ├── ChatMessage.jsx
        │   ├── ChatInput.jsx
        │   ├── CodeEditor.jsx
        │   ├── LivePreview.jsx
        │   └── FeatureCard.jsx
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── LoginPage.jsx
        │   ├── DashboardPage.jsx
        │   ├── BuilderPage.jsx
        │   └── SharedPage.jsx
        ├── services/
        │   ├── api.js
        │   ├── authService.js
        │   ├── projectService.js
        │   └── generationService.js
        └── styles/
            ├── landing.css
            ├── login.css
            ├── navbar.css
            ├── dashboard.css
            └── builder.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nxtbuild.git
cd nxtbuild
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nxtbuild
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

### 4. Open the app

Visit `http://localhost:5173` in your browser.

---

## 🔌 API Reference

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create a new account |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/auth/me` | Yes | Get current user profile |
| POST | `/api/auth/logout` | Yes | Logout |

### Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | Yes | Get all user projects |
| POST | `/api/projects` | Yes | Create a new project |
| GET | `/api/projects/:id` | Yes | Get a single project |
| PUT | `/api/projects/:id` | Yes | Update project title |
| DELETE | `/api/projects/:id` | Yes | Delete a project |

### Generation

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/generate/:projectId` | Yes | Generate code from a prompt |

### Share

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/share/:projectId` | Yes | Make project public + get share URL |
| GET | `/api/share/:shareToken` | No | View a shared project (public) |

---

## 💡 How It Works

1. **User describes their app** — e.g. "Build a to-do list app with dark mode"
2. **Backend builds a prompt** — includes conversation history, current code context, and AI rules
3. **Gemini AI generates code** — returns a complete, self-contained HTML file
4. **Response is parsed** — description text and `\`\`\`html` code block are separated
5. **Project is updated** — messages, code, and version snapshot saved to MongoDB
6. **Frontend renders preview** — code injected into a sandboxed iframe instantly

---

## 🎯 Bonus Features Implemented

- ✅ **Version History** — every AI generation saves a snapshot; browse and restore old versions
- ✅ **Share Feature** — generates a public `/share/:id` URL anyone can view without logging in
- ✅ **Prompt Templates** — 6 one-click starter templates on the dashboard

---

## 🔒 Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire after 7 days
- All project routes require authentication
- Generated apps run in sandboxed iframes (`sandbox="allow-scripts"`)
- Users can only access their own projects (userId scoping on all queries)

---

## 🌐 Deployment

### Backend (Railway / Render)
1. Set environment variables in your platform's dashboard
2. Set build command: `npm install`
3. Set start command: `node server.js`

### Frontend (Vercel / Netlify)
1. Set build command: `npm run build`
2. Set output directory: `dist`
3. Update `BASE_URL` in `client/src/services/api.js` to your deployed backend URL

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use this project for learning or as a base for your own AI builder.

---

## 🙏 Acknowledgements

- [Google Gemini](https://deepmind.google/technologies/gemini/) — AI code generation
- [Bolt.new](https://bolt.new) — inspiration
- [Lovable.dev](https://lovable.dev) — inspiration

---

Built with ❤️ using React, Express, MongoDB & Gemini AI
