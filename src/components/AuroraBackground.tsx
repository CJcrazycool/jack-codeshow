// 全屏暗色极光流光背景：网格 + 流动光晕 + 顶部渐隐
export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* 网格底纹，用径向遮罩让边缘渐隐 */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

      {/* 三团流动的极光光晕 */}
      <div className="animate-aurora absolute -left-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-neon-cyan/20 blur-[130px]" />
      <div className="animate-aurora absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-neon-purple/20 blur-[130px] [animation-delay:-6s]" />
      <div className="animate-aurora absolute -bottom-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-neon-pink/15 blur-[130px] [animation-delay:-12s]" />

      {/* 顶部往下、底部往上的渐变，让首屏更聚焦 */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
