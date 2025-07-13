# StackLoom Blog

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
   cd stackloom-blog
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
   # DATABASE_URL=postgresql://username:password@localhost:5432/stackloom
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

### Local Development Options

#### Option 1: Full Stack Development (Default)
Run both frontend and backend together:

```bash
# Install dependencies
npm install

# Start both frontend and backend
npm run dev
```

This starts:
- Backend API server on `http://localhost:5000`
- Frontend with Vite dev server and hot reload
- All API calls proxied automatically
- In-memory storage (no database required)

You should see "Using Memory storage" confirming local development mode.

#### Option 2: Frontend Only (Static Development)
Run only the frontend for UI development:

```bash
# Set API base URL for separate backend
cp client/.env.example client/.env
echo "VITE_API_BASE_URL=http://localhost:5000" > client/.env

# Install dependencies
npm install

# Start only frontend
npx vite --host 0.0.0.0 --port 3000
```

Frontend runs on `http://localhost:3000` and connects to separate backend.

#### Option 3: Backend Only (API Development)
Run only the backend API server:

```bash
# Install dependencies
npm install

# Start only backend
npx tsx server/index.ts
```

Backend API runs on `http://localhost:5000` with endpoints available at `/api/*`.

#### Option 4: Production-like Separation
Test the separated architecture locally:

```bash
# Terminal 1: Start backend
npx tsx server/index.ts

# Terminal 2: Build and serve frontend
./build-frontend.sh
npx vite preview --host 0.0.0.0 --port 3000
```

### Node.js Compatibility

**For Node.js v20.11.0 and above:**
```bash
npm run dev
```

**For Node.js v18.x (compatibility mode):**
If you encounter `import.meta.dirname` errors with Node.js v18:
```bash
# Run the setup script for Node.js v18 compatibility
node setup-local.js

# Then run the development server
npm run dev

# To restore original config later (optional)
node restore-config.js
```

### Production & Deployment

#### Single Deployment (Current Method)
Build everything together:
```bash
npm run build
npm start
```

#### Separate Deployments (Static + API)

**Build Frontend for Static Hosting:**
```bash
# Configure API URL
echo "VITE_API_BASE_URL=https://your-backend-api.com" > client/.env

# Build static files
./build-frontend.sh

# Output: dist/public/ (deploy to Netlify, Vercel, etc.)
```

**Build Backend for API Hosting:**
```bash
# Build backend
./build-backend.sh

# Start production server
NODE_ENV=production node dist/index.js

# Or deploy dist/ folder to Railway, Render, etc.
```

See `separation-guide.md` for complete deployment instructions.

### Testing the Setup

#### Test Backend API
```bash
# Health check
curl http://localhost:5000/health

# Get categories
curl http://localhost:5000/api/categories

# Get articles
curl http://localhost:5000/api/articles
```

#### Test Frontend
- Open `http://localhost:3000` (frontend only) or `http://localhost:5000` (full stack)
- Navigate through articles and categories
- Search functionality should work
- All content loads from API

### API Endpoints

The backend provides these main endpoints:

- `GET /health` - Health check
- `GET /api/categories` - List all categories
- `GET /api/categories/:slug` - Get category by slug
- `GET /api/articles` - List articles (paginated)
- `GET /api/articles/featured` - Get featured articles
- `GET /api/articles/:slug` - Get article by slug
- `GET /api/articles/category/:slug` - Get articles by category
- `GET /api/tags` - List all tags
- `GET /api/tags/popular` - Get popular tags
- `GET /api/search?q=query` - Search articles
- `POST /api/subscribers` - Add email subscriber

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
├── components.json         # Shadcn/UI configuration
├── build-frontend.sh       # Frontend build script
├── build-backend.sh        # Backend build script
├── separation-guide.md     # Frontend/backend separation guide
├── frontend-deploy.md      # Static hosting deployment guide
├── backend-deploy.md       # API server deployment guide
├── Dockerfile              # Container deployment
├── netlify.toml           # Netlify configuration
├── vercel.json            # Vercel configuration
└── railway.toml           # Railway configuration
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