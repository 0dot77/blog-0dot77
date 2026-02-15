import Link from "next/link";
import Image from "next/image";
import { getLabPosts } from "@/lib/content";

export const metadata = {
  title: "Lab",
  description: "매일 하나씩, 이머시브한 실험",
};

export default function LabPage() {
  const posts = getLabPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-mono)] text-4xl font-bold text-text mb-2">
            &gt; lab
          </h1>
          <p className="font-[family-name:var(--font-mono)] text-sm text-text-secondary">
            매일 하나씩, 이머시브한 실험
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/lab" className="tag-pill border-accent text-accent">
            All
          </Link>
          {allTags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
              {tag}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <Link key={post.slug} href={`/lab/${post.slug}`} className="group">
              <div className="aspect-square relative overflow-hidden bg-surface">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <p className="font-[family-name:var(--font-mono)] text-xs text-text-secondary text-center">
                      {post.title}
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-text font-medium">
                      {post.title}
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary mt-1">
                      {post.date}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-[family-name:var(--font-mono)] text-[9px] text-accent"
                        >
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
