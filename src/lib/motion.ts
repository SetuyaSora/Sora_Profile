import type { Variants } from 'framer-motion';

/** 各セクションで共通利用するイージング (ease-out-expo 相当) */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** 子要素を順番に出現させる親コンテナ用 */
export const staggerContainer = (stagger = 0.15, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** 下からフェードインする汎用アイテム */
export const fadeInUp = (distance = 40, duration = 0.8): Variants => ({
  hidden: { y: distance, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration, ease: EASE_OUT_EXPO },
  },
});

/** 横からスライドインする (About セクションの左右カラム用) */
export const slideIn = (from: 'left' | 'right', distance = 60): Variants => ({
  hidden: { x: from === 'left' ? -distance : distance, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
});

/** 拡大しながら現れる (バッジ・イラスト用) */
export const scaleIn = (initialScale = 0.8, duration = 0.5, delay = 0): Variants => ({
  hidden: { scale: initialScale, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration, ease: EASE_OUT_EXPO, delay },
  },
});

/** whileInView に渡す共通ビューポート設定。
 *  once: true にして、スクロールで往復するたびに再生されないようにする */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;
