# Poster Politics

Poster Politics is an AI-powered political poster generator that allows users to create customizable posters using ready-made templates, personal information, photos, and AI-assisted design.

## Features

* User registration and login
* Ready-made poster templates
* Template-based poster creation
* Photo upload
* AI-assisted poster generation
* Bangla headline support
* Generated poster preview
* Poster download
* User poster history
* Responsive design

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Express.js
* MongoDB
* Gemini API
* Cloudinary
* JWT Authentication

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ZarinTasnim75/Poster-Politics-Client.git
cd Poster-Politics-Client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production:

```env
NEXT_PUBLIC_API_URL=https://poster-politics-server.onrender.com
```

### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Build for production

```bash
npm run build
```

## Project Structure

```text
app/
├── create/
├── login/
├── profile/
├── register/
├── templates/
├── page.tsx
└── layout.tsx

components/
├── Navbar.tsx
└── ...

public/
└── images/
```

## Backend

The frontend communicates with the Poster Politics backend API.

Backend:

https://poster-politics-server.onrender.com