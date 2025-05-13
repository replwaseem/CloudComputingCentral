import { 
  categories, 
  articles, 
  authors, 
  tags, 
  articleTags, 
  subscribers,
  type Category,
  type Article,
  type Author,
  type Tag,
  type InsertCategory,
  type InsertArticle,
  type InsertAuthor,
  type InsertTag,
  type InsertArticleTag,
  type InsertSubscriber
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, like, and, asc } from "drizzle-orm";

// Interface for all storage operations
export interface IStorage {
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Articles
  getArticles(page: number, limit: number): Promise<Article[]>;
  getArticlesWithDetails(page: number, limit: number): Promise<any[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getArticleBySlugWithDetails(slug: string): Promise<any | undefined>;
  getArticlesByCategoryId(categoryId: number, page: number, limit: number): Promise<any[]>;
  getArticlesByCategorySlug(categorySlug: string, page: number, limit: number): Promise<any[]>;
  getFeaturedArticles(): Promise<any[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  
  // Authors
  getAuthorById(id: number): Promise<Author | undefined>;
  createAuthor(author: InsertAuthor): Promise<Author>;
  
  // Tags
  getAllTags(): Promise<Tag[]>;
  getTagById(id: number): Promise<Tag | undefined>;
  getTagBySlug(slug: string): Promise<Tag | undefined>;
  getPopularTags(limit: number): Promise<any[]>;
  createTag(tag: InsertTag): Promise<Tag>;
  
  // Article Tags
  addTagToArticle(articleTag: InsertArticleTag): Promise<void>;
  getTagsByArticleId(articleId: number): Promise<Tag[]>;
  
  // Search
  searchArticles(query: string): Promise<any[]>;
  
  // Subscribers
  addSubscriber(subscriber: InsertSubscriber): Promise<any>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private articles: Map<number, Article>;
  private authors: Map<number, Author>;
  private tags: Map<number, Tag>;
  private articleTags: Map<number, { articleId: number, tagId: number }>;
  private subscribers: Map<number, any>;
  
  private categoryIdCounter: number;
  private articleIdCounter: number;
  private authorIdCounter: number;
  private tagIdCounter: number;
  private articleTagIdCounter: number;
  private subscriberIdCounter: number;

  constructor() {
    this.categories = new Map();
    this.articles = new Map();
    this.authors = new Map();
    this.tags = new Map();
    this.articleTags = new Map();
    this.subscribers = new Map();
    
    this.categoryIdCounter = 1;
    this.articleIdCounter = 1;
    this.authorIdCounter = 1;
    this.tagIdCounter = 1;
    this.articleTagIdCounter = 1;
    this.subscriberIdCounter = 1;
    
    this.seedData();
  }

  // Seed initial data
  private seedData() {
    // Create authors
    const author1 = this.createAuthor({
      name: "Alex Stevens",
      email: "alex@cloudcodecraft.com",
      bio: "Cloud architect with 10+ years of experience in AWS",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const author2 = this.createAuthor({
      name: "Sarah Johnson",
      email: "sarah@cloudcodecraft.com",
      bio: "DevOps engineer specializing in AWS infrastructure",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const author3 = this.createAuthor({
      name: "Michael Chen",
      email: "michael@cloudcodecraft.com",
      bio: "Python developer and machine learning enthusiast",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    const author4 = this.createAuthor({
      name: "David Wilson",
      email: "david@cloudcodecraft.com",
      bio: "Full-stack developer with focus on Node.js and serverless",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });

    const author5 = this.createAuthor({
      name: "Emily Rodriguez",
      email: "emily@cloudcodecraft.com",
      bio: "Cloud solutions architect and AWS certified professional",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    });
    
    // Create categories
    const awsCategory = this.createCategory({
      name: "AWS",
      slug: "aws",
      description: "Articles about Amazon Web Services",
      color: "#3B82F6" // AWS Blue
    });
    
    const pythonCategory = this.createCategory({
      name: "Python",
      slug: "python",
      description: "Articles about Python programming language",
      color: "#EAB308" // Python Yellow
    });
    
    const nodejsCategory = this.createCategory({
      name: "NodeJS",
      slug: "nodejs",
      description: "Articles about Node.js runtime and ecosystem",
      color: "#10B981" // Node.js Green
    });
    
    const cloudArchCategory = this.createCategory({
      name: "Cloud Architecture",
      slug: "cloud-architecture",
      description: "Articles about cloud architecture patterns and practices",
      color: "#6366F1" // Indigo
    });

    const devOpsCategory = this.createCategory({
      name: "DevOps",
      slug: "devops",
      description: "Articles about DevOps practices and tools",
      color: "#EC4899" // Pink
    });
    
    // Create tags
    const lambdaTag = this.createTag({ name: "Lambda", slug: "lambda" });
    const ec2Tag = this.createTag({ name: "EC2", slug: "ec2" });
    const s3Tag = this.createTag({ name: "S3", slug: "s3" });
    const djangoTag = this.createTag({ name: "Django", slug: "django" });
    const expressTag = this.createTag({ name: "Express", slug: "express" });
    const reactTag = this.createTag({ name: "React", slug: "react" });
    const serverlessTag = this.createTag({ name: "Serverless", slug: "serverless" });
    const apiGatewayTag = this.createTag({ name: "API Gateway", slug: "api-gateway" });
    const dynamoDBTag = this.createTag({ name: "DynamoDB", slug: "dynamodb" });
    const fastAPITag = this.createTag({ name: "FastAPI", slug: "fastapi" });
    const pythonTag = this.createTag({ name: "Python", slug: "python" });
    const nodejsTag = this.createTag({ name: "Node.js", slug: "nodejs" });
    
    // Create articles
    // Featured article
    const featuredArticle = this.createArticle({
      title: "Building Serverless Applications with AWS Lambda and Python",
      slug: "building-serverless-applications-with-aws-lambda-and-python",
      excerpt: "Learn how to create scalable, event-driven applications using AWS Lambda and Python. This guide covers everything from basic setup to advanced patterns and best practices.",
      content: `
# Building Serverless Applications with AWS Lambda and Python

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. Python is one of the most popular languages supported by Lambda. In this article, we'll explore how to create your first Python Lambda function.

## Why Serverless?

Serverless architectures allow you to build and run applications without thinking about servers. With AWS Lambda, you can run code for virtually any type of application or backend service with zero administration. Just upload your code and Lambda takes care of everything required to run and scale your code with high availability.

## Setting Up Your First Lambda Function

Let's create a simple Lambda function that returns a greeting message:

\`\`\`python
def lambda_handler(event, context):
    name = event.get('name', 'World')
    return {
        'statusCode': 200,
        'body': f'Hello, {name}! Welcome to AWS Lambda.'
    }
\`\`\`

This function takes an input event, extracts a name parameter if available (defaulting to "World" if not provided), and returns a JSON response with a greeting message.

## Deploying Your Lambda Function

You can deploy this function through the AWS Management Console, AWS CLI, or infrastructure as code tools like AWS SAM or Terraform. Here's how to do it with the AWS CLI:

\`\`\`bash
# Create a deployment package
zip function.zip lambda_function.py

# Create the Lambda function
aws lambda create-function \\
  --function-name my-python-function \\
  --runtime python3.9 \\
  --role arn:aws:iam::123456789012:role/lambda-ex \\
  --handler lambda_function.lambda_handler \\
  --zip-file fileb://function.zip
\`\`\`

## Testing Your Function

You can test your function using the AWS Console or the AWS CLI:

\`\`\`bash
aws lambda invoke \\
  --function-name my-python-function \\
  --payload '{"name": "Developer"}' \\
  response.json

# Check the output
cat response.json
\`\`\`

## Common Python Libraries with Lambda

AWS Lambda includes several popular Python libraries in the runtime environment, but you can also include your own dependencies. Here's how to include the popular requests library:

\`\`\`bash
# Create a directory for your function
mkdir my-lambda-function && cd my-lambda-function

# Create your function file
touch lambda_function.py

# Install dependencies in the same directory
pip install requests -t .
\`\`\`

Then you can use the requests library in your function:

\`\`\`python
import requests

def lambda_handler(event, context):
    response = requests.get('https://api.example.com/data')
    return {
        'statusCode': 200,
        'body': response.json()
    }
\`\`\`

## Connecting to AWS Services

One of the most powerful aspects of Lambda is how easily it integrates with other AWS services. Here's an example of a function that reads data from an S3 bucket:

\`\`\`python
import json
import boto3

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket = event['bucket']
    key = event['key']
    
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        content = response['Body'].read().decode('utf-8')
        return {
            'statusCode': 200,
            'body': json.loads(content)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }
\`\`\`

## Conclusion

AWS Lambda with Python provides a powerful, flexible way to run code in the cloud without managing servers. This serverless approach can significantly reduce operational complexity and costs for many applications.

In future articles, we'll explore more advanced patterns like event-driven architectures, building APIs with API Gateway, and implementing CI/CD pipelines for Lambda functions.
      `,
      featuredImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      authorId: author1.id,
      categoryId: awsCategory.id,
      publishedAt: new Date("2023-06-28"),
      isFeatured: true,
      readTime: 5
    });
    
    // Add tags to featured article
    this.addTagToArticle({ articleId: featuredArticle.id, tagId: lambdaTag.id });
    this.addTagToArticle({ articleId: featuredArticle.id, tagId: pythonTag.id });
    this.addTagToArticle({ articleId: featuredArticle.id, tagId: serverlessTag.id });
    
    // Other articles
    const article1 = this.createArticle({
      title: "Getting Started with AWS S3 for Object Storage",
      slug: "getting-started-with-aws-s3-for-object-storage",
      excerpt: "A comprehensive guide to setting up and using Amazon S3 for secure, scalable object storage in the cloud.",
      content: `
# Getting Started with AWS S3 for Object Storage

Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. This guide will help you get started with AWS S3.

## What is Object Storage?

Unlike file storage or block storage, object storage manages data as objects, each containing the data itself, metadata, and a unique identifier. This makes it ideal for storing unstructured data like images, videos, backups, and static website content.

## Setting Up Your First S3 Bucket

An S3 bucket is a container for objects stored in Amazon S3. Here's how to create one:

\`\`\`bash
# Create a bucket using AWS CLI
aws s3 mb s3://my-unique-bucket-name --region us-east-1
\`\`\`

Remember that bucket names must be globally unique across all AWS accounts.

## Uploading Files to S3

Once you have a bucket, you can start uploading files:

\`\`\`bash
# Upload a file
aws s3 cp my-file.txt s3://my-unique-bucket-name/

# Upload a directory
aws s3 cp my-directory/ s3://my-unique-bucket-name/my-directory/ --recursive
\`\`\`

## S3 Storage Classes

S3 offers different storage classes optimized for different use cases:

- **S3 Standard**: General-purpose storage for frequently accessed data
- **S3 Intelligent-Tiering**: Automatic cost savings for data with unknown or changing access patterns
- **S3 Standard-IA**: For infrequently accessed data with rapid access when needed
- **S3 One Zone-IA**: For infrequently accessed data that doesn't require multiple Availability Zone resilience
- **S3 Glacier**: Low-cost archival storage with retrieval times from minutes to hours
- **S3 Glacier Deep Archive**: Lowest-cost storage for long-term archival with retrieval times of 12 hours

## Security Best Practices

S3 provides several features to help secure your data:

1. **Bucket Policies**: JSON-based policies that control access to your buckets and objects
2. **IAM Policies**: Control what actions users and roles can perform on S3 resources
3. **Access Control Lists (ACLs)**: Legacy method for controlling access to buckets and objects
4. **S3 Block Public Access**: Settings to block public access to buckets and objects
5. **Encryption**: Server-side encryption or client-side encryption to protect your data

## Hosting a Static Website on S3

S3 can host static websites. Here's how to configure it:

\`\`\`bash
# Enable static website hosting
aws s3 website s3://my-unique-bucket-name/ --index-document index.html --error-document error.html
\`\`\`

Don't forget to set appropriate bucket policies to allow public access to your website files.

## Conclusion

AWS S3 is a versatile and robust storage solution that forms the backbone of many cloud applications. Whether you're building a simple file storage system or a complex data lake, understanding S3 is essential for cloud developers.

In future articles, we'll explore advanced S3 features like lifecycle policies, event notifications, and integration with other AWS services.
      `,
      featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340",
      authorId: author2.id,
      categoryId: awsCategory.id,
      publishedAt: new Date("2023-06-26"),
      isFeatured: false,
      readTime: 4
    });
    
    // Add tags to article1
    this.addTagToArticle({ articleId: article1.id, tagId: s3Tag.id });
    
    const article2 = this.createArticle({
      title: "Python Best Practices for Cloud Applications",
      slug: "python-best-practices-for-cloud-applications",
      excerpt: "Learn the essential patterns and practices for writing efficient, maintainable Python code for cloud-based applications.",
      content: `
# Python Best Practices for Cloud Applications

Python has become one of the most popular languages for cloud application development, particularly for data processing, machine learning, and serverless applications. This guide covers best practices for writing efficient, maintainable Python code for cloud environments.

## Environment Management

Consistent environments are crucial for cloud applications. Use virtual environments to isolate dependencies:

\`\`\`bash
# Create a virtual environment
python -m venv venv

# Activate it
# On Windows
venv\\Scripts\\activate
# On Unix or MacOS
source venv/bin/activate

# Create a requirements.txt
pip freeze > requirements.txt
\`\`\`

For containerized applications, specify your dependencies in a Dockerfile:

\`\`\`dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]
\`\`\`

## Configuration Management

Keep configuration separate from code. Use environment variables for configuration in cloud environments:

\`\`\`python
import os
import json
from typing import Dict, Any

def get_config() -> Dict[str, Any]:
    """Load configuration from environment or config file."""
    # For cloud environments, prefer environment variables
    if os.environ.get("APP_ENV") == "production":
        return {
            "database_url": os.environ["DATABASE_URL"],
            "api_key": os.environ["API_KEY"],
            "debug": os.environ.get("DEBUG", "False").lower() == "true"
        }
    
    # For local development, fall back to config file
    with open("config.json") as f:
        return json.load(f)
\`\`\`

## Error Handling and Logging

Robust error handling is essential for cloud applications:

\`\`\`python
import logging
import traceback
from functools import wraps

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def error_handler(func):
    """Decorator to handle and log errors."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            # Log the error with stack trace
            logger.error(f"Error in {func.__name__}: {e}")
            logger.debug(traceback.format_exc())
            # Re-raise or handle appropriately
            raise
    return wrapper

@error_handler
def process_data(data):
    # Process data...
    return result
\`\`\`

## Performance Optimization

Python code in the cloud can face resource constraints. Optimize your code:

1. **Use built-in data structures efficiently**: Choose the right data structure for the task.
2. **Leverage async I/O for I/O-bound tasks**:

\`\`\`python
import asyncio
import aiohttp

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def fetch_all_data(urls):
    tasks = [fetch_data(url) for url in urls]
    return await asyncio.gather(*tasks)

# Usage
urls = ["https://api.example.com/data/1", "https://api.example.com/data/2"]
results = asyncio.run(fetch_all_data(urls))
\`\`\`

3. **Use multiprocessing for CPU-bound tasks**:

\`\`\`python
from concurrent.futures import ProcessPoolExecutor
import math

def compute_intensive_task(n):
    return sum(math.factorial(i) for i in range(n))

def process_batch(numbers):
    with ProcessPoolExecutor() as executor:
        results = executor.map(compute_intensive_task, numbers)
    return list(results)

# Usage
numbers = [100, 200, 300, 400]
results = process_batch(numbers)
\`\`\`

## Security Considerations

Security is paramount for cloud applications:

1. **Use secure dependencies**: Regularly update and scan dependencies:

\`\`\`bash
# Check for security vulnerabilities
pip install safety
safety check
\`\`\`

2. **Protect sensitive data**: Use secrets management services:

\`\`\`python
import boto3

def get_secret(secret_name):
    """Retrieve a secret from AWS Secrets Manager."""
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId=secret_name)
    return response['SecretString']
\`\`\`

## Conclusion

Following these Python best practices will help you build reliable, maintainable, and efficient cloud applications. Remember that cloud environments have unique constraints and opportunities compared to traditional deployments, so adapt your code accordingly.

In future articles, we'll explore specific Python frameworks and libraries optimized for cloud environments, as well as advanced deployment strategies for Python applications.
      `,
      featuredImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340",
      authorId: author3.id,
      categoryId: pythonCategory.id,
      publishedAt: new Date("2023-06-24"),
      isFeatured: false,
      readTime: 7
    });
    
    // Add tags to article2
    this.addTagToArticle({ articleId: article2.id, tagId: pythonTag.id });
    this.addTagToArticle({ articleId: article2.id, tagId: fastAPITag.id });
    
    const article3 = this.createArticle({
      title: "Building RESTful APIs with Node.js and Express",
      slug: "building-restful-apis-with-nodejs-and-express",
      excerpt: "A step-by-step guide to creating robust, production-ready APIs with Node.js, Express, and cloud deployment.",
      content: `
# Building RESTful APIs with Node.js and Express

Node.js, with its non-blocking I/O model, is an excellent choice for building scalable, high-performance APIs. Express.js is a minimal and flexible framework that provides a robust set of features for web and mobile applications. This guide will walk you through building a production-ready RESTful API with Node.js and Express.

## Setting Up Your Project

Let's start by initializing a new Node.js project:

\`\`\`bash
# Create a new directory
mkdir express-api && cd express-api

# Initialize npm
npm init -y

# Install core dependencies
npm install express morgan cors helmet dotenv

# Install development dependencies
npm install --save-dev nodemon eslint
\`\`\`

These packages provide:
- **express**: Web framework
- **morgan**: HTTP request logger middleware
- **cors**: Cross-Origin Resource Sharing middleware
- **helmet**: Security middleware
- **dotenv**: Environment variable loader

## Project Structure

A well-organized project structure makes your API maintainable:

\`\`\`
express-api/
├── src/
│   ├── controllers/
│   │   └── items.controller.js
│   ├── models/
│   │   └── items.model.js
│   ├── routes/
│   │   └── items.routes.js
│   ├── middleware/
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   ├── utils/
│   │   └── logger.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── server.js
\`\`\`

## The Entry Point: server.js

\`\`\`javascript
// server.js
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
\`\`\`

## The Express Application: app.js

\`\`\`javascript
// src/app.js
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorMiddleware = require('./middleware/error.middleware');
const itemRoutes = require('./routes/items.routes');

// Initialize express
const app = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies

// API routes
app.use('/api/items', itemRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

module.exports = app;
\`\`\`

## Routes: items.routes.js

\`\`\`javascript
// src/routes/items.routes.js
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');
const { validateItemInput } = require('../middleware/validation.middleware');

// GET all items
router.get('/', itemsController.getAllItems);

// GET a single item by ID
router.get('/:id', itemsController.getItemById);

// POST a new item
router.post('/', validateItemInput, itemsController.createItem);

// PUT update an item
router.put('/:id', validateItemInput, itemsController.updateItem);

// DELETE an item
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
\`\`\`

## Controllers: items.controller.js

\`\`\`javascript
// src/controllers/items.controller.js
const itemsModel = require('../models/items.model');

// Controller functions with async/await for clean error handling
exports.getAllItems = async (req, res, next) => {
  try {
    const items = await itemsModel.findAll();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const item = await itemsModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const newItem = await itemsModel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const updated = await itemsModel.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const deleted = await itemsModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
\`\`\`

## Error Handling Middleware

\`\`\`javascript
// src/middleware/error.middleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  
  // Customize error response based on type
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  
  res.status(500).json({
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};

module.exports = errorMiddleware;
\`\`\`

## Environment Configuration with .env

\`\`\`
# .env
PORT=3000
NODE_ENV=development
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
\`\`\`

## Deploying to AWS

To deploy your Express API to AWS, you have several options:

1. **AWS Elastic Beanstalk**: Easiest deployment option:

\`\`\`bash
# Install EB CLI
pip install awsebcli

# Initialize EB project
eb init

# Create EB environment
eb create

# Deploy
eb deploy
\`\`\`

2. **AWS EC2**: For more control:
   - Launch an EC2 instance
   - Set up Node.js on the instance
   - Use PM2 for process management
   - Set up Nginx as a reverse proxy

3. **AWS Lambda with API Gateway**: For serverless deployment, use AWS Serverless Express:

\`\`\`javascript
// lambda.js
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
\`\`\`

## Conclusion

This guide provides a foundation for building robust, maintainable RESTful APIs with Node.js and Express. Remember to add authentication, implement proper validation, use environment-specific configurations, and set up automated tests before going to production.

In future articles, we'll explore integrating a database, adding authentication with JWT, implementing API versioning, and advanced deployment strategies for Express APIs.
      `,
      featuredImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340",
      authorId: author4.id,
      categoryId: nodejsCategory.id,
      publishedAt: new Date("2023-06-22"),
      isFeatured: false,
      readTime: 6
    });
    
    // Add tags to article3
    this.addTagToArticle({ articleId: article3.id, tagId: expressTag.id });
    this.addTagToArticle({ articleId: article3.id, tagId: nodejsTag.id });
    
    const article4 = this.createArticle({
      title: "Serverless Node.js Applications on AWS",
      slug: "serverless-nodejs-applications-on-aws",
      excerpt: "Explore the serverless architecture patterns for deploying Node.js applications using AWS Lambda and API Gateway.",
      content: `
# Serverless Node.js Applications on AWS

Serverless computing has revolutionized the way we build and deploy applications. AWS Lambda, combined with other AWS services, allows you to run Node.js applications without provisioning or managing servers. This article explores serverless architecture patterns for Node.js applications.

## What is Serverless?

Serverless computing is a cloud execution model where the cloud provider manages the infrastructure, automatically scaling and provisioning resources as needed. You only pay for the compute time you consume, with no charges when your code isn't running.

## Setting Up Your First Lambda Function

Let's create a simple Node.js Lambda function:

\`\`\`javascript
// index.js
exports.handler = async (event) => {
    const name = event.queryStringParameters?.name || 'World';
    
    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: "Hello, " + name + "!"
        })
    };
    
    return response;
};
\`\`\`

## Deploying with AWS SAM

AWS Serverless Application Model (SAM) simplifies serverless deployment:

\`\`\`yaml
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  HelloFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs14.x
      Events:
        HelloApi:
          Type: Api
          Properties:
            Path: /hello
            Method: get
\`\`\`

Deploy using the SAM CLI:

\`\`\`bash
# Package the application
sam package --output-template-file packaged.yaml --s3-bucket your-bucket-name

# Deploy the application
sam deploy --template-file packaged.yaml --stack-name hello-stack --capabilities CAPABILITY_IAM
\`\`\`

## Express.js on Lambda

You can run Express.js applications on Lambda using AWS Serverless Express:

\`\`\`javascript
// app.js
const express = require('express');
const app = express();

app.get('/api/hello', (req, res) => {
    res.json({ message: "Hello, " + (req.query.name || 'World') + "!" });
});

module.exports = app;

// lambda.js
const serverless = require('serverless-http');
const app = require('./app');

module.exports.handler = serverless(app);
\`\`\`

## Serverless Architecture Patterns

1. **API Backend**: Use Lambda + API Gateway to create RESTful APIs

2. **Microservices**: Each Lambda function implements a specific microservice

3. **Event Processing**: Lambda functions triggered by events from services like S3, DynamoDB, or SQS

\`\`\`javascript
// s3-event-processor.js
exports.handler = async (event) => {
    for (const record of event.Records) {
        const bucket = record.s3.bucket.name;
        const key = record.s3.object.key;
        console.log("File uploaded: " + key + " to bucket: " + bucket);
        // Process the file...
    }
    return { status: 'Success' };
};
\`\`\`

4. **Scheduled Tasks**: Using CloudWatch Events to trigger Lambda functions periodically

\`\`\`javascript
// scheduled-task.js
exports.handler = async (event) => {
    const now = new Date().toISOString();
    console.log("Scheduled task executed at " + now);
    // Execute your task...
    return { status: 'Success', timestamp: now };
};
\`\`\`

## Data Persistence

For serverless applications, consider these data storage options:

1. **DynamoDB**: NoSQL database that pairs well with Lambda

\`\`\`javascript
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const params = {
        TableName: 'Users',
        Item: {
            userId: event.userId,
            name: event.name,
            email: event.email,
            createdAt: new Date().toISOString()
        }
    };
    
    await dynamo.put(params).promise();
    return { status: 'User created' };
};
\`\`\`

2. **Aurora Serverless**: Relational database that scales automatically

3. **S3**: Object storage for files, logs, and static assets

## Advanced Patterns

1. **Step Functions**: Coordinate multiple Lambda functions for complex workflows

2. **AppSync**: Build GraphQL APIs backed by Lambda resolvers

\`\`\`javascript
// graphql-resolver.js
exports.handler = async (event) => {
    const { field, arguments: args } = event;
    
    switch (field) {
        case 'getUser':
            // Retrieve user from database
            return getUserById(args.id);
        case 'createUser':
            // Create new user
            return createUser(args.input);
        default:
            throw new Error("Resolver not implemented for field: " + field);
    }
};
\`\`\`

## Monitoring and Debugging

AWS provides several tools for monitoring serverless applications:

1. **CloudWatch Logs**: All Lambda output is captured here
2. **CloudWatch Metrics**: Track invocations, errors, and duration
3. **X-Ray**: Trace requests across distributed components

Best practice: Implement structured logging in your Lambda functions:

\`\`\`javascript
const log = (level, message, data = {}) => {
    console.log(JSON.stringify({
        level,
        message,
        timestamp: new Date().toISOString(),
        ...data
    }));
};

exports.handler = async (event) => {
    log('info', 'Function invoked', { event });
    
    try {
        // Your function logic
        const result = await processEvent(event);
        log('info', 'Processing successful', { result });
        return result;
    } catch (error) {
        log('error', 'Processing failed', { error: error.message, stack: error.stack });
        throw error;
    }
};
\`\`\`

## Conclusion

Serverless architecture offers significant benefits for Node.js applications: reduced operational complexity, automatic scaling, and potentially lower costs. AWS provides a comprehensive ecosystem of services that integrate seamlessly with Lambda to build powerful serverless applications.

In future articles, we'll explore advanced serverless patterns, performance optimization, and real-world case studies of Node.js applications running on AWS Lambda.
      `,
      featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=340",
      authorId: author5.id,
      categoryId: nodejsCategory.id,
      publishedAt: new Date("2023-06-20"),
      isFeatured: false,
      readTime: 8
    });
    
    // Add tags to article4
    this.addTagToArticle({ articleId: article4.id, tagId: nodejsTag.id });
    this.addTagToArticle({ articleId: article4.id, tagId: lambdaTag.id });
    this.addTagToArticle({ articleId: article4.id, tagId: apiGatewayTag.id });
    this.addTagToArticle({ articleId: article4.id, tagId: serverlessTag.id });
  }

  // Categories
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(category => category.slug === slug);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { id, ...category };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  // Articles
  async getArticles(page: number, limit: number): Promise<Article[]> {
    const articles = Array.from(this.articles.values());
    const sortedArticles = articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    const start = (page - 1) * limit;
    const end = start + limit;
    return sortedArticles.slice(start, end);
  }

  async getArticlesWithDetails(page: number, limit: number): Promise<any[]> {
    const articles = await this.getArticles(page, limit);
    const articlesWithDetails = await Promise.all(
      articles.map(async (article) => {
        const author = await this.getAuthorById(article.authorId);
        const category = await this.getCategoryById(article.categoryId);
        const tags = await this.getTagsByArticleId(article.id);
        return {
          ...article,
          author,
          category,
          tags,
        };
      })
    );
    return articlesWithDetails;
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }

  async getArticleBySlugWithDetails(slug: string): Promise<any | undefined> {
    const article = await this.getArticleBySlug(slug);
    if (!article) return undefined;
    
    const author = await this.getAuthorById(article.authorId);
    const category = await this.getCategoryById(article.categoryId);
    const tags = await this.getTagsByArticleId(article.id);
    
    return {
      ...article,
      author,
      category,
      tags,
    };
  }

  async getArticlesByCategoryId(categoryId: number, page: number, limit: number): Promise<any[]> {
    const articles = Array.from(this.articles.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedArticles = articles.slice(start, end);
    
    const articlesWithDetails = await Promise.all(
      paginatedArticles.map(async (article) => {
        const author = await this.getAuthorById(article.authorId);
        const category = await this.getCategoryById(article.categoryId);
        const tags = await this.getTagsByArticleId(article.id);
        return {
          ...article,
          author,
          category,
          tags,
        };
      })
    );
    
    return articlesWithDetails;
  }

  async getArticlesByCategorySlug(categorySlug: string, page: number, limit: number): Promise<any[]> {
    const category = await this.getCategoryBySlug(categorySlug);
    if (!category) return [];
    
    return this.getArticlesByCategoryId(category.id, page, limit);
  }

  async getFeaturedArticles(): Promise<any[]> {
    const featuredArticles = Array.from(this.articles.values())
      .filter(article => article.isFeatured)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    const articlesWithDetails = await Promise.all(
      featuredArticles.map(async (article) => {
        const author = await this.getAuthorById(article.authorId);
        const category = await this.getCategoryById(article.categoryId);
        const tags = await this.getTagsByArticleId(article.id);
        return {
          ...article,
          author,
          category,
          tags,
        };
      })
    );
    
    return articlesWithDetails;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const id = this.articleIdCounter++;
    const newArticle: Article = { id, ...article };
    this.articles.set(id, newArticle);
    return newArticle;
  }

  // Authors
  async getAuthorById(id: number): Promise<Author | undefined> {
    return this.authors.get(id);
  }

  async createAuthor(author: InsertAuthor): Promise<Author> {
    const id = this.authorIdCounter++;
    const newAuthor: Author = { id, ...author };
    this.authors.set(id, newAuthor);
    return newAuthor;
  }

  // Tags
  async getAllTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }

  async getTagById(id: number): Promise<Tag | undefined> {
    return this.tags.get(id);
  }

  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    return Array.from(this.tags.values()).find(tag => tag.slug === slug);
  }

  async getPopularTags(limit: number): Promise<any[]> {
    // Count tag occurrences in articles
    const tagCounts = new Map<number, number>();
    
    for (const articleTag of this.articleTags.values()) {
      const count = tagCounts.get(articleTag.tagId) || 0;
      tagCounts.set(articleTag.tagId, count + 1);
    }
    
    // Get tag details and sort by count
    const tagsWithCount = await Promise.all(
      Array.from(tagCounts.entries()).map(async ([tagId, count]) => {
        const tag = await this.getTagById(tagId);
        return {
          ...tag,
          count,
        };
      })
    );
    
    return tagsWithCount
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const id = this.tagIdCounter++;
    const newTag: Tag = { id, ...tag };
    this.tags.set(id, newTag);
    return newTag;
  }

  // Article Tags
  async addTagToArticle(articleTag: InsertArticleTag): Promise<void> {
    const id = this.articleTagIdCounter++;
    this.articleTags.set(id, { id, ...articleTag });
  }

  async getTagsByArticleId(articleId: number): Promise<Tag[]> {
    const tagIds = Array.from(this.articleTags.values())
      .filter(at => at.articleId === articleId)
      .map(at => at.tagId);
    
    const tags = await Promise.all(
      tagIds.map(async (tagId) => {
        const tag = await this.getTagById(tagId);
        return tag!;
      })
    );
    
    return tags.filter(tag => tag !== undefined);
  }

  // Search
  async searchArticles(query: string): Promise<any[]> {
    const lowercaseQuery = query.toLowerCase();
    
    const matchingArticles = Array.from(this.articles.values())
      .filter(article => 
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.excerpt.toLowerCase().includes(lowercaseQuery) ||
        article.content.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5); // Limit results
    
    const articlesWithDetails = await Promise.all(
      matchingArticles.map(async (article) => {
        const author = await this.getAuthorById(article.authorId);
        const category = await this.getCategoryById(article.categoryId);
        const tags = await this.getTagsByArticleId(article.id);
        return {
          ...article,
          author,
          category,
          tags,
        };
      })
    );
    
    return articlesWithDetails;
  }

  // Subscribers
  async addSubscriber(subscriber: InsertSubscriber): Promise<any> {
    const id = this.subscriberIdCounter++;
    const newSubscriber = { id, ...subscriber };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }
}

export const storage = new MemStorage();
