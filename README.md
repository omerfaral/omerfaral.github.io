# Research Notes — Academic Blog

A personal blog for AI research notes, presented in an academic paper style.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:4321 in your browser.

## Adding a New Paper

Create a new `.md` file under `src/content/papers/`:

```markdown
---
title: 'Paper Title'
authors: ['Ömer Faruk Aral']
affiliation: 'Researcher'
abstract: 'Abstract text goes here...'
keywords: ['keyword', 'another keyword']
date: 2026-08-10
volume: 1
issue: 1
pages: '25–36'
references:
  - 'Y. LeCun et al., "Deep Learning," <em>Nature</em>, 2015.'
---

## Introduction

Markdown content goes here. Use $e^{i\pi} + 1 = 0$ for inline math or block equations:

$$
\mathcal{L} = -\sum y \log \hat{y}
$$
```

- Section headings (`##`, `###`) are automatically numbered as 1., 1.1, etc.
- Math is rendered with KaTeX; code blocks have syntax highlighting.
- The reference list is generated from the frontmatter `references` array; cite them in text as [1], [2], etc.

## Deployment

```bash
npm run build   # produces the static site in dist/
```

Upload the contents of `dist/` to GitHub Pages, Netlify, Vercel, or any static host.
