import { useQuery } from "@tanstack/react-query";
import FeaturedArticle from "@/components/featured-article";
import ArticleCard from "@/components/article-card";
import Sidebar from "@/components/sidebar";
import { FeaturedArticleSkeleton, ArticleCardSkeleton, SidebarSkeleton } from "@/components/ui/loading-cards";
import { BouncingDots } from "@/components/ui/loading-spinner";
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
        <FeaturedArticleSkeleton />
      ) : (featuredArticle && featuredArticle.length > 0) ? (
        <div className="animate-fade-in">
          <FeaturedArticle article={featuredArticle[0]} />
        </div>
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
                <ArticleCardSkeleton 
                  key={i} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${i * 100}ms` } as React.CSSProperties}
                />
              ))}
            </div>
          ) : latestArticles && latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latestArticles.map((article: any, index: number) => (
                <div 
                  key={article.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <BouncingDots className="mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No articles found.</p>
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
        <div className="animate-slide-up" style={{ animationDelay: '200ms' } as React.CSSProperties}>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
