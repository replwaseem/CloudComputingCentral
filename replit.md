# StackLoom Blog - Project Documentation

## Overview
A comprehensive blog website focused on Cloud Computing technologies including AWS, Python, and Node.js. The project is built with React frontend and Express backend using TypeScript throughout.

## Project Architecture
- **Frontend**: React 18 with TypeScript, Tailwind CSS, Shadcn/UI components
- **Backend**: Express.js with TypeScript, PostgreSQL database support
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **Storage**: Dual implementation (MemStorage for development, DatabaseStorage for production)
- **Build Tool**: Vite for fast development and production builds

## Recent Changes
- **January 13, 2025**: Implemented complete separation architecture for frontend static hosting and backend API deployment
- **January 13, 2025**: Added configurable API base URL support (VITE_API_BASE_URL) for separate deployments
- **January 13, 2025**: Created comprehensive deployment guides and configuration files for multiple platforms
- **January 13, 2025**: Added health check endpoint (/health) for backend monitoring and load balancers
- **January 13, 2025**: Created Docker configuration for containerized backend deployment
- **January 13, 2025**: Changed blog name from "TechOrbeez" to "StackLoom" across all components, pages, and documentation
- **January 13, 2025**: Updated all email domains from @techorbeez.com to @stackloom.com in seeding data
- **January 13, 2025**: Updated HTML meta tags, titles, and Open Graph properties to reflect StackLoom branding
- **January 13, 2025**: Added comprehensive About page with personal introduction, skills, experience timeline, and contact information
- **January 13, 2025**: Updated navigation menu to include About page link (desktop and mobile)
- **January 13, 2025**: Fixed sidebar alignment consistency across all pages (home, articles, article details, categories)
- **January 13, 2025**: Enhanced Sidebar component with optional className and style props for flexible animations
- **January 13, 2025**: Resolved Node.js v20 upgrade and port conflict issues (SERVER_PORT environment variable support)
- **January 13, 2025**: Implemented comprehensive loading animations and micro-interactions system
- **January 13, 2025**: Added playful loading components (spinners, skeleton cards, animated content)
- **January 13, 2025**: Enhanced user experience with smooth transitions and hover effects
- **January 13, 2025**: Created custom Tailwind animations (shimmer, float, slide-up, fade-in, scale-in, bounce-in, wiggle)
- **January 13, 2025**: Updated article cards and featured articles with interactive hover animations
- **January 13, 2025**: Fixed local development setup - no DATABASE_URL required
- **January 13, 2025**: Implemented automatic storage selection (Memory vs Database)
- **January 13, 2025**: Added .env.example for local development configuration
- **January 13, 2025**: Updated README with detailed instructions for running frontend and backend locally (4 different modes)
- **January 13, 2025**: Added API endpoint documentation and testing instructions to README
- **January 13, 2025**: Updated README with comprehensive local development instructions
- **January 13, 2025**: Added comprehensive README.md file with project documentation
- **January 13, 2025**: Fixed database seeding script with proper column naming (snake_case)
- **January 13, 2025**: Implemented complete PostgreSQL database integration with Drizzle ORM

## Current Status
- Application is running successfully with in-memory storage
- Database schema is properly configured for PostgreSQL integration
- All API endpoints are functional and returning data
- Frontend is displaying articles, categories, and tags correctly
- Complete About page with personal profile, skills showcase, experience timeline, and contact information
- Navigation menu includes About page link (accessible from header navigation)
- Sidebar alignment is consistent across all pages (home, articles, article details, categories)
- Playful loading animations and micro-interactions fully implemented
- Enhanced user experience with smooth transitions, hover effects, and animated content
- Custom loading components: spinners, skeleton cards, loading overlays, and animated content wrappers
- Server supports flexible port configuration via environment variables

## Storage Implementation
The project supports two storage implementations:
1. **MemStorage** - In-memory storage for development and testing
2. **DatabaseStorage** - PostgreSQL database storage for production

Current active storage: MemStorage (due to database connection issues)

## User Preferences
- User requested comprehensive README file documentation
- User requested playful loading animations and micro-interactions
- User requested blog name change from "TechOrbeez" to "StackLoom"
- Project should maintain focus on cloud computing content
- Prefer working solutions over complex configurations
- Enhanced user experience with smooth animations and interactive elements

## Known Issues
- Database connection authentication failing with PostgreSQL
- Need to resolve database credentials for full PostgreSQL functionality  
- Node.js v18 compatibility: `import.meta.dirname` requires Node.js v20.11.0+ (compatibility files provided)
- Some TypeScript errors in storage implementation need cleanup

## Next Steps
1. Resolve PostgreSQL connection issues
2. Switch back to DatabaseStorage when database is stable
3. Clean up TypeScript errors in storage implementation
4. Continue content development and feature enhancements

## Technical Notes
- Database schema uses snake_case column naming
- Frontend uses camelCase for JavaScript/TypeScript consistency
- Seeding scripts updated to match database schema
- Article management utilities available for content creation
- Node.js v18 compatibility: Use `vite.config.local.ts` and setup scripts for older Node.js versions
- Vite configuration uses `import.meta.dirname` which requires Node.js v20.11.0+