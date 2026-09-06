import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const Background: React.FC = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <div className="app-background" aria-hidden="true">
      {/* 動的なグラデーションオーブ 1 (ピンク) */}
      <motion.div
        className="bg-orb bg-orb-pink"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 80, -40, 0],
                y: [0, -60, 90, 0],
                scale: [1, 1.15, 0.9, 1],
              }
        }
        transition={{ duration: 25, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* 動的なグラデーションオーブ 2 (シアン) */}
      <motion.div
        className="bg-orb bg-orb-cyan"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -90, 50, 0],
                y: [0, 80, -70, 0],
                scale: [1, 0.85, 1.2, 1],
              }
        }
        transition={{ duration: 30, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* 動的なグラデーションオーブ 3 (補助用ハイライト) */}
      <motion.div
        className="bg-orb bg-orb-indigo"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.3, 0.8, 1],
                opacity: [0.1, 0.15, 0.08, 0.1],
              }
        }
        transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* ドットグリッドパターン */}
      <div className="bg-dot-grid" />

      {/* 斜め線のグリッドライン */}
      <div className="bg-diagonal-grid" />
    </div>
  );
};
