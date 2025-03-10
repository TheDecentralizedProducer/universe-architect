# Universe Architect

A web-based strategy game where players create and manage their own cinematic universes, similar to Marvel or DC film franchises. Built with React, Three.js, and Firebase.

## Features

- 3D Studio Lot visualization with interactive buildings
- Character relationship web visualization
- Production board for managing in-development films
- Complete economy system with Studio Coins and Producer Credits
- Comprehensive film production and universe building mechanics
- Studio management and talent system
- Cloud save system

## Tech Stack

- React 18 with TypeScript
- Three.js for 3D visualization
- Firebase for backend and authentication
- Material-UI for UI components
- Zustand for state management
- Vite for build tooling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Game Modes

- Career Mode: Build your studio from scratch
- Scenario Mode: Take over existing studios
- Competition Mode (coming soon): Compete against AI studios

## Development Status

Currently in active development. Initial focus is on:
1. 3D studio lot visualization
2. Core film production gameplay
3. Universe building mechanics
4. Talent and marketing systems

## Project Structure

```
src/
├── components/     # React components
├── game/          # Game logic and mechanics
├── models/        # TypeScript interfaces and types
├── scenes/        # Three.js scenes and 3D objects
├── services/      # Firebase and other external services
├── store/         # Zustand state management
└── utils/         # Helper functions and utilities
```

## License

All rights reserved. © 2025
