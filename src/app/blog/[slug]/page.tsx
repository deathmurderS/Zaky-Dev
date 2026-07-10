import { getPostBySlug, getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-dark-400 hover:text-dark-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Blog
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 text-[10px] text-dark-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime} min read
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded border border-dark-100 text-dark-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-sm max-w-none">
        <ContentRenderer content={post.content} />
      </div>
    </article>
  );
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeLanguage = "";
  let inList = false;
  let listItems: React.ReactNode[] = [];
  let inOrderedList = false;

  const flushList = () => {
    if (listItems.length > 0) {
      if (inOrderedList) {
        elements.push(<ol key={elements.length} className="list-decimal pl-5 mb-4 text-sm text-dark-600 space-y-1">{listItems}</ol>);
      } else {
        elements.push(<ul key={elements.length} className="list-disc pl-5 mb-4 text-sm text-dark-600 space-y-1">{listItems}</ul>);
      }
      listItems = [];
      inList = false;
      inOrderedList = false;
    }
  };

  for (const line of lines) {
    // Code block
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={elements.length} className="bg-dark-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto mb-4 leading-relaxed">
            <code>{codeBlockContent.join("\n")}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      flushList();
      continue;
    }

    // Table
    if (line.startsWith("|") && line.endsWith("|")) {
      flushList();
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      if (line.includes("---")) continue; // Skip header separator
      elements.push(
        <div key={elements.length} className="flex gap-4 mb-1 text-xs">
          {cells.map((cell, i) => (
            <span key={i} className="text-dark-600">
              {cell.replace(/[*]/g, "")}
            </span>
          ))}
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-lg font-bold mt-6 mb-3">
          {line.slice(3)}
        </h2>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-sm font-bold mt-5 mb-2">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s(.+)/);
    if (olMatch) {
      if (!inList) {
        flushList();
        inList = true;
        inOrderedList = true;
      }
      const text = olMatch[1].replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      listItems.push(<li key={listItems.length} dangerouslySetInnerHTML={{ __html: text }} />);
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^[-*]\s(.+)/);
    if (ulMatch) {
      if (!inList) {
        flushList();
        inList = true;
        inOrderedList = false;
      }
      const text = ulMatch[1].replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      listItems.push(<li key={listItems.length} dangerouslySetInnerHTML={{ __html: text }} />);
      continue;
    }

    flushList();

    // Regular paragraph with bold support
    const processedLine = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.*?)`/g, "<code class='bg-dark-100 px-1 py-0.5 rounded text-[11px] font-mono'>$1</code>");

    elements.push(
      <p
        key={elements.length}
        className="text-sm text-dark-600 leading-relaxed mb-3"
        dangerouslySetInnerHTML={{ __html: processedLine }}
      />
    );
  }

  flushList();

  return <>{elements}</>;
}