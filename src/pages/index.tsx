import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroRow}>
          <div>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/erpbridge/intro">
                Get Started
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/erpbridge/quickstart">
                Quickstart
              </Link>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <img
              src="img/erp-bridge.svg"
              alt="ERPBridge connecting a legacy ERP to AI-based workflows without touching the ERP code base"
              className={styles.heroImage}
            />
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