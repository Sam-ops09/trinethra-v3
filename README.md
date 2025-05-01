
# Defense Solutions Web Application

A modern web application built with React, Express, and TypeScript.

## Project Setup

1. Clone the project in Replit or use the "Fork" button.

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at http://localhost:3000

## Project Structure

- `/client` - React frontend application
- `/server` - Express backend server
- `/shared` - Shared types and schemas
- `/api` - API route handlers

## Deployment

This project is configured for deployment on Replit. To deploy:

1. Click the "Deploy" button in your Replit workspace
2. Select your deployment configuration:
   - Build Command: `pnpm build`
   - Run Command: `node dist/index.js`
3. Click "Deploy" to publish your application

The deployment will automatically:
- Build the React frontend
- Bundle the Express backend
- Configure routing through vercel.json
- Set up production environment

## Environment Variables

Required environment variables:
- `PORT` - Server port (default: 3000)
- Add any additional environment variables in the Secrets tab

## Features

- Modern React with TypeScript
- Express backend with API routes
- Tailwind CSS for styling
- Production-ready configuration
- API request logging
- Static file serving
