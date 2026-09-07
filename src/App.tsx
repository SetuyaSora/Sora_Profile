import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Works } from './components/Works';
import { Footer } from './components/Footer';
import { useMediaQuery } from './hooks/useMediaQuery';
import { ArrowUp } from 'lucide-react';

function App() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // 進行状況バー用のスクロール監視
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ロードアニメーションタイマー (reduced-motion環境では即座にスキップ)
  useEffect(() => {
    const delay = prefersReducedMotion ? 0 : 1400;
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // スクロール状態の監視
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      setShowScrollTop(scrollTop > window.innerHeight * 0.5);
    }
  };


  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
            />
            <motion.h1
              className="loading-title"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              SORA <span className="text-neon-pink">CODE LAB</span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ローディング画面は不透明なオーバーレイなので、本体は最初から描画しておく。
          読み込み完了後にマウントすると、進行バーの useScroll がまだ存在しない
          コンテナを掴んでしまい、スクロールしてもバーが伸びなくなる */}
      <a href="#main-content" className="skip-link">
        メインコンテンツへスキップ
      </a>

      {/* スクロール進行インジケーター (上部固定) */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* 動的背景 */}
      <Background />

      {/* ナビゲーション */}
      <Navbar scrollContainerRef={containerRef} />

      {/* メインスクロールコンテナ */}
      <div
        className="scroll-container"
        id="main-content"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div id="home">
          <Hero />
        </div>

        <div id="about">
          <About />
        </div>

        <div className="snap-section-long">
          <div id="skills">
            <Skills />
          </div>

          <div id="works">
            <Works />
          </div>

          <div id="contact">
            <Footer />
          </div>
        </div>
      </div>

      {/* トップへ戻るボタン */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-button"
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="ページ上部へ戻る"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} className="text-neon-cyan" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
