import { defaultClientConditions, defaultServerConditions } from 'vite';

// https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

// https://tailwindcss.com/docs/installation/framework-guides/astro
import tailwindcss from '@tailwindcss/vite';

// https://github.com/eslint/eslint/discussions/15305
import { readFileSync } from 'fs';
const packageJSON = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf-8' })
);

const { name, github_pages } = packageJSON;
const isGitHubPagesBuild = !!process.env.GITHUB_PAGES;
const isGitHubPagesPreview = !!process.env.GITHUB_PAGES_PREVIEW;

/*
  vite plugin to fix the following type of error:


  [astro-island] Error hydrating ... TypeError: Cannot destructure property '__extends' of 'import_tslib.default' as it is undefined

  references:
  https://github.com/remix-run/react-router/issues/12610
    https://github.com/remix-run/react-router/issues/12610#issuecomment-2558799620
    https://github.com/remix-run/react-router/issues/12610#issuecomment-2585863626

*/
const viteTslibPluginFix = {
  config() {
    return {
      resolve: {
        conditions: [...defaultClientConditions]
      },
      ssr: {
        resolve: {
          conditions: [...defaultServerConditions],
          externalConditions: [...defaultServerConditions]
        }
      }
    };
  },
  enforce: 'post',
  name: 'tslib-fix'
};

/** @type {import('astro/config').config} */
const baseConfig = {
  integrations: [svelte({ extensions: ['.svelte'] }), mdx()],
  vite: {
    plugins: [tailwindcss(), viteTslibPluginFix],
    resolve: {
      // https://github.com/withastro/astro/issues/12608#issuecomment-2516285448
      conditions: ['browser']
    }
  },

  // https://docs.astro.build/en/guides/routing/#configured-redirects
  redirects: {
    '/echarts/examples': '/echarts',
    '/echarts/energy-use-case': '/echarts'
  }
};

// https://docs.astro.build/en/guides/deploy/github/#configure-astro-for-github-pages
const config = isGitHubPagesBuild
  ? {
      ...baseConfig,
      site: isGitHubPagesPreview ? undefined : github_pages,
      base: `/${name}`
    }
  : baseConfig;

// https://astro.build/config
export default defineConfig(config);
