import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertArticleSchema, 
  insertCategorySchema, 
  insertTagSchema,
  insertAuthorSchema,
  insertSubscriberSchema,
  insertArticleTagSchema
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for monitoring and load balancers
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected' // You can add actual DB health check here
    });
  });
  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Get category by slug
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Get all articles
  app.get("/api/articles", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const articles = await storage.getArticlesWithDetails(page, limit);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  // Get featured articles
  app.get("/api/articles/featured", async (req, res) => {
    try {
      const featuredArticles = await storage.getFeaturedArticles();
      res.status(200).json(featuredArticles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured articles" });
    }
  });

  // Get article by slug
  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlugWithDetails(req.params.slug);
      if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
      }
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Get articles by category
  app.get("/api/categories/:slug/articles", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const articles = await storage.getArticlesByCategorySlug(req.params.slug, page, limit);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles by category" });
    }
  });

  // Get all tags
  app.get("/api/tags", async (req, res) => {
    try {
      const tags = await storage.getAllTags();
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  });

  // Get popular tags
  app.get("/api/tags/popular", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const popularTags = await storage.getPopularTags(limit);
      res.status(200).json(popularTags);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch popular tags" });
    }
  });

  // Search articles
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        res.status(400).json({ message: "Search query is required" });
        return;
      }
      const results = await storage.searchArticles(query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search articles" });
    }
  });

  // Add newsletter subscriber
  app.post("/api/subscribers", async (req, res) => {
    try {
      const data = insertSubscriberSchema.parse({
        email: req.body.email,
        subscriptionDate: new Date(),
      });
      const subscriber = await storage.addSubscriber(data);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid subscriber data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add subscriber" });
      }
    }
  });

  // Create article (admin endpoint)
  app.post("/api/articles", async (req, res) => {
    try {
      const data = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(data);
      res.status(201).json(article);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid article data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create article" });
      }
    }
  });

  // Add tag to article (admin endpoint)
  app.post("/api/article-tags", async (req, res) => {
    try {
      const data = insertArticleTagSchema.parse(req.body);
      await storage.addTagToArticle(data);
      res.status(201).json({ message: "Tag added to article successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid article tag data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add tag to article" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
