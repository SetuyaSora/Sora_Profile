import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Sparkles, Code2, Hammer } from 'lucide-react';
import { staggerContainer, slideIn, scaleIn, VIEWPORT_ONCE } from '../lib/motion';

export const About: React.FC = () => {
  return (
    <section className="snap-section">
      <div className="container">
        <motion.div
          className="about-grid"
          variants={staggerContainer(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <motion.div className="about-left" variants={slideIn('left')}>
            <div className="section-eyebrow">
              <User size={20} aria-hidden="true" />
              About Me
            </div>
            <h2 className="about-title">
              Sora / <span className="text-gradient">学生エンジニア</span>
            </h2>
            <p className="about-lead">
              大学で情報デザインを専攻しながら、個人開発やサークル活動を通じてプロダクトづくりに取り組んでいます。
              得意なのは、技術や言語の垣根を越えて「使える形」に落とし込むことです。
            </p>

            <div className="about-badges">
              <motion.div
                className="glass-card about-badge"
                variants={scaleIn()}
                whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
              >
                <Cpu size={16} className="text-neon-pink" aria-hidden="true" />
                <span>課題解決 (Problem Solving)</span>
              </motion.div>

              <motion.div
                className="glass-card about-badge"
                variants={scaleIn()}
                whileHover={{ scale: 1.05, borderColor: 'var(--secondary)' }}
              >
                <Code2 size={16} className="text-neon-cyan" aria-hidden="true" />
                <span>自動化 (Automation)</span>
              </motion.div>

              <motion.div
                className="glass-card about-badge"
                variants={scaleIn()}
                whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
              >
                <Hammer size={16} className="text-neon-pink" aria-hidden="true" />
                <span>手を動かす (Build First)</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="about-right glass-card" variants={slideIn('right')}>
            <div className="about-detail-header">
              <Sparkles className="text-neon-cyan" size={20} aria-hidden="true" />
              <h3>My Drive &amp; Focus</h3>
            </div>
            <p className="about-detail-text">
              ものづくりで大切にしているのは、<strong>とりあえず手を動かして作ってみる</strong>ことです。
              頭の中で考え込んでいるより、小さくても一度動くものにしたほうが、
              直すべきところが早く見えると感じています。
            </p>
            <p className="about-detail-text">
              開発の原動力は<strong>「課題解決」</strong>と<strong>「自動化」</strong>です。
              日常のルーティンワークをワンクリックに変えるデスクトップアプリや、
              生成AI（Gemini APIやMCPなど）を組み込んだ次世代のワークフローづくりなど、
              常に新しい技術に触れながら実用的な形へ落とし込むことを大切にしています。
            </p>
            <p className="about-detail-text-muted">
              フロントエンドからバックエンド、Discord Botやブラウザ拡張機能まで、
              目的を達成するために最適な技術を柔軟に選定して開発しています。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
