import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  to: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'MCP Made Simple',
    Svg: require('@site/static/img/feature-mcp.svg').default,
    to: '/docs/erpbridge/transports',
    description: (
      <>
        ERPBridge exposes ERP functionality as MCP tools over streamable HTTP
        and stdio, so AI agents can discover and call ERP APIs directly.
      </>
    ),
  },
  {
    title: 'Tool Registry',
    Svg: require('@site/static/img/feature-registry.svg').default,
    to: '/docs/erpbridge/tool-schema',
    description: (
      <>
        Register ERP APIs once with <code>bridgectl</code>, then generate and
        validate MCP tool schemas automatically.
      </>
    ),
  },
  {
    title: 'Resilient by Default',
    Svg: require('@site/static/img/feature-resilient.svg').default,
    to: '/docs/erpbridge/caching',
    description: (
      <>
        Built-in caching, rate limiting, structured logs, and Prometheus
        metrics protect your ERP systems and keep the bridge observable.
      </>
    ),
  },
  {
    title: 'Non-Invasive Integration',
    Svg: require('@site/static/img/feature-noninvasive.svg').default,
    to: '/docs/erpbridge/onboarding',
    description: (
      <>
        ERPBridge sits on top of your existing ERP. No code changes, no API
        rewrites, no migrations — your legacy system keeps running exactly as
        it does today.
      </>
    ),
  },
  {
    title: 'AI-Agent-First Design',
    Svg: require('@site/static/img/feature-agent-first.svg').default,
    to: '/docs/erpbridge/mcp-client-guide',
    description: (
      <>
        Tools are declared once and exposed for discovery, so agents call your
        ERP directly. This reduces the maintenance overhead of keeping
        integrations in sync.
      </>
    ),
  },
  {
    title: 'BYOERP — Bring Your Own ERP',
    Svg: require('@site/static/img/feature-byoerp.svg').default,
    to: '/docs/erpbridge/connectivity',
    description: (
      <>
        Bring any ERP: on-premise racks, cloud suites, or custom REST APIs.
        Register it, generate the tool schemas, and the bridge handles the
        rest.
      </>
    ),
  },
];

function Feature({title, Svg, description, to}: FeatureItem) {
  return (
    <Link to={to} className={styles.card}>
      <div className={styles.cardIcon}>
        <Svg className={styles.featureSvg} aria-hidden="true" />
      </div>
      <div className={styles.cardBody}>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </Link>
  );
}

function ArrowChip() {
  return (
    <span className={styles.arrowChip} aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <line x1="4" y1="12" x2="20" y2="12" />
        <polyline points="13 5 20 12 13 19" />
      </svg>
    </span>
  );
}

const quickstartLinks = [
  {
    title: 'Quickstart',
    description: 'Get ERPBridge running locally in minutes — server, CLI, and first MCP tool call.',
    to: '/docs/erpbridge/quickstart',
    icon: 'rocket',
  },
  {
    title: 'Onboarding Guide',
    description: 'Connect a new ERP system to ERPBridge in under 10 minutes with bridgectl.',
    to: '/docs/erpbridge/onboarding',
    icon: 'plug',
  },
  {
    title: 'Bridgectl CLI',
    description: 'Command-line tool for managing APIs, MCP tool schemas, caches, logs, and contexts.',
    to: '/docs/bridgectl/overview',
    icon: 'terminal',
  },
  {
    title: 'ERPBridge SDK',
    description: 'Built-in MCP client library, log streaming, metrics viewer, and programmatic bridge tools.',
    to: '/docs/sdk/overview',
    icon: 'code',
  },
  {
    title: 'REST API Reference',
    description: 'Direct HTTP control plane endpoints — invocation, cache, logs, MCP, and metrics.',
    to: '/docs/erpbridge/api',
    icon: 'globe',
  },
  {
    title: 'Roadmap',
    description: 'Upcoming milestones, scheduled features, declarative control plane plans, and release tracks.',
    to: '/docs/roadmap/overview',
    icon: 'map',
  },
];

const QuickstartIcons: Record<string, ReactNode> = {
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  plug: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z" />
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3z" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  ),
};

function QuickstartSection() {
  return (
    <section className={styles.quickstartSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Start building
        </Heading>
        <div className={styles.quickstartRow}>
          {quickstartLinks.map((item) => (
            <Link key={item.title} to={item.to} className={styles.quickstartCard}>
              <div className={styles.quickstartHeader}>
                <span className={styles.quickstartIcon} aria-hidden="true">
                  {QuickstartIcons[item.icon]}
                </span>
                <div className={styles.quickstartTitle}>
                  {item.title}
                  <ArrowChip />
                </div>
              </div>
              <p className={styles.quickstartDescription}>{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featureGrid}>
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <QuickstartSection />
    </>
  );
}