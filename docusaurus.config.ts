import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
    require.resolve('./plugins/llms-link'),
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.svg',
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
          type: 'docSidebar',
          sidebarId: 'sdkSidebar',
          position: 'left',
          label: 'SDK',
        },
        {
          href: 'https://github.com/nmdra/ERPBridge',
          label: 'Source',
          position: 'right',
        },
        {
          href: 'https://github.com/nmdra/erpbridge-docs',
          label: 'GitHub',
          position: 'right',
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
