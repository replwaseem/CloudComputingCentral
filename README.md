# TechOrbeez Blog

A modern, responsive blog platform focused on Cloud Computing technologies including AWS, Python, and Node.js.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design built with React and Tailwind CSS
- **PostgreSQL Database**: Persistent data storage with proper relational structure
- **Full-Stack TypeScript**: Type-safe development across frontend and backend
- **Article Management**: Complete CRUD operations for blog articles
- **Rich Content**: Markdown support with syntax highlighting for code blocks
- **Category System**: Organized content with categories and tags
- **Search Functionality**: Real-time search across articles
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality UI components
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching
- **React Markdown** - Markdown rendering
- **Framer Motion** - Smooth animations

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe server code
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database queries
- **Neon** - Serverless PostgreSQL

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESBuild** - Fast JavaScript bundler
- **Drizzle Kit** - Database migrations
- **TSX** - TypeScript execution

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techorbeez-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional for local development)
   
   For local development without a database:
   ```bash
   # No additional setup needed - the app will use in-memory storage
   ```
   
   For local development with PostgreSQL:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and set your database credentials:
   # DATABASE_URL=postgresql://username:password@localhost:5432/techorbeez
   ```

4. **Run database migrations** (only if using PostgreSQL)
   ```bash
   npm run db:push
   ```

5. **Seed the database** (only if using PostgreSQL)
   ```bash
   node seed-data.js
   ```

## 🚀 Usage

### Local Development
Start the development server:
```bash
npm run dev
```

The application will automatically:
- Use in-memory storage (no database required)
- Start both backend and frontend servers
- Be available at `http://localhost:5000`

You should see the message "Using Memory storage" in the console, confirming that the application is running in local development mode with sample data.

### Production
Build for production:
```bash
npm run build
```

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Backend Express application
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data access layer
│   ├── db.ts               # Database connection
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema definitions
└── components.json         # Shadcn/UI configuration
```

## 🗃️ Database Schema

The application uses a PostgreSQL database with the following main tables:

- **categories** - Blog categories (AWS, Python, Node.js, etc.)
- **authors** - Article authors and their information
- **articles** - Blog articles with content and metadata
- **tags** - Flexible tagging system
- **article_tags** - Many-to-many relationship between articles and tags
- **subscribers** - Email subscribers

## 💾 Storage System

The application automatically selects the appropriate storage backend:

- **Development Mode**: Uses in-memory storage when `DATABASE_URL` is not set
- **Production Mode**: Uses PostgreSQL when `DATABASE_URL` is configured

This allows for easy local development without requiring a database setup.

## 🔧 API Endpoints

### Articles
- `GET /api/articles` - Get paginated articles
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/:slug` - Get article by slug
- `POST /api/articles` - Create new article

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug

### Tags
- `GET /api/tags` - Get all tags
- `GET /api/tags/popular` - Get popular tags

### Search
- `GET /api/search?q=query` - Search articles

### Subscribers
- `POST /api/subscribers` - Add email subscriber

## 📝 Adding New Articles

Use the provided article management utility:

```bash
node add-article.js
```

Or refer to `ADDING_ARTICLES_GUIDE.md` for detailed instructions.

## 🎨 Customization

### Styling
The project uses Tailwind CSS for styling. Custom styles can be added in:
- `client/src/index.css` - Global styles
- `tailwind.config.ts` - Tailwind configuration

### Components
UI components are based on Shadcn/UI and can be customized in:
- `client/src/components/ui/` - Base UI components
- `client/src/components/` - Application-specific components

## 🔐 Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Environment (development/production)

## 🚀 Deployment

The project is configured for deployment on Replit with:
- Automatic environment variable management
- PostgreSQL database provisioning
- Production-ready builds

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please create an issue in the repository.

---

**TechOrbeez** - Your go-to resource for Cloud Computing insights and tutorials.