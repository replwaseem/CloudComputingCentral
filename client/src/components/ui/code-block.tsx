import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-docker";
import "prismjs/themes/prism-tomorrow.css";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  className,
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const languageMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    jsx: "jsx",
    tsx: "tsx",
    bash: "bash",
    sh: "bash",
    py: "python",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    md: "markdown",
    dockerfile: "docker",
  };

  const mappedLanguage = languageMap[language] || language;

  return (
    <div className={cn("code-block rounded-md overflow-hidden my-6", className)}>
      <div className="language-selector text-xs font-mono py-2 px-4 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span className="capitalize">{mappedLanguage}</span>
      </div>
      <pre className="p-0 m-0 bg-transparent">
        <code className={`language-${mappedLanguage} overflow-x-auto block p-4 text-sm`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
