import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <span className="text-[9px] font-bold text-primary-500 tracking-[3px] uppercase">
          Writing
        </span>
        <h1 className="text-2xl font-black mt-1">Blog</h1>
        <p className="text-sm text-dark-400 mt-1">Articles, tutorials, and insights</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-dark-400">
          <p>Belum ada artikel.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="p-5 rounded-xl border border-dark-100 hover:border-primary-200 hover:shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center gap-3 text-[10px] text-dark-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </span>
                </div>
                <h2 className="text-base font-bold mb-2 group-hover:text-primary-500 transition-colors flex items-center gap-2">
                  {post.title}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </h2>
                <p className="text-xs text-dark-400 leading-relaxed mb-3">
                  {post.excerpt}
                </p>
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
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}