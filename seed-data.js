import 'dotenv/config';
import { Pool, neonConfig } from '@neondatabase/serverless';
import format from 'pg-format';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

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
3. Add key-value pairs as needed`,
        featuredImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        authorId: 1, // Will be replaced with actual ID
        categoryId: 1, // Will be replaced with actual ID
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

Always use virtual environments to isolate dependencies`,
        featuredImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
        authorId: 2, // Will be replaced with actual ID
        categoryId: 2, // Will be replaced with actual ID
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

Organize your project for scalability`,
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        authorId: 3, // Will be replaced with actual ID
        categoryId: 3, // Will be replaced with actual ID
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

This approach contrasts with monolithic architectures, where all components of an application are tightly integrated into a single unit.`,
        featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        authorId: 1, // Will be replaced with actual ID
        categoryId: 4, // Will be replaced with actual ID
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        isFeatured: false,
        readTime: 20
      }
    ];
    
    for (const article of articlesData) {
      // Replace IDs with actual ones from DB
      article.authorId = authorIds[article.authorId - 1];
      article.categoryId = categoryIds[article.categoryId - 1];
      
      const articleInsertResult = await client.query(
        'INSERT INTO articles (title, slug, excerpt, content, featured_image, author_id, category_id, published_at, is_featured, read_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
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
          'INSERT INTO article_tags (article_id, tag_id) VALUES ($1, $2)',
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
        'INSERT INTO subscribers (email, subscription_date) VALUES ($1, $2)',
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

// Execute the seeding function
main().catch(error => {
  console.error('Error running seed script:', error);
  process.exit(1);
});