# Quick Reference - 0xsnow-1.github.io

Assumes Ruby/bundler already installed. Just the commands, by scenario.

---

## 🟢 Every time you open your laptop to work on the site

```bash
cd ~/0xsnow-1.github.io
bundle exec jekyll serve
```
Open **http://localhost:4000**. Leave this terminal running while you edit; posts hot-reload. `Ctrl+C` to stop.

---

## ✍️ Write a blog post

One file per post, inside `_posts/`. The name is `YYYY-MM-DD-slug.md`:

```bash
nano _posts/2026-11-02-rag-evals.md
```

The slug after the date becomes the URL: `2026-11-02-rag-evals.md` is published at
`https://0xsnow-1.github.io/posts/rag-evals/`.
Use lowercase and hyphens, no spaces.
The filename date does not have to match `date:`; the front matter wins.

Paste this at the top, edit, save (`Ctrl+O`, `Enter`, `Ctrl+X`):

```markdown
---
title: "Your title here"
date: 2026-11-02 10:00:00 +0000
categories: [Projects, RAG]
tags: [langgraph, qdrant]
description: "One or two sentences for the home card and search results."
image:
  path: /assets/img/posts/your-cover.jpeg
  alt: "Describe what the cover shows"
  width: 1200
  height: 630
---

Opening paragraph. This is the first thing under the title.

## First part

Body text.

## Second part

Body text.
```

Then write the body in plain Markdown:

- `## Heading` starts a new part. The sticky bar on the post counts them (`PART 1/3`) and lists them in the dropdown.
- `### Heading` becomes an indented sub-item in that dropdown.
- At least two `##` headings are needed for the part switcher to appear.
- `**bold**`, `*italic*`, `` `code` ``, `- list`, `> quote`, `[link](https://example.com)` all work.
- Code fences use triple backticks with the language after them, e.g. ```` ```python ````.
- Tables are plain Markdown pipe tables.

Front matter rules:

- YAML uses spaces, never tabs.
- Keep the quotes around `title` and `description` so a `:` inside them does not break the build.
- `categories` is the folder shown on the card, `tags` is the free-form list. Both create their index pages automatically.
- Add `pin: true` to pin the post to the top of the home page.
- `description` is optional but it is what the card and search use; without it the post summary is cut from the body.

---

## 🖼️ Add the cover image and inline images

Put every image in `assets/img/posts/` (subfolders are fine):

```bash
cp ~/Downloads/evals.png assets/img/posts/evals.png
```

**Cover image** (the one on the home card and at the top of the post):

- 1200x630, JPEG or PNG, under about 1 MB.
- Reference it in the front matter with a leading slash:
  `path: /assets/img/posts/evals.png`.
- If you leave `image:` out, the home card renders text only and the social preview falls back to `assets/img/og-default.png`.

**Image inside the body:**

```markdown
![Short description of the image](/assets/img/posts/evals.png)
```

**Image with a caption:**

```markdown
![Short description of the image](/assets/img/posts/evals.png)
_What the picture shows_
{: .figure}
```

Keep the `{: .figure}` line directly under the caption, with no blank line between them.

Always start image paths with `/assets/...`.
A relative path breaks once the post URL changes.

---

## 🛠️ Post a project

```bash
nano _posts/2026-09-15-project-name.md
```

```markdown
---
title: Project Name
date: 2026-09-15 20:00:00 +0000
categories: [Projects]
tags: [tech1, tech2]
---

## What it does


## Stack


## Links
- [GitHub](https://github.com/yourname/repo)
```

---

## 🗄️ Add something to the Archive under an old/past date

Same as a blog post - just set `date:` to the real date it happened. No other steps.

```bash
nano _posts/2019-06-15-old-thing-i-did.md
```

```markdown
---
title: Old Thing Title
date: 2019-06-15 10:00:00 +0000
categories: [Files I've Learned]
tags: [tag1]
---

Content here.
```
Filename date can stay anything, but `date:` in the front matter is what controls Archives placement - make sure that one's correct.

---

## 🏷️ Add a brand-new category or tag

Nothing to create separately - just type a new name into `categories:` or `tags:` in any post's front matter. The page for it (`/categories/`, `/tags/`) generates automatically on next build.

---

## ⚙️ Edit site info (name, tagline, avatar, socials)

```bash
nano _config.yml
```
Edit, save. **Restart the server** (config doesn't hot-reload):
```bash
Ctrl+C
bundle exec jekyll serve
```

---

## 👤 Edit About page

```bash
nano _tabs/about.md
```

---

## 🚀 Publish (push live)

```bash
git add .
git commit -m "describe what you added/changed"
git push
```
Live at `https://0xsnow-1.github.io` in ~1–2 min. Check the **Actions** tab on GitHub if it doesn't show up.

---

## 🩺 If `jekyll serve` throws a YAML error

```bash
sed -n '1,30p' _config.yml
```
Look for: tabs instead of spaces, unmatched quotes, or a `>-` block scalar with a formatting issue. Fix, save, rerun.
