import { useCallback, useEffect, useState } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<ResolvedTheme, string> = { dark: '#060913', light: '#f6f7fb' };

const readPreference = (): ThemePreference => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // ストレージが使えない環境ではシステム設定に従う
  }
  return 'system';
};

const resolve = (preference: ThemePreference): ResolvedTheme => {
  if (preference !== 'system') return preference;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const apply = (theme: ResolvedTheme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
};

/** テーマ設定 (システム/ライト/ダーク) を管理し、<html data-theme> へ反映する。
 *  index.html のインラインスクリプトが初回描画前に同じ規則で属性を付けている */
export const useTheme = () => {
  const [preference, setPreferenceState] = useState<ThemePreference>(readPreference);

  useEffect(() => {
    apply(resolve(preference));
    if (preference !== 'system') return;

    // 「システム」選択中は OS 側の切り替えに追従する
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = () => apply(resolve('system'));
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 保存できなくても今回の表示切り替えは有効
    }
  }, []);

  return { preference, setPreference };
};
