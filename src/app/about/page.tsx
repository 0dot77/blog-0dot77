import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Taeyang Yoo — Media Artist & Developer & Explorer",
};

const projects = [
  {
    year: "2026",
    items: [
      {
        title: "Imagine Your Heart",
        role: "Mentor, Technical Director",
        period: "2025.09 - 2026.01",
        description: "LG 융합예술영재 멘토, Unity를 활용한 인터랙티브 영화 개발",
        tech: ["Unity", "MetaSDK", "Blender", "AI"],
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "Harmonic Nostalgia",
        role: "Technical Director",
        period: "2025",
        description: "박단비 작가 협업 미디어 아트 프로젝트, 기술 및 시스템 총괄",
        tech: ["Unity", "MetaSDK", "VFXGraph"],
      },
      {
        title: "문문문 : MOONNOOWMOON",
        role: "Technical Director",
        period: "2025.02 - 2025.10",
        description: "국립현대무용단 공연, 인터랙티브 무대 기술 및 시스템 구축",
        tech: ["Unity", "Multiplay", "MetaSDK", "VFXGraph"],
      },
      {
        title: "TRPG : TRPG",
        role: "Technical Director",
        period: "2025",
        description: "크리에이티브 성수 & 한예종 아트콜라이더랩 협력 프로젝트 기술 감독",
        tech: ["Unity", "Touchdesigner", "Stream Diffusion AI"],
      },
      {
        title: "P.W.P (Pigeon Want Peace)",
        role: "Technical Director",
        period: "2025",
        description: "크리에이티브 성수 전시, 인터랙티브 게임 고도화 작업 진행",
        tech: ["Unity", "C#", "OSC", "Arduino"],
      },
      {
        title: "The Cafe",
        role: "Technical Director",
        period: "2025",
        description: "이도현 작가 협업, VR 인터랙션 개발, LiDAR Scanning",
        tech: ["Unity", "LiDAR Scanning", "MetaSDK"],
      },
      {
        title: "XR 뮤지컬, 문을 넘어",
        role: "XR Developer",
        period: "2025",
        description: "한국예술종합학교 XR 뮤지컬, 20대의 HMD로 동시 관람하는 뮤지컬 제작",
        tech: ["Unity", "Meta SDK", "Spatial Anchor", "Optimization"],
      },
      {
        title: "The Secret Messages From Kitty Phone",
        role: "Technical Director",
        period: "2025",
        description: "VRChat 산리오(Sanrio) 인터랙티브 월드 제작",
        tech: ["Unity", "VRChat", "VRC SDK"],
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "A Person Inside The Box",
        role: "XR Developer",
        period: "2024",
        description: "아트코리아랩 프로젝트, VR/MR 환경의 몰입형 경험 구현",
        tech: ["Unity", "Meta SDK"],
      },
      {
        title: "TRPG:TRPG",
        role: "Interactive Developer",
        period: "2024",
        description: "한국예술종합학교 아트콜라이더랩, 관객 참여형 로직 및 비주얼 개발",
        tech: ["Unity", "Touchdesigner", "StreamDiffusion AI"],
      },
      {
        title: "Bloom Bloom Bash!",
        role: "Interactive Developer",
        period: "2024",
        description: "실시간 관객 상호작용 디지털 미디어 콘텐츠 개발",
        tech: ["Touchdesigner", "GLSL", "Kinect"],
      },
      {
        title: "국립현대무용단 무용기술랩",
        role: "XR Developer",
        period: "2024",
        description: "무용과 기술을 결합한 XR 실험 프로젝트 연구 및 프로토타이핑",
        tech: ["Unity", "Meta SDK", "Azure Kinect"],
      },
      {
        title: "Mixmate : Hati",
        role: "Unity XR Developer",
        period: "2024",
        description: "캐릭터 라이센싱 페어를 위한 MR 캐릭터 상호작용 컨텐츠 개발",
        tech: ["Unity", "Meta SDK", "Gesture Recognition"],
      },
      {
        title: "Mixmate",
        role: "Unity & Network Developer",
        period: "2024",
        description: "한국콘텐츠진흥원 뉴콘텐츠아카데미, 멀티 유저 네트워크 아키텍처 구축",
        tech: ["Unity", "Photon Fusion", "Server-Client Architecture"],
      },
    ],
  },
  {
    year: "2023",
    items: [
      {
        title: "PWP : Pigeon Want Peace",
        role: "Director & Unity Developer",
        period: "2023",
        description: "한국예술종합학교 아트콜라이더랩, 프로젝트 연출 및 메인 콘텐츠 개발",
        tech: ["Unity", "Arduino"],
      },
      {
        title: "재래악 = 종묘",
        role: "Video Designer",
        period: "2023",
        description: "수림문화재단 공연, 미디어 파사드 영상 디자인 및 제작",
        tech: ["Touchdesigner"],
      },
      {
        title: "발목 (Ankle)",
        role: "Interactive Developer",
        period: "2023",
        description: "콘텐츠문화광장 스테이지66, 무대 반응형 인터랙티브 시스템 개발",
        tech: ["Touchdesigner", "Midi-OSC"],
      },
      {
        title: "Futurelab Meta",
        role: "Interactive Web Developer",
        period: "2023",
        description: "스마일게이트 퓨쳐랩, 웹 기반 인터랙티브 메타버스 플랫폼 개발",
        tech: ["React", "Three.js", "WebGL", "WebSocket"],
      },
    ],
  },
  {
    year: "2022",
    items: [
      {
        title: "마을, 소원, 신당",
        role: "Interactive Developer",
        period: "2022",
        description: "한국예술종합학교 X 주오사카 한국 문화원 전시",
        tech: ["Unity"],
      },
      {
        title: "Persona L",
        role: "Web Developer",
        period: "2022",
        description: "Ars Electronica 출품작, 웹 페이지 제작",
        tech: ["HTML/CSS", "JavaScript"],
      },
      {
        title: "야단법석 Hustle",
        role: "Unity & Web Developer",
        period: "2022",
        description: "Ars Electronica 전시, Unity WebGL과 웹 기술 연동 하이브리드 콘텐츠",
        tech: ["Unity", "WebGL"],
      },
      {
        title: "실수 Mistake",
        role: "Interactive Developer",
        period: "2022",
        description: "전주세계소리문화축제, 소리 반응형 비주얼라이제이션 구현",
        tech: ["TouchDesigner", "Audio Reactive"],
      },
      {
        title: "바리행천가",
        role: "Interactive Developer",
        period: "2022",
        description: "한국예술종합학교 K-Arts On-Road, 공연용 인터랙티브 미디어 개발",
        tech: ["Unity", "Projection Mapping"],
      },
      {
        title: "외계물질 관찰일지 프로젝트",
        role: "Interactive Web Developer",
        period: "2022",
        description: "한국문화예술위원회 지원작, 웹 인터랙티브 스토리텔링 구현",
        tech: ["Three.js", "React"],
      },
      {
        title: "공명 : 중용",
        role: "Interactive Developer",
        period: "2022",
        description: "한국문화예술위원회, 실시간 데이터 처리 및 시각화 알고리즘 구현",
        tech: ["Touchdesigner", "Deep Learning", "EEG System"],
      },
      {
        title: "AC Lab Research Program",
        role: "Web Artist",
        period: "2022",
        description: "한국예술종합학교 아트콜라이더랩, 웹 인터페이스 실험 및 제작",
        tech: ["React", "Three.js"],
      },
    ],
  },
];

const skills = {
  "Interactive / XR": ["Unity", "Unreal Engine", "VisionOS", "MetaSDK", "TouchDesigner"],
  "3D / VFX": ["Blender", "Shader", "HLSL/GLSL", "VFX Graph", "Niagara"],
  Development: ["JavaScript", "TypeScript", "React", "Next.js", "Three.js", "C#", "Python", "Swift"],
  Tools: ["Git", "Figma", "Premiere Pro", "After Effects", "ComfyUI", "n8n"],
};

const lectures = [
  { title: "Stage Design (BFA)", org: "Korea National University of Arts", period: "2025 -" },
  { title: "Performing Arts Industries & Media (MFA)", org: "Korea National University of Arts", period: "2024 -" },
  { title: "Stage Design (MFA)", org: "Korea National University of Arts", period: "2024 -" },
];

const education = [
  { title: "한국예술종합학교 영상원", major: "Multimedia", period: "2023 -" },
  { title: "한국예술종합학교 전통예술원", major: "Korean Traditional Arts Theory", period: "2017 - 2022" },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Hero */}
        <div className="py-16 border-b border-border mb-12">
          <h1 className="font-[family-name:var(--font-mono)] text-5xl font-bold text-text mb-3">
            &gt; Taeyang Yoo
          </h1>
          <p className="font-[family-name:var(--font-mono)] text-lg text-accent">
            Media Artist &middot; Developer &middot; Technical Director
          </p>
        </div>

        {/* Bio */}
        <section className="max-w-[720px] mb-16">
          <h2 className="font-[family-name:var(--font-mono)] text-sm text-accent mb-6">
            // bio
          </h2>
          <p className="text-base leading-relaxed text-text mb-5">
            Hello, I am Taeyang Yoo (0dot77), a developer and media artist. I am
            passionate about exploring and experimenting at the intersection of art
            and technology.
          </p>
          <p className="text-base leading-relaxed text-text">
            This blog serves as an archive for my personal sketches, experiments,
            and trial and error. I hope the records left in this space can be of
            some help to you.
          </p>
        </section>

        {/* Project Timeline */}
        <section className="max-w-[720px] mb-16">
          <h2 className="font-[family-name:var(--font-mono)] text-sm text-accent mb-6">
            // project_timeline
          </h2>
          {projects.map((yearGroup) => (
            <div
              key={yearGroup.year}
              className="flex gap-6 py-6 border-b border-border"
            >
              <div className="shrink-0 w-14">
                <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-accent">
                  {yearGroup.year}
                </span>
              </div>
              <div className="flex flex-col gap-5 flex-1">
                {yearGroup.items.map((item, i) => (
                  <div key={i} className={i > 0 ? "pt-5 border-t border-border" : ""}>
                    <h3 className="text-base font-semibold text-text">
                      <span className="text-accent mr-2">-</span>{item.title}
                    </h3>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-text-secondary mt-1">
                      {item.role} &middot; {item.period}
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tech.map((t) => (
                        <span key={t} className="tag-pill text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="max-w-[720px] mb-16">
          <h2 className="font-[family-name:var(--font-mono)] text-sm text-accent mb-6">
            // skills
          </h2>
          <div className="flex flex-col gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-[family-name:var(--font-mono)] text-sm font-semibold text-text mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lectures */}
        <section className="max-w-[720px] mb-16">
          <h2 className="font-[family-name:var(--font-mono)] text-sm text-accent mb-6">
            // lectures
          </h2>
          <div className="flex flex-col gap-4">
            {lectures.map((lec, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-text">{lec.title}</h3>
                <p className="font-[family-name:var(--font-mono)] text-xs text-text-secondary mt-1">
                  {lec.org} / {lec.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="max-w-[720px] mb-16">
          <h2 className="font-[family-name:var(--font-mono)] text-sm text-accent mb-6">
            // education
          </h2>
          <div className="flex flex-col gap-4">
            {education.map((edu, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-text">{edu.title}</h3>
                <p className="font-[family-name:var(--font-mono)] text-xs text-text-secondary mt-1">
                  {edu.major} / {edu.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-[720px]">
          <h2 className="font-[family-name:var(--font-mono)] text-sm text-accent mb-6">
            // contact
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-mono)] text-sm text-accent">
                $
              </span>
              <Link
                href="mailto:yty0706@gmail.com"
                className="font-[family-name:var(--font-mono)] text-base text-text hover:text-accent transition-colors"
              >
                yty0706@gmail.com
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-mono)] text-sm text-accent">
                $
              </span>
              <Link
                href="https://github.com/0dot77"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-mono)] text-base text-text hover:text-accent transition-colors"
              >
                github.com/0dot77
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-mono)] text-sm text-accent">
                $
              </span>
              <Link
                href="https://instagram.com/0dot77"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-mono)] text-base text-text hover:text-accent transition-colors"
              >
                instagram.com/0dot77
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
