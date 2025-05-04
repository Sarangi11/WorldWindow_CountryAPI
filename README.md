# WorldWindow_CountryAPI
🚀 Features
============

*Global Browsing: Load all countries with flags and key facts.

*Live Search: Search by name with debounced input and URL sync.

*Region & Language Filters: Narrow down countries by region or language.

*Favorites: Mark/unmark countries and view your favorites list.

*Detail View: Click a country card to see extended info, native name, currencies, languages, and border navigation.

*Google Maps Embed: See the selected country’s location on an interactive map.

*Theme Toggle: Switch between light and dark modes, with preference saved in localStorage.

*Routing: Client‐side navigation with React Router v6.

*Testing: Jest & React Testing Library for unit and integration tests.


🛠️ Tech Stack
=============

Framework: React (Vite)

Styling: Tailwind CSS (class‑based dark mode)

State: React Context API (Auth, Favorites, Theme)

Routing: React Router v6

Data: REST Countries API

Testing: Jest, React Testing Library


📦 Installation
==============

Prerequisites

Node.js v14+ and npm 

Setup

# Clone the repository
git clone https://github.com/<your-username>/rest-countries-explorer.git
cd rest-countries-explorer/client

# Install dependencies
npm install


# Start the dev server
npm run dev


Open http://localhost:5173 .

📦 Build & Preview
==================

# Build for production
npm run build


# Preview the production build
npm run preview


The compiled assets live in the dist/ folder.


🚀 Deployment
=============

Netlify


Framework: Vite; Build: npm run build; Output: dist.

GitHub Pages

npm install --save-dev gh-pages

Add to package.json:

"homepage": "https://<username>.github.io/<repo>",
"scripts": {
  "predeploy": "npm run build",
  "deploy":   "gh-pages -d dist"
}

npm run deploy.

🧪 Testing

npm test


Runs Jest suites in src/__tests__/ using React Testing Library.


📁 Project Structure
=====================

client/
├─ public/                # Static assets & index.html
├─ src/
│  ├─ api/                # REST Countries fetch wrappers
│  ├─ components/         # Reusable UI components
│  ├─ contexts/           # Auth, Favorites, Theme contexts
│  ├─ pages/              # Route views (CountryList, Favorites, Detail)
│  ├─ App.jsx             # Main app & routes
│  ├─ main.jsx            # Entry point & providers
│  ├─ index.css           # Tailwind imports + base-layer overrides
│  └─ tailwind.config.js  # Tailwind config (class-based darkMode)
 
├─ package.json           # Scripts & dependencies
├─ vite.config.js         # Vite config
└─ README.md              # This file

🤝 Contributing
==================

Fork the repo

Create a feature branch (git checkout -b feat/my-feature)

Commit your changes (git commit -m "feat: add feature")

Push to branch (git push origin feat/my-feature)

Open a Pull Request

Please follow the existing code style and include tests for new functionality.

📄 License

MIT © Sarangi Nimesha