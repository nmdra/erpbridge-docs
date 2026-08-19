import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function ReleaseBadge() {
  return (
    <Link to="/docs/roadmap/overview" className={styles.releaseBadge}>
      <span className={styles.releaseDot} />
      Alpha (v0.2.0-alpha.5)
    </Link>
  );
}

function TerminalLine({
  prompt,
  command,
  output,
}: {
  prompt: string;
  command?: string;
  output?: ReactNode;
}) {
  return (
    <div className={styles.terminalLine}>
      <span className={styles.terminalPrompt}>{prompt}</span>
      {command && <span className={styles.terminalCommand}>{command}</span>}
      {output && <div className={styles.terminalOutput}>{output}</div>}
    </div>
  );
}

function TerminalMockup() {
  return (
    <div className={styles.terminalCard}>
      <div className={styles.terminalBar}>
        <span className={styles.terminalDot} />
        <span className={styles.terminalDot} />
        <span className={styles.terminalDot} />
        <span className={styles.terminalTitle}>bridgectl — erpbridge shell</span>
      </div>
      <div className={styles.terminalBody}>
        <TerminalLine
          prompt="$"
          command="bridgectl api register --name erp.sales --url https://erp.example/api"
          output={<span className={styles.outputMuted}>✓ registered erp.sales (REST)</span>}
        />
        <TerminalLine
          prompt="$"
          command="bridgectl tool generate --api erp.sales"
          output={<span className={styles.outputMuted}>✓ generated 3 MCP tool schemas</span>}
        />
        <TerminalLine
          prompt="$"
          command="bridgectl tool apply schemas/erp/"
          output={<span className={styles.outputOk}>✓ applied 3 tools in 42ms — reconciled</span>}
        />
        <TerminalLine
          prompt="$"
          command="bridgectl api test erp.sales"
          output={
            <>
              <span className={styles.outputOk}>200 OK</span>{' '}
              <span className={styles.outputMuted}>— 1 invoice returned</span>
            </>
          }
        />
        <TerminalLine
          prompt="$"
          command="bridgectl log tail --level info"
          output={
            <>
              <span className={styles.outputDim}>[info] mcp:tool invoked list_sales_invoices</span>
              <br />
              <span className={styles.outputDim}>[info] cache:miss tool=list_sales_invoices</span>
            </>
          }
        />
        <div className={styles.terminalLine}>
          <span className={styles.terminalPrompt}>$</span>
          <span className={styles.terminalCursor} />
        </div>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroRow}>
          <div className={styles.heroText}>
            <ReleaseBadge />
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link className={styles.primaryButton} to="/docs/erpbridge/intro">
                Try ERPBridge
              </Link>
              <Link className={styles.secondaryButton} to="/docs/erpbridge/quickstart">
                Quickstart
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <TerminalMockup />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentation for ERPBridge — connect your legacy ERP to AI-based workflows without changing your code base">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}