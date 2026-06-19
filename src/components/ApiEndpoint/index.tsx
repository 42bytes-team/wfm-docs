import type {ReactNode} from 'react';

type EndpointMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type EndpointBadge = {
  icon?: string;
  kind?: 'auth' | 'i18n' | 'crossplay' | 'cache' | 'accessibility' | 'firstParty' | 'danger' | 'neutral';
  label: string;
};

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

export function ApiBadge({icon, kind = 'neutral', label}: EndpointBadge) {
  return (
    <span className={`api-badge api-badge--${kind}`}>
      {icon ? <span className="api-badge__icon" aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </span>
  );
}

export function BadgeGrid({badges}: BadgeGridProps) {
  return (
    <div className="api-badge-grid">
      {badges.map((badge) => (
        <ApiBadge key={`${badge.kind ?? 'neutral'}-${badge.label}`} {...badge} />
      ))}
    </div>
  );
}

export function ApiCallout({children, icon, kind = 'neutral', title}: ApiCalloutProps) {
  return (
    <aside className={`api-callout api-callout--${kind}`}>
      <div className="api-callout__heading">
        {icon ? <span className="api-callout__icon" aria-hidden="true">{icon}</span> : null}
        <strong>{title}</strong>
      </div>
      <div className="api-callout__content">{children}</div>
    </aside>
  );
}

export default function ApiEndpoint({aliases = [], badges = [], method, path, summary}: EndpointProps) {
  return (
    <section className="api-endpoint">
      <div className="api-endpoint__main">
        <div className="api-endpoint__copy">
          <div className="api-endpoint__route">
            <span className={`api-method api-method--${method.toLowerCase()}`}>{method}</span>
            <code>{path}</code>
          </div>
          {aliases.length > 0 ? (
            <div className="api-endpoint__aliases" aria-label="Route aliases">
              <span>Alternative</span>
              {aliases.map((alias) => <code key={alias}>{alias}</code>)}
            </div>
          ) : null}
          <p>{summary}</p>
        </div>
      </div>
      {badges.length > 0 ? <BadgeGrid badges={badges} /> : null}
    </section>
  );
}
