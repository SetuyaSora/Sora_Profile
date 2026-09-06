import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { staggerContainer, fadeInUp, scaleIn } from '../lib/motion';
import { asset } from '../lib/asset';

/** ヒーローに置く実績のサムネイル。グリッドに吸着するように順次現れる */
const HERO_SHOTS = [
  {
    src: '/hero/01-madobe.webp',
    alt: '窓辺 (Madobe) の新規タブ画面',
    className: 'hero-shot-a',
    delay: 0.45,
  },
  {
    src: '/hero/02-circle.webp',
    alt: 'サークル活動管理プラットフォームのメンバー別作品一覧',
    className: 'hero-shot-b',
    delay: 0.62,
  },
  {
    src: '/hero/03-transelation.webp',
    alt: 'Transelation_tool の翻訳結果ウィンドウ',
    className: 'hero-shot-c',
    delay: 0.79,
  },
];

/** 実際に作ったものを、グリッドに収まっていく形で見せる */
const HeroIllustration: React.FC = () => (
  <div className="hero-board">
    <div className="hero-board-grid" aria-hidden="true" />
    <div className="hero-board-glow" aria-hidden="true" />

    {HERO_SHOTS.map((shot) => (
      <motion.figure
        key={shot.src}
        className={`hero-shot ${shot.className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: shot.delay }}
      >
        <img src={asset(shot.src)} alt={shot.alt} loading="eager" decoding="async" />
      </motion.figure>
    ))}
  </div>
);

export const Hero: React.FC = () => {
  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: '100px',
      transition: { duration: 1, ease: 'easeOut' as const, delay: 0.6 },
    },
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="snap-section">
      <div className="container hero-grid">
        <motion.div
          className="hero-content"
          variants={staggerContainer(0.15, 0.2)}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-tag" variants={fadeInUp()}>
            <Sparkles size={14} aria-hidden="true" />
            Student Engineer & Creator
          </motion.div>

          <motion.h1 className="hero-title-main" variants={fadeInUp()}>
            「不便」を<span className="text-neon-pink">「快適」</span>に。<br />
            アイデアを<span className="text-neon-cyan">「かたち」</span>に。
          </motion.h1>

          <motion.div className="hero-divider" variants={lineVariants} />

          <motion.h2 className="hero-subtitle-main" variants={fadeInUp()}>
            言語や技術の垣根を越えて、<br />
            日々の「面倒」を解きほぐすプロダクトをつくる。
          </motion.h2>

          <motion.p className="hero-description" variants={fadeInUp()}>
            はじめまして。情報デザインを専攻する学生エンジニアの Sora です。
            日常の面倒な作業を解消する自動化ツールから、生成AIを組み込んだWebアプリケーションまで、
            課題に合わせて最適な技術を選びながら開発しています。
          </motion.p>

          <motion.div className="hero-actions" variants={fadeInUp()}>
            <button className="btn-neon" onClick={scrollToWorks}>
              Works を見る
            </button>
            <button className="btn-ghost" onClick={scrollToContact}>
              Contact
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-illustration"
          variants={scaleIn(0.85, 1, 0.3)}
          initial="hidden"
          animate="visible"
        >
          <HeroIllustration />
        </motion.div>
      </div>

      <motion.button
        className="scroll-indicator"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-label="Aboutセクションへスクロール"
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-neon-pink" aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
};
