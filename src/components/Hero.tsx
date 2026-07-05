import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ROLES = ['用代码创造', 'AI 自动化玩家', '独立部署实践者', '终身学习者'];

function useTypewriter(words: string[], typingSpeed = 90, deletingSpeed = 45, holdTime = 1600) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && sub === current) {
      delay = holdTime;
    } else if (isDeleting && sub === '') {
      delay = 220;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && sub === current) {
        setIsDeleting(true);
      } else if (isDeleting && sub === '') {
        setIsDeleting(false);
        setIndex((i) => i + 1);
      } else if (isDeleting) {
        setSub(current.slice(0, sub.length - 1));
      } else {
        setSub(current.slice(0, sub.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [sub, isDeleting, index, words, typingSpeed, deletingSpeed, holdTime]);

  return sub;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-sm tracking-wide text-neon-cyan"
      >
        <span className="text-zinc-600">&gt;</span> Hello World, I&apos;m
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-5 text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl"
      >
        <span className="text-gradient-animate">Jack</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-6 h-9 text-xl text-zinc-300 sm:text-2xl"
      >
        一个{' '}
        <span className="font-semibold text-gradient">{typed}</span>
        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-neon-cyan align-middle" style={{ height: '1.1em' }} />
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 max-w-xl text-base leading-relaxed text-zinc-500"
      >
        这里是我折腾代码、AI 自动化与独立部署的数字花园。
        相信工具应该为人服务，把重复交给机器，把创造留给自己。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-7 py-3 font-medium text-ink-950 transition-transform hover:scale-105"
        >
          <span className="relative z-10">看看作品</span>
        </a>
        <a
          href="#blog"
          className="rounded-full border border-white/15 px-7 py-3 font-medium text-zinc-200 backdrop-blur transition-colors hover:border-neon-cyan/60 hover:text-white"
        >
          读读文章
        </a>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <div className="h-2 w-1 animate-float rounded-full bg-neon-cyan" />
        </div>
      </motion.div>
    </section>
  );
}
