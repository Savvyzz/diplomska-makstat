# MAK-STAT - Statistical Data Dashboard

A modern React application for visualizing and analyzing statistical data from North Macedonia.

## Project Structure

The project follows a modular, domain-driven architecture:

```
src/
├── assets/           # Static assets like styles, images, fonts
├── components/       # Reusable UI components 
├── config/           # Configuration files (API endpoints, theme, etc.)
├── hooks/            # Custom React hooks
├── layouts/          # Layout components (headers, footers, navigation)
├── pages/            # Page components organized by domain
│   ├── delovni-tendencii/
│   ├── ekonomski-smetki/
│   ├── polovi-statistiki/
│   ├── prostorni-edinici/
│   └── zdravstveni-smetki/
├── routes/           # Route configurations organized by domain
├── services/         # API service layer
│   ├── statistics/   # Domain-specific statistics services
│   └── BaseService.js
└── utils/            # Utility functions and helpers
```

## Features

- Modular, domain-driven architecture
- Clean separation of concerns following best practices
- Data visualization for various statistical domains
- Modern UI built with Material-UI
- Responsive design for all device sizes

## Tech Stack

- React 18
- React Router 7
- Material UI 5
- React Query / TanStack Query for data fetching
- Vite for build tooling
- SCSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
