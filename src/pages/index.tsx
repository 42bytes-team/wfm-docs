import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Warframe.market public documentation
        </Heading>
        <p className="hero__subtitle">
          API, OAuth, WebSocket, data model, and marketplace rules documentation for integrators.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Start reading
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/api/overview">
            HTTP API
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Warframe.market public documentation"
      description="Public Warframe.market API, OAuth, WebSocket, and rules documentation.">
      <HomepageHeader />
      <main>
        <section className={styles.cards}>
          <Link className={styles.card} to="/docs/api/overview">
            <Heading as="h2">HTTP API</Heading>
            <p>Routes, headers, auth requirements, request bodies, response envelopes, and errors.</p>
          </Link>
          <Link className={styles.card} to="/docs/oauth/overview">
            <Heading as="h2">OAuth 2.0</Heading>
            <p>Client authorization, scopes, token exchange, refresh, revoke, and error behavior.</p>
          </Link>
          <Link className={styles.card} to="/docs/websockets/overview">
            <Heading as="h2">WebSockets</Heading>
            <p>Realtime route names, message envelopes, commands, events, payloads, and auth notes.</p>
          </Link>
        </section>
      </main>
    </Layout>
  );
}
