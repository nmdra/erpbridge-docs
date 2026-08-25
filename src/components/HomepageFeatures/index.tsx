import type { ComponentProps, ComponentType, ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type ArrowProps = { label?: string };

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="19" x2="19" y2="5" />
      <polyline points="8 5 19 5 19 16" />
    </svg>
  );
}

function ArrowChip({ label = "Read the guide" }: ArrowProps) {
  return (
    <span className={styles.arrowLink}>
      {label}
      <span className={styles.arrowChip} aria-hidden="true">
        <ArrowIcon />
      </span>
    </span>
  );
}

const workflow = [
  {
    number: "01",
    title: "Connect what you already run",
    description:
      "Register an existing ERP REST API with bridgectl. Your ERP stays in place and your integration starts at the API boundary.",
    to: "/docs/erpbridge/onboarding",
  },
  {
    number: "02",
    title: "Make it agent-ready",
    description:
      "Generate, validate, and apply MCP tool schemas so compatible agents can discover the operations your ERP already supports.",
    to: "/docs/erpbridge/tool-schema",
  },
  {
    number: "03",
    title: "Operate with confidence",
    description:
      "Use the server, CLI, or typed SDK with scoped tokens, cache controls, structured logs, and Prometheus metrics built in.",
    to: "/docs/erpbridge/connectivity",
  },
];

const products = [
  {
    eyebrow: "Control plane and runtime",
    title: "ERPBridge Server",
    description:
      "The MCP and REST middleware that turns registered ERP operations into discoverable, observable agent tools.",
    to: "/docs/erpbridge/intro",
    accent: "server",
  },
  {
    eyebrow: "Developer tools",
    title: "bridgectl",
    description:
      "Developer tools for registering APIs, managing schemas, inspecting runtime state, and automating operations — shipped with the bridgectl-ops agent skill.",
    to: "/docs/bridgectl/overview",
    accent: "cli",
  },
  {
    eyebrow: "Application layer",
    title: "@erpbridge/sdk",
    description:
      "A typed TypeScript facade for MCP tools, registry operations, direct invocation, logs, metrics, health, and cache.",
    to: "/docs/sdk/overview",
    accent: "sdk",
  },
];

type Capability = {
  title: string;
  description: ReactNode;
  to: string;
  Svg: ComponentType<ComponentProps<"svg">>;
};

const capabilities: Capability[] = [
  {
    title: "A registry that keeps up",
    description: (
      <>
        Versioned tools, validation, soft deletes, and reconciliation keep the
        active MCP surface aligned with your declared schemas.
      </>
    ),
    to: "/docs/erpbridge/architecture",
    Svg: require("@site/static/img/feature-registry.svg").default,
  },
  {
    title: "MCP for the clients you use",
    description: (
      <>
        Expose ERP operations over streamable HTTP or stdio, then connect
        Claude, Cursor, Postman, or your own MCP client.
      </>
    ),
    to: "/docs/erpbridge/transports",
    Svg: require("@site/static/img/feature-mcp.svg").default,
  },
  {
    title: "Authentication without secret drift",
    description: (
      <>
        Use scoped API tokens for inbound access and environment-backed
        credential references for ERP calls. Redaction keeps secrets out of
        resources and logs.
      </>
    ),
    to: "/docs/erpbridge/auth",
    Svg: require("@site/static/img/feature-resilient.svg").default,
  },
  {
    title: "External response plugins",
    description: (
      <>
        Transform successful tool responses with exact-version plugins, bearer
        or API-key references, HTTPS transport, and cache-aware failure policy.
      </>
    ),
    to: "/docs/erpbridge/plugins",
    Svg: require("@site/static/img/feature-registry.svg").default,
  },
  {
    title: "Operational visibility",
    description: (
      <>
        Use structured logs, Prometheus metrics, health checks, and cache
        controls to diagnose integrations and keep production workflows clear.
      </>
    ),
    to: "/docs/erpbridge/api",
    Svg: require("@site/static/img/feature-mcp.svg").default,
  },
  {
    title: "A typed path into your app",
    description: (
      <>
        Embed the SDK’s MCP client and exact-name tool proxy in Node.js or
        browser applications, with typed errors and telemetry access.
      </>
    ),
    to: "/docs/sdk/mcp-tools",
    Svg: require("@site/static/img/feature-agent-first.svg").default,
  },
];

const startLinks = [
  {
    title: "Server Quickstart",
    description: "Run the bridge and make your first MCP tool call.",
    to: "/docs/erpbridge/quickstart",
    tag: "Start here",
  },
  {
    title: "ERP Onboarding",
    description: "Connect a real or mock ERP through the complete workflow.",
    to: "/docs/erpbridge/onboarding",
    tag: "Connect",
  },
  {
    title: "SDK Quickstart",
    description: "Call a registered tool from a TypeScript application.",
    to: "/docs/sdk/quickstart",
    tag: "Build",
  },
  {
    title: "API Token Guide",
    description: "Create scoped credentials for agents and observability.",
    to: "/docs/erpbridge/tokens",
    tag: "Secure",
  },
  {
    title: "CLI Skill Usage",
    description: "Give an AI agent a repeatable operational workflow.",
    to: "/docs/bridgectl/skills",
    tag: "Automate",
  },
  {
    title: "REST API Reference",
    description:
      "Inspect the control plane, invocation, cache, logs, and metrics.",
    to: "/docs/erpbridge/api",
    tag: "Operate",
  },
];

function WorkflowSection() {
  return (
    <section
      className={styles.workflowSection}
      aria-labelledby="workflow-title"
    >
      <div className="container">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>One path from API to agent</p>
          <Heading as="h2" id="workflow-title" className={styles.sectionTitle}>
            A practical bridge for the systems you already have.
          </Heading>
          <p className={styles.sectionLead}>
            ERPBridge gives your team a consistent workflow for connecting
            legacy services, exposing safe tools, and shipping AI-enabled
            operations.
          </p>
        </div>
        <div className={styles.workflowGrid}>
          {workflow.map((step) => (
            <Link
              key={step.number}
              to={step.to}
              className={styles.workflowCard}
            >
              <span className={styles.stepNumber}>{step.number}</span>
              <Heading as="h3" className={styles.cardTitle}>
                {step.title}
              </Heading>
              <p className={styles.cardDescription}>{step.description}</p>
              <ArrowChip />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section className={styles.productSection} aria-labelledby="products-title">
      <div className="container">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>Choose your entry point</p>
          <Heading as="h2" id="products-title" className={styles.sectionTitle}>
            One ecosystem, from infrastructure to application code.
          </Heading>
        </div>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Link
              key={product.title}
              to={product.to}
              className={`${styles.productCard} ${styles[product.accent]}`}
            >
              <span className={styles.productEyebrow}>{product.eyebrow}</span>
              <Heading as="h3" className={styles.productTitle}>
                {product.title}
              </Heading>
              <p className={styles.cardDescription}>{product.description}</p>
              <ArrowChip label="Explore" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitySection() {
  return (
    <section
      className={styles.capabilitySection}
      aria-labelledby="capabilities-title"
    >
      <div className="container">
        <div className={styles.sectionIntro}>
          <p className={styles.sectionEyebrow}>Built for the long tail</p>
          <Heading
            as="h2"
            id="capabilities-title"
            className={styles.sectionTitle}
          >
            The details that make integrations durable.
          </Heading>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilities.map(({ title, description, to, Svg }) => (
            <Link key={title} to={to} className={styles.capabilityCard}>
              <div className={styles.cardIcon}>
                <Svg className={styles.featureSvg} aria-hidden="true" />
              </div>
              <div className={styles.cardBody}>
                <Heading as="h3" className={styles.cardTitle}>
                  {title}
                </Heading>
                <p className={styles.cardDescription}>{description}</p>
                <ArrowChip />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StartSection() {
  return (
    <section className={styles.startSection} aria-labelledby="start-title">
      <div className="container">
        <div className={styles.startHeader}>
          <div>
            <p className={styles.sectionEyebrow}>Ready when you are</p>
            <Heading as="h2" id="start-title" className={styles.sectionTitle}>
              Find your next step.
            </Heading>
          </div>
          <Link className={styles.textLink} to="/docs/roadmap/overview">
            See what’s shipping next →
          </Link>
        </div>
        <div className={styles.startGrid}>
          {startLinks.map((item) => (
            <Link key={item.title} to={item.to} className={styles.startCard}>
              <span className={styles.startTag}>{item.tag}</span>
              <Heading as="h3" className={styles.startTitle}>
                {item.title}
              </Heading>
              <p className={styles.startDescription}>{item.description}</p>
              <span className={styles.startArrow} aria-hidden="true">
                <ArrowIcon />
              </span>
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
      <WorkflowSection />
      <ProductSection />
      <CapabilitySection />
      <StartSection />
    </>
  );
}
