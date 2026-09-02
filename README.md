# Cafe Roast

A modern Persian RTL coffee shop ecommerce frontend built with React, TypeScript, and Vite.

Cafe Roast is a responsive ecommerce demo application that simulates a real coffee store experience with product browsing, cart management, authentication, user/admin dashboards, reports, and theme customization.

The project focuses on clean frontend architecture, reusable components, responsive UI, and maintainable state management.

## Features

- Persian RTL ecommerce storefront
- Fully responsive design for mobile, tablet, and desktop
- Product catalog and product details
- Shopping cart management
- Wishlist functionality
- Demo authentication system
- User dashboard
- Admin dashboard
- Product management
- Order management
- Sales reports and charts
- Light and dark theme support
- Persistent data with LocalStorage
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

## State Management

Context API is used for managing global application states:

- Authentication state
- Store state (cart, wishlist, products, orders)
- Theme state

For this project size, Context API provides a simple and maintainable solution without unnecessary complexity.

## Project Structure

```
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

## Demo Accounts

These accounts are for demonstration purposes only.

### Admin Account

```
Email:
admin@caferoast.ir

Password:
123456
```

### User Account

```
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

Build and run the application:

```bash
docker compose up --build
```

Application will be available at:

```
http://localhost:8080
```

Stop containers:

```bash
docker compose down
```

## Future Improvements

- Connect to a real backend API
- Add real payment integration
- Add React Query or Redux Toolkit Query for server state management
- Add automated testing
- Add user analytics
- Add advanced product filtering and search

## License

This project is created for learning and portfolio purposes.
