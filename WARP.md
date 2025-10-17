# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## FixMyCity - Civic Issue Reporting Platform

FixMyCity is a full-stack React + Node.js application for reporting and tracking municipal infrastructure issues like potholes, broken streetlights, and garbage collection problems.

## Common Development Commands

### Start Development Server
```bash
npm run dev
```
Starts the development server with hot-reload using tsx for the backend and Vite for the frontend.

### Build for Production
```bash
npm run build
```
Builds both client (Vite) and server (esbuild) for production deployment.

### Start Production Server
```bash
npm start
```
Runs the production server from the built files.

### Type Checking
```bash
npm run check
```
Runs TypeScript compiler to check for type errors across the entire project.

### Database Operations
```bash
npm run db:push
```
Pushes database schema changes using Drizzle Kit to PostgreSQL.

### Testing Database Schema
Check `shared/schema.ts` for the database structure and use Drizzle Studio if available for database inspection.

## Architecture Overview

### Project Structure
- **client/**: React frontend built with Vite
  - `src/pages/`: Main application pages (Login, ReportIssue, AdminDashboard, etc.)
  - `src/components/`: Reusable UI components including shadcn/ui components
  - `src/lib/`: Utilities, auth context, and API client setup
  - `src/hooks/`: Custom React hooks
- **server/**: Express.js backend API
  - `index.ts`: Main server setup with middleware and error handling
  - `routes.ts`: RESTful API routes for issue management
  - `storage.ts`: Database layer using Drizzle ORM
  - `vite.ts`: Development server integration
- **shared/**: Common TypeScript types and Zod schemas
  - `schema.ts`: Drizzle database schema and validation schemas
- **attached_assets/**: Static assets and uploaded files

### Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui, React Query, Wouter (routing)
- **Backend**: Express.js, TypeScript, Drizzle ORM with PostgreSQL
- **Development**: Vite, tsx, esbuild
- **Database**: PostgreSQL with Drizzle migrations
- **Authentication**: Express sessions with Passport.js (local strategy)
- **Maps**: Leaflet with React Leaflet for interactive mapping
- **Forms**: React Hook Form with Zod validation

### Key Features & User Flows
1. **Citizen Flow**: Login → Report Issue → Upload Photos → Track Progress
2. **Admin Flow**: Login → Dashboard Analytics → Manage Reports → Update Status
3. **Public Map**: View all reported issues on an interactive map with filtering

### Database Schema
The application uses two main entities:
- **Users**: Simple username/password authentication with role-based access (citizen/admin)
- **Issues**: Core entity with location (lat/lng), photos, status tracking, admin notes, and update history

### Authentication & Authorization
- Role-based access control (citizen vs admin users)
- Protected routes with redirect logic based on user role
- Express sessions for state management
- AuthContext provides user state across React components

### Design System
Follows Material Design principles with:
- Teal primary color palette
- Inter font family
- Mobile-first responsive design
- Comprehensive accessibility features
- Status-based color coding for issues

## Development Guidelines

### API Patterns
- RESTful endpoints under `/api/issues`
- Zod schema validation on all inputs
- Consistent error handling with proper HTTP status codes
- TypeScript interfaces shared between client and server

### Component Architecture
- Functional components with hooks
- Custom hooks for data fetching (React Query)
- Reusable UI components from shadcn/ui
- Context providers for global state (auth)

### Database Best Practices
- Use Drizzle ORM with PostgreSQL
- Migrations handled via `drizzle-kit`
- JSON columns for complex data (photos array, location objects)
- Proper foreign key relationships

### File Upload Handling
- Photo uploads for issue reports
- Before/after comparison photos for resolution
- File storage in `attached_assets/` directory

### Map Integration
- Leaflet for interactive maps
- Custom markers with category-based colors
- Heatmap visualization for issue density
- Responsive design for mobile usage

### Environment Variables
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (defaults to 5000)
- `NODE_ENV`: development/production mode

### Development Environment
This project is configured for Replit deployment with:
- Replit-specific Vite plugins for development
- Single port serving both API and frontend
- Automatic asset handling and routing

## Important Notes

- The server serves both API routes and static frontend files in production
- Development uses Vite dev server integration
- All database operations go through the storage layer abstraction
- Authentication is session-based, not JWT
- Photo uploads are handled as file paths, not base64 encoded
- Map coordinates are stored as lat/lng objects in the database