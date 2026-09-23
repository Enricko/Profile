# Graph Report - lufria-profile  (2026-09-23)

## Corpus Check
- 22 files · ~18,466 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 12, (none) 1)

## Summary
- 124 nodes · 154 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad90ccf1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- App.jsx
- useInteractions.js
- Rain.jsx
- devDependencies
- Skills.jsx
- react
- Design Brief — Editorial Engineering Redesign (lufria.tech)
- scripts
- dependencies
- React + Vite
- rainModes.js
- ref_react_icons_fa

## God Nodes (most connected - your core abstractions)
1. `react` - 10 edges
2. `lucide-react` - 9 edges
3. `Design Brief — Editorial Engineering Redesign (lufria.tech)` - 6 edges
4. `scripts` - 5 edges
5. `Contact()` - 4 edges
6. `prefersReducedMotion()` - 4 edges
7. `GithubContributions()` - 3 edges
8. `React + Vite` - 3 edges
9. `@eslint/js` - 2 edges
10. `@vitejs/plugin-react` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (13 total, 2 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.13
Nodes (16): name, private, type, version, eslint, ref_eslint_config, @eslint/js, eslint-plugin-react-hooks (+8 more)

### Community 1 - "App.jsx"
Cohesion: 0.12
Nodes (14): lucide-react, About(), CERTIFICATIONS, Education, Experience(), experiences, Footer(), GithubContributions() (+6 more)

### Community 2 - "useInteractions.js"
Cohesion: 0.36
Nodes (4): prefersReducedMotion(), useCountUp(), useTilt(), useTypewriter()

### Community 3 - "Rain.jsx"
Cohesion: 0.12
Nodes (9): BEAN_PINKS, buildItems(), createPrng(), FUR_BASES, NEON_COLORS, PATCH_COLORS, SKILL_LOGOS, STATIC_ITEMS (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 5 - "Skills.jsx"
Cohesion: 0.36
Nodes (6): Skills(), useCases, HERO_AI_WORKFLOW, LANGUAGE_FILTERS, LANGUAGES, TOOLS

### Community 6 - "react"
Cohesion: 0.17
Nodes (6): react, ref_react_dom_client, App(), Contact(), links, src_index

### Community 7 - "Design Brief — Editorial Engineering Redesign (lufria.tech)"
Cohesion: 0.29
Nodes (6): Cara kerja, Design Brief — Editorial Engineering Redesign (lufria.tech), Konteks produk (fakta, jangan diubah maknanya), Per-section, Standar selesai (hard requirement), Tujuan pengalaman membaca

### Community 8 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

### Community 9 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, lucide-react, react, react-dom, react-icons

### Community 10 - "React + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

## Knowledge Gaps
- **49 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 71 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `package.json`, `App.jsx`, `useInteractions.js`, `Rain.jsx`, `Skills.jsx`?**
  _High betweenness centrality (0.422) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `App.jsx` to `package.json`, `Skills.jsx`, `react`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Rain.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._