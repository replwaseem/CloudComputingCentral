const fetch = require('node-fetch');

/**
 * Add a new article to the blog
 * @param {Object} articleData - The article data to add
 * @returns {Promise<Object>} - The created article
 */
async function addArticle(articleData) {
  try {
    const response = await fetch('http://localhost:3000/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create article: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding article:', error);
    throw error;
  }
}

/**
 * Add a tag to an article
 * @param {number} articleId - The article ID
 * @param {number} tagId - The tag ID
 * @returns {Promise<void>}
 */
async function addTagToArticle(articleId, tagId) {
  try {
    const response = await fetch('http://localhost:3000/api/article-tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleId, tagId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to add tag to article: ${JSON.stringify(errorData)}`);
    }

    console.log(`Tag ${tagId} added to article ${articleId}`);
  } catch (error) {
    console.error('Error adding tag to article:', error);
    throw error;
  }
}

// Example article data template
const exampleArticle = {
  title: "Your Article Title",
  slug: "your-article-slug", // URL-friendly version of the title
  excerpt: "A brief summary of your article (1-2 sentences)",
  content: `# Your Article Title

This is the full content of your article in Markdown format.

## Section Heading

Your content goes here...

### Code Example

\`\`\`javascript
// Your code example
console.log("Hello, world!");
\`\`\`

## Conclusion

Your conclusion goes here...
`,
  featuredImage: "https://example.com/your-image.jpg", // URL to your featured image
  authorId: 1, // ID of the author from the database
  categoryId: 1, // ID of the category from the database
  publishedAt: new Date().toISOString(), // Current date and time
  isFeatured: false, // Whether the article should be featured
  readTime: 5 // Estimated reading time in minutes
};

// Export the functions and example for use in other files
module.exports = {
  addArticle,
  addTagToArticle,
  exampleArticle
};

// To use this file directly, uncomment the following code and customize the article data
/*
const newArticle = {
  ...exampleArticle,
  title: "My Custom Title",
  slug: "my-custom-slug",
  // override other properties as needed
};

addArticle(newArticle)
  .then(article => {
    console.log('Article created:', article);
    // If you want to add tags to the article
    // return addTagToArticle(article.id, 1); // Add tag with ID 1
  })
  .catch(error => {
    console.error('Failed to create article:', error);
  });
*/