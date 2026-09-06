import { Terminal, Layout, Wrench, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: Terminal,
    skills: ['Python', 'JavaScript', 'TypeScript', 'C#', 'SQL'],
  },
  {
    title: 'Frontend & Frameworks',
    icon: Layout,
    skills: ['React', 'Next.js', 'Flet (Python)', 'HTML5 / CSS3'],
  },
  {
    title: 'Engines & Tools',
    icon: Wrench,
    skills: ['Unity', 'Godot', 'Git', 'Raspberry Pi'],
  },
  {
    title: 'Specialties',
    icon: Brain,
    skills: [
      'AI API連携 (Gemini API)',
      'MCP (Model Context Protocol) 開発',
      'ブラウザ拡張機能開発',
      '業務・タスク自動化',
    ],
  },
];
