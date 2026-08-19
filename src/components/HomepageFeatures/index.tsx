import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
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
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
