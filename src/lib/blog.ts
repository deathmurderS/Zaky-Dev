import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readTime: number;
  content: string;
  excerpt: string;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const frontmatter: Record<string, any> = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const sepIndex = line.indexOf(":");
    if (sepIndex === -1) continue;
    const key = line.slice(0, sepIndex).trim();
    let value: any = line.slice(sepIndex + 1).trim();

    // Parse arrays
    if (value.startsWith("[") && value.endsWith("]")) {
      value = JSON.parse(value.replace(/'/g, '"'));
    }
    // Parse numbers
    else if (!isNaN(Number(value))) {
      value = Number(value);
    }
    // Remove quotes
    else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return {
    frontmatter,
    content: match[2].trim(),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const parsed = parseFrontmatter(raw);
    if (!parsed) continue;

    // First paragraph before <!--more--> or first ## heading as excerpt
    const firstParagraph = parsed.content.split("\n\n").find(
      (p) => p.trim().length > 10 && !p.startsWith("##") && !p.startsWith("```")
    );
    const excerpt = firstParagraph
      ? firstParagraph.replace(/[#*`\[\]]/g, "").slice(0, 150) + "..."
      : "";

    posts.push({
      slug: parsed.frontmatter.slug,
      title: parsed.frontmatter.title,
      date: parsed.frontmatter.date,
      tags: parsed.frontmatter.tags || [],
      readTime: parsed.frontmatter.readTime || 5,
      content: parsed.content,
      excerpt,
    });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}