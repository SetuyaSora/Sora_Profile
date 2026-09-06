import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { staggerContainer, fadeInUp, VIEWPORT_ONCE } from '../lib/motion';

export const Skills: React.FC = () => (
  <section className="normal-section">
    <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="section-header">
        <h2 className="section-title">
          <Wrench size={28} className="text-neon-pink" aria-hidden="true" />
          <span className="text-gradient">Skills</span>
        </h2>
        <p className="section-lead">
          課題に合わせて最適な言語・フレームワークを選択し、設計から実装までワンストップで行います。
        </p>
      </div>

      <motion.div
        className="skills-grid"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
      >
        {skillCategories.map(({ title, icon: Icon, skills }) => (
          <motion.div
            key={title}
            className="skill-card glass-card"
            variants={fadeInUp(50, 0.6)}
            whileHover={{ y: -8, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            <div className="skill-card-icon">
              <Icon size={24} aria-hidden="true" />
            </div>
            <h3 className="skill-card-title">{title}</h3>
            <div className="skill-tags">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
