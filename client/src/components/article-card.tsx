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
    <article className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group">
      <Link href={`/articles/${article.slug}`}>
        <div className="relative overflow-hidden">
          <img 
            src={article.featuredImage || 'https://via.placeholder.com/800x400?text=No+Image'} 
            alt={article.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center mb-2">
          {article.category && (
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded transition-all duration-200 hover:scale-110 ${getCategoryColor(article.category.name)}`}>
              {article.category.name}
            </span>
          )}
          <span className="text-xs text-gray-500 ml-2 dark:text-gray-400">{article.readTime || 5} min read</span>
        </div>
        <Link href={`/articles/${article.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
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
