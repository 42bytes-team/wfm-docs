import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'data-models',
    {
      type: 'category',
      label: 'HTTP API',
      items: [
        'api/overview',
        'api/manifests',
        'api/orders',
        'api/groups',
        'api/users',
        'api/achievements',
        'api/authentication',
        'api/dashboard',
      ],
    },
    {
      type: 'category',
      label: 'OAuth 2.0',
      items: ['oauth/overview'],
    },
    {
      type: 'category',
      label: 'WebSockets',
      items: ['websockets/overview'],
    },
    {
      type: 'category',
      label: 'Rules',
      items: ['rules/overview'],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: ['contributing/documentation-style', 'contributing/http-api-endpoint-format'],
    },
  ],
};

export default sidebars;
