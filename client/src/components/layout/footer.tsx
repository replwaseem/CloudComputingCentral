import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Cloud, Github, Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: 60 * 1000,
  });

  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <span className="text-primary-500 dark:text-primary-400">
                <Cloud className="h-8 w-8" />
              </span>
              <span className="ml-2 font-bold text-xl text-gray-900 dark:text-white">CloudCodeCraft</span>
            </div>
            <p className="mt-2 text-gray-600 max-w-xs dark:text-gray-400">
              Sharing knowledge about cloud computing with AWS, Python, and Node.js.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase dark:text-white">Explore</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">Home</Link>
                </li>
                <li>
                  <Link href="/articles" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">Articles</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase dark:text-white">Topics</h3>
              <ul className="mt-4 space-y-2">
                {categories?.slice(0, 4).map((category: any) => (
                  <li key={category.id}>
                    <Link 
                      href={`/categories/${category.slug}`} 
                      className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase dark:text-white">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="https://twitter.com" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">Twitter</a>
                </li>
                <li>
                  <a href="https://github.com" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">GitHub</a>
                </li>
                <li>
                  <a href="https://linkedin.com" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">LinkedIn</a>
                </li>
                <li>
                  <a href="/rss" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">RSS Feed</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-gray-500 text-sm dark:text-gray-400">© 2023 CloudCodeCraft. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://github.com" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://facebook.com" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
