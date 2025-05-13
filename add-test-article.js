// This is a test script to add a new article to the blog
const { addArticle, addTagToArticle } = require('./add-article');

// Create a new article
const testArticle = {
  title: "Setting Up CI/CD for Node.js Applications with GitHub Actions",
  slug: "setting-up-ci-cd-for-nodejs-applications-with-github-actions",
  excerpt: "Learn how to automate testing and deployment of Node.js applications using GitHub Actions to improve development workflow and ensure code quality.",
  content: `
# Setting Up CI/CD for Node.js Applications with GitHub Actions

Continuous Integration and Continuous Deployment (CI/CD) has become an essential practice in modern software development. CI/CD automates the process of testing, building, and deploying applications, reducing manual errors and ensuring consistent delivery. GitHub Actions provides a powerful and flexible way to implement CI/CD workflows directly from your GitHub repository.

In this tutorial, we'll set up a complete CI/CD pipeline for a Node.js application using GitHub Actions.

## What You'll Learn

- Setting up a basic CI workflow for a Node.js application
- Running automated tests on pull requests and pushes
- Building and deploying your application to a production environment
- Best practices for CI/CD with Node.js

## Prerequisites

- A GitHub account
- A Node.js application in a GitHub repository
- Basic understanding of JavaScript and Node.js
- Familiarity with Git

## Understanding GitHub Actions

GitHub Actions is a CI/CD platform that allows you to automate your software development workflows right in your GitHub repository. Workflows are defined in YAML files stored in the \`.github/workflows\` directory of your repository.

## Creating Your First Workflow

Let's start by creating a basic workflow that runs tests whenever code is pushed to the repository.

1. Create a directory called \`.github/workflows\` in your repository:

\`\`\`bash
mkdir -p .github/workflows
\`\`\`

2. Create a file called \`test.yml\` in the \`.github/workflows\` directory:

\`\`\`yaml
name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
\`\`\`

This workflow runs whenever code is pushed to the main branch or when a pull request is opened against the main branch. It tests your application on Node.js versions 14, 16, and 18.

## Adding Code Quality Checks

Let's enhance our CI pipeline with linting to ensure code quality:

\`\`\`yaml
# Add to the steps section
- name: Lint code
  run: npm run lint
\`\`\`

Make sure your package.json has a lint script:

\`\`\`json
"scripts": {
  "lint": "eslint ."
}
\`\`\`

## Setting Up Continuous Deployment

Now, let's add a deployment step that runs only when code is pushed to the main branch:

\`\`\`yaml
name: Node.js CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x]
        
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
    - run: npm run lint
  
  deploy:
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - name: Deploy to production
      uses: some-deployment-action@v1  # Replace this with your actual deployment action
      with:
        deploy-key: ${{ secrets.DEPLOY_KEY }}
\`\`\`

## Caching Dependencies

To speed up your workflow, you can cache dependencies:

\`\`\`yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
\`\`\`

## Environment Variables and Secrets

For sensitive information like API keys or deployment credentials, use GitHub Secrets:

1. Go to your repository settings
2. Click on "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add your secrets (e.g., DEPLOY_KEY)

Then use them in your workflow:

\`\`\`yaml
- name: Deploy
  env:
    API_TOKEN: ${{ secrets.API_TOKEN }}
  run: |
    ./deploy.sh
\`\`\`

## Testing the Workflow

Once you've set up your workflow, push the changes to your repository:

\`\`\`bash
git add .github/workflows/ci-cd.yml
git commit -m "Add CI/CD workflow"
git push
\`\`\`

Go to the "Actions" tab in your GitHub repository to see your workflow in action.

## Best Practices for Node.js CI/CD

1. **Keep your builds fast**: Optimize test suites and use caching
2. **Test what matters**: Focus on unit tests for CI, run longer integration tests less frequently
3. **Set up proper environment variables**: Use different environments for different stages
4. **Version your dependencies**: Use package-lock.json to ensure consistent builds
5. **Implement code quality checks**: Use ESLint, Prettier, and other tools
6. **Secure your secrets**: Never hardcode sensitive information

## Conclusion

Setting up CI/CD with GitHub Actions for Node.js applications is straightforward and offers significant benefits:

- Faster feedback on code changes
- Reduced manual errors
- Consistent deployment process
- Improved code quality

By automating testing and deployment, you can focus more on developing features and less on operational overhead. As your application grows, you can extend your CI/CD pipeline with more sophisticated steps like database migrations, performance testing, or multi-environment deployments.

In future articles, we'll explore advanced CI/CD patterns and how to integrate them with various deployment platforms.
  `,
  featuredImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
  authorId: 4, // David Wilson (Node.js expert)
  categoryId: 3, // NodeJS category
  publishedAt: new Date().toISOString(),
  isFeatured: false,
  readTime: 7
};

// Use this function to add the article
// Uncomment the following code to run it
/*
addArticle(testArticle)
  .then(article => {
    console.log('Article created successfully:', article);
    
    // Add tags to the article
    return Promise.all([
      addTagToArticle(article.id, 12), // Node.js tag
      addTagToArticle(article.id, 5)   // Express tag
    ]);
  })
  .then(() => {
    console.log('Tags added successfully');
  })
  .catch(error => {
    console.error('Error:', error);
  });
*/