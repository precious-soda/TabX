import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "tailwindcss/tailwind.css";

export default function MarkdownService() {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!\n\nWrite something...");

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Markdown Service</h1>
      <div className="grid grid-cols-2 gap-4 flex-grow">
        {/* Editor */}
        <textarea
          className="w-full h-full p-2 border rounded-lg shadow-md"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write your markdown here..."
        />
        {/* Preview */}
        <div className="w-full h-full p-2 border rounded-lg shadow-md bg-white overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
