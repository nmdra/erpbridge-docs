import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import {ERPBRIDGE_RELEASE, SDK_RELEASE} from '@site/src/constants/releases';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function ReleaseBadge() {
  return (
    <div className={styles.releaseBadges} aria-label="Current ERPBridge releases">
      <Link to="/docs/roadmap/overview" className={styles.releaseBadge}>
        <span className={styles.releaseDot} aria-hidden="true" />
        ERPBridge · {ERPBRIDGE_RELEASE}
      </Link>
      <Link
        to="/docs/sdk/overview"
        className={`${styles.releaseBadge} ${styles.releaseBadgeSdk}`}>
        SDK · {SDK_RELEASE}
      </Link>
    </div>
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
    <div className={styles.terminalCard} aria-label="ERPBridge onboarding workflow preview">
      <div className={styles.terminalBar}>
        <span className={styles.terminalDot} aria-hidden="true" />
        <span className={styles.terminalDot} aria-hidden="true" />
        <span className={styles.terminalDot} aria-hidden="true" />
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
          output={<span className={styles.outputOk}>✓ applied 3 tools — reconciled</span>}
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
          <span className={styles.terminalCursor} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroRow}>
          <div className={styles.heroText}>
            <ReleaseBadge />
            <Heading as="h1" className={styles.heroTitle}>
              ERPBridge
            </Heading>
            <p className={styles.heroSubtitle}>
              Connect your existing ERP APIs to AI workflows without modifying your ERP codebase.
            </p>
            <div className={styles.buttons}>
              <Link className={styles.primaryButton} to="/docs/erpbridge/quickstart">
                Follow the quickstart
              </Link>
              <Link className={styles.secondaryButton} to="/docs/sdk/overview">
                Explore the SDK
              </Link>
            </div>
            <div className={styles.heroProof} aria-label="ERPBridge highlights">
              <span>MCP over HTTP + stdio</span>
              <span>No ERP code changes</span>
              <span>Built-in observability and security</span>
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
      description="Connect existing ERP APIs to AI agents with ERPBridge: MCP tools, bridgectl, and a typed SDK for production workflows."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
