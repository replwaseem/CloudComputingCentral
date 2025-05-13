import { useQuery } from "@tanstack/react-query";
import FeaturedArticle from "@/components/featured-article";
import ArticleCard from "@/components/article-card";
import Sidebar from "@/components/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  const { data: featuredArticle, isLoading: isFeaturedLoading } = useQuery({
    queryKey: ['/api/articles/featured'],
    staleTime: 60 * 1000,
  });

  const { data: latestArticles, isLoading: isArticlesLoading } = useQuery({
    queryKey: ['/api/articles'],
    queryParams: { limit: 4, page: 1 },
    staleTime: 60 * 1000,
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Article Section */}
      {isFeaturedLoading ? (
        <section className="mb-12">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
            <div className="md:flex">
              <Skeleton className="h-48 w-full md:h-64 md:w-2/5" />
              <div className="p-6 md:w-3/5">
                <div className="flex gap-2 mb-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (featuredArticle && featuredArticle.length > 0) ? (
        <FeaturedArticle article={featuredArticle[0]} />
      ) : null}

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Articles Section */}
        <div className="lg:w-2/3">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
            <div className="flex">
              <Button variant="outline" className="bg-white text-gray-700 border-gray-300 mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                Most Recent
              </Button>
              <Button variant="outline" className="bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                Most Popular
              </Button>
            </div>
          </div>

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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestArticles && latestArticles.map((article: any) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/articles">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
