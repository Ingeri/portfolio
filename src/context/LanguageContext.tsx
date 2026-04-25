"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    // Home page
    webDeveloper: "Web & Software Developer",
    heroTitle: "Interactive apps with polished engineering.",
    heroDescription: "I build interfaces that move naturally, APIs that scale reliably, and software that supports real business value. Explore work across frontend, backend, and full-stack delivery.",
    seeProjects: "See Projects",
    learnAbout: "Learn About Me",
    projectsDelivered: "Projects delivered",
    yearsExperience: "Years experience",
    techStack: "Tech stack",
    designSystems: "Design systems built for scale",
    designSystemsDesc: "Reusable UI patterns, accessibility-first layouts, and component-driven workflows for fast delivery.",
    fullStack: "Full-stack product delivery",
    fullStackDesc: "From frontend interfaces to backend APIs, I ship end-to-end solutions with reliability and speed.",
    highPerformance: "High-performance experiences",
    highPerformanceDesc: "I optimize loading, interactions, and visuals so products feel polished and responsive.",
    // About page
    aboutMe: "About Me",
    aboutTitle: "Solve problems with code & strong engineering.",
    aboutDesc: "I combine frontend craftsmanship with backend reliability to build products that users enjoy and teams can maintain. My work is grounded in clean architecture, fast interfaces, and a clear development process.",
    yearsCoding: "Years coding",
    deliveredProjects: "Delivered projects",
    careerHighlights: "Career highlights",
    fullStackLaunches: "Full-stack launches",
    fullStackDetail: "Delivered multiple production apps with React, Next.js, and Node.js integrations.",
    uxPerformance: "UX and performance focus",
    uxDetail: "Built polished user interfaces with accessibility, speed, and animation in mind.",
    softwareEngineering: "Software engineering foundation",
    softwareDetail: "Built backend services, REST APIs, and scalable tooling for modern web products.",
    howIWork: "How I work",
    plan: "Plan",
    planDesc: "Understand the problem, define goals, and align the product with user and business needs.",
    build: "Build",
    buildDesc: "Write reliable code with modern tools, reusable patterns, and polished UI interactions.",
    refine: "Refine",
    refineDesc: "Test, optimize, and maintain the product so it stays fast and easy to expand.",
    // Projects page
    projectsLabel: "Projects",
    projectsTitle: "Real work with real product focus.",
    projectsDesc: "These projects highlight responsive interfaces, solid architecture, and practical developer tooling.",
    portfolioDashboard: "Portfolio Dashboard",
    portfolioRole: "UI + interaction design",
    portfolioSummary: "A clean responsive developer dashboard with animated UI components and fast load behavior.",
    taskMgmt: "Task Management App",
    taskRole: "Full-stack delivery",
    taskSummary: "A productivity tool built for teams, with task states, persistence, and an intuitive workflow.",
    apiSync: "API Sync Service",
    apiRole: "Backend architecture",
    apiSummary: "A service that connects multiple APIs, normalizes data, and keeps systems in sync.",
    designSystem: "Design System Kit",
    designRole: "Component library",
    designSummary: "A reusable style system created to accelerate design consistency across apps.",
    // Blog page
    articles: "Articles",
    blogTitle: "Thoughts on web development, software architecture, and modern tooling.",
    blogDesc: "Sharing insights from years of building scalable web applications and tackling real-world engineering challenges.",
    readMore: "Read →",
    minRead: "min read",
    // Contact page
    contactLabel: "Contact",
    contactTitle: "Let's build something meaningful together.",
    contactDesc: "I'm open to web development, software engineering, and product collaborations. Reach out to discuss an idea, contractor opportunity, or technical project.",
    email: "Email",
    visitProfile: "Visit profile",
    // Settings page
    settingsTitle: "Customize your experience",
    settingsDescription: "Personalize your portfolio viewing preferences.",
    languageTitle: "Language",
    languageDescription: "Choose your preferred language for the website.",
    accessibilityTitle: "Accessibility",
    fontSizeLabel: "Font Size",
    notificationsTitle: "Notifications",
    notificationsDescription: "Get notified about important updates and messages.",
    savedNote: "Your selected language and display preferences are saved locally.",
  },
  es: {
    // Navigation
    home: "Inicio",
    about: "Acerca de",
    projects: "Proyectos",
    blog: "Blog",
    contact: "Contacto",
    settings: "Configuración",
    language: "Idioma",
    theme: "Tema",
    // Home page
    webDeveloper: "Desarrollador Web y Software",
    heroTitle: "Aplicaciones interactivas con ingeniería pulida.",
    heroDescription: "Construyo interfaces que se mueven naturalmente, APIs que escalan de manera confiable y software que respalda valor empresarial real. Explora el trabajo en desarrollo frontend, backend y full-stack.",
    seeProjects: "Ver Proyectos",
    learnAbout: "Aprende sobre mí",
    projectsDelivered: "Proyectos entregados",
    yearsExperience: "Años de experiencia",
    techStack: "Stack de tecnología",
    designSystems: "Sistemas de diseño construidos para escala",
    designSystemsDesc: "Patrones UI reutilizables, diseños accesibles en primer lugar y flujos impulsados por componentes para entrega rápida.",
    fullStack: "Entrega de producto full-stack",
    fullStackDesc: "Desde interfaces frontend hasta APIs backend, entrego soluciones de extremo a extremo con confiabilidad y velocidad.",
    highPerformance: "Experiencias de alto rendimiento",
    highPerformanceDesc: "Optimizo la carga, interacciones y visuals para que los productos se sientan pulidos y responsivos.",
    // About page
    aboutMe: "Acerca de mí",
    aboutTitle: "Resuelve problemas con código e ingeniería sólida.",
    aboutDesc: "Combino la artesanía frontend con la confiabilidad backend para construir productos que los usuarios disfruten y que los equipos puedan mantener. Mi trabajo se basa en arquitectura limpia, interfaces rápidas y un proceso de desarrollo claro.",
    yearsCoding: "Años programando",
    deliveredProjects: "Proyectos entregados",
    careerHighlights: "Logros destacados",
    fullStackLaunches: "Lanzamientos full-stack",
    fullStackDetail: "Entregué múltiples aplicaciones de producción con integraciones de React, Next.js y Node.js.",
    uxPerformance: "Enfoque en UX y rendimiento",
    uxDetail: "Construí interfaces de usuario pulidas con accesibilidad, velocidad y animación en mente.",
    softwareEngineering: "Base de ingeniería de software",
    softwareDetail: "Construí servicios backend, API REST y herramientas escalables para productos web modernos.",
    howIWork: "Cómo trabajo",
    plan: "Planificar",
    planDesc: "Comprenda el problema, defina objetivos y alinee el producto con las necesidades de usuarios y negocios.",
    build: "Construir",
    buildDesc: "Escribe código confiable con herramientas modernas, patrones reutilizables e interacciones UI pulidas.",
    refine: "Refinar",
    refineDesc: "Prueba, optimiza y mantén el producto para que sea rápido y fácil de expandir.",
    // Projects page
    projectsLabel: "Proyectos",
    projectsTitle: "Trabajo real con enfoque de producto real.",
    projectsDesc: "Estos proyectos destacan interfaces receptivas, arquitectura sólida y herramientas de desarrollo prácticas.",
    portfolioDashboard: "Panel de Portafolio",
    portfolioRole: "Diseño UI + interacción",
    portfolioSummary: "Un panel de desarrollo limpio y receptivo con componentes UI animados y comportamiento de carga rápida.",
    taskMgmt: "Aplicación de Gestión de Tareas",
    taskRole: "Entrega full-stack",
    taskSummary: "Una herramienta de productividad construida para equipos, con estados de tareas, persistencia y flujo de trabajo intuitivo.",
    apiSync: "Servicio de Sincronización de API",
    apiRole: "Arquitectura backend",
    apiSummary: "Un servicio que conecta múltiples API, normaliza datos y mantiene los sistemas sincronizados.",
    designSystem: "Kit de Sistema de Diseño",
    designRole: "Biblioteca de componentes",
    designSummary: "Un sistema de estilo reutilizable creado para acelerar la consistencia de diseño en aplicaciones.",
    // Blog page
    articles: "Artículos",
    blogTitle: "Pensamientos sobre desarrollo web, arquitectura de software y herramientas modernas.",
    blogDesc: "Compartiendo insights de años construcción de aplicaciones web escalables y abordando desafíos de ingeniería del mundo real.",
    readMore: "Leer →",
    minRead: "min de lectura",
    // Contact page
    contactLabel: "Contacto",
    contactTitle: "Construyamos algo significativo juntos.",
    contactDesc: "Estoy abierto a desarrollo web, ingeniería de software y colaboraciones de producto. Comunícate para discutir una idea, oportunidad de contratista o proyecto técnico.",
    email: "Correo electrónico",
    visitProfile: "Visitar perfil",
    // Settings page
    settingsTitle: "Personaliza tu experiencia",
    settingsDescription: "Ajusta las preferencias de visualización de tu portafolio.",
    languageTitle: "Idioma",
    languageDescription: "Elige tu idioma preferido para el sitio web.",
    accessibilityTitle: "Accesibilidad",
    fontSizeLabel: "Tamaño de fuente",
    notificationsTitle: "Notificaciones",
    notificationsDescription: "Recibe actualizaciones importantes y mensajes.",
    savedNote: "Tus ajustes se guardan localmente.",
  },
  fr: {
    // Navigation
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    blog: "Blog",
    contact: "Contact",
    settings: "Paramètres",
    language: "Langue",
    theme: "Thème",
    // Home page
    webDeveloper: "Développeur Web et Logiciel",
    heroTitle: "Des applications interactives avec une ingénierie soignée.",
    heroDescription: "Je crée des interfaces qui se déplacent naturellement, des API qui évoluent de manière fiable et des logiciels qui créent une véritable valeur commerciale. Explorez le travail en développement frontend, backend et full-stack.",
    seeProjects: "Voir les Projets",
    learnAbout: "En savoir plus sur moi",
    projectsDelivered: "Projets livrés",
    yearsExperience: "Années d'expérience",
    techStack: "Stack technologique",
    designSystems: "Systèmes de conception construits à l'échelle",
    designSystemsDesc: "Motifs UI réutilisables, mises en page axées sur l'accessibilité et flux pilotés par composants pour une livraison rapide.",
    fullStack: "Livraison de produits full-stack",
    fullStackDesc: "Des interfaces frontend aux API backend, je livre des solutions de bout en bout avec fiabilité et rapidité.",
    highPerformance: "Expériences haute performance",
    highPerformanceDesc: "J'optimise le chargement, les interactions et les visuels pour que les produits se sentent polis et réactifs.",
    // About page
    aboutMe: "À propos de moi",
    aboutTitle: "Résoudre les problèmes avec du code et une ingénierie solide.",
    aboutDesc: "Je combine l'artisanat frontend avec la fiabilité backend pour construire des produits que les utilisateurs apprécient et que les équipes peuvent maintenir. Mon travail est fondé sur une architecture propre, des interfaces rapides et un processus de développement clair.",
    yearsCoding: "Années de codage",
    deliveredProjects: "Projets livrés",
    careerHighlights: "Jalons de carrière",
    fullStackLaunches: "Lancements full-stack",
    fullStackDetail: "J'ai livré plusieurs applications de production avec les intégrations React, Next.js et Node.js.",
    uxPerformance: "Focus UX et performance",
    uxDetail: "J'ai construit des interfaces utilisateur soignées avec l'accessibilité, la vitesse et l'animation à l'esprit.",
    softwareEngineering: "Fondation d'ingénierie logicielle",
    softwareDetail: "J'ai construit des services backend, des API REST et des outils évolutifs pour les produits web modernes.",
    howIWork: "Comment je travaille",
    plan: "Planifier",
    planDesc: "Comprendre le problème, définir les objectifs et aligner le produit avec les besoins des utilisateurs et de l'entreprise.",
    build: "Construire",
    buildDesc: "Écrivez du code fiable avec des outils modernes, des modèles réutilisables et des interactions UI soignées.",
    refine: "Affiner",
    refineDesc: "Testez, optimisez et maintenez le produit pour qu'il reste rapide et facile à développer.",
    // Projects page
    projectsLabel: "Projets",
    projectsTitle: "Un vrai travail avec un vrai focus produit.",
    projectsDesc: "Ces projets mettent en évidence des interfaces réactives, une architecture solide et des outils de développement pratiques.",
    portfolioDashboard: "Tableau de Bord Portfolio",
    portfolioRole: "Conception UI + interaction",
    portfolioSummary: "Un tableau de bord pour développeur propre et réactif avec des composants UI animés et un comportement de chargement rapide.",
    taskMgmt: "Application de Gestion des Tâches",
    taskRole: "Livraison full-stack",
    taskSummary: "Un outil de productivité construit pour les équipes, avec états de tâches, persistance et flux de travail intuitif.",
    apiSync: "Service de Synchronisation API",
    apiRole: "Architecture backend",
    apiSummary: "Un service qui connecte plusieurs API, normalise les données et maintient les systèmes synchronisés.",
    designSystem: "Kit de Système de Design",
    designRole: "Bibliothèque de composants",
    designSummary: "Un système de style réutilisable créé pour accélérer la cohérence du design sur les applications.",
    // Blog page
    articles: "Articles",
    blogTitle: "Pensées sur le développement web, l'architecture logicielle et les outils modernes.",
    blogDesc: "Partage d'idées après des années de création d'applications web scalables et de résolution de défis d'ingénierie du monde réel.",
    readMore: "Lire →",
    minRead: "min de lecture",
    // Contact page
    contactLabel: "Contact",
    contactTitle: "Construisons quelque chose de significatif ensemble.",
    contactDesc: "Je suis ouvert au développement web, à l'ingénierie logicielle et aux collaborations de produits. Contactez-moi pour discuter d'une idée, d'une opportunité de contrat ou d'un projet technique.",
    email: "E-mail",
    visitProfile: "Visiter le profil",
    // Settings page
    settingsTitle: "Personnalisez votre expérience",
    settingsDescription: "Personnalisez les préférences d'affichage de votre portfolio.",
    languageTitle: "Langue",
    languageDescription: "Choisissez votre langue préférée pour le site.",
    accessibilityTitle: "Accessibilité",
    fontSizeLabel: "Taille de police",
    notificationsTitle: "Notifications",
    notificationsDescription: "Recevez des mises à jour et des messages importants.",
    savedNote: "Vos préférences sont enregistrées localement.",
  },
  de: {
    // Navigation
    home: "Startseite",
    about: "Über mich",
    projects: "Projekte",
    blog: "Blog",
    contact: "Kontakt",
    settings: "Einstellungen",
    language: "Sprache",
    theme: "Design",
    // Home page
    webDeveloper: "Web- und Softwareentwickler",
    heroTitle: "Interaktive Apps mit ausgefeilter Ingenieurskunst.",
    heroDescription: "Ich entwickle Schnittstellen, die sich natürlich anfühlen, APIs, die zuverlässig skalieren, und Software, die echten Geschäftswert bietet. Erkunden Sie Arbeiten im Frontend-, Backend- und Full-Stack-Bereich.",
    seeProjects: "Projekte anzeigen",
    learnAbout: "Mehr über mich erfahren",
    projectsDelivered: "Projekte bereitgestellt",
    yearsExperience: "Jahre Erfahrung",
    techStack: "Technologie-Stack",
    designSystems: "Designsysteme für Skalierbarkeit",
    designSystemsDesc: "Wiederverwendbare UI-Muster, barrierefreie Layouts und komponentengesteuerte Workflows für schnelle Lieferung.",
    fullStack: "Full-Stack-Produktlieferung",
    fullStackDesc: "Von Frontend-Schnittstellen bis zu Backend-APIs liefere ich End-to-End-Lösungen mit Zuverlässigkeit und Geschwindigkeit.",
    highPerformance: "Hochleistungs-Erlebnisse",
    highPerformanceDesc: "Ich optimiere Ladevorgänge, Interaktionen und Visuals, damit sich Produkte poliert und reaktiv anfühlen.",
    // About page
    aboutMe: "Über mich",
    aboutTitle: "Löse Probleme mit Code und starkem Engineering.",
    aboutDesc: "Ich verbinde Frontend-Handwerk mit Backend-Zuverlässigkeit, um Produkte zu bauen, die Benutzer lieben und Teams warten können. Meine Arbeit basiert auf sauberer Architektur, schnellen Schnittstellen und einem klaren Entwicklungsprozess.",
    yearsCoding: "Jahre Code",
    deliveredProjects: "Ausgelieferte Projekte",
    careerHighlights: "Karriere-Meilensteine",
    fullStackLaunches: "Full-Stack-Launches",
    fullStackDetail: "Mehrere Produktionsanwendungen mit React-, Next.js- und Node.js-Integrationen bereitgestellt.",
    uxPerformance: "UX- und Leistungsfokus",
    uxDetail: "Baute polierte Benutzeroberflächen mit Barrierefreiheit, Geschwindigkeit und Animation im Hinterkopf.",
    softwareEngineering: "Grundlagen der Softwareentwicklung",
    softwareDetail: "Baute Backend-Services, REST-APIs und skalierbare Tools für moderne Web-Produkte.",
    howIWork: "So arbeite ich",
    plan: "Planen",
    planDesc: "Verstehen Sie das Problem, definieren Sie Ziele und stimmen Sie das Produkt mit den Bedürfnissen von Benutzern und Unternehmen ab.",
    build: "Bauen",
    buildDesc: "Schreiben Sie zuverlässigen Code mit modernen Tools, wiederverwendbaren Mustern und polierten UI-Interaktionen.",
    refine: "Verfeinern",
    refineDesc: "Testen, optimieren und warten Sie das Produkt, damit es schnell und leicht zu erweitern bleibt.",
    // Projects page
    projectsLabel: "Projekte",
    projectsTitle: "Echte Arbeit mit echtem Produktfokus.",
    projectsDesc: "Diese Projekte zeigen responsive Schnittstellen, solide Architektur und praktische Entwickler-Tools.",
    portfolioDashboard: "Portfolio-Dashboard",
    portfolioRole: "UI + Interaktionsdesign",
    portfolioSummary: "Ein sauberes, responsives Entwickler-Dashboard mit animierten UI-Komponenten und schnellem Ladeverhalten.",
    taskMgmt: "Aufgabenverwaltungs-App",
    taskRole: "Full-Stack-Lieferung",
    taskSummary: "Ein für Teams entwickeltes Produktivitätstool mit Aufgabenstatus, Persistenz und intuitivem Workflow.",
    apiSync: "API-Synchronisationsdienst",
    apiRole: "Backend-Architektur",
    apiSummary: "Ein Service, der mehrere APIs verbindet, Daten normalisiert und Systeme synchron hält.",
    designSystem: "Design System Kit",
    designRole: "Komponentenbibliothek",
    designSummary: "Ein wiederverwendbares Styling-System zur Beschleunigung der Design-Konsistenz über Apps hinweg.",
    // Blog page
    articles: "Artikel",
    blogTitle: "Gedanken zu Webentwicklung, Softwarearchitektur und modernen Tools.",
    blogDesc: "Teilen von Erkenntnissen aus Jahren des Aufbaus skalierbarer Webanwendungen und der Bewältigung realer technischer Herausforderungen.",
    readMore: "Lesen →",
    minRead: "Min Lesezeit",
    // Contact page
    contactLabel: "Kontakt",
    contactTitle: "Lassen Sie uns zusammen etwas Bedeutsames bauen.",
    contactDesc: "Ich bin offen für Webentwicklung, Softwaretechnik und Produktzusammenarbeit. Nehmen Sie Kontakt auf, um eine Idee, eine Auftragsarbeit oder ein technisches Projekt zu besprechen.",
    email: "E-Mail",
    visitProfile: "Profil besuchen",
    // Settings page
    settingsTitle: "Passen Sie Ihre Erfahrung an",
    settingsDescription: "Personalisieren Sie die Anzeigeeinstellungen Ihres Portfolios.",
    languageTitle: "Sprache",
    languageDescription: "Wähle deine bevorzugte Sprache für die Website.",
    accessibilityTitle: "Barrierefreiheit",
    fontSizeLabel: "Schriftgröße",
    notificationsTitle: "Benachrichtigungen",
    notificationsDescription: "Erhalte wichtige Updates und Nachrichten.",
    savedNote: "Deine Einstellungen werden lokal gespeichert.",
  },
  ja: {
    // Navigation
    home: "ホーム",
    about: "について",
    projects: "プロジェクト",
    blog: "ブログ",
    contact: "お問い合わせ",
    settings: "設定",
    language: "言語",
    theme: "テーマ",
    // Home page
    webDeveloper: "ウェブ・ソフトウェア開発者",
    heroTitle: "洗練されたエンジニアリングを備えたインタラクティブアプリ。",
    heroDescription: "自然に動くインターフェース、信頼性高くスケールするAPI、実ビジネス価値を支えるソフトウェアを構築します。フロントエンド、バックエンド、フルスタック開発にわたる作品をご覧ください。",
    seeProjects: "プロジェクトを見る",
    learnAbout: "詳しく知る",
    projectsDelivered: "納品プロジェクト",
    yearsExperience: "年の経験",
    techStack: "技術スタック",
    designSystems: "スケール向けに構築されたデザインシステム",
    designSystemsDesc: "再利用可能なUIパターン、アクセシビリティ優先のレイアウト、コンポーネント駆動ワークフローで迅速な納品を実現。",
    fullStack: "フルスタック製品デリバリー",
    fullStackDesc: "フロントエンドインターフェースからバックエンドAPIまで、信頼性とスピードを備えたエンドツーエンドソリューションを提供します。",
    highPerformance: "高パフォーマンスエクスペリエンス",
    highPerformanceDesc: "読み込み、インタラクション、ビジュアルを最適化し、製品が洗練されレスポンシブに感じられるようにします。",
    // About page
    aboutMe: "について",
    aboutTitle: "コードと強力なエンジニアリングで問題を解決します。",
    aboutDesc: "フロントエンドの職人技とバックエンドの信頼性を組み合わせて、ユーザーが楽しめ、チームが保守できる製品を構築します。私の作業は、クリーンアーキテクチャ、高速インターフェース、明確な開発プロセスに基づいています。",
    yearsCoding: "年のコーディング経験",
    deliveredProjects: "納品プロジェクト",
    careerHighlights: "キャリアハイライト",
    fullStackLaunches: "フルスタックローンチ",
    fullStackDetail: "React、Next.js、Node.jsの統合により、複数の本番環境アプリケーションを納品しました。",
    uxPerformance: "UXとパフォーマンスに焦点",
    uxDetail: "アクセシビリティ、スピード、アニメーションに配慮した、洗練されたユーザーインターフェースを構築しました。",
    softwareEngineering: "ソフトウェアエンジニアリングの基礎",
    softwareDetail: "バックエンドサービス、REST API、および最新のWebプロダクト向けのスケーラブルなツールを構築しました。",
    howIWork: "仕事のやり方",
    plan: "計画",
    planDesc: "問題を理解し、目標を定義し、製品をユーザーとビジネスのニーズと整合させます。",
    build: "構築",
    buildDesc: "最新のツール、再利用可能なパターン、洗練されたUI相互作用を使用して信頼性の高いコードを作成します。",
    refine: "改善",
    refineDesc: "テスト、最適化、製品の保守を行い、高速で拡張しやすい状態を保ちます。",
    // Projects page
    projectsLabel: "プロジェクト",
    projectsTitle: "本当に焦点を当てた実際の仕事。",
    projectsDesc: "これらのプロジェクトは、応答性の高いインターフェース、堅牢なアーキテクチャ、実用的な開発者ツールを強調しています。",
    portfolioDashboard: "ポートフォリオダッシュボード",
    portfolioRole: "UI+インタラクションデザイン",
    portfolioSummary: "アニメーションUIコンポーネントと高速読み込み動作を備えたクリーンでレスポンシブな開発者ダッシュボード。",
    taskMgmt: "タスク管理アプリ",
    taskRole: "フルスタックデリバリー",
    taskSummary: "チーム向けの生産性向上ツール。タスク状態、永続性、直感的なワークフローを備えています。",
    apiSync: "APISync Service",
    apiRole: "バックエンドアーキテクチャ",
    apiSummary: "複数のAPIを接続し、データを正規化し、システムを同期に保つサービス。",
    designSystem: "デザインシステムキット",
    designRole: "コンポーネントライブラリ",
    designSummary: "アプリ全体の設計の一貫性を加速させるために作成された再利用可能なスタイルシステム。",
    // Blog page
    articles: "記事",
    blogTitle: "Web開発、ソフトウェアアーキテクチャ、最新ツールに関する考え。",
    blogDesc: "スケーラブルなWebアプリケーションの構築と現実のエンジニアリング課題への対応から得た洞察を共有しています。",
    readMore: "読む →",
    minRead: "分読む",
    // Contact page
    contactLabel: "お問い合わせ",
    contactTitle: "一緒に意味のあるものを作りましょう。",
    contactDesc: "Web開発、ソフトウェアエンジニアリング、製品コラボレーションに対応しています。アイデア、請負の機会、またはテクニカルプロジェクトについて話し合うために、お便りください。",
    email: "メール",
    visitProfile: "プロフィールを訪問",
    // Settings page
    settingsTitle: "エクスペリエンスをカスタマイズ",
    settingsDescription: "ポートフォリオの表示設定をパーソナライズします。",
    languageTitle: "言語",
    languageDescription: "ウェブサイトの使用言語を選択してください。",
    accessibilityTitle: "アクセシビリティ",
    fontSizeLabel: "フォントサイズ",
    notificationsTitle: "通知",
    notificationsDescription: "重要な更新やメッセージを受け取ります。",
    savedNote: "設定はローカルに保存されます。",
  },
};

type Language = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storedLanguage = localStorage.getItem("language") as Language | null;
    if (storedLanguage && translations[storedLanguage]) {
      setLanguageState(storedLanguage);
      if (typeof document !== "undefined") {
        document.documentElement.lang = storedLanguage;
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Update HTML lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
