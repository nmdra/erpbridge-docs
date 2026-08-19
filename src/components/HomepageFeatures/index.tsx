import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'MCP Made Simple',
    Svg: require('@site/static/img/feature-mcp.svg').default,
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
    description: (
      <>
        Bring any ERP: on-premise racks, cloud suites, or custom REST APIs.
        Register it, generate the tool schemas, and the bridge handles the
        rest.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className={styles.cardBody}>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
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
  },
  {
    title: 'Onboarding Guide',
    description: 'Connect a new ERP system to ERPBridge in under 10 minutes with bridgectl.',
    to: '/docs/erpbridge/onboarding',
  },
  {
    title: 'Bridgectl CLI',
    description: 'Command-line tool for managing APIs, MCP tool schemas, caches, logs, and contexts.',
    to: '/docs/bridgectl/overview',
  },
  {
    title: 'ERPBridge SDK',
    description: 'Built-in MCP client library, log streaming, metrics viewer, and programmatic bridge tools.',
    to: '/docs/sdk/overview',
  },
  {
    title: 'REST API Reference',
    description: 'Direct HTTP control plane endpoints — invocation, cache, logs, MCP, and metrics.',
    to: '/docs/erpbridge/api',
  },
  {
    title: 'Roadmap',
    description: 'Upcoming milestones, scheduled features, declarative control plane plans, and release tracks.',
    to: '/docs/roadmap/overview',
  },
];

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
              <div className={styles.quickstartTitle}>
                {item.title}
                <ArrowChip />
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