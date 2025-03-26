# astro-ts-tw-svelte

[![Astro v5](https://img.shields.io/badge/-astro_v5-gray?style=flat&logo=astro)](https://astro.build/)
[![Svelte v4](https://img.shields.io/badge/-svelte_v4-gray?style=flat&logo=svelte)](https://v4.svelte.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/-tailwindcss_v4-gray?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![PostCSS v8](https://img.shields.io/badge/-postcss_v8-gray?style=flat&logo=postcss)](https://postcss.org/)
[![TypeScript v5](https://img.shields.io/badge/-typescript_v5-gray?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![ESLint v9](https://img.shields.io/badge/-eslint_v9-gray?style=flat&logo=eslint)](https://eslint.org/)
[![Prettier v3](https://img.shields.io/badge/-eslint_v3-gray?style=flat&logo=prettier)](https://prettier.io/)
[![Docker](https://img.shields.io/badge/-docker-gray?style=flat&logo=docker)](https://www.docker.com/)
[![DevContainers](https://img.shields.io/badge/-devcontainers-gray?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgc3R5bGU9ImZpbGw6IzE5M2U2MyIvPjxwb2x5Z29uIHBvaW50cz0iMTAuNzc3IDIyLjc0MiA5LjM0MyAyMS4zNDggMTIuNzI5IDE3Ljg2NSA5LjM0NiAxNC40MTcgMTAuNzc0IDEzLjAxNyAxNS41MjUgMTcuODU5IDEwLjc3NyAyMi43NDIiIHN0eWxlPSJmaWxsOiNhZGQxZWEiLz48cG9seWdvbiBwb2ludHM9IjIxLjQyIDE5LjEwMSAyMi44NTQgMTcuNzA2IDE5LjQ2OCAxNC4yMjQgMjIuODUxIDEwLjc3NiAyMS40MjMgOS4zNzYgMTYuNjcyIDE0LjIxOCAyMS40MiAxOS4xMDEiIHN0eWxlPSJmaWxsOiNhZGQxZWEiLz48L3N2Zz4=)](https://containers.dev/)

- Project template: [[GitHub] erkobridee/astro-ts-tw-hello](https://github.com/erkobridee/astro-ts-tw-hello)

## Local Development

- [VS Code](https://code.visualstudio.com/) + [Development Containers](https://containers.dev/) ( [Customizations](https://containers.dev/supporting#visual-studio-code) | [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) )

  - [[GitHub] erkobridee/devcontainer-hello](https://github.com/erkobridee/devcontainer-hello) - Learning about Development Containers

## import path alias

It's commonly used the pattern `@* -> src/*`, but this approach annoys me due to the current npm package namespaces ( [scopes | npm docs](https://docs.npmjs.com/about-scopes) ) which normally starts with `@{user_name/org_name}`.

Following a Unix OS approach, that beens said so we have the following alias mapping `~/* -> src/*` ( [tsconfig.json](/tsconfig.json) ) which avoid the issue from `@`.

## Astro

- [[YouTube] Astro in 100 Seconds | Fireship](https://www.youtube.com/watch?v=dsTXcSeAZq8) ( 2021-07-15 )

- [Astro Docs](https://docs.astro.build/en/getting-started/)

  - [Install and set up Astro](https://docs.astro.build/en/install-and-setup/)

  - [Project Structure | Astro Docs](https://docs.astro.build/en/basics/project-structure/)

  - [Import Aliases | Astro Docs](https://docs.astro.build/en/guides/aliases/)

  - [Markdown & MDX | Astro Docs](https://docs.astro.build/en/guides/markdown-content/)

    - [Configuring Markdown and MDX](https://docs.astro.build/en/guides/markdown-content/#configuring-markdown-and-mdx)

  - [View Transitions | Astro Docs](https://docs.astro.build/en/guides/view-transitions/)

    - [astro:after-swap](https://docs.astro.build/en/guides/view-transitions/#astroafter-swap)

    - [Astro View Transitions | Chrome for Developers](https://developer.chrome.com/blog/astro-view-transitions?hl=en) - [live](https://live-transitions.pages.dev/), [source code](https://github.com/Charca/view-transitions-live)

  - [Deploy your Astro Site to GitHub Pages | Astro Docs](https://docs.astro.build/en/guides/deploy/github/)

    - [[GitHub] withastro/github-pages](https://github.com/withastro/github-pages) - Automatically deploy an Astro site to GitHub Pages

    - [Create gh-pages branch in existing repo | jf](https://jiafulow.github.io/blog/2020/07/09/create-gh-pages-branch-in-existing-repo/)

  - [Svelte integration with Astro | Astro Docs](https://docs.astro.build/en/guides/integrations-guide/svelte/) - `@astrojs/svelte@5` to use the Svelte v4

    - [Svelte v4](https://v4.svelte.dev/)

      - [TypeScript | Svelte v4 Docs](https://v4.svelte.dev/docs/typescript)

      - [Svelte: Components with Typed Props | Daaang Amy](https://blog.amyndang.me/blog/typed-svelte-components/)

      - [[StackOverflow] Svelte - Extend standard html elements with typescript](https://stackoverflow.com/a/75961340)

  - [Deprecated] [@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)

    - [Tailwind 4 support](https://astro.build/blog/astro-520/#tailwind-4-support) >>> [Astro TailwindCSS Integration](https://docs.astro.build/en/guides/styling/#tailwind) >>> [Install Tailwind CSS v4 with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)

### Editor Setup

- [Editor Setup | Astro Docs](https://docs.astro.build/en/editor-setup/)

  - [ESLint](https://docs.astro.build/en/editor-setup/#eslint)

    - [[GitHub] ota-meshi/eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro)

  - [Prettier](https://docs.astro.build/en/editor-setup/#prettier)

    - [[GitHub] withastro/prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro)

- [Get VSCode, eslint & prettier working with Astro | Geek's blog](https://patheticgeek.dev/blog/astro-prettier-eslint-vscode) (2023/02/11)

- [Effortless Code Styling: Configuring Astro with Prettier, ESLint, and Tailwind CSS | Raj Vadeghar](https://r44j.dev/blog/beginner-s-guide-to-setting-up-astro-astro-prettier-eslint-tailwind-css/) (2024/03/03)

<!--

## Useful references

### Markdown

- [Markdown Cheat Sheet | Kevin Chatham](https://kevinc.design/posts/tip-markdown-cheat-sheet)

- [Extending AstroJS Markdown Processing With Remark and Rehype Plugins | DEV Community](https://dev.to/fkurz/extending-astrojs-markdown-processing-with-remark-and-rehype-plugins-m1k)

- [How to Create an Astro Markdown Plugin | Larry Myers](https://www.larrymyers.com/posts/how-to-create-an-astro-markdown-plugin/)

- [How to Open a Markdown Link in a New Tab in Astro | Emmanuel Raymond](https://www.peoray.dev/blog/astro-open-link-new-tab/)

  - [[GitHub] JS-DevTools/rehype-url-inspector](https://github.com/JS-DevTools/rehype-url-inspector)

- [Astro, fix .md in links | Flavio Copes](https://flaviocopes.com/astro-fix-dot-md-in-links/)

   - [[GitHub] vernak2539/astro-rehype-relative-markdown-links](https://github.com/vernak2539/astro-rehype-relative-markdown-links)

- [Icons for external links | Astro Digital Garden](https://astro-digital-garden.stereobooster.com/recipes/icons-to-external-links/)

  - [[GitHub] rehypejs/rehype-external-links](https://github.com/rehypejs/rehype-external-links)

- [Create Table of contents in Astro and sectionize the Markdown content | Reza Zahedi
](https://rezahedi.dev/blog/create-table-of-contents-in-astro-and-sectionize-the-markdown-content)

  - [[GitHub] rezahedi/rezahedi.dev](https://github.com/rezahedi/rezahedi.dev)

  - [[GitHub] hbsnow/rehype-sectionize](https://github.com/hbsnow/rehype-sectionize)


## Test it online

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/erkobridee/astro-ts-tw-svelte)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/erkobridee/astro-ts-tw-svelte?devcontainer_path=.devcontainer/devcontainer.json)

## Setup a new project using this repository

You can use the `Use this template` button

### degit

```sh
npx degit erkobridee/astro-ts-tw-svelte {project_name}
```

### create a new project based on a GitHub repository’s main branch

```sh
npm create astro@latest -- --template erkobridee/astro-ts-tw-svelte
```

-->
