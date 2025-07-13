import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Sidebar({ className, style }: SidebarProps = {}) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: 60 * 1000,
  });

  const { data: popularTags } = useQuery({
    queryKey: ['/api/tags/popular'],
    queryParams: { limit: 10 },
    staleTime: 60 * 1000,
  });

  const { data: popularArticles } = useQuery({
    queryKey: ['/api/articles'],
    queryParams: { limit: 3 },
    staleTime: 60 * 1000,
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await apiRequest('POST', '/api/subscribers', { email, subscriptionDate: new Date() });
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className={`lg:w-1/3 space-y-8 ${className || ''}`} style={style}>
      {/* Categories Widget */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h3 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">Categories</h3>
        <div className="space-y-2">
          {categories && categories.map((category: any) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.slug}`}
              className="flex items-center justify-between text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <div className="flex items-center">
                <span 
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                ></span>
                <span>{category.name}</span>
              </div>
              <span className="px-2 py-1 text-xs bg-gray-100 rounded-full dark:bg-gray-700">
                {/* This would ideally be a count of articles per category */}
                {Math.floor(Math.random() * 30) + 10}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Posts Widget */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h3 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">Popular Posts</h3>
        <div className="space-y-4">
          {popularArticles && popularArticles.slice(0, 3).map((article: any, index: number) => (
            <div key={article.id} className="flex items-start space-x-3">
              <span className="text-2xl font-bold text-gray-300 dark:text-gray-600">{(index + 1).toString().padStart(2, '0')}</span>
              <div>
                <Link href={`/articles/${article.slug}`}>
                  <h4 className="font-medium text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400">
                    {article.title}
                  </h4>
                </Link>
                <div className="flex items-center mt-1">
                  {article.category && (
                    <>
                      <span className="text-xs font-medium" style={{ color: article.category.color || '#4f46e5' }}>{article.category.name}</span>
                      <span className="mx-1 text-gray-300 dark:text-gray-600">•</span>
                    </>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">{article.readTime || 5} min read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-primary-50 rounded-lg shadow-md p-6 dark:bg-gray-700">
        <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">Newsletter</h3>
        <p className="text-gray-600 mb-4 dark:text-gray-300">Get the latest articles and resources straight to your inbox.</p>
        <form onSubmit={handleSubscribe}>
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out dark:bg-primary-600 dark:hover:bg-primary-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>

      {/* Tags Widget */}
      <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <h3 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags && popularTags.map((tag: any) => (
            <Link 
              key={tag.id} 
              href={`/tags/${tag.slug}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
