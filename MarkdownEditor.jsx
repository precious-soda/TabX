import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("# Welcome to Markdown Editor\n\nType some *Markdown* here!");

  return (
    <div className="flex h-screen">
      {/* Editor */}
      <textarea
        className="w-1/2 p-4 border-r border-gray-300"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />

      {/* Preview */}
      <div className="w-1/2 p-4 bg-gray-100 overflow-auto">
        <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
