# Campaign Manager - Frontend

React dashboard for managing advertising campaigns, connected to the Spring Boot API.

## Tech Stack
- **React** (Vite)
- **Material UI** (MUI)
- **Axios**

## 🚀 QUICK START (DOCKER)

The entire system (Frontend + Backend) is dockerized. To run everything at once:

1. Clone both repositories into the same parent folder.
2. Make sure your folder structure looks like this:
   - `campaign-manager-backend/`
   - `campaign-manager-frontend/`
3. Open terminal in the `campaign-manager-frontend` folder.
4. Run: `docker-compose up --build`
5. Open browser at: **http://localhost:5173**

## Key Features
- **Real-time Balance**: Account balance updates instantly after CRUD actions.
- **Custom Keywords**: Allows picking from a list or typing your own tags.
- **Docker-Compose**: Orchestrates both containers for a seamless developer experience.
