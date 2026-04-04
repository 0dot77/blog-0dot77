import Link from "next/link";

const works = [
  {
    year: "2026",
    projects: [
      { title: "Imagine Your Heart", role: "Mentor, Technical Director", tech: "Unity, MetaSDK, Blender, AI" },
    ],
  },
  {
    year: "2025",
    projects: [
      { title: "Harmonic Nostalgia", role: "Technical Director", tech: "Unity, MetaSDK, VFXGraph" },
      { title: "문문문 : MOONNOOWMOON", role: "Technical Director", tech: "Unity, Multiplay, MetaSDK" },
      { title: "TRPG : TRPG", role: "Technical Director", tech: "Unity, Touchdesigner, Stream Diffusion AI" },
      { title: "P.W.P (Pigeon Want Peace)", role: "Technical Director", tech: "Unity, C#, OSC, Arduino" },
      { title: "The Cafe", role: "Technical Director", tech: "Unity, LiDAR Scanning, MetaSDK" },
      { title: "XR 뮤지컬, 문을 넘어", role: "XR Developer", tech: "Unity, Meta SDK, Spatial Anchor" },
      { title: "The Secret Messages From Kitty Phone", role: "Technical Director", tech: "Unity, VRChat, VRC SDK" },
    ],
  },
  {
    year: "2024",
    projects: [
      { title: "A Person Inside The Box", role: "XR Developer", tech: "Unity, Meta SDK" },
      { title: "TRPG:TRPG", role: "Interactive Developer", tech: "Unity, Touchdesigner, StreamDiffusion AI" },
      { title: "Bloom Bloom Bash!", role: "Interactive Developer", tech: "Touchdesigner, GLSL, Azure Kinect" },
      { title: "국립현대무용단 무용기술랩", role: "XR Developer", tech: "Unity, Meta SDK, Azure Kinect" },
      { title: "Mixmate : Hati", role: "Unity XR Developer", tech: "Unity, Meta SDK, Gesture Recognition" },
      { title: "Mixmate", role: "Unity & Network Developer", tech: "Unity, Photon Fusion" },
    ],
  },
  {
    year: "2023",
    projects: [
      { title: "PWP : Pigeon Want Peace", role: "Director & Unity Developer", tech: "Unity, Arduino" },
      { title: "재래악 = 종묘", role: "Video Designer", tech: "Touchdesigner" },
      { title: "발목 (Ankle)", role: "Interactive Developer", tech: "Touchdesigner, Midi-OSC" },
      { title: "Futurelab Meta", role: "Interactive Web Developer", tech: "React, Three.js, WebGL, WebSocket" },
    ],
  },
  {
    year: "2022",
    projects: [
      { title: "야단법석 Hustle", role: "Unity & Web Developer", tech: "Unity, WebGL", note: "Ars Electronica" },
      { title: "Persona L", role: "Web Developer", tech: "HTML/CSS, JavaScript", note: "Ars Electronica" },
      { title: "Inside the Lumi Cube", role: "Web Developer", tech: "HTML/CSS, JavaScript", note: "Ars Electronica" },
      { title: "실수 Mistake", role: "Interactive Developer", tech: "TouchDesigner, Audio Reactive" },
      { title: "공명 : 중용", role: "Interactive Developer", tech: "Touchdesigner, Deep Learning, EEG" },
    ],
  },
];

const lectures = [
  { title: "Digital Media Visual 1-2 (BFA)", org: "Korea National University of Arts", period: "2026 —" },
  { title: "Stage Design (BFA)", org: "Korea National University of Arts", period: "2025 —" },
  { title: "Performing Arts Industries & Media (MFA)", org: "Korea National University of Arts", period: "2024 —" },
  { title: "Stage Design (MFA)", org: "Korea National University of Arts", period: "2024 —" },
];

const workshops = [
  { title: "미디어스케이핑 멘토", org: "업스케일링 성남", period: "2026.02 — 2026.05" },
  { title: "크리에이티브 코딩 멘토", org: "업스케일링 성남", period: "2025.02 — 2025.05" },
];

const skills = [
  { category: "Unity", detail: "C# / VR, AR, MR / Shader Graph / VFX Graph" },
  { category: "Unreal", detail: "Blueprint / Niagara" },
  { category: "Touchdesigner", detail: "Python / Multimedia System / Audio Visual" },
  { category: "Blender", detail: "Geometry Node / Shader" },
  { category: "Swift", detail: "SwiftUI / VisionOS / iOS" },
  { category: "Web", detail: "Three.js / React / Next.js" },
  { category: "AI", detail: "ComfyUI / n8n" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-(family-name:--font-mono) text-sm text-teal mb-8 tracking-wider">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
      {/* Hero */}
      <header className="mb-20">
        <div className="flex items-baseline justify-between">
          <h1 className="font-(family-name:--font-mono) text-3xl md:text-4xl font-bold text-text mb-3 select-none">
            Taeyang Yoo
          </h1>
          <Link
            href="/blog"
            className="font-(family-name:--font-mono) text-sm text-text-secondary hover:text-teal transition-colors"
          >
            blog &rarr;
          </Link>
        </div>
        <p className="font-(family-name:--font-mono) text-sm text-green mb-6 leading-relaxed">
          I make tools for artists. I make art with tools.
        </p>
      </header>

      {/* Works */}
      <section className="mb-20">
        <SectionTitle>// works</SectionTitle>
        <div className="space-y-10">
          {works.map((group) => (
            <div key={group.year}>
              <h3 className="font-(family-name:--font-mono) text-xs text-purple mb-4">
                {group.year}
              </h3>
              <div className="space-y-3">
                {group.projects.map((project, i) => (
                  <div key={i} className="group">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-sm font-medium text-text">
                        {project.title}
                      </span>
                      {project.note && (
                        <span className="font-(family-name:--font-mono) text-[10px] text-green">
                          {project.note}
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-xs text-text-secondary">
                        {project.role}
                      </span>
                      <span className="font-(family-name:--font-mono) text-[10px] text-border">
                        {project.tech}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lectures */}
      <section className="mb-20">
        <SectionTitle>// lectures</SectionTitle>
        <div className="space-y-4">
          {lectures.map((lecture, i) => (
            <div key={i}>
              <p className="text-sm font-medium text-text">{lecture.title}</p>
              <p className="text-xs text-text-secondary mt-0.5">
                {lecture.org} &middot; {lecture.period}
              </p>
            </div>
          ))}
        </div>
        <h3 className="font-(family-name:--font-mono) text-xs text-purple mt-10 mb-4">
          Workshops
        </h3>
        <div className="space-y-4">
          {workshops.map((ws, i) => (
            <div key={i}>
              <p className="text-sm font-medium text-text">{ws.title}</p>
              <p className="text-xs text-text-secondary mt-0.5">
                {ws.org} &middot; {ws.period}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-20">
        <SectionTitle>// education</SectionTitle>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-text">Korea National University of Arts</p>
            <p className="text-xs text-text-secondary mt-0.5">Multimedia / 2023 —</p>
          </div>
          <div>
            <p className="text-sm font-medium text-text">Korea National University of Arts</p>
            <p className="text-xs text-text-secondary mt-0.5">Korean Traditional Arts Theory / 2017 — 2022</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-20">
        <SectionTitle>// skills</SectionTitle>
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.category} className="flex items-baseline gap-3">
              <span className="font-(family-name:--font-mono) text-sm text-green min-w-28">
                {skill.category}
              </span>
              <span className="text-xs text-text-secondary">
                {skill.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer className="border-t border-border pt-10">
        <SectionTitle>// contact</SectionTitle>
        <div className="flex flex-wrap gap-6">
          <Link
            href="mailto:yty0706@gmail.com"
            className="font-(family-name:--font-mono) text-sm text-text-secondary hover:text-teal transition-colors"
          >
            yty0706@gmail.com
          </Link>
          <Link
            href="https://github.com/0dot77"
            target="_blank"
            rel="noopener noreferrer"
            className="font-(family-name:--font-mono) text-sm text-text-secondary hover:text-teal transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://instagram.com/0dot77"
            target="_blank"
            rel="noopener noreferrer"
            className="font-(family-name:--font-mono) text-sm text-text-secondary hover:text-teal transition-colors"
          >
            Instagram
          </Link>
        </div>
        <p className="font-(family-name:--font-mono) text-[10px] text-border mt-10">
          &copy; {new Date().getFullYear()} Taeyang Yoo
        </p>
      </footer>
    </div>
  );
}
