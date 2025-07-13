import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import ArticleCard from "@/components/article-card";
import Sidebar from "@/components/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Category() {
  const [, params] = useRoute("/categories/:slug");
  const slug = params?.slug;
  const [page, setPage] = useState(1);
  const limit = 6; // Articles per page

  const { data: category, isLoading: isCategoryLoading } = useQuery({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug,
    staleTime: 60 * 1000,
  });

  const { data: articles, isLoading: isArticlesLoading } = useQuery({
    queryKey: [`/api/categories/${slug}/articles`, page, limit],
    queryParams: { page, limit },
    enabled: !!slug,
    staleTime: 60 * 1000,
  });

  const isLoading = isCategoryLoading || isArticlesLoading;
  const totalPages = Math.ceil((articles?.length || 0) / limit) || 1;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  if (!slug) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category?.name || 'Category'} - StackLoom</title>
        <meta 
          name="description" 
          content={`Browse articles about ${category?.name || 'cloud computing'} on StackLoom. Tutorials, guides, and best practices.`} 
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {isCategoryLoading ? (
              <div className="mb-8">
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-5 w-full max-w-2xl" />
              </div>
            ) : category ? (
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                  <span 
                    className="inline-block w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  ></span>
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                )}
              </div>
            ) : (
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Category</h1>
              </div>
            )}

            {/* Articles Grid */}
            {isArticlesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-5">
                      <div className="flex gap-2 mb-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <Skeleton className="h-7 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article: any) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-400">No articles found in this category.</p>
                <Link href="/articles">
                  <Button className="mt-4">Browse All Articles</Button>
                </Link>
              </div>
            )}

            {/* Pagination */}
            {articles && articles.length > 0 && (
              <div className="flex items-center justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevPage} 
                    disabled={page === 1}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={i}
                        variant={pageNum === page ? 'default' : 'outline'}
                        onClick={() => {
                          setPage(pageNum);
                          window.scrollTo(0, 0);
                        }}
                        className={pageNum === page 
                          ? 'px-3 py-2 rounded-md text-sm font-medium text-white bg-primary-500 border border-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400' 
                          : 'px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
                  )}
                  
                  {totalPages > 5 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPage(totalPages);
                        window.scrollTo(0, 0);
                      }}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      {totalPages}
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    onClick={handleNextPage} 
                    disabled={page === totalPages}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </nav>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}
