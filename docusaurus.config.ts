import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {ERPBRIDGE_RELEASE, SDK_RELEASE} from './src/constants/releases';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ERPBridge',
  tagline: 'Connect your legacy ERP to AI-based workflows without changing your code base',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://blog.nimendra.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/erpbridge-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nmdra', // Usually your GitHub org/user name.
  projectName: 'erpbridge-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // 'detect' lets hand-written .mdx pages use the full MDX feature set
  // while keeping the generated cobra CLI reference (.md) as plain
  // CommonMark — safe for shell snippets like `<(...)` or `$(...)`.
  markdown: {
    format: 'detect',
    // Mermaid diagrams in fenced ```mermaid code blocks (requires @docusaurus/theme-mermaid).
    mermaid: true,
    // future.v4 disables the mdx1Compat defaults; re-enable the admonition
    // title preprocessor so `:::tip My title` keeps working with
    // remark-directive v3 (which no longer parses same-line labels).
    mdx1Compat: {
      admonitions: true,
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/nmdra/erpbridge-docs/tree/main/',
          // The shared docs badge tracks the ERPBridge Server + bridgectl
          // release line. The custom DocVersionBadge swaps in the SDK's
          // independent package version for SDK pages.
          lastVersion: 'current',
          versions: {
            current: {
              label: `ERPBridge + bridgectl · ${ERPBRIDGE_RELEASE}`,
              path: '',
              badge: true,
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: '/docs',
      },
    ],
    [
      'docusaurus-plugin-copy-page-button',
      {
        generateMarkdownRoutes: true,
        mcpServer: {
          name: 'ERPBridge',
          type: 'stdio',
          command: 'erpbridge-server',
          args: ['--stdio'],
        },
      },
    ],
    [
      'docusaurus-plugin-llms',
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        description:
          'Documentation for ERPBridge — connect legacy ERP systems to AI agents through the Model Context Protocol.',
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    announcementBar: {
      id: 'alpha-notice',
      content:
        `🚧 ERPBridge Server and bridgectl are in <b>Alpha (${ERPBRIDGE_RELEASE})</b>; the SDK follows its own release line (<b>${SDK_RELEASE}</b>). <a href="/erpbridge-docs/docs/roadmap/overview">View release status →</a>`,
      backgroundColor: '#1b1b1d',
      textColor: '#e0e0e0',
      isCloseable: true,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
title: 'ERPBridge',
      logo: {
        alt: 'ERPBridge Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'erpbridgeSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'doc',
          docId: 'erpbridge/intro',
          position: 'left',
          label: 'Server',
        },
        {
          type: 'docSidebar',
          sidebarId: 'bridgectlSidebar',
          position: 'left',
          label: 'Bridgectl',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sdkSidebar',
          position: 'left',
          label: 'SDK',
        },
        {
          type: 'docSidebar',
          sidebarId: 'roadmapSidebar',
          position: 'left',
          label: 'Roadmap',
        },
        {
          type: 'doc',
          docId: 'faq',
          position: 'left',
          label: 'FAQ',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/nmdra/ERPBridge',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          html: '<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'ERPBridge Server',
              to: '/docs/erpbridge/intro',
            },
            {
              label: 'Bridgectl CLI',
              to: '/docs/bridgectl/overview',
            },
            {
              label: 'Roadmap',
              to: '/docs/roadmap/overview',
            },
            {
              label: 'FAQ',
              to: '/docs/faq',
            },
            {
              label: 'SDK',
              to: '/docs/sdk/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nmdra/ERPBridge',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/nmdra/ERPBridge/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/nmdra/ERPBridge/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Docs repo',
              href: 'https://github.com/nmdra/erpbridge-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ERPBridge. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
