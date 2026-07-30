export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt?: string
  content?: string
}

export type BlogPostWithContent = BlogPost & {
  content: string
}