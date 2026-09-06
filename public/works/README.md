# スクリーンショットの追加手順

## 1. 画像を置く

`public/works/<slug>/` に置きます。`<slug>` は `src/data/works.ts` の `slug` と揃えてください。

| slug | 実績 |
|---|---|
| `circle-platform` | サークル活動管理プラットフォーム & Discord Bot |
| `manaba-downloader` | manaba Downloader |
| `transelation-tool` | Transelation_tool |
| `attendance-opener` | AttendanceOpener |
| `cloverpit-mods` | Sora's More Apartment Mod |
| `project-echo` | project-echo |
| `ice-clicker` | ice_clicker |

ファイル名は `01-gallery.webp` のように「連番 + 内容がわかる英字」。日本語やスペースを含む名前は
URL エンコードが必要になり扱いづらいので避ける（Windows の「スクリーンショット 2026-…」は必ずリネームする）。

## 2. works.ts に登録する

該当の実績に `screenshots` を足します。

```ts
screenshots: [
  {
    src: '/works/manaba-downloader/01.png',
    alt: '拡張機能のポップアップで保存先フォルダを設定している画面',
    caption: '保存先はアイコンのクリックから変更できる',
  },
],
```

- `alt` は必須。画面に何が写っているかを書く（装飾画像ではないため）
- `caption` は任意。画像の下に小さく表示される
- 未登録の実績はギャラリーごと非表示になるので、1件ずつ追加してよい

## 3. 画像の条件

- **実物のキャプチャのみ**。プレースホルダー画像やモックは使わない（CLAUDE.md の方針）
- **形式は WebP**。横幅 1600px（モーダル最大 880px の約2倍＝Retina 相当）、品質 85、1枚 300KB 以下が目安
- PNG で撮ったものは変換する。実績では 3.8MB → 567KB（85%削減）になった

```bash
python -c "from PIL import Image; im=Image.open('IN.png').convert('RGB'); im=im.resize((1600, round(im.height*1600/im.width))) if im.width>1600 else im; im.save('OUT.webp','WEBP',quality=85,method=6)"
```
- 個人情報・学籍番号・メールアドレス・APIキーが写り込んでいないか確認してから追加すること
- ストアの管理画面を撮る場合、**アカウントのプロフィール画像やユーザー数**まで写り込みやすい。
  見せたいのが「機能」なら、その部分だけをトリミングした方が伝わる
- ダーク背景に馴染むよう、明るい画面のキャプチャは縁が目立つ場合がある（自動で薄いボーダーが付く）

## 4. 表示のされ方

- 詳細モーダル内にギャラリー表示（1枚なら横幅いっぱい、2枚以上は自動で段組み）
- クリックで等倍のライトボックス表示、Esc またはクリックで閉じる
- `loading="lazy"` が付くので、モーダルを開くまで読み込まれない
