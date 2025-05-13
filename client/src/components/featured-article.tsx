import { Link } from "wouter";
import { formatDate, getCategoryColor } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Author {
  id: number;
  name: string;
  avatar: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface FeaturedArticleProps {
  article: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    publishedAt: string;
    readTime: number;
    author: Author;
    category: Category;
    tags: Tag[];
  };
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 dark:text-white">Featured Article</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-2/5">
            <Link href={`/articles/${article.slug}`}>
              <img 
                src={article.featuredImage || 'https://via.placeholder.com/800x400?text=No+Image'} 
                alt={article.title} 
                className="h-48 w-full object-cover md:h-full md:w-full hover:opacity-90 transition-opacity" 
              />
            </Link>
          </div>
          <div className="p-6 md:w-3/5">
            <div className="flex items-center mb-2 flex-wrap gap-2">
              {article.category && (
                <Link href={`/categories/${article.category.slug}`}>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getCategoryColor(article.category.name)}`}>
                    {article.category.name}
                  </span>
                </Link>
              )}
              {article.tags && article.tags.slice(0, 2).map(tag => (
                <span key={tag.id} className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  {tag.name}
                </span>
              ))}
              <span className="text-xs text-gray-500 ml-auto dark:text-gray-400">{article.readTime || 0} min read</span>
            </div>
            <Link href={`/articles/${article.slug}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {article.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4 dark:text-gray-300">{article.excerpt}</p>
            {article.author && (
              <div className="flex items-center">
                <img 
                  className="w-10 h-10 rounded-full mr-4" 
                  src={article.author.avatar || 'https://via.placeholder.com/40'} 
                  alt={article.author.name} 
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{article.author.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(article.publishedAt)}</div>
                </div>
              </div>
            )}
            <div className="mt-4">
              <Link 
                href={`/articles/${article.slug}`} 
                className="inline-flex items-center font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Read full article
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
