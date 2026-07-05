import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  link: string;
}

const PROJECTS: Project[] = [
  {
    title: 'AI 自动化部署站',
    desc: '一句话让 AI 完成 VPS 部署 + Cloudflare 解析 + 上线全流程，这套网站本身就是这样搭起来的。',
    tags: ['Astro', 'Claude Code', 'Cloudflare'],
    link: '#',
  },
  {
    title: '个人知识库',
    desc: '基于 Obsidian 的第二大脑，沉淀写作、运维、AI 实践，用 AI 助手持续整理与创作。',
    tags: ['Obsidian', 'AI 写作', '知识管理'],
    link: '#',
  },
  {
    title: '播客索引工具',
    desc: '自动抓取、整理、检索播客内容的小工具，从数据采集到前端展示一条龙。',
    tags: ['Python', '数据抓取', '全栈'],
    link: '#',
  },
];

// 单张 3D 倾斜卡片：鼠标移动时根据位置做透视倾斜
function TiltCard({ p, index }: { p: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 backdrop-blur transition-colors hover:border-neon-purple/40"
      >
        {/* 鼠标位置的径向高光 */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(168,85,247,0.12), transparent 40%)',
          }}
        />
        <div className="relative" style={{ transform: 'translateZ(40px)' }}>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 font-mono text-neon-cyan">
            0{index + 1}
          </div>
          <h3 className="text-xl font-semibold text-white">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-zinc-500">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28">
      <div className="mb-14">
        <p className="font-mono text-sm text-neon-cyan">// 02. 作品</p>
        <h2 className="mt-3 text-4xl font-bold text-white">最近在折腾的事</h2>
        <p className="mt-3 text-zinc-500">悬停卡片可以看到 3D 倾斜效果</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
