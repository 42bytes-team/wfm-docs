import type { ReactNode } from 'react';

type EndpointMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type EndpointBadge = {
  icon?: string;
  kind?:
    | 'auth'
    | 'i18n'
    | 'crossplay'
    | 'cache'
    | 'accessibility'
    | 'firstParty'
    | 'danger'
    | 'neutral';
  label: string;
};

type WsMessageType = 'Command' | 'Event' | 'Stream' | 'Error';

type EndpointProps = {
  aliases?: string[];
  badges?: EndpointBadge[];
  method: EndpointMethod;
  path: string;
  summary: string;
};

type ApiCalloutProps = {
  children: ReactNode;
  icon?: string;
  kind?: 'info' | 'warning' | 'danger' | 'success' | 'neutral';
  title: string;
};

type BadgeGridProps = {
  badges: EndpointBadge[];
};

type WsMessageProps = {
  badges?: EndpointBadge[];
  route: string;
  summary: string;
  type: WsMessageType;
};

export function ApiBadge({ icon, kind = 'neutral', label }: EndpointBadge) {
  return (
    <span className={`doc-badge doc-badge--${kind}`}>
      {icon ? (
        <span className="doc-badge__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span>{label}</span>
    </span>
  );
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <div className="doc-badge-grid">
      {badges.map(badge => (
        <ApiBadge key={`${badge.kind ?? 'neutral'}-${badge.label}`} {...badge} />
      ))}
    </div>
  );
}

export function ApiCallout({ children, icon, kind = 'neutral', title }: ApiCalloutProps) {
  return (
    <aside className={`doc-callout doc-callout--${kind}`}>
      <div className="doc-callout__heading">
        {icon ? (
          <span className="doc-callout__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <strong>{title}</strong>
      </div>
      <div className="doc-callout__content">{children}</div>
    </aside>
  );
}

export function WsMessage({ badges = [], route, summary, type }: WsMessageProps) {
  return (
    <section className="doc-message">
      <div className="doc-message__route">
        <span className={`doc-message__type doc-message__type--${type.toLowerCase()}`}>{type}</span>
        <code>{route}</code>
      </div>
      <p>{summary}</p>
      {badges.length > 0 ? <BadgeGrid badges={badges} /> : null}
    </section>
  );
}

export default function ApiEndpoint({
  aliases = [],
  badges = [],
  method,
  path,
  summary,
}: EndpointProps) {
  return (
    <section className="doc-endpoint">
      <div className="doc-endpoint__main">
        <div className="doc-endpoint__copy">
          <div className="doc-endpoint__route">
            <span className={`doc-method doc-method--${method.toLowerCase()}`}>{method}</span>
            <code>{path}</code>
          </div>
          {aliases.length > 0 ? (
            <div className="doc-endpoint__aliases" aria-label="Route aliases">
              <span>Alternative</span>
              {aliases.map(alias => (
                <code key={alias}>{alias}</code>
              ))}
            </div>
          ) : null}
          <p>{summary}</p>
        </div>
      </div>
      {badges.length > 0 ? <BadgeGrid badges={badges} /> : null}
    </section>
  );
}
