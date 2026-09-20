# Quick Reference — 0xsnow-1.github.io

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

```bash
nano _posts/2026-09-15-your-title-here.md
```

Paste, edit, save (`Ctrl+O`, `Enter`, `Ctrl+X`):

```markdown
---
title: Your Title Here
date: 2026-09-15 20:00:00 +0800
categories: [Category Name, Optional Subcategory]
tags: [tag1, tag2]
---

Content here.
```

---

## 🛠️ Post a project

```bash
nano _posts/2026-09-15-project-name.md
```

```markdown
---
title: Project Name
date: 2026-09-15 20:00:00 +0800
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

Same as a blog post — just set `date:` to the real date it happened. No other steps.

```bash
nano _posts/2019-06-15-old-thing-i-did.md
```

```markdown
---
title: Old Thing Title
date: 2019-06-15 10:00:00 +0800
categories: [Files I've Learned]
tags: [tag1]
---

Content here.
```
Filename date can stay anything, but `date:` in the front matter is what controls Archives placement — make sure that one's correct.

---

## 🏷️ Add a brand-new category or tag

Nothing to create separately — just type a new name into `categories:` or `tags:` in any post's front matter. The page for it (`/categories/`, `/tags/`) generates automatically on next build.

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
