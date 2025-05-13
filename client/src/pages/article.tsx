import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from "@/components/sidebar";
import { Share2, Bookmark } from "lucide-react";
import { formatDate, getCategoryColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect, useMemo } from "react";
import CodeBlock from "@/components/ui/code-block";
import ReactMarkdown from 'react-markdown';

export default function Article() {
  const [, params] = useRoute("/articles/:slug");
  const slug = params?.slug;

  const { data: article, isLoading, error } = useQuery({
    queryKey: [`/api/articles/${slug}`],
    enabled: !!slug,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - CloudCodeCraft`;
    }
  }, [article]);

  const processedContent = useMemo(() => {
    if (!article?.content) return "";
    
    // Process markdown content to extract code blocks
    return article.content;
  }, [article?.content]);

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {isLoading ? (
            <ArticleSkeleton />
          ) : article ? (
            <article className="bg-white rounded-lg shadow-md p-8 dark:bg-gray-800">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.category && (
                    <Link href={`/categories/${article.category.slug}`}>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getCategoryColor(article.category.name)}`}>
                        {article.category.name}
                      </span>
                    </Link>
                  )}
                  {article.tags && article.tags.map((tag: any) => (
                    <Link key={tag.id} href={`/tags/${tag.slug}`}>
                      <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                        {tag.name}
                      </span>
                    </Link>
                  ))}
                  <span className="text-xs text-gray-500 ml-auto dark:text-gray-400">{article.readTime || 0} min read</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">{article.title}</h1>
                <p className="text-gray-600 text-lg mb-6 dark:text-gray-300">{article.excerpt}</p>
                
                {article.featuredImage && (
                  <img 
                    src={article.featuredImage} 
                    alt={article.title} 
                    className="w-full h-auto rounded-lg mb-6" 
                  />
                )}
              </div>
              
              <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <CodeBlock 
                          code={String(children).replace(/\n$/, '')} 
                          language={match[1]} 
                          {...props} 
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {processedContent}
                </ReactMarkdown>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  {article.author && (
                    <div className="flex items-center mb-4 sm:mb-0">
                      <img 
                        className="w-10 h-10 rounded-full mr-4" 
                        src={article.author.avatar || 'https://via.placeholder.com/40'} 
                        alt={article.author.name} 
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{article.author.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(article.publishedAt)} • {article.readTime || 0} min read
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                      <Share2 className="h-5 w-5 mr-1" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                      <Bookmark className="h-5 w-5 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </div>
        
        <Sidebar />
      </div>
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 dark:bg-gray-800">
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-6" />
        <Skeleton className="h-64 w-full mb-6 rounded-lg" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-40 w-full rounded-md my-6" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <div>
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
