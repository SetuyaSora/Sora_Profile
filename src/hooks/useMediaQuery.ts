import { useCallback, useSyncExternalStore } from 'react';

/**
 * メディアクエリの一致状態を購読する。
 * useState + useEffect だと query が変わったとき、次に change が起きるまで
 * 古い値を返してしまうため、外部ストアとして購読する形にしている。
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onStoreChange);
      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot);
}
