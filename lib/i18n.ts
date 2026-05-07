export type Language = 'en' | 'ja'

export const translations = {
  en: {
    nav: {
      documentation: 'Documentation',
      github: 'GitHub',
      download: 'Download',
      changelog: 'Changelog',
      search: 'Search...',
    },
    sidebar: {
      home: 'Documentation Home',
      categories: {
        'getting-started': 'GETTING STARTED',
        features: 'FEATURES',
        configuration: 'CONFIGURATION',
        'network-proxy': 'NETWORK & PROXY',
        troubleshooting: 'TROUBLESHOOTING',
        developer: 'FOR DEVELOPERS',
      },
    },
    docs: {
      title: 'Documentation',
      subtitle: 'Everything you need to know about MC-Vector.',
      cards: {
        gettingStarted: 'Getting Started',
        advancedGuides: 'Features',
        configuration: 'Configuration',
        networkProxy: 'Network & Proxy',
        troubleshooting: 'Troubleshooting',
        developer: 'For Developers',
      },
      links: {
        installation: {
          label: 'Installation',
          sub: 'Install MC-Vector on your machine',
        },
        serverCreation: {
          label: 'First Server',
          sub: 'Create your first Minecraft server',
        },
        serverLifecycle: {
          label: 'Server Lifecycle',
          sub: 'Start, stop, and monitor servers',
        },
        pluginsMods: {
          label: 'Plugins & Mods',
          sub: 'Install from Modrinth & Hangar',
        },
        backupRestore: { label: 'Backups', sub: 'Create and restore backups' },
        fileManager: {
          label: 'File Manager',
          sub: 'Browse and edit server files',
        },
        consoleLogs: {
          label: 'Console & Logs',
          sub: 'Live log streaming & commands',
        },
        serverProperties: {
          label: 'Server Properties',
          sub: 'Configure 60+ server settings',
        },
        themeCustomization: {
          label: 'Themes',
          sub: '9 built-in visual themes',
        },
        generalSettings: {
          label: 'General Settings',
          sub: 'Name, software, version & memory',
        },
        ngrokTunnel: {
          label: 'ngrok Tunnel',
          sub: 'Share your server publicly',
        },
        velocitySetup: {
          label: 'Proxy Setup',
          sub: 'Configure a proxy network',
        },
        commonErrors: {
          label: 'Common Errors',
          sub: 'Fix frequent Minecraft server issues',
        },
        performance: {
          label: 'Performance',
          sub: 'Optimize server performance',
        },
        developerSetup: {
          label: 'Developer Setup',
          sub: 'Clone, build, and contribute',
        },
        architecture: {
          label: 'Architecture',
          sub: 'How MC-Vector works internally',
        },
      },
      descriptions: {
        'getting-started/installation':
          'Install and set up MC-Vector on your machine.',
        'getting-started/server-creation':
          'Create your first Minecraft server using MC-Vector.',
        'features/server-lifecycle':
          'Learn how to start, stop, restart, and monitor your Minecraft servers.',
        'features/plugins-mods':
          'Install and manage plugins and mods directly from MC-Vector.',
        'features/backup-restore':
          'Create and restore manual backups of your Minecraft server.',
        'features/file-manager':
          'Browse, edit, and organize your server files directly from MC-Vector.',
        'features/console-logs':
          'Stream live server logs and send commands in real time.',
        'configuration/server-properties':
          'A complete guide to configuring server.properties in MC-Vector.',
        'configuration/theme-customization':
          'Personalize the look and feel of MC-Vector.',
        'configuration/general-settings':
          'Edit server name, software, version, and memory allocation for each server.',
        'network-proxy/ngrok-tunnel':
          'Share your local Minecraft server with the world using ngrok.',
        'network-proxy/velocity-setup':
          'Configure a proxy network using Velocity, Waterfall, or BungeeCord with MC-Vector.',
        'troubleshooting/common-errors':
          'Solutions to the most frequent errors when running a Minecraft server with MC-Vector.',
        'troubleshooting/performance':
          'Reduce lag and optimize your Minecraft server when using MC-Vector.',
        'developer/setup':
          'Project structure, config file paths, and development environment setup for MC-Vector.',
        'developer/architecture':
          'How MC-Vector works internally — component architecture, IPC flow, and data pipelines.',
      },
    },
    download: {
      title: 'Download MC-Vector',
      subtitle: 'The latest stable release, ready to install.',
      released: 'Released',
      requirements: 'System Requirements',
      reqOs: 'Operating System',
      reqJava: 'Java',
      reqRam: 'Memory',
      javaAuto: 'auto-downloaded if missing',
      ramRec: 'recommended',
      allReleases: 'View all releases on GitHub',
      loadError: 'Failed to load release information.',
    },
    changelog: {
      title: 'Changelog',
      subtitle: 'Latest commits to the main branch of MC-Vector.',
      viewOnGithub: 'View on GitHub',
      loadError: 'Failed to load commits.',
      noCommits: 'No commits found.',
      by: 'by',
    },
    footer: {
      description: 'Official Wiki for MC-Vector.',
    },
  },
  ja: {
    nav: {
      documentation: 'ドキュメント',
      github: 'GitHub',
      download: 'ダウンロード',
      changelog: '変更履歴',
      search: '検索...',
    },
    sidebar: {
      home: 'ドキュメントホーム',
      categories: {
        'getting-started': 'はじめに',
        features: '機能',
        configuration: '設定',
        'network-proxy': 'ネットワーク & プロキシ',
        troubleshooting: 'トラブルシューティング',
        developer: '開発者向け',
      },
    },
    docs: {
      title: 'ドキュメント',
      subtitle: 'MC-Vectorに関するすべての情報。',
      cards: {
        gettingStarted: 'はじめに',
        advancedGuides: '機能',
        configuration: '設定',
        networkProxy: 'ネットワーク & プロキシ',
        troubleshooting: 'トラブルシューティング',
        developer: '開発者向け',
      },
      links: {
        installation: {
          label: 'インストール',
          sub: 'MC-Vectorをマシンにインストール',
        },
        serverCreation: {
          label: 'サーバー作成',
          sub: '初めてのMinecraftサーバーを作成',
        },
        serverLifecycle: {
          label: 'サーバーライフサイクル',
          sub: '起動・停止・監視',
        },
        pluginsMods: {
          label: 'プラグイン & MOD',
          sub: 'Modrinth & Hangarからインストール',
        },
        backupRestore: {
          label: 'バックアップ',
          sub: 'バックアップの作成と復元',
        },
        fileManager: {
          label: 'ファイルマネージャー',
          sub: 'サーバーファイルの閲覧・編集',
        },
        consoleLogs: {
          label: 'コンソール & ログ',
          sub: 'ライブログとコマンド実行',
        },
        serverProperties: {
          label: 'サーバープロパティ',
          sub: '60以上の設定を変更',
        },
        themeCustomization: { label: 'テーマ', sub: '9種類のビジュアルテーマ' },
        generalSettings: {
          label: '基本設定',
          sub: '名前・ソフト・バージョン・メモリ',
        },
        ngrokTunnel: {
          label: 'ngrokトンネル',
          sub: 'サーバーをインターネットで公開',
        },
        velocitySetup: {
          label: 'プロキシセットアップ',
          sub: 'プロキシネットワークの設定',
        },
        commonErrors: {
          label: 'よくあるエラー',
          sub: '頻発するエラーの解決策',
        },
        performance: { label: 'パフォーマンス', sub: 'サーバーの最適化' },
        developerSetup: {
          label: '開発環境セットアップ',
          sub: 'クローン・ビルド・コントリビュート',
        },
        architecture: { label: 'アーキテクチャ', sub: 'MC-Vectorの内部構造' },
      },
      descriptions: {
        'getting-started/installation':
          'MC-Vectorをマシンにインストールしてセットアップします。',
        'getting-started/server-creation':
          'MC-Vectorを使って初めてのMinecraftサーバーを作成します。',
        'features/server-lifecycle':
          'Minecraftサーバーの起動・停止・再起動・監視方法。',
        'features/plugins-mods':
          'MC-Vectorから直接プラグインとMODをインストール・管理します。',
        'features/backup-restore':
          'Minecraftサーバーの手動バックアップを作成・復元します。',
        'features/file-manager':
          'MC-Vectorからサーバーファイルを直接参照・編集・整理します。',
        'features/console-logs':
          'ライブサーバーログのストリーミングとコマンドのリアルタイム実行。',
        'configuration/server-properties':
          'MC-Vectorでserver.propertiesを設定するための完全ガイド。',
        'configuration/theme-customization':
          'MC-Vectorの外観をカスタマイズします。',
        'configuration/general-settings':
          'サーバー名・ソフトウェア・バージョン・メモリ割り当ての変更。',
        'network-proxy/ngrok-tunnel':
          'ngrokを使ってローカルのMinecraftサーバーを公開します。',
        'network-proxy/velocity-setup':
          'Velocity・Waterfall・BungeeCordを使ったプロキシネットワークの設定。',
        'troubleshooting/common-errors':
          'MC-VectorでMinecraftサーバーを動かす際によく発生するエラーの解決策。',
        'troubleshooting/performance':
          'MC-Vectorを使ったMinecraftサーバーのラグ軽減と最適化。',
        'developer/setup':
          'プロジェクト構成・設定ファイルパス・MC-Vectorの開発環境セットアップ。',
        'developer/architecture':
          'コンポーネント図・IPCフロー・データパイプラインなど内部構造を解説します。',
      },
    },
    download: {
      title: 'MC-Vectorをダウンロード',
      subtitle: '最新の安定版リリース。',
      released: 'リリース日',
      requirements: 'システム要件',
      reqOs: 'OS',
      reqJava: 'Java',
      reqRam: 'メモリ',
      javaAuto: '未インストール時は自動ダウンロード',
      ramRec: '推奨',
      allReleases: 'GitHubですべてのリリースを見る',
      loadError: 'リリース情報の取得に失敗しました。',
    },
    changelog: {
      title: '変更履歴',
      subtitle: 'MC-Vector mainブランチへの最新コミット一覧。',
      viewOnGithub: 'GitHubで見る',
      loadError: 'コミットの取得に失敗しました。',
      noCommits: 'コミットが見つかりません。',
      by: 'by',
    },
    footer: {
      description: 'MC-Vector 公式Wiki。',
    },
  },
} as const

export type TranslationKeys = typeof translations.en
