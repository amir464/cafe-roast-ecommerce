# Cafe Roast

A modern Persian RTL coffee shop ecommerce frontend built with React, TypeScript, Vite, and Tailwind CSS.

Cafe Roast is a full-featured ecommerce simulation designed to demonstrate a scalable frontend architecture with a customer storefront, authentication flow, user dashboard, admin management panel, reporting system, and production deployment using Docker and Nginx.

The project focuses on clean frontend architecture, reusable components, responsive UI, maintainable state management, and separation of business logic from presentation.

## Features

- Persian RTL ecommerce storefront
- Fully responsive design for mobile, tablet, and desktop
- Product catalog and product details
- Shopping cart management
- Wishlist functionality
- Demo authentication system
- Protected routes and role-based routing
- User dashboard
- Admin dashboard
- Product management
- Order management
- Sales reports and charts
- Light and dark theme support
- Persistent data with LocalStorage
- Reusable UI components
- Service-based data architecture
- Docker deployment with Nginx

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

### State and Data Management

- React Context API
- LocalStorage
- Service-based data layer

### Forms and Validation

- React Hook Form
- Zod
- @hookform/resolvers

### UI and Tools

- Lucide React
- ESLint
- Docker
- Nginx

## Architecture

The project follows a modular frontend architecture:

- Components are separated by responsibility
- Business logic is separated from UI components
- Data access is handled through service files
- Global states are managed using React Context API
- Routes are protected based on user roles

## State Management

Context API is used for managing global application states:

- Authentication state
- Store state (cart, wishlist, products, orders)
- Theme state

For the current project scope, Context API provides a lightweight and maintainable approach for managing client-side application state.

## Project Structure

```text
src
├── components
│   ├── auth
│   ├── charts
│   ├── dashboard
│   ├── layout
│   └── product
│
├── contexts
│   ├── AuthContext.tsx
│   ├── StoreContext.tsx
│   └── ThemeContext.tsx
│
├── services
│   ├── authService.ts
│   ├── productService.ts
│   └── orderService.ts
│
├── pages
│   ├── admin
│   ├── store
│   └── user
│
├── data
├── layouts
├── routes
├── types
└── utils
```

## Screenshots

_Add project screenshots here_

## Demo Accounts

These accounts are for demonstration purposes only.

### Admin Account

```text
Email:
admin@caferoast.ir

Password:
123456
```

### User Account

```text
Email:
user@caferoast.ir

Password:
123456
```

## Installation

Clone the repository:

```bash
git clone https://github.com/amir464/cafe-roast-ecommerce.git
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Production Build

Create production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## Docker Deployment

Build Docker image:

```bash
docker build -t cafe-roast .
```

Run container:

```bash
docker run -p 8080:80 cafe-roast
```

Application will be available at:

```text
http://localhost:8080
```

Stop container:

```bash
docker stop <container_id>
```

## Future Improvements

- Connect to a real backend API
- Add real payment integration
- Add TanStack Query for server state management
- Add automated testing
- Add user analytics
- Add advanced product filtering and search

## License

This project is created for learning and portfolio purposes.