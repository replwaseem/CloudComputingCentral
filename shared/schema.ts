import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories for the blog
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

// Authors for the blog posts
export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bio: text("bio"),
  avatar: text("avatar"),
});

export const insertAuthorSchema = createInsertSchema(authors).omit({
  id: true,
});

// Tags for the articles
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const insertTagSchema = createInsertSchema(tags).omit({
  id: true,
});

// Articles/blog posts
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  authorId: integer("author_id").notNull(),
  categoryId: integer("category_id").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  isFeatured: boolean("is_featured").default(false),
  readTime: integer("read_time").default(5),
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
});

// Junction table for articles and tags many-to-many relationship
export const articleTags = pgTable("article_tags", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id").notNull(),
  tagId: integer("tag_id").notNull(),
});

export const insertArticleTagSchema = createInsertSchema(articleTags).omit({
  id: true,
});

// Subscribers for the newsletter
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscriptionDate: timestamp("subscription_date").notNull(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
});

// Define relations between tables
export const categoriesRelations = relations(categories, ({ many }) => ({
  articles: many(articles),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
  articles: many(articles),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  articleTags: many(articleTags),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(authors, {
    fields: [articles.authorId],
    references: [authors.id],
  }),
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
  articleTags: many(articleTags),
}));

export const articleTagsRelations = relations(articleTags, ({ one }) => ({
  article: one(articles, {
    fields: [articleTags.articleId],
    references: [articles.id],
  }),
  tag: one(tags, {
    fields: [articleTags.tagId],
    references: [tags.id],
  }),
}));

// Types for schema
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Author = typeof authors.$inferSelect;
export type InsertAuthor = z.infer<typeof insertAuthorSchema>;

export type Tag = typeof tags.$inferSelect;
export type InsertTag = z.infer<typeof insertTagSchema>;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type ArticleTag = typeof articleTags.$inferSelect;
export type InsertArticleTag = z.infer<typeof insertArticleTagSchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
