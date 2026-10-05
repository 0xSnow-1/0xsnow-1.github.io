# 0xsnow-1.github.io

[![Live site](https://img.shields.io/badge/live-0xsnow--1.github.io-4c8eda)](https://0xsnow-1.github.io)
[![Build and Deploy](https://github.com/0xSnow-1/0xsnow-1.github.io/actions/workflows/pages-deploy.yml/badge.svg)](https://github.com/0xSnow-1/0xsnow-1.github.io/actions/workflows/pages-deploy.yml)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.4-2ea44f?logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![Theme: Chirpy](https://img.shields.io/badge/theme-Chirpy_7.6-blue.svg)](https://github.com/cotes2020/jekyll-theme-chirpy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Source code for [**0xsnow-1.github.io**](https://0xsnow-1.github.io), the personal blog and project portfolio of Ahmed Gamal (Snow).

The site publishes project write-ups as Jekyll posts and an About page, and it deploys itself to GitHub Pages on every push to `main`.

## Stack

- [Jekyll](https://jekyllrb.com/) 4.4 with the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme `~> 7.6`, loaded from the `jekyll-theme-chirpy` gem rather than vendored
- [html-proofer](https://github.com/gjtorikian/html-proofer) for internal link and HTML validation in CI
- GitHub Actions (`Build and Deploy`) to GitHub Pages

## Run it locally

Ruby plus Bundler are the only prerequisites.
CI builds with Ruby 3.4.

```bash
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>.
Posts hot-reload; restart the server after editing `_config.yml`.

## Writing

Posts live in `_posts/`, and the filename carries the publish date first and the slug second:

```text
_posts/2026-10-05-my-post.md
```

Front matter and body look like this:

```markdown
---
title: "Post title"
date: 2026-10-05 10:00:00 +0000
categories: [Projects, RAG]
tags: [langgraph, python]
image:
  path: /assets/img/posts/example.jpeg
  alt: Describes the image for screen readers
description: "One sentence shown in listings and search results."
---

Post content.
```

Day-to-day commands (serve, new post, publish, troubleshooting) are collected in [`quick-reference.md`](quick-reference.md).

## Repository layout

```text
.
├── _config.yml            # site title, tagline, social links, theme options
├── _data/
│   ├── contact.yml        # sidebar contact icons (GitHub, X, LinkedIn, email, RSS)
│   └── share.yml          # share buttons under each post
├── _posts/                # published posts
├── _tabs/                 # sidebar pages: about, archives, categories, tags
│   └── about.md           # the About page
├── _plugins/
│   └── posts-lastmod-hook.rb
├── assets/
│   ├── img/               # avatar and post cover images
│   └── lib/               # Chirpy static assets, git submodule (optional)
├── .github/workflows/
│   └── pages-deploy.yml   # build, validate, deploy
├── index.html             # home layout entry point
└── quick-reference.md     # maintainer cheat sheet, not published to the site
```

## Deployment

Every push to `main` runs `.github/workflows/pages-deploy.yml`, which:

1. builds the site with `JEKYLL_ENV=production`,
2. runs `htmlproofer` against the output with external link checking disabled,
3. uploads the artifact and deploys it to GitHub Pages.

Changes to `README.md`, `LICENSE` and `.gitignore` do not trigger a deploy, since they never affect the published output.
The site goes live at <https://0xsnow-1.github.io> about a minute after the workflow finishes.

## Theme

The site was started from [Chirpy Starter](https://github.com/cotes2020/chirpy-starter) and keeps its structural files (`_config.yml`, `_plugins`, `_tabs`, `index.html`).
The theme itself ships as a gem, so upgrades are a `Gemfile` version bump rather than a file sync.
`assets/lib` is the optional `chirpy-static-assets` submodule; it is not initialized and is unused while `assets.self_host.enabled` is off.

## License

Released under the [MIT License](LICENSE).
Files carried over from Chirpy Starter remain Copyright (c) 2021 Cotes Chung under the same license.
