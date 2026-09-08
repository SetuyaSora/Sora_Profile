export type WorkCategory = 'Web' | 'Extension' | 'Desktop' | 'Game' | 'Mod';

export interface WorkLink {
  label: string;
  url: string;
}

export interface WorkStat {
  label: string;
  value: string;
}

export interface WorkScreenshot {
  /** public/works/ 配下のパス (例: '/works/manaba-downloader/01.png') */
  src: string;
  /** 画面の内容を説明する代替テキスト。装飾ではないので必須 */
  alt: string;
  /** 画像の下に表示する補足。省略可 */
  caption?: string;
}

export interface WorkItem {
  /** ハッシュURL (#works/<slug>) と画像ディレクトリ名に使う識別子 */
  slug: string;
  title: string;
  category: WorkCategory;
  /** カード上部に表示する肩書き (カテゴリより具体的な説明) */
  categoryLabel: string;
  description: string;
  tech: string[];
  /** 公開実績・利用規模など、特筆すべき成果を1行で。未設定ならカードに表示しない */
  highlight?: string;
  /** 詳細モーダルにのみ表示する補足説明 */
  details?: string;
  /** 詳細モーダルに数値で示す実績。出典が確認できるものだけを載せる */
  stats?: WorkStat[];
  /** stats の取得時点 (数値は変動するため明示する) */
  statsAsOf?: string;
  /** 詳細モーダルに表示する実際の画面キャプチャ。未設定ならギャラリーごと非表示 */
  screenshots?: WorkScreenshot[];
  github?: string;
  extraLinks?: WorkLink[];
}

export const WORK_FILTERS: { key: WorkCategory | 'All'; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Web', label: 'Web' },
  { key: 'Extension', label: 'Extension' },
  { key: 'Desktop', label: 'Desktop' },
  { key: 'Game', label: 'Game' },
  { key: 'Mod', label: 'Mod' },
];

export const worksData: WorkItem[] = [
  {
    slug: 'swifinder',
    title: 'Swifinder',
    category: 'Web',
    categoryLabel: 'Web App',
    description:
      'Steamのゲームを、TikTokやYouTube Shortsのようなスワイプ操作で動画プレビューしながら探せるWebアプリ。独自ドメインで一般公開しています。',
    details:
      'Steamには12万本を超えるゲームがありますが、その多くは「そもそも探されない」「配信者が遊んでいるのを見て初めて知る」「数が多すぎて探せない」という理由で埋もれています。そこで、自分から検索しなくても短編動画を眺める感覚でゲームと出会える導線をつくりました。\n\nスワイプするたびに次のゲームの紹介動画が流れ、気に入ればワンタップでSteamのストアページへ移動できます。いいねを押すとその作品が持つタグにスコアが加算され、次に表示されるゲームの抽選確率へ反映されるレコメンドを実装しました。マイリスト管理、NGタグの設定、データのエクスポートにも対応しています。\n\nフロントエンドは React / Vite / Tailwind CSS で構築し、ゲーム情報は Steam API と SteamSpy API から取得。取得したデータは Raspberry Pi 上のサーバーで保持し、Cloudflare 経由で配信しています。UIは Figma で設計し、4,000行を超えて見通しが悪くなったコードは責務ごとに分割して整理しました。',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Steam API', 'Cloudflare', 'Raspberry Pi'],
    highlight: '独自ドメイン swifinder.com で公開中',
    screenshots: [
      {
        src: '/works/swifinder/01-swipe.webp',
        alt: 'Swifinderの再生画面。ゲームのプレイ動画が縦画面で再生され、右側にLike・Dislike・マイリスト追加・Steam・共有のボタン、下部にゲーム名「Banana Shooter」とジャンルタグが並んでいる',
        caption: '短編動画のUIで次々にプレビューし、気になればそのままSteamページへ',
      },
      {
        src: '/works/swifinder/02-search.webp',
        alt: 'Swifinderの検索画面。上部にゲーム名・開発者の検索欄、ジャンルタグ、日本語対応の絞り込みが並び、下にSatisfactoryやStardew Valleyなどのゲームがサムネイル付きで一覧表示されている',
        caption: 'ジャンルや日本語対応の有無で絞り込める検索画面',
      },
    ],
    extraLinks: [{ label: 'Swifinder を開く', url: 'https://swifinder.com' }],
  },
  {
    slug: 'madobe',
    title: '窓辺 (Madobe)',
    category: 'Extension',
    categoryLabel: 'Browser Extension',
    description:
      'Chromeの新規タブを、動画背景と自由に配置できるウィジェットで置き換える拡張機能 (Manifest V3)。フレームワークを使わず素のJavaScriptで実装し、軽さと自由度を両立させました。',
    details:
      '画面を横48×縦24の仮想グリッドに分割し、ウィジェットをドラッグで配置・リサイズできます。移動先が他のウィジェットと重なった場合は、ぶつかった側が自動で退避またはスワップします。長押しするとiOSのようにアイコンが震える編集モードに入り、配置を直感的に調整できます。動画はIndexedDBに保存して再起動後も復元し、タブが非アクティブになると再生を完全に停止してCPUとGPUの消費を抑えます。ウィジェットはサジェスト付きGoogle検索、デジタル/アナログ時計、カレンダー、メモ帳、進捗バー付きToDo、複数フィードをマージするRSSの7種類。設定はJSONで書き出して復元でき、全消去には「リセット」と手入力させる確認を挟んでいます。',
    tech: ['JavaScript', 'Manifest V3', 'IndexedDB'],
    highlight: 'Chrome ウェブストアで審査通過・公開中',
    screenshots: [
      {
        src: '/works/madobe/01-home.webp',
        alt: '動画を背景にした新規タブ画面。デジタル時計、Google検索バー、進捗バー付きToDoリスト、カレンダー、ニュースのRSSフィードが画面上に配置されている',
        caption: 'ウィジェットを自由に配置した状態。背景は任意の動画を設定できる',
      },
      {
        src: '/works/madobe/02-widget-drawer.webp',
        alt: '画面左端から出現したドロワー。Google検索、デジタル時計、アナログ時計、カレンダー、メモ帳、RSSフィードなど追加できるウィジェットが一覧で並んでいる',
        caption: '左端のドロワーからウィジェットを追加する',
      },
      {
        src: '/works/madobe/03-settings.webp',
        alt: 'すりガラス調の設定パネル。壁紙ソースの選択、暗度と音量のスライダー、再生速度、フォント選択、設定のエクスポートとインポートのボタンが並んでいる',
        caption: '壁紙・フォント・バックアップを扱う設定パネル',
      },
    ],
    github: 'https://github.com/SetuyaSora/madobe',
    extraLinks: [
      {
        label: 'Chrome ウェブストア',
        url: 'https://chromewebstore.google.com/detail/dpocilhplgcbopnhjjpjenlackdcidno',
      },
    ],
  },
  {
    slug: 'space-log',
    title: 'SpaceLog Viewer',
    category: 'Web',
    categoryLabel: 'Web App',
    description:
      '宇宙シミュレーションゲーム『Elite Dangerous』が出力するジャーナルログを解析し、SF風のインターフェースで可視化するSPA。ブラウザ上で今すぐ試せます。',
    details:
      'ドラッグ＆ドロップされたJSON Lines形式のログをその場で解析し、宇宙船のHUDを模したタイムラインに時系列で並べます。コマンダー名や資産、機体、探検ランクをダッシュボードに要約するほか、植民地建設の資材納入状況から不足分を自動計算します。ログ内の英語キーは辞書データで日本語に変換して表示します。処理は完全にクライアントサイドで完結し、読み込んだログがサーバーへ送られることはありません。GitHub Actions により main ブランチへのプッシュで自動デプロイしています。',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    highlight: 'GitHub Pages で公開中 / ブラウザで試用可能',
    github: 'https://github.com/SetuyaSora/space_log',
    extraLinks: [
      { label: 'ライブデモ', url: 'https://setuyasora.github.io/space_log/' },
    ],
  },
  {
    slug: 'journai',
    title: 'JournAI',
    category: 'Web',
    categoryLabel: 'Web App & AI',
    description:
      'IT・ゲーム系ニュースサイトの最新記事を自動収集し、Gemini APIで「今知るべきトレンド」として要約して一覧表示するWebシステム。フロントとバックエンドを分離して構築しました。',
    details:
      'GIGAZINE、Game*Spark、GIZMODO、AUTOMATON などのRSSフィードから記事を集め、個別の要約ではなく記事群を横断して「今起きている潮流」を3点抽出させるところに主眼を置いています。要約の横の「詳しく聞く」から対話を開始すると、用語解説や詳細をその場で質問できます。Flask のAPIサーバーとVanilla JSのフロントエンドに分け、LLMへの制約プロンプトは外部ファイルに切り出して調整しやすくしました。UIはカード型の選択画面、ダークモード、通信待機中のスケルトンスクリーンを備えています。',
    tech: ['Python', 'Flask', 'JavaScript', 'Gemini API'],
    screenshots: [
      {
        src: '/works/journai/01-summary-chat.webp',
        alt: '3カラム構成の画面。左でニュースサイトを選択し、中央にAIが抽出した3件のトレンド要約と収集した記事の一覧、右のアシスタント欄でAIとの質疑応答が表示されている',
        caption: 'サイトを選ぶと横断トレンドを3点抽出。右のアシスタントに追加で質問できる',
      },
    ],
    github: 'https://github.com/SetuyaSora/My-JournAI',
  },
  {
    slug: 'circle-platform',
    title: 'サークル活動管理プラットフォーム & Discord Bot',
    category: 'Web',
    categoryLabel: 'Web App & Bot',
    description:
      'メンバー9名のクリエイターサークルの運営を支える統合システム。Discordに提出された成果物を、Reactベースのギャラリーへ自動反映し、メンバーの作品公開と交流を後押しします。',
    screenshots: [
      {
        src: '/works/circle-platform/01-gallery.webp',
        alt: 'サークル全員の作品をカード形式で一覧表示しているギャラリー画面。各カードに作品名、投稿月、投稿者名、説明、資料へのリンクが並ぶ',
        caption: '全作品の一覧ビュー。Discord への投稿がここへ自動で反映される',
      },
      {
        src: '/works/circle-platform/02-member.webp',
        alt: 'ダークテーマのメンバー別ポートフォリオ画面。左にメンバー一覧、右に選択したメンバーの作品カードが並ぶ',
        caption: 'メンバー別ポートフォリオ。ダークテーマにも対応',
      },
      {
        src: '/works/circle-platform/03-monthly.webp',
        alt: '投稿月ごとに作品を区切って表示する月別ビュー。見出しにその月の投稿件数が表示されている',
        caption: '月別ビュー。活動量の推移が一目でわかる',
      },
    ],
    tech: ['React', 'Python', 'Discord API'],
    details:
      'Discord に投稿された成果物を Bot が拾い、Web ギャラリーへ自動で反映する構成です。「投稿する場所」と「見せる場所」が分かれていたサークル運営の手間をなくし、メンバーが制作そのものに集中できる状態を目指しました。Bot（Python）とフロントエンド（React）の双方を設計・実装しています。\n\n※ スクリーンショット内の人物名・作品はいずれも動作確認用のデモデータであり、実在のサークルメンバーの氏名ではありません。',
  },
  {
    slug: 'manaba-downloader',
    title: 'manaba Downloader',
    category: 'Extension',
    categoryLabel: 'Browser Extension',
    description:
      '大学の教務システム「manaba」での講義資料ダウンロードを効率化するブラウザ拡張機能。Chrome ウェブストアと Firefox Add-ons の両方で審査を通過し、一般公開・運用しています。',
    tech: ['JavaScript', 'WebExtensions API'],
    highlight: 'Chrome / Firefox 両ストアで審査通過・公開中',
    details:
      'manaba からの資料ダウンロードを、指定したフォルダへ自動で振り分けて保存します（例: download/manaba/前期）。保存先は拡張機能のアイコンから変更できます。WebExtensions API で実装し、Chrome ウェブストアと Firefox Add-ons それぞれの審査基準に合わせて調整したうえで両方に公開。Firefox 版は Firefox for Android にも対応しています。外部へのデータ収集は行っていません。',
    screenshots: [
      {
        src: '/works/manaba-downloader/01-popup.webp',
        alt: '拡張機能のポップアップ「manaba保存先設定」。ダウンロードフォルダ内のサブフォルダ名を入力する欄に「manaba/一年前期」と入力され、下に緑色の保存ボタンがある',
        caption: 'アイコンをクリックすると開く保存先の設定画面。学期ごとにフォルダを分けられる',
      },
    ],
    github: 'https://github.com/SetuyaSora/manaba-downloader',
    extraLinks: [
      {
        label: 'Chrome ウェブストア',
        url: 'https://chromewebstore.google.com/detail/manaba-downloader/coneicoigecbkkokbpfoeencnjdldgac',
      },
      {
        label: 'Firefox Add-ons',
        url: 'https://addons.mozilla.org/en-US/firefox/addon/manaba-downloader-for-firefox/',
      },
    ],
  },
  {
    slug: 'transelation-tool',
    title: 'Transelation_tool',
    category: 'Desktop',
    categoryLabel: 'Desktop App',
    description:
      '画面上の指定範囲を、生成AIを用いてリアルタイムに翻訳・解説するデスクトップツール。Geminiのマルチモーダル機能を活かし、単なる直訳にとどまらない文脈理解を実現しました。',
    details:
      '画面上の任意の範囲をホットキーで切り取り、Gemini のマルチモーダル機能に画像のまま渡して翻訳します。文字起こしを挟まないため、レイアウトが崩れたUIやフォントの装飾が強いゲーム画面でも読み取れます。訳文だけでなく、固有名詞をカタカナ表記に留めた理由などの解説も併せて返すよう指示しており、なぜその訳になったのかが追えるようにしました。設定で「解説モード」に切り替えると、翻訳ではなく対象が何かを特定して背景から説明させることもできます。',
    screenshots: [
      {
        src: '/works/transelation-tool/01-translation.webp',
        alt: 'ゲーム画面に重ねて表示された翻訳結果ウィンドウ。英語のアイテム説明「Guardian Shield+」が日本語に訳され、その下に固有名詞をカタカナ表記にした理由などの解説が箇条書きで並んでいる',
        caption: '訳文と併せて、なぜその訳を選んだかの解説も表示する',
      },
      {
        src: '/works/transelation-tool/02-explanation.webp',
        alt: '解説モードで表示された結果ウィンドウ。作品名とアイテム名を特定したうえで、そのアイテムの入手方法や性能をゲームの文脈に沿って日本語で解説している',
        caption: '解説モードでは翻訳の代わりに、対象が何かを特定して背景から説明する',
      },
    ],
    tech: ['Python', 'Gemini AI (Multimodal)'],
    github: 'https://github.com/SetuyaSora/Transelation_tool',
  },
  {
    slug: 'attendance-opener',
    title: 'AttendanceOpener',
    category: 'Desktop',
    categoryLabel: 'Desktop Automation',
    description:
      '毎日のブラウザ操作による出席登録などの定型タスクを自動化するツール。起動するだけで一連の操作を代行し、日常の細かな手間をゼロにします。',
    details:
      'アプリ名は「出席とうろくん」。授業のあるコマを時間割の画面で選んでおくと、以降はブラウザを開いて出席登録を済ませるまでの一連の操作を自動で代行します。毎日くり返していた数分の作業を、起動するだけの状態にまで削りました。',
    screenshots: [
      {
        src: '/works/attendance-opener/01-timetable.webp',
        alt: '「出席とうろくん」の時間割設定ウィンドウ。月曜から金曜、1限から5限のマス目が並び、授業があるコマが青く選択されている',
        caption: '授業のあるコマを選ぶだけで、以降の出席登録を自動化する',
      },
    ],
    tech: ['C#', 'Selenium'],
    github: 'https://github.com/SetuyaSora/AttendanceOpener',
    extraLinks: [
      { label: '解説記事 (note)', url: 'https://note.com/setuya_sora/n/n120860f864aa' },
    ],
  },
  {
    slug: 'cloverpit-mods',
    title: "Sora's More Apartment Mod",
    category: 'Mod',
    categoryLabel: 'Game Mod (CloverPit)',
    description:
      'ゲーム『CloverPit』向けに、アパートの部屋数拡張や機能追加を行うMod。既存システムの構造を読み解きながら拡張し、プレイの没入感を高めました。',
    tech: ['3D Modeling', 'C#', 'Modding'],
    highlight: 'NexusMods 累計 6,950 ダウンロード',
    details:
      'CloverPit 向けに2作品を公開しています。「More Apartment Mod」は Property Certificate が付与するチャームスロットを +5 / +10 / +20 から選べるよう拡張するもので、「Free Restock Mod」はショップのリストックを無料化するものです。いずれも既存システムの構造を解析したうえで、原作のバランスを壊さない範囲で拡張しました。',
    stats: [
      { label: '累計ダウンロード', value: '6,950' },
      { label: 'ユニークダウンロード', value: '5,125' },
      { label: 'Endorsements', value: '68' },
    ],
    screenshots: [
      {
        src: '/works/cloverpit-mods/01-more-apartment.webp',
        alt: "NexusMods の Sora's More Apartment Mod 配布ページ。Endorsements 35、Unique DLs 2,322、Total DLs 3,411、Total views 10,297 が表示されている",
        caption: 'More Apartment Mod の配布ページ',
      },
      {
        src: '/works/cloverpit-mods/02-free-restock.webp',
        alt: "NexusMods の Sora's Free Restock Mod 配布ページ。Endorsements 33、Unique DLs 2,803、Total DLs 3,539、Total views 8,010 が表示されている",
        caption: 'Free Restock Mod の配布ページ',
      },
    ],
    statsAsOf: '2026-08-28 時点 / 2作品の合計',
    extraLinks: [
      { label: 'More Apartment Mod', url: 'https://www.nexusmods.com/cloverpit/mods/35' },
      { label: 'Free Restock Mod', url: 'https://www.nexusmods.com/cloverpit/mods/28' },
    ],
  },
  {
    slug: 'project-echo',
    title: 'project-echo',
    category: 'Web',
    categoryLabel: 'Voice Diary App',
    description:
      '音声を録音してその場で文字起こしし、日付ごとに自動でアーカイブする音声日記アプリ。音声認識と外部APIの連携技術を実装しました。',
    details:
      '録音した音声をリアルタイムで文字起こしし、日ごとのアーカイブとして保存・一覧表示します。録音中はCPU・メモリ使用量をモニターに表示し、負荷を確認しながら運用できるようにしました。',
    screenshots: [
      {
        src: '/works/project-echo/01-recorder.webp',
        alt: 'PROJECT_ECHO の録音画面。左にアーカイブ一覧、中央に録音開始ボタンと文字起こしパネル、右にCPU使用率やメモリ量を示すモニターが並ぶ',
        caption: '音声日記の録音と文字起こしを行うUI',
      },
    ],
    tech: ['JavaScript', 'API Integration'],
    github: 'https://github.com/SetuyaSora/project-echo',
  },
  {
    slug: 'ice-clicker',
    title: 'ice_clicker',
    category: 'Game',
    categoryLabel: 'Mini Game',
    description:
      '氷をクリックしてスコアを稼ぐブラウザ向けクリッカーゲーム。施設の購入・アップグレード、一定条件を満たすと得られる名声ボーナスによる周回要素まで実装し、ゲームループとUIアニメーションを1本のミニゲームとして完成させました。',
    screenshots: [
      {
        src: '/works/ice-clicker/01-gameplay.webp',
        alt: 'アイスクリームのドット絵をクリックしてスコアを稼ぐゲーム画面。上部にスコアと名声ポイント、右側に施設とアップグレードの購入リストが並ぶ',
        caption: '施設・アップグレード・名声ボーナスまで実装したクリッカー',
      },
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/SetuyaSora/ice_clicker',
  },
];
