import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Rocket, Box, Code2, Award, Maximize2 } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { WORK_FILTERS, worksData } from '../data/works';
import type { WorkCategory, WorkItem } from '../data/works';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { WorkDetailModal } from './WorkDetailModal';

const WorkCard: React.FC<{
  work: WorkItem;
  tiltEnabled: boolean;
  onOpen: () => void;
}> = ({ work, tiltEnabled, onOpen }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const springX = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="work-card is-clickable"
      data-category={work.category}
      style={tiltEnabled ? { rotateX: springX, rotateY: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="work-card-content">
        <div className="work-card-category">
          <span>{work.categoryLabel}</span>
          {work.category === 'Mod' ? (
            <Box size={16} className="text-neon-pink" aria-hidden="true" />
          ) : (
            <Code2 size={16} className="text-neon-cyan" aria-hidden="true" />
          )}
        </div>

        <h3 className="work-card-title">{work.title}</h3>
        <p className="work-card-desc">{work.description}</p>

        {work.highlight && (
          <p className="work-card-highlight">
            <Award size={14} aria-hidden="true" />
            <span>{work.highlight}</span>
          </p>
        )}
      </div>

      <div className="work-card-footer">
        <div className="work-card-tags">
          {work.tech.slice(0, 3).map((t) => (
            <span key={t} className="work-card-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="work-card-links">
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="work-link"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${work.title} のソースコードを GitHub で見る`}
            >
              <GithubIcon size={18} />
            </a>
          )}
          {/* キーボード/支援技術からもモーダルを開けるようにする実体のボタン */}
          <button
            type="button"
            className="work-link work-card-detail"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            aria-label={`${work.title} の詳細を見る`}
          >
            <Maximize2 size={16} aria-hidden="true" />
            <span>詳細</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/** #works/<slug> から対象の実績を引く。応募書類などから個別に共有できるようにするため */
const workFromHash = (): WorkItem | null => {
  const m = window.location.hash.match(/^#works\/(.+)$/);
  return m ? worksData.find((w) => w.slug === m[1]) ?? null : null;
};

export const Works: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<WorkCategory | 'All'>('All');
  const [selected, setSelected] = useState<WorkItem | null>(workFromHash);

  useEffect(() => {
    // 共有リンクで直接来た場合、戻るでサイト外に出ないよう基点の履歴を1つ作る
    if (workFromHash()) {
      const { pathname, search, hash } = window.location;
      history.replaceState(null, '', pathname + search);
      history.pushState(null, '', hash);
      document.getElementById('works')?.scrollIntoView({ block: 'start' });
    }

    const onPopState = () => setSelected(workFromHash());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openWork = (work: WorkItem) => {
    history.pushState(null, '', `#works/${work.slug}`);
    setSelected(work);
  };

  // 履歴を戻すことで閉じる。ブラウザの戻るボタンと挙動を一致させる
  const closeWork = () => {
    if (workFromHash()) history.back();
    else setSelected(null);
  };
  const isPointerFine = useMediaQuery('(pointer: fine)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const tiltEnabled = isPointerFine && !prefersReducedMotion;

  const filteredWorks = useMemo(
    () => (activeFilter === 'All' ? worksData : worksData.filter((w) => w.category === activeFilter)),
    [activeFilter]
  );

  return (
    <section className="normal-section">
      <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="section-header">
          <h2 className="section-title">
            <Rocket size={28} className="text-neon-cyan" aria-hidden="true" />
            <span className="text-gradient">Works</span>
          </h2>
          <p className="section-lead">
            これまでに開発した主なツール・アプリケーションの実績です。カードを選ぶと詳細を表示します。
          </p>

          <div className="works-filter" role="tablist" aria-label="実績のカテゴリフィルタ">
            {WORK_FILTERS.map((filter) => (
              <button
                key={filter.key}
                role="tab"
                aria-selected={activeFilter === filter.key}
                className={`filter-tab${activeFilter === filter.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="works-grid-container">
          <motion.div className="works-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work) => (
                <WorkCard
                  key={work.title}
                  work={work}
                  tiltEnabled={tiltEnabled}
                  onOpen={() => openWork(work)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <WorkDetailModal work={selected} onClose={closeWork} />
    </section>
  );
};
