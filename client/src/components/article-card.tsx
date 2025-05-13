import { Link } from "wouter";
import { formatDate, getCategoryColor } from "@/lib/utils";

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

interface ArticleCardProps {
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
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
      <Link href={`/articles/${article.slug}`}>
        <img 
          src={article.featuredImage} 
          alt={article.title} 
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center mb-2">
          {article.category && (
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getCategoryColor(article.category.name)}`}>
              {article.category.name}
            </span>
          )}
          <span className="text-xs text-gray-500 ml-2 dark:text-gray-400">{article.readTime || 5} min read</span>
        </div>
        <Link href={`/articles/${article.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 dark:text-gray-300">{article.excerpt}</p>
        {article.author && (
          <div className="flex items-center">
            <img 
              className="w-8 h-8 rounded-full mr-2" 
              src={article.author.avatar || 'https://via.placeholder.com/40'} 
              alt={article.author.name} 
            />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{article.author.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(article.publishedAt)}</div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
