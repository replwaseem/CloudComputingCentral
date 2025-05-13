// Import the addArticle function from our utility file
const { addArticle, addTagToArticle } = require('./add-article');

// Define your new article data
const newArticle = {
  title: "Introduction to AWS Lambda with Node.js",
  slug: "introduction-to-aws-lambda-with-nodejs",
  excerpt: "Learn how to build, deploy, and manage serverless functions with AWS Lambda and Node.js in this comprehensive guide for beginners.",
  content: `
# Introduction to AWS Lambda with Node.js

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. When paired with Node.js, it becomes a powerful tool for building scalable and cost-effective applications. This guide will help you get started with AWS Lambda using Node.js.

## What is Serverless?

Serverless computing allows you to build and run applications without thinking about servers. You don't need to provision, scale, or maintain any servers - the cloud provider handles all of that for you. You simply focus on writing code.

## Benefits of AWS Lambda

- **Pay-per-use pricing**: You only pay for the compute time you consume.
- **Auto-scaling**: Lambda automatically scales your application by running code in response to each trigger.
- **Fully managed infrastructure**: No servers to manage or maintain.
- **Integrated security**: Lambda runs your code within a VPC by default.
- **High availability**: Lambda automatically replicates your code across multiple Availability Zones.

## Setting Up Your First Lambda Function

Let's create a simple "Hello World" function with Node.js:

\`\`\`javascript
exports.handler = async (event) => {
  const name = event.name || 'World';
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: \`Hello, \${name}!\`
    }),
  };
  return response;
};
\`\`\`

This function takes an input event, extracts a name parameter (or defaults to "World"), and returns a JSON response with a greeting.

## Deploying Your Function

You can deploy your Lambda function through the AWS Management Console, AWS CLI, or using infrastructure as code tools like AWS SAM or the Serverless Framework.

Here's a basic deployment using the AWS CLI:

\`\`\`bash
# Create a deployment package
zip function.zip index.js

# Create the Lambda function
aws lambda create-function \\
  --function-name my-nodejs-function \\
  --runtime nodejs18.x \\
  --role arn:aws:iam::123456789012:role/lambda-ex \\
  --handler index.handler \\
  --zip-file fileb://function.zip
\`\`\`

## Working with Environment Variables

Lambda allows you to set environment variables for your function:

\`\`\`javascript
// Using environment variables in your Lambda function
exports.handler = async (event) => {
  const dbConnection = process.env.DB_CONNECTION;
  const apiKey = process.env.API_KEY;
  
  // Your function logic using these variables
  // ...
};
\`\`\`

## Integrating with Other AWS Services

One of the powerful aspects of Lambda is how easily it can be integrated with other AWS services. For example, here's how to interact with an S3 bucket:

\`\`\`javascript
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucket = event.bucket;
  const key = event.key;
  
  try {
    const data = await s3.getObject({
      Bucket: bucket,
      Key: key
    }).promise();
    
    const content = data.Body.toString('utf-8');
    return {
      statusCode: 200,
      body: JSON.stringify({ content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
\`\`\`

## Best Practices for Lambda Functions

1. **Keep your function code small**: Lambda has a deployment package size limit.
2. **Reuse connections**: Initialize clients outside the handler function to leverage container reuse.
3. **Use environment variables** for configuration.
4. **Implement proper error handling** and retry strategies.
5. **Monitor your functions** using AWS CloudWatch.
6. **Set appropriate memory allocations** to optimize performance and cost.

## Cold Starts

A "cold start" occurs when a Lambda function is invoked after not being used for some time. During a cold start, Lambda needs to provision your function's container before running your code, which adds latency.

To minimize cold start impact:
- Keep your deployment package small
- Use provisioned concurrency for latency-sensitive applications
- Consider using warmer functions for critical Lambda functions

## Conclusion

AWS Lambda with Node.js provides a powerful, flexible way to run code in the cloud without the overhead of managing servers. This serverless approach can significantly reduce operational complexity and costs for many applications.

In future articles, we'll explore advanced patterns like event-driven architectures, building APIs with API Gateway, and implementing CI/CD pipelines for Lambda functions.
  `,
  featuredImage: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
  authorId: 4, // ID of the author (David Wilson - Node.js expert)
  categoryId: 3, // ID of the category (NodeJS)
  publishedAt: new Date().toISOString(),
  isFeatured: false,
  readTime: 6 // Estimated reading time in minutes
};

// Uncomment and run the following code to add the article
/*
addArticle(newArticle)
  .then(article => {
    console.log('Article created successfully:', article);
    
    // Add tags to the article
    // Using async/await with Promise.all to add multiple tags
    const addTags = async () => {
      try {
        await Promise.all([
          addTagToArticle(article.id, 7),  // Serverless tag
          addTagToArticle(article.id, 12)   // Node.js tag
        ]);
        console.log('Tags added successfully');
      } catch (error) {
        console.error('Error adding tags:', error);
      }
    };
    
    addTags();
  })
  .catch(error => {
    console.error('Failed to create article:', error);
  });
*/