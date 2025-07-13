# TechOrbeez Blog - Project Documentation

## Overview
A comprehensive blog website focused on Cloud Computing technologies including AWS, Python, and Node.js. The project is built with React frontend and Express backend using TypeScript throughout.

## Project Architecture
- **Frontend**: React 18 with TypeScript, Tailwind CSS, Shadcn/UI components
- **Backend**: Express.js with TypeScript, PostgreSQL database support
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **Storage**: Dual implementation (MemStorage for development, DatabaseStorage for production)
- **Build Tool**: Vite for fast development and production builds

## Recent Changes
- **January 13, 2025**: Added comprehensive README.md file with project documentation
- **January 13, 2025**: Temporarily switched to MemStorage due to database connection issues
- **January 13, 2025**: Fixed database seeding script with proper column naming (snake_case)
- **January 13, 2025**: Implemented complete PostgreSQL database integration with Drizzle ORM
- **January 13, 2025**: Created DatabaseStorage class to replace MemStorage
- **January 13, 2025**: Set up proper database schema with relations

## Current Status
- Application is running successfully with in-memory storage
- Database schema is properly configured for PostgreSQL integration
- All API endpoints are functional and returning data
- Frontend is displaying articles, categories, and tags correctly

## Storage Implementation
The project supports two storage implementations:
1. **MemStorage** - In-memory storage for development and testing
2. **DatabaseStorage** - PostgreSQL database storage for production

Current active storage: MemStorage (due to database connection issues)

## User Preferences
- User requested comprehensive README file documentation
- Project should maintain focus on cloud computing content
- Prefer working solutions over complex configurations

## Known Issues
- Database connection authentication failing with PostgreSQL
- Need to resolve database credentials for full PostgreSQL functionality
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