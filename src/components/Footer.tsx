import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ExternalLink, Copy, Check } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';

const CONTACT_EMAIL = 'setuya.work@gmail.com';
const MAIL_SUBJECT = 'ポートフォリオを見てご連絡しました';
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // mailto が使えない環境向けに、アドレスをそのままコピーできるようにする
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない (アドレスは画面上に表示済み)
    }
  };

  return (
    <section className="normal-section" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="footer-title">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="footer-lead">
            「不便」を「快適」にするアイデアや、新しいプロジェクトのご相談、コラボレーションなど、お気軽にお声がけください。
          </p>

          <div className="social-links">
            <a
              href="https://github.com/SetuyaSora"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub のプロフィールを開く"
            >
              <GithubIcon size={24} />
            </a>
            <a
              href="https://www.nexusmods.com/users/156695123"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Nexus Mods のプロフィールを開く"
            >
              <ExternalLink size={24} aria-hidden="true" />
            </a>
          </div>

          <motion.a
            href={MAILTO}
            className="btn-neon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={18} aria-hidden="true" />
            <span>Say Hello</span>
          </motion.a>

          {/* メーラーが未設定の環境でも連絡できるよう、アドレスを直接示す */}
          <div className="footer-email">
            <span className="footer-email-address">{CONTACT_EMAIL}</span>
            <button
              type="button"
              className="footer-email-copy"
              onClick={copyEmail}
              aria-label={`メールアドレス ${CONTACT_EMAIL} をコピー`}
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              <span>{copied ? 'コピーしました' : 'コピー'}</span>
            </button>
          </div>

          <div className="footer-copyright">© {new Date().getFullYear()} Sora. All rights reserved.</div>
        </motion.div>
      </div>
    </section>
  );
};
