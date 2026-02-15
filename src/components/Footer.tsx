import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-mono)] text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} Taeyang Yoo. Built with Next.js
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/0dot77"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-xs text-text-secondary hover:text-accent transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://instagram.com/0dot77"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-xs text-text-secondary hover:text-accent transition-colors"
          >
            Instagram
          </Link>
          <Link
            href="mailto:yty0706@gmail.com"
            className="font-[family-name:var(--font-mono)] text-xs text-text-secondary hover:text-accent transition-colors"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
