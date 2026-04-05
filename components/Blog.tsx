import { Card, SectionGrid } from "@/components/ui/Card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

// Sample blog posts - in production, fetch from CMS or database
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Real-Time Computer Vision Systems",
    excerpt:
      "Lessons learned integrating YOLO object detection into production robotic systems with sub-50ms latency.",
    date: "2025-03-15",
    readTime: "8 min",
    category: "Machine Learning",
    slug: "building-real-time-cv",
  },
  {
    id: "2",
    title: "Full-Stack Development with Next.js 16",
    excerpt:
      "Modern best practices for building scalable applications with React Server Components and TypeScript.",
    date: "2025-03-08",
    readTime: "10 min",
    category: "Full-Stack",
    slug: "nextjs-16-best-practices",
  },
];

export default function Blog() {
  return (
    <SectionGrid cols={2}>
      {blogPosts.map((post) => (
        <Card key={post.id}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-800/40 px-2 py-1 rounded">
                {post.category}
              </span>
              <span className="text-xs text-zinc-500">{post.readTime}</span>
            </div>

            <h3 className="text-lg font-semibold text-white line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-zinc-300 line-clamp-2">{post.excerpt}</p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-500">
                {(() => {
                  const [year, month, day] = post.date.split("-");
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
                })()}
              </span>
              <a
                href={`/blog/${post.slug}`}
                className="text-xs text-purple-400 hover:text-purple-300 transition"
              >
                Read more →
              </a>
            </div>
          </div>
        </Card>
      ))}
    </SectionGrid>
  );
}
