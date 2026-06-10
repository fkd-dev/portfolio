/* portfolio-data.jsx — content + nav（経歴書ベースの実データ）
   ※ 氏名・連絡先は経歴書が匿名のためプレースホルダー。後で差し替え可能。 */

const { useState, useEffect, useRef } = React;

/* ---------------------------------------------------------
   CONTENT
   --------------------------------------------------------- */
const NAME_JP = "Fukutan";
const NAME_EN = "FUKUTAN";
const ROLE = "FREELANCE MOBILE APP ENGINEER · TECH LEAD";

const STATS = [
  { num: "15", unit: "年+", lbl: "モバイルアプリ開発歴" },
  { num: "10", unit: "年+", lbl: "Android ネイティブ" },
  { num: "5", unit: "年+", lbl: "Flutter クロスPF" },
  { num: "250", unit: "万DL+", lbl: "個人開発アプリ最高記録" },
];

const PILLARS = [
  {
    title: "Android 10年・Flutter で築くクロスプラットフォーム",
    body: "Androidネイティブ（Kotlin / Java）を10年以上、2021年からはFlutterを主軸に、iOSも含めたクロスプラットフォーム開発を担当。要件に応じて最適な技術・ライブラリを選定します。",
    tags: ["Android", "iOS", "Flutter", "Kotlin", "Dart"],
  },
  {
    title: "新規立ち上げ・フルリプレイスをリリースまで一気通貫",
    body: "0→1の新規アプリから、Nativeアプリの Flutter フルリプレイスまで多数経験。基本設計・アーキテクチャ導入から、ストア申請・Testflight / Firebase 配信まで一貫して推進します。",
    tags: ["0→1", "フルリプレイス", "ストア配信", "MVVM+Repository"],
  },
  {
    title: "アプリリードエンジニアとしてチームを牽引",
    body: "複数案件でアプリリードエンジニアを担当。設計方針の策定とPRレビューで品質を統括し、開発フローをチームに浸透させてブレのない開発を実現します。",
    tags: ["アプリリードエンジニア", "PRレビュー", "設計統括", "品質管理"],
  },
  {
    title: "CI/CD・開発基盤の構築",
    body: "GitHub Actions・Bitrise・AWS を組み合わせ、iOS / Android のビルド・テスト・配信フローを自動化。Firebase Distribution / Testflight への配信まで整え、開発を高速化します。",
    tags: ["CI/CD", "GitHub Actions", "Bitrise", "AWS", "Firebase"],
  },
  {
    title: "AI駆動・仕様書駆動の開発",
    body: "Claude Code や Copilot を開発フローに組み込み、仕様書駆動開発で企画から実装・検証までを高速化。品質を保ちながらリードタイムを大幅に短縮します。",
    tags: ["Claude Code", "Copilot", "仕様書駆動開発", "高速開発"],
  },
  {
    title: "技術コンサル・提案型の伴走",
    body: "EMからの技術相談や技術選定・ライブラリ調査にも対応。仕様書のない現場ではリバースエンジニアリングで要件を起こすなど、課題から逆算した提案型の開発で事業に伴走します。",
    tags: ["技術コンサル", "技術選定", "提案型", "リバースエンジニアリング"],
  },
];

const SKILL_GROUPS = [
  {
    name: "Platforms",
    meta: "ネイティブ / クロスPF",
    items: [
      { name: "Android", lv: 0.96, yrs: "10年+" },
      { name: "Flutter", lv: 0.9, yrs: "5年+" },
      { name: "iOS", lv: 0.7, yrs: "実務" },
    ],
  },
  {
    name: "Languages",
    meta: "主要言語",
    items: [
      { name: "Kotlin", lv: 0.95, yrs: "主力" },
      { name: "Dart", lv: 0.9, yrs: "5年+" },
      { name: "Swift", lv: 0.68, yrs: "実務" },
      { name: "Java", lv: 0.7, yrs: "5年+" },
    ],
  },
  {
    name: "Architecture / State",
    meta: "設計・状態管理",
    items: [
      { name: "MVVM + Repository", lv: 0.95, yrs: "主力" },
      { name: "Riverpod / Hooks", lv: 0.9, yrs: "主力" },
      { name: "StateNotifier / ViewModel", lv: 0.85, yrs: "実務" },
      { name: "クリーンアーキテクチャ", lv: 0.78, yrs: "実務" },
    ],
  },
  {
    name: "Backend / 連携",
    meta: "外部サービス連携",
    items: [
      { name: "Firebase（Firestore / Auth）", lv: 0.88, yrs: "多数" },
      { name: "REST / gRPC", lv: 0.84, yrs: "設計〜実装" },
      { name: "AWS（Cognito 等）", lv: 0.7, yrs: "実務" },
      { name: "Stripe 決済", lv: 0.74, yrs: "実装" },
    ],
  },
  {
    name: "サービス連携",
    meta: "外部SDK・API統合",
    items: [
      { name: "eKYC / 本人認証（Liquid）", lv: 0.82, yrs: "実装" },
      { name: "WebRTC（agora）", lv: 0.8, yrs: "実装" },
      { name: "Stripe 決済", lv: 0.78, yrs: "実装" },
      { name: "アプリ内課金 / 広告", lv: 0.85, yrs: "個人開発" },
      { name: "プッシュ通知（FCM）", lv: 0.84, yrs: "実装" },
      { name: "WebView 連携", lv: 0.82, yrs: "実装" },
    ],
  },
  {
    name: "Infra / DevOps",
    meta: "CI/CD・配信基盤",
    items: [
      { name: "GitHub Actions", lv: 0.88, yrs: "構築" },
      { name: "Bitrise", lv: 0.82, yrs: "構築" },
      { name: "Firebase Distribution", lv: 0.85, yrs: "配信" },
      { name: "Testflight", lv: 0.82, yrs: "配信" },
    ],
  },
  {
    name: "AI-Driven Dev",
    meta: "開発の高速化",
    items: [
      { name: "Claude Code", lv: 0.9, yrs: "実践" },
      { name: "GitHub Copilot", lv: 0.85, yrs: "実践" },
      { name: "仕様書駆動開発", lv: 0.84, yrs: "実践" },
    ],
  },
];

const PROJECTS = [
  {
    title: "招待型SNSアプリの立ち上げ",
    role: "アプリリードエンジニア / Flutter",
    body: "招待型SNSサービスを設計・アーキテクチャ導入から牽引。Claude Code を使った仕様書駆動開発を併用し、Liquidによる本人認証、Stripe決済、Firestoreによるリアルタイムチャットを実装しました。",
    meta: [["役割", "Tech Lead"], ["フェーズ", "0→1"], ["技術", "Flutter / Firebase"]],
    img: "screens/proj-sns.webp",
    shot: "招待制SNS",
  },
  {
    title: "美容系DXスタートアップのCtoCサービスアプリ",
    role: "アプリリードエンジニア / Native→Flutter リプレース",
    body: "美容系DXスタートアップのCtoCサービスアプリを、Nativeからクロスプラットフォーム（Flutter）へフルリプレース。設計・アーキテクチャ刷新を主導し、既存資産を活かしながらiOS / Androidを単一コードベースに統合しました。",
    meta: [["役割", "Tech Lead"], ["案件", "フルリプレース"], ["技術", "Native → Flutter"]],
    img: "screens/proj-beauty.webp",
    shot: "美容DX / CtoC",
  },
  {
    title: "大手ドラッグストアのtoC・店舗アプリ",
    role: "アプリリードエンジニア / Flutter",
    body: "顧客向けと店舗スタッフ向けの2アプリを開発。商品選択から決済、店舗受取までをシームレスに体験できる設計。CI/CDを構築し、gRPC連携やWidgetBook導入でUIコンポーネントを整備しました。",
    meta: [["役割", "Tech Lead"], ["規模", "全体10名+"], ["基盤", "CI/CD・gRPC"]],
    img: "screens/proj-retail.webp",
    shot: "toC / 店舗アプリ",
  },
  {
    title: "医療系アプリ（診察予約・ビデオ診療）",
    role: "リード / 設計・認証基盤 ・ 約2年参画",
    body: "10億円超を調達したスタートアップの医療系アプリを、2週間スプリントのスクラムで約2年にわたり開発。MVVM+Repositoryでの設計を主導し、Webトークン認証やトークンリフレッシュ機構、WebView連携を実装しました。",
    meta: [["役割", "Lead / Architect"], ["規模", "全体30名+"], ["期間", "約2年"]],
    img: "screens/proj-medical.webp",
    shot: "医療 / 診療アプリ",
  },
  {
    title: "個人開発アプリ（家計簿アプリ 250万DL超）",
    role: "企画 / 設計 / 開発 / 運用（個人）",
    body: "企画・UI/UX設計・実装・リリース・運用までを一人で担当。家計簿アプリは累計250万ダウンロードを突破。広告・フリーミアム・アプリ内課金でのマネタイズや商標登録まで自ら手がけました。",
    meta: [["役割", "フルレンジ"], ["最高記録", "250万DL+"], ["範囲", "企画〜運用〜収益化"]],
    img: "screens/proj-finance.webp",
    shot: "家計簿 / 250万DL+",
  },
];

const LEAD_POINTS = [
  { mark: "01", h: "アプリリードエンジニアとしての設計統括", p: "複数案件で基本設計・アーキテクチャ導入・技術選定を主導。設計方針に沿った開発フローをチームに浸透させ、ブレのない開発を確立します。" },
  { mark: "02", h: "コードレビューとリポジトリ運用", p: "PRレビュワーとして一貫した設計方針でレビューを実施。ブランチプロテクト設定やマージ運用まで統括し、品質を仕組みで担保します。" },
  { mark: "03", h: "開発基盤（CI/CD）の構築", p: "GitHub Actions・Bitrise・AWS でビルド/テスト/配信を自動化。Firebase Distribution / Testflight への配信フローまで整備します。" },
  { mark: "04", h: "技術コンサル・オンボーディング整備", p: "EMからの技術相談や技術選定に対応。設計方針・オンボーディング資料を整備し、チームの立ち上がりを支援します。" },
];

const LEAD_STATS = [
  { num: "10", unit: "件+", lbl: "リード参画" },
  { num: "設計→運用", unit: "", lbl: "担当フェーズ" },
  { num: "0→1", unit: "", lbl: "新規立ち上げ" },
  { num: "CI/CD", unit: "", lbl: "基盤構築" },
];

const SUMMARY = [
  ["経験", <span>モバイルアプリ開発歴 <b>15年以上</b>。Android（10年+）を軸に、Flutter（2021〜）で<b>クロスプラットフォーム開発</b>をリード。</span>],
  ["役割", <span>多くの案件で<b>アプリリードエンジニア</b>。設計・アーキテクチャ導入・技術選定からPRレビュー、チーム連携まで担当。</span>],
  ["立ち上げ", <span>新規アプリの <b>0→1</b> や Native→Flutter の<b>フルリプレイス</b>を、設計から<b>ストア配信</b>まで一気通貫で推進。</span>],
  ["基盤", <span>GitHub Actions・Bitrise・AWS で <b>CI/CD</b> を構築し、Firebase Distribution / Testflight への配信を自動化。</span>],
  ["AI駆動開発", <span><b>Claude Code</b> / Copilot を用いた<b>仕様書駆動開発</b>で、企画から検証までを高速化。</span>],
  ["個人開発", <span>家計簿アプリで累計 <b>250万DL超</b>。企画から運用・収益化・商標登録までを単独で完遂。</span>],
];

const NAV = [
  { id: "strengths", label: "強み" },
  { id: "skills", label: "スキル" },
  { id: "projects", label: "実績" },
  { id: "lead", label: "リード経験" },
  { id: "summary", label: "経歴" },
  { id: "industries", label: "業種" },
];

/* 業種別の経験 — 全17案件を業種で分類し、案件の通算月数で集計（兼務含む） */
const IND_TOTAL_MONTHS = 232;
const INDUSTRIES = [
  { name: "個人開発・自社サービス", months: 93, count: 2, note: "家計簿 250万DL 含む" },
  { name: "情報通信・SNS / CtoC", months: 43, count: 4, note: "招待SNS・フルリプレース" },
  { name: "医療・ヘルスケア", months: 30, count: 2, note: "診療予約・ビデオ診療" },
  { name: "小売・流通", months: 27, count: 3, note: "ドラッグストア・ファッション" },
  { name: "音楽・放送・ゲーム", months: 20, count: 3, note: "ライブ配信・ラジオ・IP" },
  { name: "スポーツ・写真", months: 11, count: 2, note: "リーグ公式・スタジオ" },
  { name: "IoT・インフラ", months: 8, count: 1, note: "機器管理アプリ" },
];

/* version switcher targets (shared across all 3 designs) */
const DESIGNS = [
  { id: "a", label: "案A", sub: "Minimal", href: "index.html" },
  { id: "b", label: "案B", sub: "Spec Sheet", href: "spec.html" },
  { id: "c", label: "案C", sub: "Editorial", href: "editorial.html" },
];
