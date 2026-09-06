/** public/ 配下のルート絶対パス ('/works/...' 等) を、デプロイ先の base パスに合わせて解決する */
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
