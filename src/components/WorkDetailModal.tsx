import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ExternalLink, ZoomIn } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import type { WorkItem, WorkScreenshot } from '../data/works';
import { asset } from '../lib/asset';

interface Props {
  work: WorkItem | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export const WorkDetailModal: React.FC<Props> = ({ work, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  // 拡大表示中のスクリーンショット。どの実績のものかを持たせ、対象が変われば
  // 自動的に無効になるよう導出する (effect でリセットすると余分な再描画が走るため)
  const [zoomState, setZoomState] = useState<{ slug: string; shot: WorkScreenshot } | null>(null);
  const zoomed = zoomState && work && zoomState.slug === work.slug ? zoomState.shot : null;
  const setZoomed = (shot: WorkScreenshot | null) =>
    setZoomState(shot && work ? { slug: work.slug, shot } : null);

  useEffect(() => {
    if (!work) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>('.work-modal-close')?.focus();
    return () => restoreRef.current?.focus?.();
  }, [work]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // ライトボックスが開いていれば、まずそちらだけ閉じる
        // setZoomState は useState の安定したセッターなので依存に含めなくてよい
        if (zoomed) setZoomState(null);
        else onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose, zoomed]
  );

  useEffect(() => {
    if (!work) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [work, handleKeyDown]);

  useEffect(() => {
    if (!work) return;
    const container = document.querySelector<HTMLElement>('.scroll-container');
    const previous = container?.style.overflowY;
    if (container) container.style.overflowY = 'hidden';
    // 表示中は固定ナビバーを隠す。重なりを避けつつ、狭い画面で本文に使える高さを稼ぐ
    document.body.classList.add('has-modal');
    return () => {
      if (container) container.style.overflowY = previous ?? '';
      document.body.classList.remove('has-modal');
    };
  }, [work]);

  // body 直下へポータルで描画する。Works セクション内に置いたままだと、
  // framer-motion が付ける transform / opacity で祖先に重ね合わせコンテキストが
  // でき、モーダルの z-index が固定ナビバーより下に閉じ込められることがある
  return createPortal(
    <AnimatePresence>
      {work && (
        <motion.div
          className="work-modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="work-modal glass-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="work-modal-close" onClick={onClose} aria-label="詳細を閉じる">
              <X size={20} />
            </button>

            <span className="work-modal-category">{work.categoryLabel}</span>
            <h3 className="work-modal-title" id="work-modal-title">
              {work.title}
            </h3>

            {work.highlight && (
              <p className="work-card-highlight">
                <Award size={14} aria-hidden="true" />
                <span>{work.highlight}</span>
              </p>
            )}

            {work.screenshots && work.screenshots.length > 0 && (
              <div className="work-modal-shots">
                {work.screenshots.map((shot) => (
                  <figure key={shot.src} className="work-shot">
                    <button
                      type="button"
                      className="work-shot-button"
                      onClick={() => setZoomed(shot)}
                      aria-label={`${shot.alt} を拡大表示`}
                    >
                      <img src={asset(shot.src)} alt={shot.alt} loading="lazy" decoding="async" />
                      <span className="work-shot-zoom" aria-hidden="true">
                        <ZoomIn size={18} />
                      </span>
                    </button>
                    {shot.caption && <figcaption>{shot.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}

            <p className="work-modal-desc">{work.description}</p>
            {work.details && <p className="work-modal-desc">{work.details}</p>}

            {work.stats && (
              <div className="work-modal-stats">
                {work.stats.map((s) => (
                  <div key={s.label} className="work-modal-stat">
                    <span className="work-modal-stat-value">{s.value}</span>
                    <span className="work-modal-stat-label">{s.label}</span>
                  </div>
                ))}
                {work.statsAsOf && <p className="work-modal-stats-note">{work.statsAsOf}</p>}
              </div>
            )}

            <div className="work-modal-section">
              <h4 className="work-modal-subtitle">使用技術</h4>
              <div className="work-card-tags">
                {work.tech.map((t) => (
                  <span key={t} className="work-card-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {(work.github || work.extraLinks) && (
              <div className="work-modal-section">
                <h4 className="work-modal-subtitle">リンク</h4>
                <div className="work-modal-links">
                  {work.github && (
                    <a href={work.github} target="_blank" rel="noopener noreferrer" className="work-modal-link">
                      <GithubIcon size={16} />
                      <span>GitHub リポジトリ</span>
                    </a>
                  )}
                  {work.extraLinks?.map((el) => (
                    <a key={el.url} href={el.url} target="_blank" rel="noopener noreferrer" className="work-modal-link">
                      <ExternalLink size={16} aria-hidden="true" />
                      <span>{el.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* スクリーンショットの等倍表示 */}
          <AnimatePresence>
            {zoomed && (
              <motion.div
                className="work-lightbox"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed(null);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <img src={asset(zoomed.src)} alt={zoomed.alt} />
                <p className="work-lightbox-hint">クリックまたは Esc で閉じる</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
