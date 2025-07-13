require('dotenv').config();
const { Pool } = require('@neondatabase/serverless');
const format = require('pg-format');

async function main() {
  console.log('Seeding database...');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  
  try {
    // Start a transaction
    await client.query('BEGIN');
    
    // Insert categories
    const categoryData = [
      { name: 'AWS', slug: 'aws', description: 'Everything about Amazon Web Services', color: '#FF9900' },
      { name: 'Python', slug: 'python', description: 'Python programming and cloud integration', color: '#3776AB' },
      { name: 'NodeJS', slug: 'nodejs', description: 'NodeJS development and serverless implementations', color: '#339933' },
      { name: 'AI/ML', slug: 'ai-ml', description: 'Artificial intelligence and machine learning articles', color: '#0080FF' }
    ];
    
    const categoryInsertResult = await client.query(
      format('INSERT INTO categories (name, slug, description, color) VALUES %L RETURNING id', 
        categoryData.map(c => [c.name, c.slug, c.description, c.color])
      )
    );
    
    const categoryIds = categoryInsertResult.rows.map(row => row.id);
    console.log('Inserted categories:', categoryIds);
    
    // Insert authors
    const authorData = [
      { name: 'Alex Stevens', email: 'alex@stackloom.com', bio: 'AWS Certified Solutions Architect with 10 years of experience', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { name: 'Sarah Johnson', email: 'sarah@stackloom.com', bio: 'Python expert and DevOps enthusiast', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { name: 'Michael Chen', email: 'michael@stackloom.com', bio: 'Full-stack developer specializing in NodeJS and React', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' }
    ];
    
    const authorInsertResult = await client.query(
      format('INSERT INTO authors (name, email, bio, avatar) VALUES %L RETURNING id', 
        authorData.map(a => [a.name, a.email, a.bio, a.avatar])
      )
    );
    
    const authorIds = authorInsertResult.rows.map(row => row.id);
    console.log('Inserted authors:', authorIds);
    
    // Insert tags
    const tagData = [
      { name: 'Lambda', slug: 'lambda' },
      { name: 'S3', slug: 's3' },
      { name: 'EC2', slug: 'ec2' },
      { name: 'Serverless', slug: 'serverless' },
      { name: 'Django', slug: 'django' },
      { name: 'Flask', slug: 'flask' },
      { name: 'Express', slug: 'express' },
      { name: 'React', slug: 'react' },
      { name: 'Machine Learning', slug: 'machine-learning' },
      { name: 'TensorFlow', slug: 'tensorflow' },
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'MLOps', slug: 'mlops' },
      { name: 'Deep Learning', slug: 'deep-learning' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'CI/CD', slug: 'ci-cd' }
    ];
    
    const tagInsertResult = await client.query(
      format('INSERT INTO tags (name, slug) VALUES %L RETURNING id', 
        tagData.map(t => [t.name, t.slug])
      )
    );
    
    const tagIds = tagInsertResult.rows.map(row => row.id);
    console.log('Inserted tags:', tagIds);
    
    // Insert articles
    const articlesData = [
      { 
        title: 'Building Serverless Applications with AWS Lambda',
        slug: 'building-serverless-applications-with-aws-lambda',
        excerpt: 'A comprehensive guide to building serverless applications using AWS Lambda and other AWS services.',
        content: `# Building Serverless Applications with AWS Lambda

## Introduction

Serverless computing has revolutionized the way developers build and deploy applications. By abstracting away infrastructure management, serverless allows developers to focus solely on code. AWS Lambda, Amazon's serverless compute service, has been at the forefront of this revolution.

## What is Serverless?

Serverless doesn't mean "no servers." It means you don't have to provision, manage, or pay for servers when they're not in use. The cloud provider manages the infrastructure, and you only pay for the compute time you consume.

## Benefits of AWS Lambda

- **No server management**: You don't need to provision or maintain servers
- **Automatic scaling**: Lambda automatically scales your application in response to incoming requests
- **Pay for value**: You only pay for the compute time you consume
- **High availability**: Lambda runs your code with high availability

## Getting Started with AWS Lambda

### 1. Create a Lambda Function

To create a Lambda function:

1. Navigate to the Lambda console in AWS
2. Click "Create function"
3. Choose "Author from scratch"
4. Enter a name for your function
5. Select your preferred runtime (Node.js, Python, etc.)
6. Create or assign an execution role
7. Click "Create function"

### 2. Write Your Function Code

Here's a simple Lambda function in Node.js:

\`\`\`javascript
exports.handler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  
  return response;
};
\`\`\`

### 3. Configure Triggers

Lambda functions can be triggered by various AWS services or events. Common triggers include:

- API Gateway for HTTP endpoints
- S3 for file operations
- DynamoDB for database changes
- CloudWatch Events for scheduled tasks

### 4. Set Up Environment Variables

Environment variables allow you to store configuration settings outside your code:

1. In the Lambda console, navigate to your function
2. Scroll down to the "Environment variables" section
3. Add key-value pairs as needed

## Building a Serverless REST API

To build a REST API with Lambda and API Gateway:

1. Create a Lambda function that handles HTTP requests
2. Set up API Gateway and create API endpoints
3. Connect those endpoints to your Lambda function
4. Deploy your API

Here's a sample Lambda function for a REST API:

\`\`\`javascript
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const httpMethod = event.httpMethod;
  const path = event.path;
  
  if (httpMethod === 'GET' && path === '/items') {
    const params = {
      TableName: 'Items',
    };
    
    try {
      const data = await dynamoDB.scan(params).promise();
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.Items),
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to retrieve items' }),
      };
    }
  }
  
  return {
    statusCode: 404,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Not found' }),
  };
};
\`\`\`

## Best Practices for Lambda Functions

1. **Keep your functions small**: Focus on a single responsibility
2. **Optimize cold starts**: Minimize dependencies and function size
3. **Implement proper error handling**: Always catch and handle errors
4. **Use environment variables**: Store configuration outside your code
5. **Monitor your functions**: Set up CloudWatch alarms and logs
6. **Implement proper security**: Use IAM roles with least privilege

## Conclusion

AWS Lambda and serverless architecture provide a powerful way to build scalable, maintainable applications without worrying about infrastructure. By focusing on your code and leveraging managed services, you can deliver value faster and more efficiently.`,
        featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        authorId: authorIds[0], // Alex Stevens
        categoryId: categoryIds[0], // AWS
        publishedAt: new Date(),
        isFeatured: true,
        readTime: 8
      },
      { 
        title: 'Python Best Practices for Cloud Applications',
        slug: 'python-best-practices-for-cloud-applications',
        excerpt: 'Learn the best practices for developing Python applications that run in the cloud.',
        content: `# Python Best Practices for Cloud Applications

## Introduction

Python has become one of the most popular languages for cloud development due to its simplicity, readability, and extensive ecosystem. When building cloud applications with Python, following best practices ensures your applications are scalable, maintainable, and efficient.

## Structuring Your Python Cloud Application

### Project Structure

A well-organized project structure makes your code more maintainable:

\`\`\`
my-cloud-app/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── endpoints.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── logging.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── models.py
│   └── services/
│       ├── __init__.py
│       └── business_logic.py
├── tests/
│   ├── __init__.py
│   ├── test_api.py
│   └── test_services.py
├── requirements.txt
├── Dockerfile
└── README.md
\`\`\`

### Use Virtual Environments

Always use virtual environments to isolate dependencies:

\`\`\`bash
# Create a virtual environment
python -m venv venv

# Activate it (Linux/Mac)
source venv/bin/activate

# Activate it (Windows)
venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

## Configuration Management

### Environment Variables

Store configuration in environment variables rather than hardcoding them:

\`\`\`python
import os
from dotenv import load_dotenv

# Load environment variables from .env file in development
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
API_KEY = os.getenv("API_KEY")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
\`\`\`

### Configuration Classes

For more complex applications, use configuration classes:

\`\`\`python
import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "My Cloud App"
    debug: bool = False
    database_url: str
    api_key: str
    
    class Config:
        env_file = ".env"

settings = Settings()
\`\`\`

## Dependency Management

### Pinning Dependencies

Always pin your dependencies to specific versions:

\`\`\`
# requirements.txt
fastapi==0.68.0
uvicorn==0.15.0
sqlalchemy==1.4.23
pydantic==1.8.2
\`\`\`

### Using requirements.txt and setup.py

For applications, use requirements.txt. For reusable libraries, use setup.py:

\`\`\`python
# setup.py
from setuptools import setup, find_packages

setup(
    name="my-cloud-lib",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.68.0",
        "sqlalchemy>=1.4.23",
    ],
)
\`\`\`

## Error Handling and Logging

### Structured Logging

Use structured logging for better analysis in cloud environments:

\`\`\`python
import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
        }
        if hasattr(record, "props"):
            log_record.update(record.props)
        return json.dumps(log_record)

def setup_logging():
    logger = logging.getLogger()
    handler = logging.StreamHandler()
    handler.setFormatter(JSONFormatter())
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    return logger

logger = setup_logging()

# Usage
logger.info("Processing request", extra={"props": {"request_id": "123", "user_id": "456"}})
\`\`\`

### Exception Handling

Implement proper exception handling to ensure your application is resilient:

\`\`\`python
def fetch_data_from_external_api(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.Timeout:
        logger.error(f"Request to {url} timed out")
        return {"error": "The request timed out"}
    except requests.exceptions.HTTPError as e:
        logger.error(f"HTTP error occurred: {e}")
        return {"error": f"HTTP error: {e}"}
    except Exception as e:
        logger.exception(f"An unexpected error occurred: {e}")
        return {"error": "An unexpected error occurred"}
\`\`\`

## Performance Optimization

### Asynchronous Programming

Use async/await for I/O-bound operations:

\`\`\`python
import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.json()

async def fetch_all_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Usage
urls = ["https://api.example.com/data/1", "https://api.example.com/data/2"]
results = asyncio.run(fetch_all_urls(urls))
\`\`\`

### Connection Pooling

Use connection pooling for databases:

\`\`\`python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Create an engine with connection pooling
engine = create_engine(
    "postgresql://user:password@localhost/dbname",
    pool_size=5,  # Maximum number of connections kept open
    max_overflow=10,  # Maximum number of connections that can be created beyond pool_size
    pool_timeout=30,  # Seconds to wait before giving up on getting a connection
    pool_recycle=1800,  # Recycle connections after 30 minutes
)

Session = sessionmaker(bind=engine)

def get_db_session():
    session = Session()
    try:
        yield session
    finally:
        session.close()
\`\`\`

## Containerization

### Dockerfile Best Practices

Create efficient Docker images for your Python applications:

\`\`\`dockerfile
# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

### Multi-stage Builds

Use multi-stage builds for smaller production images:

\`\`\`dockerfile
# Build stage
FROM python:3.9 AS builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.9-slim

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

## Security Best Practices

### Dependency Scanning

Regularly scan dependencies for vulnerabilities:

\`\`\`bash
pip install safety
safety check -r requirements.txt
\`\`\`

### Secret Management

Never hardcode secrets in your code. Use environment variables or secret management services:

\`\`\`python
import os
from google.cloud import secretmanager

def access_secret_version(project_id, secret_id, version_id="latest"):
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# Usage
db_password = access_secret_version("my-project", "db-password")
\`\`\`

## Testing

### Unit Testing

Write comprehensive unit tests:

\`\`\`python
import unittest
from unittest.mock import patch
from app.services import data_service

class TestDataService(unittest.TestCase):
    @patch('app.services.data_service.requests.get')
    def test_fetch_data(self, mock_get):
        # Configure the mock
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {"key": "value"}
        
        # Call the function
        result = data_service.fetch_data("https://api.example.com/data")
        
        # Assert the result
        self.assertEqual(result, {"key": "value"})
        mock_get.assert_called_once_with("https://api.example.com/data", timeout=5)

if __name__ == '__main__':
    unittest.main()
\`\`\`

### Integration Testing

Set up integration tests that interact with actual services:

\`\`\`python
import pytest
import requests
from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

@pytest.mark.integration
def test_external_api():
    # This test requires the actual API to be available
    response = requests.get("https://api.example.com/data")
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
\`\`\`

## Conclusion

Following these best practices will help you build Python applications that perform well in cloud environments, are easy to maintain, and can scale as needed. Always stay up-to-date with the latest developments in Python and cloud technologies to continue improving your applications.`,
        featuredImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
        authorId: authorIds[1], // Sarah Johnson
        categoryId: categoryIds[1], // Python
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isFeatured: true,
        readTime: 12
      },
      { 
        title: 'Building Scalable APIs with Express and NodeJS',
        slug: 'building-scalable-apis-with-express-and-nodejs',
        excerpt: 'Learn how to build highly scalable RESTful APIs using Express and NodeJS.',
        content: `# Building Scalable APIs with Express and NodeJS

## Introduction

In today's interconnected world, APIs form the backbone of modern web applications. Node.js, with its non-blocking I/O model, is perfectly suited for building high-performance APIs. When combined with Express, a minimal and flexible web application framework, developers can build scalable, maintainable APIs quickly and efficiently.

## Setting Up Your Express API Project

### Project Initialization

Begin by setting up a new Node.js project:

\`\`\`bash
# Create a new directory
mkdir express-api
cd express-api

# Initialize npm
npm init -y

# Install core dependencies
npm install express cors helmet morgan dotenv

# Install development dependencies
npm install --save-dev nodemon eslint
\`\`\`

### Project Structure

Organize your project for scalability:

\`\`\`
express-api/
├── src/
│   ├── config/
│   │   └── index.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── index.js
│   │   └── userRoutes.js
│   ├── services/
│   │   └── userService.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── validators.js
│   └── app.js
├── .env
├── .eslintrc.js
├── .gitignore
├── package.json
└── server.js
\`\`\`

### Basic Express Server

Create your entry point `server.js`:

\`\`\`javascript
const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});
\`\`\`

Create your Express application in `src/app.js`:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Apply global middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Apply routes
app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: \`Cannot \${req.method} \${req.url}\`,
  });
});

// Error handler middleware (should be last)
app.use(errorHandler);

module.exports = app;
\`\`\`

## Building RESTful Routes

### Creating Route Handlers

Create your route index in `src/routes/index.js`:

\`\`\`javascript
const express = require('express');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/users', userRoutes);

module.exports = router;
\`\`\`

Define user routes in `src/routes/userRoutes.js`:

\`\`\`javascript
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(auth.authenticate, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(auth.authenticate, userController.getUserById)
  .patch(auth.authenticate, userController.updateUser)
  .delete(auth.authenticate, auth.authorize('admin'), userController.deleteUser);

module.exports = router;
\`\`\`

### Controller Pattern

Implement controllers in `src/controllers/userController.js`:

\`\`\`javascript
const userService = require('../services/userService');
const logger = require('../utils/logger');

// Helper function for consistent response structure
const sendResponse = (res, statusCode, success, data = null, message = null) => {
  const response = {
    success,
    ...(data && { data }),
    ...(message && { message }),
  };
  return res.status(statusCode).json(response);
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return sendResponse(res, 200, true, { users });
  } catch (error) {
    logger.error('Error getting all users:', error);
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return sendResponse(res, 404, false, null, 'User not found');
    }
    return sendResponse(res, 200, true, { user });
  } catch (error) {
    logger.error(\`Error getting user \${req.params.id}:\`, error);
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body);
    return sendResponse(res, 201, true, { user: newUser }, 'User created successfully');
  } catch (error) {
    logger.error('Error creating user:', error);
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return sendResponse(res, 404, false, null, 'User not found');
    }
    return sendResponse(res, 200, true, { user: updatedUser }, 'User updated successfully');
  } catch (error) {
    logger.error(\`Error updating user \${req.params.id}:\`, error);
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) {
      return sendResponse(res, 404, false, null, 'User not found');
    }
    return sendResponse(res, 200, true, null, 'User deleted successfully');
  } catch (error) {
    logger.error(\`Error deleting user \${req.params.id}:\`, error);
    next(error);
  }
};
\`\`\`

### Service Layer

Implement the service layer in `src/services/userService.js`:

\`\`\`javascript
const User = require('../models/userModel');

exports.getAllUsers = async () => {
  return User.find().select('-password');
};

exports.getUserById = async (id) => {
  return User.findById(id).select('-password');
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

exports.updateUser = async (id, userData) => {
  return User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  }).select('-password');
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return !!user;
};
\`\`\`

## Error Handling

Create a centralized error handler in `src/middleware/errorHandler.js`:

\`\`\`javascript
const logger = require('../utils/logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = \`Invalid input data: \${errors.join('. ')}\`;
  return new AppError(message, 400);
};

const handleDuplicateKeyError = (err) => {
  const value = err.errmsg.match(/(["'])(\\\\?.)*?\\1/)[0];
  const message = \`Duplicate field value: \${value}. Please use another value.\`;
  return new AppError(message, 400);
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error in development
  logger.error('ERROR 💥', err);

  // Operational, trusted errors: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const error = handleValidationError(err);
    return res.status(error.statusCode).json({
      success: false,
      status: error.status,
      message: error.message,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const error = handleDuplicateKeyError(err);
    return res.status(error.statusCode).json({
      success: false,
      status: error.status,
      message: error.message,
    });
  }

  // Programming or other unknown errors: don't leak error details
  return res.status(500).json({
    success: false,
    status: 'error',
    message: 'Something went wrong',
  });
};

module.exports = errorHandler;
module.exports.AppError = AppError;
\`\`\`

## Authentication and Authorization

Create authentication middleware in `src/middleware/auth.js`:

\`\`\`javascript
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const { AppError } = require('./errorHandler');

exports.authenticate = async (req, res, next) => {
  try {
    // 1) Check if token exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('You are not logged in. Please log in to get access.', 401)
      );
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists.', 401)
      );
    }

    // 4) Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
\`\`\`

## Rate Limiting

Implement rate limiting to protect your API from abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

module.exports = limiter;
\`\`\`

## API Documentation with Swagger

Add Swagger documentation:

\`\`\`bash
npm install swagger-jsdoc swagger-ui-express
\`\`\`

Configure Swagger in `src/config/swagger.js`:

\`\`\`javascript
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description: 'A RESTful API built with Express and Node.js',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
\`\`\`

Update `app.js` to include Swagger:

\`\`\`javascript
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// ... other middleware

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
\`\`\`

## Testing Your API

Install testing packages:

\`\`\`bash
npm install --save-dev jest supertest
\`\`\`

Create a test for your user routes in `__tests__/routes/userRoutes.test.js`:

\`\`\`javascript
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/userModel');
const mongoose = require('mongoose');

describe('User API', () => {
  let token;
  let userId;

  // Connect to test database before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    
    // Create a test user and get authentication token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    
    token = loginResponse.body.data.token;
  });

  // Clean up after tests
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  // Test creating a user
  test('POST /api/users - Create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty('_id');
    expect(response.body.data.user).toHaveProperty('name', 'Test User');
    
    userId = response.body.data.user._id;
  });

  // Test getting all users
  test('GET /api/users - Get all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', \`Bearer \${token}\`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.users)).toBe(true);
  });

  // Test getting a user by ID
  test('GET /api/users/:id - Get user by ID', async () => {
    const response = await request(app)
      .get(\`/api/users/\${userId}\`)
      .set('Authorization', \`Bearer \${token}\`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty('_id', userId);
  });

  // Test updating a user
  test('PATCH /api/users/:id - Update user', async () => {
    const response = await request(app)
      .patch(\`/api/users/\${userId}\`)
      .set('Authorization', \`Bearer \${token}\`)
      .send({
        name: 'Updated Name'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty('name', 'Updated Name');
  });

  // Test deleting a user
  test('DELETE /api/users/:id - Delete user', async () => {
    // First, create an admin user to delete others
    const adminResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword'
      });
    
    const adminToken = adminResponse.body.data.token;
    
    const response = await request(app)
      .delete(\`/api/users/\${userId}\`)
      .set('Authorization', \`Bearer \${adminToken}\`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User deleted successfully');
  });
});
\`\`\`

## Scaling Strategies

### Connection Pooling

For database connections, implement connection pooling:

\`\`\`javascript
// src/config/database.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      // Connection pool settings
      poolSize: 10, // Maximum number of sockets
      serverSelectionTimeoutMS: 5000, // Server selection timeout
      socketTimeoutMS: 45000, // Socket timeout
    });

    logger.info(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    logger.error(\`Error connecting to MongoDB: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
\`\`\`

### Cluster Mode

Utilize Node.js cluster module or PM2 to take advantage of multi-core systems:

\`\`\`javascript
// cluster.js
const cluster = require('cluster');
const os = require('os');
const logger = require('./src/utils/logger');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  logger.info(\`Master \${process.pid} is running\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(\`Worker \${worker.process.pid} died\`);
    // Replace the dead worker
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  require('./server');
  logger.info(\`Worker \${process.pid} started\`);
}
\`\`\`

### Caching

Implement caching for frequently accessed data:

\`\`\`javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes default TTL

// Middleware for caching responses
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    // Store the original send method
    const originalSend = res.json;
    
    // Override the send method
    res.json = function(body) {
      cache.set(key, body, duration);
      originalSend.call(this, body);
    };
    
    next();
  };
};

module.exports = cacheMiddleware;
\`\`\`

## Conclusion

Building scalable APIs with Express and Node.js involves following best practices for project structure, error handling, authentication, testing, and performance optimization. By implementing the patterns and techniques described in this article, you can create robust, maintainable APIs that can handle growing traffic and evolving requirements.

Remember that scalability is not just about performance but also about code organization and maintainability. A well-structured application that follows separation of concerns principles will be easier to scale both in terms of code and infrastructure.`,
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        authorId: authorIds[2], // Michael Chen
        categoryId: categoryIds[2], // NodeJS
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        isFeatured: true,
        readTime: 15
      },
      { 
        title: 'Microservices Architecture in AWS',
        slug: 'microservices-architecture-in-aws',
        excerpt: 'Explore best practices for designing and implementing microservices architecture in AWS.',
        content: `# Microservices Architecture in AWS

## Introduction

Microservices architecture has become a popular approach for building complex applications by breaking them down into smaller, independent services. Amazon Web Services (AWS) provides a comprehensive set of tools and services that make it an ideal platform for implementing microservices. In this article, we'll explore the principles of microservices architecture and how to effectively implement it using AWS services.

## What are Microservices?

Microservices is an architectural style that structures an application as a collection of loosely coupled services. Each service:

- Is focused on a single business capability
- Can be developed, deployed, and scaled independently
- Communicates with other services through well-defined APIs
- Can be written in different programming languages
- Can use different data storage technologies

This approach contrasts with monolithic architectures, where all components of an application are tightly integrated into a single unit.

## Benefits of Microservices

- **Agility**: Smaller, independent teams can work on different services simultaneously
- **Scalability**: Individual services can be scaled based on demand
- **Resilience**: Failure in one service doesn't necessarily affect others
- **Technology flexibility**: Different services can use different technologies
- **Deployment flexibility**: Continuous deployment can be achieved more easily

## AWS Services for Microservices

AWS offers a rich ecosystem of services that support microservices architecture:

### Compute Services

1. **Amazon EC2**: Traditional virtual machines for running services
2. **AWS Lambda**: Serverless compute for event-driven microservices
3. **Amazon ECS/EKS**: Container orchestration for Docker containers
4. **AWS Fargate**: Serverless container execution without managing servers

### API Management

1. **Amazon API Gateway**: Create, publish, and manage APIs
2. **AWS AppSync**: GraphQL APIs with real-time and offline capabilities

### Service Discovery & Communication

1. **AWS Cloud Map**: Service discovery for cloud resources
2. **Amazon EventBridge**: Serverless event bus for connecting applications
3. **Amazon SNS/SQS**: Messaging and queuing services

### Data Services

1. **Amazon DynamoDB**: NoSQL database with single-digit millisecond performance
2. **Amazon RDS**: Managed relational databases
3. **Amazon ElastiCache**: In-memory caching
4. **Amazon S3**: Object storage for files and static assets

### Monitoring & Management

1. **AWS CloudWatch**: Monitoring and observability
2. **AWS X-Ray**: Distributed tracing for microservices
3. **AWS CloudFormation**: Infrastructure as code
4. **AWS CDK**: Infrastructure as code using familiar programming languages

## Microservices Design Patterns on AWS

### API Gateway Pattern

Using Amazon API Gateway as the entry point for all client requests:

\`\`\`
Client → API Gateway → Microservices
\`\`\`

**Implementation:**

1. Create an API in API Gateway
2. Set up resources and methods
3. Integrate with backend services (Lambda, EC2, etc.)
4. Enable features like caching, throttling, and authentication

**Example API Gateway configuration:**

\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  UsersApi:
    Type: 'AWS::ApiGateway::RestApi'
    Properties:
      Name: UsersAPI
      Description: API for user management
      EndpointConfiguration:
        Types:
          - REGIONAL
  
  UsersResource:
    Type: 'AWS::ApiGateway::Resource'
    Properties:
      RestApiId: !Ref UsersApi
      ParentId: !GetAtt UsersApi.RootResourceId
      PathPart: 'users'
  
  GetUsersMethod:
    Type: 'AWS::ApiGateway::Method'
    Properties:
      RestApiId: !Ref UsersApi
      ResourceId: !Ref UsersResource
      HttpMethod: GET
      AuthorizationType: COGNITO_USER_POOLS
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Sub 'arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${GetUsersFunction.Arn}/invocations'
\`\`\`

### Service Discovery Pattern

Using AWS Cloud Map for service discovery:

\`\`\`
Service A → Cloud Map → Service B
\`\`\`

**Implementation:**

1. Create a namespace in Cloud Map
2. Register services with health checks
3. Services discover each other using DNS or API calls

**Example Cloud Map setup:**

\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  ServiceNamespace:
    Type: 'AWS::ServiceDiscovery::PrivateDnsNamespace'
    Properties:
      Name: 'microservices.local'
      Vpc: !Ref VPC
  
  PaymentService:
    Type: 'AWS::ServiceDiscovery::Service'
    Properties:
      Name: 'payment-service'
      NamespaceId: !Ref ServiceNamespace
      DnsConfig:
        DnsRecords:
          - Type: A
            TTL: 60
      HealthCheckCustomConfig:
        FailureThreshold: 1
\`\`\`

### Event-Driven Pattern

Using EventBridge, SNS, and SQS for asynchronous communication:

\`\`\`
Service A → EventBridge/SNS → SQS → Service B
\`\`\`

**Implementation:**

1. Create an EventBridge event bus or SNS topic
2. Services publish events when state changes
3. Interested services subscribe to relevant events
4. Use SQS for buffering and resilience

**Example Event-Driven Architecture:**

\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  OrderEventBus:
    Type: 'AWS::Events::EventBus'
    Properties:
      Name: OrderEvents
  
  OrderCreatedRule:
    Type: 'AWS::Events::Rule'
    Properties:
      EventBusName: !Ref OrderEventBus
      EventPattern:
        source:
          - 'order-service'
        detail-type:
          - 'OrderCreated'
      Targets:
        - Arn: !GetAtt PaymentQueue.Arn
          Id: 'PaymentQueueTarget'
  
  PaymentQueue:
    Type: 'AWS::SQS::Queue'
    Properties:
      QueueName: PaymentQueue
      VisibilityTimeout: 60
\`\`\`

### Database Per Service Pattern

Each microservice has its own database:

\`\`\`
Service A → Database A
Service B → Database B
\`\`\`

**Implementation:**

1. Each service owns its data model
2. Choose appropriate database type for each service
3. Handle data consistency through events

**Example with different database types:**

\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  # For User Service - Relational Data
  UserDatabase:
    Type: 'AWS::RDS::DBInstance'
    Properties:
      Engine: mysql
      DBInstanceClass: db.t3.small
      AllocatedStorage: 20
      MasterUsername: !Ref DBUsername
      MasterUserPassword: !Ref DBPassword
  
  # For Catalog Service - Document Data
  CatalogDatabase:
    Type: 'AWS::DynamoDB::Table'
    Properties:
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: productId
          AttributeType: S
      KeySchema:
        - AttributeName: productId
          KeyType: HASH
\`\`\`

### Circuit Breaker Pattern

Prevent cascading failures using circuit breakers:

\`\`\`
Service A → Circuit Breaker → Service B
\`\`\`

**Implementation:**

1. Use libraries like Hystrix or Resilience4j
2. Deploy services with AWS App Mesh for network-level circuit breaking
3. Configure timeouts and retries at API Gateway

**Example App Mesh configuration:**

\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  ServiceMesh:
    Type: 'AWS::AppMesh::Mesh'
    Properties:
      MeshName: MyServiceMesh
  
  PaymentVirtualRouter:
    Type: 'AWS::AppMesh::VirtualRouter'
    Properties:
      MeshName: !Ref ServiceMesh
      VirtualRouterName: payment-router
      Spec:
        Listeners:
          - PortMapping:
              Port: 8080
              Protocol: http
  
  PaymentRoute:
    Type: 'AWS::AppMesh::Route'
    Properties:
      MeshName: !Ref ServiceMesh
      VirtualRouterName: !GetAtt PaymentVirtualRouter.VirtualRouterName
      RouteName: payment-route
      Spec:
        HttpRoute:
          Match:
            Prefix: /
          Action:
            WeightedTargets:
              - VirtualNode: payment-service
                Weight: 100
          RetryPolicy:
            MaxRetries: 3
            PerRetryTimeout:
              Unit: ms
              Value: 2000
            HttpRetryEvents:
              - server-error
              - gateway-error
\`\`\`

## Implementing a Microservices Architecture in AWS

Let's walk through building a simple e-commerce application with microservices on AWS:

### 1. Define Service Boundaries

Break down the e-commerce application into services:

- **User Service**: Authentication and user profiles
- **Catalog Service**: Product information
- **Order Service**: Order processing
- **Payment Service**: Payment processing
- **Notification Service**: Email and SMS notifications

### 2. Choose Deployment Strategy

We'll use different deployment approaches based on service requirements:

- **User & Order Services**: ECS with Fargate (container-based)
- **Catalog Service**: DynamoDB with Lambda (serverless)
- **Payment Service**: EC2 with Auto Scaling (VM-based)
- **Notification Service**: Lambda (event-driven serverless)

### 3. Set Up Infrastructure

**VPC Setup:**

\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  VPC:
    Type: 'AWS::EC2::VPC'
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: MicroservicesVPC
  
  # Define subnets, route tables, etc.
  # ...
\`\`\`

**ECS Cluster:**

\`\`\`yaml
ECSCluster:
  Type: 'AWS::ECS::Cluster'
  Properties:
    ClusterName: MicroservicesCluster
    CapacityProviders:
      - FARGATE
    DefaultCapacityProviderStrategy:
      - CapacityProvider: FARGATE
        Weight: 1
\`\`\`

**API Gateway:**

\`\`\`yaml
ApiGateway:
  Type: 'AWS::ApiGateway::RestApi'
  Properties:
    Name: MicroservicesAPI
    EndpointConfiguration:
      Types:
        - REGIONAL
\`\`\`

### 4. Implement Service Communication

**EventBridge for event-driven communication:**

\`\`\`yaml
EventBus:
  Type: 'AWS::Events::EventBus'
  Properties:
    Name: MicroservicesEventBus

OrderCreatedRule:
  Type: 'AWS::Events::Rule'
  Properties:
    EventBusName: !Ref EventBus
    EventPattern:
      source:
        - 'order-service'
      detail-type:
        - 'OrderCreated'
    Targets:
      - Arn: !GetAtt PaymentFunction.Arn
        Id: 'PaymentFunction'
      - Arn: !GetAtt NotificationQueue.Arn
        Id: 'NotificationQueue'
\`\`\`

**Code example for publishing events:**

\`\`\`javascript
// Order Service - Publishing an event when order is created
const AWS = require('aws-sdk');
const eventBridge = new AWS.EventBridge();

exports.createOrder = async (orderData) => {
  // Create order in database
  const order = await saveOrderToDatabase(orderData);
  
  // Publish event
  await eventBridge.putEvents({
    Entries: [{
      EventBusName: 'MicroservicesEventBus',
      Source: 'order-service',
      DetailType: 'OrderCreated',
      Detail: JSON.stringify({
        orderId: order.id,
        userId: order.userId,
        amount: order.totalAmount,
        items: order.items
      })
    }]
  }).promise();
  
  return order;
};
\`\`\`

**Code example for consuming events:**

\`\`\`javascript
// Payment Service - Lambda function triggered by OrderCreated event
exports.handler = async (event) => {
  const orderDetails = JSON.parse(event.detail);
  
  try {
    // Process payment
    const paymentResult = await processPayment({
      orderId: orderDetails.orderId,
      amount: orderDetails.amount,
      userId: orderDetails.userId
    });
    
    // Publish payment result event
    const eventBridge = new AWS.EventBridge();
    await eventBridge.putEvents({
      Entries: [{
        EventBusName: 'MicroservicesEventBus',
        Source: 'payment-service',
        DetailType: paymentResult.success ? 'PaymentSucceeded' : 'PaymentFailed',
        Detail: JSON.stringify({
          orderId: orderDetails.orderId,
          paymentId: paymentResult.paymentId,
          status: paymentResult.status
        })
      }]
    }).promise();
    
    return { statusCode: 200, body: 'Payment processed' };
  } catch (error) {
    console.error('Payment processing error:', error);
    return { statusCode: 500, body: 'Payment processing failed' };
  }
};
\`\`\`

### 5. Implement Monitoring and Observability

**CloudWatch Dashboard:**

\`\`\`yaml
Dashboard:
  Type: 'AWS::CloudWatch::Dashboard'
  Properties:
    DashboardName: MicroservicesDashboard
    DashboardBody: !Sub |
      {
        "widgets": [
          {
            "type": "metric",
            "x": 0,
            "y": 0,
            "width": 12,
            "height": 6,
            "properties": {
              "view": "timeSeries",
              "stacked": false,
              "metrics": [
                [ "AWS/ApiGateway", "Count", "ApiName", "MicroservicesAPI" ]
              ],
              "region": "${AWS::Region}",
              "title": "API Requests"
            }
          },
          {
            "type": "metric",
            "x": 12,
            "y": 0,
            "width": 12,
            "height": 6,
            "properties": {
              "view": "timeSeries",
              "stacked": false,
              "metrics": [
                [ "AWS/ApiGateway", "Latency", "ApiName", "MicroservicesAPI" ]
              ],
              "region": "${AWS::Region}",
              "title": "API Latency"
            }
          }
        ]
      }
\`\`\`

**X-Ray Tracing:**

\`\`\`javascript
// Lambda function with X-Ray tracing
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

exports.handler = async (event) => {
  // Create a segment for the main function
  const segment = AWSXRay.getSegment();
  
  // Create a subsegment for database operations
  const dbSubsegment = segment.addNewSubsegment('Database');
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const result = await dynamoDB.get({
      TableName: 'Products',
      Key: { productId: event.pathParameters.id }
    }).promise();
    dbSubsegment.close();
    
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    dbSubsegment.addError(error);
    dbSubsegment.close();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve product' })
    };
  }
};
\`\`\`

## Best Practices for AWS Microservices

1. **Right-size your microservices**: Not too big, not too small
2. **Implement proper service boundaries**: Follow domain-driven design principles
3. **Design for failure**: Assume services will fail and handle gracefully
4. **Use health checks**: Every service should report its health status
5. **Implement circuit breakers**: Prevent cascading failures
6. **Centralize configuration**: Use AWS AppConfig or Parameter Store
7. **Automate deployments**: Use CI/CD pipelines with AWS CodePipeline
8. **Implement comprehensive monitoring**: Use CloudWatch, X-Ray, and custom metrics
9. **Secure communication**: Use IAM roles, VPC, and API authentication
10. **Maintain API versions**: Support backward compatibility for services

## Challenges and Solutions

### Challenge: Service Discovery

**Solution**: Use AWS Cloud Map to discover services dynamically

\`\`\`javascript
const AWS = require('aws-sdk');
const cloudMap = new AWS.ServiceDiscovery();

async function discoverService(serviceName, namespace) {
  const params = {
    NamespaceName: namespace,
    ServiceName: serviceName
  };
  
  try {
    const response = await cloudMap.discoverInstances(params).promise();
    return response.Instances[0].Attributes.AWS_INSTANCE_IPV4;
  } catch (error) {
    console.error('Service discovery failed:', error);
    throw error;
  }
}
\`\`\`

### Challenge: Distributed Transactions

**Solution**: Implement the Saga pattern using Step Functions

\`\`\`yaml
OrderSaga:
  Type: 'AWS::StepFunctions::StateMachine'
  Properties:
    StateMachineName: OrderProcessingSaga
    RoleArn: !GetAtt StepFunctionsExecutionRole.Arn
    DefinitionString: !Sub |
      {
        "Comment": "Order Processing Saga",
        "StartAt": "CreateOrder",
        "States": {
          "CreateOrder": {
            "Type": "Task",
            "Resource": "${CreateOrderFunction.Arn}",
            "Next": "ProcessPayment",
            "Catch": [
              {
                "ErrorEquals": [ "States.ALL" ],
                "Next": "FailOrder"
              }
            ]
          },
          "ProcessPayment": {
            "Type": "Task",
            "Resource": "${ProcessPaymentFunction.Arn}",
            "Next": "UpdateInventory",
            "Catch": [
              {
                "ErrorEquals": [ "States.ALL" ],
                "Next": "CompensateOrder"
              }
            ]
          },
          "UpdateInventory": {
            "Type": "Task",
            "Resource": "${UpdateInventoryFunction.Arn}",
            "Next": "NotifyCustomer",
            "Catch": [
              {
                "ErrorEquals": [ "States.ALL" ],
                "Next": "CompensatePaymentAndOrder"
              }
            ]
          },
          "NotifyCustomer": {
            "Type": "Task",
            "Resource": "${NotifyCustomerFunction.Arn}",
            "End": true,
            "Catch": [
              {
                "ErrorEquals": [ "States.ALL" ],
                "Next": "OrderComplete"
              }
            ]
          },
          "CompensatePaymentAndOrder": {
            "Type": "Parallel",
            "Branches": [
              {
                "StartAt": "ReversePayment",
                "States": {
                  "ReversePayment": {
                    "Type": "Task",
                    "Resource": "${ReversePaymentFunction.Arn}",
                    "End": true
                  }
                }
              },
              {
                "StartAt": "CancelOrder",
                "States": {
                  "CancelOrder": {
                    "Type": "Task",
                    "Resource": "${CancelOrderFunction.Arn}",
                    "End": true
                  }
                }
              }
            ],
            "Next": "FailOrder"
          },
          "CompensateOrder": {
            "Type": "Task",
            "Resource": "${CancelOrderFunction.Arn}",
            "Next": "FailOrder"
          },
          "FailOrder": {
            "Type": "Task",
            "Resource": "${NotifyFailureFunction.Arn}",
            "End": true
          },
          "OrderComplete": {
            "Type": "Pass",
            "End": true
          }
        }
      }
\`\`\`

### Challenge: Consistent Deployment

**Solution**: Use AWS CDK for infrastructure as code

\`\`\`typescript
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class MicroservicesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new ec2.Vpc(this, 'MicroservicesVPC', {
      maxAzs: 2
    });

    // DynamoDB Tables
    const productTable = new dynamodb.Table(this, 'ProductTable', {
      partitionKey: { name: 'productId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Functions
    const catalogFunction = new lambda.Function(this, 'CatalogFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/catalog'),
      environment: {
        PRODUCT_TABLE: productTable.tableName
      }
    });
    
    productTable.grantReadWriteData(catalogFunction);

    // API Gateway
    const api = new apigateway.RestApi(this, 'MicroservicesApi', {
      restApiName: 'Microservices API',
      description: 'API for microservices application',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    });

    const productsResource = api.root.addResource('products');
    productsResource.addMethod('GET', new apigateway.LambdaIntegration(catalogFunction));

    // ECS Cluster
    const cluster = new ecs.Cluster(this, 'MicroservicesCluster', {
      vpc: vpc
    });

    // Add more services...
  }
}
\`\`\`

## Conclusion

Microservices architecture on AWS offers tremendous benefits in terms of scalability, resilience, and development agility. By leveraging AWS's rich ecosystem of services, teams can build complex, distributed systems that are easier to develop, deploy, and scale.

Remember that transitioning to microservices is a journey that requires careful planning and incremental adoption. Start with clear service boundaries, embrace automation, implement comprehensive monitoring, and continuously refine your architecture based on real-world performance and operational insights.

AWS provides all the building blocks needed to create a successful microservices architecture, from compute services to messaging, storage, and observability tools. By following the patterns and best practices outlined in this article, you can create a microservices architecture that delivers value to your customers while being maintainable and scalable for your development teams.`,
        featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        authorId: authorIds[0], // Alex Stevens
        categoryId: categoryIds[3], // Cloud Architecture
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        isFeatured: false,
        readTime: 20
      }
    ];
    
    for (const article of articlesData) {
      const articleInsertResult = await client.query(
        'INSERT INTO articles (title, slug, excerpt, content, "featuredImage", "authorId", "categoryId", "publishedAt", "isFeatured", "readTime") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
        [article.title, article.slug, article.excerpt, article.content, article.featuredImage, article.authorId, article.categoryId, article.publishedAt, article.isFeatured, article.readTime]
      );
      
      const articleId = articleInsertResult.rows[0].id;
      console.log(`Inserted article: ${articleId} - ${article.title}`);
      
      // Assign tags to each article
      let articleTagsToAssign;
      
      if (article.slug === 'building-serverless-applications-with-aws-lambda') {
        articleTagsToAssign = [tagIds[0], tagIds[3]]; // Lambda, Serverless
      } else if (article.slug === 'python-best-practices-for-cloud-applications') {
        articleTagsToAssign = [tagIds[4], tagIds[5], tagIds[9]]; // Django, Flask, Docker
      } else if (article.slug === 'building-scalable-apis-with-express-and-nodejs') {
        articleTagsToAssign = [tagIds[6], tagIds[7], tagIds[9]]; // Express, React, Docker
      } else if (article.slug === 'microservices-architecture-in-aws') {
        articleTagsToAssign = [tagIds[3], tagIds[9], tagIds[10], tagIds[11]]; // Serverless, Docker, Kubernetes, CI/CD
      }
      
      for (const tagId of articleTagsToAssign) {
        await client.query(
          'INSERT INTO article_tags ("articleId", "tagId") VALUES ($1, $2)',
          [articleId, tagId]
        );
      }
      
      console.log(`Assigned tags to article: ${articleId}`);
    }
    
    // Add subscribers
    const subscriberData = [
      { email: 'subscriber1@example.com', subscriptionDate: new Date() },
      { email: 'subscriber2@example.com', subscriptionDate: new Date() },
      { email: 'subscriber3@example.com', subscriptionDate: new Date() }
    ];
    
    for (const subscriber of subscriberData) {
      await client.query(
        'INSERT INTO subscribers (email, "subscriptionDate") VALUES ($1, $2)',
        [subscriber.email, subscriber.subscriptionDate]
      );
    }
    
    console.log('Inserted subscribers');
    
    // Commit the transaction
    await client.query('COMMIT');
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    // Release the client back to the pool
    client.release();
    await pool.end();
  }
}

main().catch(console.error);