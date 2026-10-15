import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Project {
  title: string;
  desc: string;
  tags: string[];
  link?: string; // 有网页地址的项目才填
  qrcode?: string; // 小程序类项目填二维码图片路径
}

const PROJECTS: Project[] = [
  {
    title: '历史人物人格测评',
    desc: '卡密付费的全栈人格测评产品：六维计分 + 原型判定，匹配最相似的历史人物，含卡密授权、限流风控与管理后台。',
    tags: ['NestJS', 'React 19', 'PostgreSQL'],
    link: 'http://115.190.198.48:8080',
  },
  {
    title: '口袋快写',
    desc: '面向商家的 AI 内容生成小程序：通义千问 API 流式生成笔记与评论，打字机式实时渲染，含会员体系与生成记录管理。',
    tags: ['uni-app', '通义千问 API', '流式生成'],
    qrcode: '/koudaikuaixie-qrcode.jpg',
  },
  {
    title: '身份证加水印',
    desc: '纯前端水印工具：Canvas 本地处理不上传，多水印拖拽、缩放、旋转、透明度调节，隐私安全零服务器成本。',
    tags: ['Vue 3', 'Fabric.js', 'Canvas'],
    link: 'http://115.190.198.48/#/',
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
        <div className="relative flex h-full flex-col" style={{ transform: 'translateZ(40px)' }}>
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 font-mono text-neon-cyan">
            0{index + 1}
          </div>
          <h3 className="text-xl font-semibold text-white">{p.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs text-zinc-500">
                {t}
              </span>
            ))}
          </div>
          {p.link ? (
            <div className="mt-auto pt-5">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-2 text-sm font-semibold text-ink-950 shadow-[0_0_24px_rgba(34,211,238,0.35)] transition-all duration-300 hover:shadow-[0_0_36px_rgba(168,85,247,0.55)] hover:brightness-110"
              >
                在线访问
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          ) : p.qrcode ? (
            <div className="group/qr relative mt-auto pt-5">
              {/* 悬浮弹出的二维码 */}
              <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 translate-y-2 w-36 rounded-xl border border-neon-cyan/40 bg-ink-900/95 p-3 text-center opacity-0 shadow-[0_0_28px_rgba(34,211,238,0.35)] backdrop-blur transition-all duration-300 group-hover/qr:translate-y-0 group-hover/qr:opacity-100">
                <img src={p.qrcode} alt="微信小程序码" className="h-28 w-28 rounded-md" />
                <p className="mt-2 font-mono text-[11px] text-zinc-400">微信扫码 · 体验小程序</p>
              </div>
              {/* 触发按钮 */}
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/[0.08] px-5 py-2 text-sm font-semibold text-neon-cyan transition-all duration-300 hover:border-neon-cyan hover:bg-neon-cyan/[0.15] hover:shadow-[0_0_24px_rgba(34,211,238,0.4)]"
              >
                微信扫码体验
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <path d="M14 14h3v3h-3z" />
                  <path d="M21 14v.01M14 21v.01M21 21v.01" />
                </svg>
              </button>
            </div>
          ) : null}
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
