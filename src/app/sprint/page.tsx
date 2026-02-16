import Link from "next/link";
import Image from "next/image";
import { getSprintPosts } from "@/lib/content";

export const metadata = {
  title: "Sprint",
  description: "3일에 하나씩, 분야를 넓히는 토이 프로젝트",
};

export default function SprintPage() {
  const posts = getSprintPosts();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-(family-name:--font-mono) text-4xl font-bold text-text mb-2">
            &gt; sprint
          </h1>
          <p className="font-(family-name:--font-mono) text-sm text-text-secondary">
            3일에 하나씩, 분야를 넓히는 토이 프로젝트
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/sprint/${post.slug}`} className="group">
              <div className="bg-surface border border-border overflow-hidden transition-all group-hover:border-accent/50 flex flex-col md:flex-row">
                {post.coverImage && (
                  <div className="relative w-full md:w-80 aspect-[4/3] md:aspect-auto shrink-0 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col justify-center">
                  <h2 className="text-xl font-semibold text-text mb-2">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="font-(family-name:--font-mono) text-xs text-text-secondary">
                      {post.date}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
