# Guide for Adding Articles to StackLoom Blog

This guide walks you through the process of adding new articles to your StackLoom blog.

## Step 1: Understand the Article Structure

Every article in the StackLoom blog has these required fields:

- `title`: The title of your article
- `slug`: URL-friendly version of the title (lowercase, hyphens instead of spaces)
- `excerpt`: A brief 1-2 sentence summary of the article
- `content`: The full article content in Markdown format
- `authorId`: ID of the author from the database
- `categoryId`: ID of the category from the database
- `publishedAt`: Publication date and time

And these optional fields:

- `featuredImage`: URL to an image for the article
- `isFeatured`: Boolean indicating if the article should be featured (default: false)
- `readTime`: Estimated reading time in minutes (default: 5)

## Step 2: Find Author and Category IDs

Before creating a new article, you need to know:

1. What category the article belongs to
2. Who the author is

The following IDs are available in the current database:

### Categories:
- ID 1: AWS (slug: "aws")
- ID 2: Python (slug: "python")
- ID 3: NodeJS (slug: "nodejs")
- ID 4: AI/ML (slug: "ai-ml")
- ID 5: DevOps (slug: "devops")

### Authors:
- ID 1: Alex Stevens (AWS expert)
- ID 2: Sarah Johnson (DevOps engineer)
- ID 3: Michael Chen (Python developer)
- ID 4: David Wilson (Node.js expert)
- ID 5: Emily Rodriguez (Cloud architect)

### Tags:
- ID 1: Lambda
- ID 2: EC2
- ID 3: S3
- ID 4: Django
- ID 5: Express
- ID 6: React
- ID 7: Serverless
- ID 8: API Gateway
- ID 9: DynamoDB
- ID 10: FastAPI
- ID 11: Python
- ID 12: Node.js

## Step 3: Create Your Article Content

1. Create a new JavaScript file or copy `article-example.js`
2. Edit the article data with your content:
   - Write the article title, slug, and excerpt
   - Create the article content in Markdown format
   - Choose an appropriate featuredImage URL
   - Set the authorId and categoryId
   - Set publishedAt to the current date or a specific date
   - Define readTime based on the length of your content
   - Decide if the article should be featured (isFeatured)

## Step 4: Add the Article to the Database

1. Ensure your blog application is running
2. Uncomment the code at the bottom of your article file:

```javascript
addArticle(newArticle)
  .then(article => {
    console.log('Article created successfully:', article);
    
    // Add tags to the article
    const addTags = async () => {
      try {
        await Promise.all([
          addTagToArticle(article.id, 7),  // Example: Serverless tag
          addTagToArticle(article.id, 12)   // Example: Node.js tag
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
```

3. Modify the tag IDs in the `addTagToArticle` calls to match the tags for your article
4. Run the file using Node.js:

```bash
node your-article-file.js
```

## Step 5: Verify Your Article

1. Once added, your article should appear on the TechOrbeez blog
2. Check that it appears in:
   - The main articles list
   - The category page
   - The search results when searching for keywords from your article
   - The featured articles section (if you set isFeatured to true)

## Writing Tips for StackLoom Articles

1. **Use Markdown formatting**:
   - `# Heading 1` for the main title
   - `## Heading 2` for sections
   - `### Heading 3` for subsections
   - \`\`\`language\`\`\` for code blocks (specify the language for syntax highlighting)
   - `**bold**` for bold text
   - `*italic*` for italic text
   - `[link text](url)` for links
   - `![alt text](image-url)` for images

2. **Structure your articles**:
   - Begin with an introduction explaining what the article covers
   - Use clear section headings to organize content
   - Include code examples when discussing programming concepts
   - End with a conclusion or next steps section

3. **Add relevant tags**:
   - Tags help users find your content
   - Choose existing tags that match your article topic
   - Don't add too many tags (2-5 is usually sufficient)

4. **Images and diagrams**:
   - Use relevant, high-quality images
   - Consider diagrams for complex concepts
   - Ensure images are properly sized (recommended featured image dimensions: 800x500px)

Happy writing!