import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Works' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollContainerRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // スクロール位置に応じてナビ背景を切り替え
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => setIsScrolled(container.scrollTop > 40);
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  // 現在表示中のセクションを検出してハイライト
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const sections = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: container, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [scrollContainerRef]);

  // メニュー展開中はページ本体のスクロールを止める
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar${isScrolled || isMenuOpen ? ' is-scrolled' : ''}`}>
        <div className="navbar-inner">
          <button className="navbar-logo" onClick={() => handleNavigate('home')}>
            <Sparkles size={18} className="text-neon-pink" aria-hidden="true" />
            SORA<span className="text-neon-cyan">.</span>CODE
          </button>

          <ul className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  className={`navbar-link${activeId === item.id ? ' active' : ''}`}
                  onClick={() => handleNavigate(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="navbar-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`navbar-link${activeId === item.id ? ' active' : ''}`}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
