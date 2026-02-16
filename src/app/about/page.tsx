import { getAboutContent } from "@/lib/content";

export const metadata = {
  title: "About",
  description: "Taeyang Yoo — Media Artist & Developer & Explorer",
};

export default async function AboutPage() {
  const { contentHtml } = await getAboutContent();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero */}
        <div className="py-16 border-b border-border mb-12">
          <h1 className="font-mono text-5xl font-bold text-text mb-3">
            &gt; Taeyang Yoo
          </h1>
          <p className="font-mono text-lg text-accent">
            Media Artist &middot; Developer &middot; Technical Director
          </p>
        </div>

        {/* Markdown Content */}
        <section className="max-w-3xl">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </section>
      </div>
    </div>
  );
}
