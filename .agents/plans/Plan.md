# Plan — Azure Deployment Diagrams (University Lecture, Intermediate)

**For:** `/home/nimendra/Documents/Projects/erpbridge-docs`
**Audience:** University research presentation, intermediate level (assumes Docker/API, not MCP/VNet/Vector/RAG)
**Status:** Shared understanding reached (23 decisions, grilling 5 rounds) — `plan` → `build` approved
**Scope:** Living docs, `npm run build` must stay green (`AGENTS.md:21`)

## Settled Design Tree (23 decisions)

| Q | Decision | Choice |
|---|----------|--------|
| Q1 | Purpose | University lecture, intermediate |
| Q2 | Truthfulness | **Proposed Target Azure** (main) + `Current verified: Docker Compose :8080/:8081/Redis` inset (`docker.mdx:31-40`) |
| Q3 | Lifespan | **Living docs** |
| Q4 | ERP systems | **MockERP `mockerp:0.2.1` inside VNet** (`mock-erp.mdx:18`) + faded `External ERP (future)` outside |
| Q5 | Icons | **Balance** — strict Azure for infra, generic for proprietary, not icon-laundering |
| Q6 | Deliverables | **C: `.drawio`+`.png`+`.svg`** |
| Q7 | Jargon | **C layered** — on-diagram `AI Tool Gateway (MCP)` etc. + footnote glossary |
| Q8 | Zones | **C: 6 zones via 4 containers + MCP spine + brain inset** |
| Q9 | Placement | **A+C light: `static/img/architecture-azure.*` + `docs/erpbridge/architecture.mdx:8` section** |
| Q10 | Style | **A light: white paper, `#0078D4` Azure blue, `#F58534` brain accent, 2px private VNet** |
| Q11 | Story | **Numbered ①-④ runtime + dashed-green dev corridor (`🔒 HTTPS/mTLS`)** |
| Q12 | MCP hub | **B single titled `MCP Tool Gateway (Streamable HTTP / stdio)`** (`transports.mdx:10`) |
| Q13 | Model | **A centered brain 78×78 `foundry models`/`brain`, `#F58534`, labelled brain** |
| Q14 | Vector vs RAG | **B split `Data & Knowledge`: Vector warm `cylinder3` vs RAG cool `rounded+book`** |
| Q15 | VNet | **A full `Azure→VNet→Env(faint)→{ERPBridge,MockERP}`** private label |
| Q16 | Legend | **A legend box + 5-term glossary footnote** |
| P1-P4 | Ownership | P1 MCP/bridgectl/ERPBridge, P2 LLM+RAG, P3 Vector+Pipeline, P4 FE/BE |
| Q17 | Dual-path labels | **A: `Plugin — ERP response enrichment` / `MCP — semantic search & analytics`** |
| Q18 | Workflow detail | **C minimal boxes + right-margin `annotation` for P4 capabilities** |
| Q19 | Badges | **B muted `P1`–`P4` `Geist Mono 9px #6c8ebf`** |
| Q20 | File | `static/img/architecture-azure.{drawio,svg,png}` + architecture.mdx embed |
| Q21 | Multi | **B two diagrams: B1 Overview Enterprise Target + B2 Team 4-Person Swimlane** |
| Q22 | Legend text | **Verbatim 4-row legend + 5-term glossary footnote below image** |
| Q23 | Numbers | **On-edge ①-④ white fill/`#0078D4` stroke, dev corridor `Dev flow` no number** |

## Artifacts

- `static/img/architecture-azure-overview.{drawio,svg,png}` — lecture `slide-16x9`, Docusaurus `/img/...`
- `static/img/architecture-azure-team.{drawio,svg,png}` — same topology re-parented into 4 swimlanes `P1|P2|P3|P4`
- `docs/erpbridge/architecture.mdx:8` — new `## Proposed Azure deployment (Target — University Lecture)` + `Admonition: Proposed vs Current verified` + downloads + legend footnote
- No `sidebars.ts:10` change for B1; B2 is appendix/handout (optional new page later)

## Visual Spec (from grilling)

- **Left→right:** `Local (Developer/laptop bridgectl)` → `Azure Cloud→VNet→Env→ERPBridge↔MockERP private` → `MCP Hub B` → `Workflow Platform (User→Frontend↔Backend/Agent→Model brain A centered)` → `Data&Knowledge split B` → `RAG` + `External ERP (faded)`
- **MCP Hub:** single `swimlane;startSize=24` titled gateway, all 3 fanouts `② ERPBridge→ERP`, `③ Vector`, `④ RAG` carry `①-④` circles; dev flow top corridor `Developer→bridgectl —🔒—→ ERPBridge` dashed green off hub
- **Colors:** paper white, Azure `#0078D4`, hairline `#d0d7de`, muted `#6c8ebf`, brain `#F58534`, Vector `#d5e8d4` cylinder, RAG `#dae8fc` rounded+book
- **Layout grid:** `x=col*180+40`, `y=row*120+40`, rect `140×60`, diamond `140×80`, Azure icons `78×78`, edges `edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=classic` + `libavoid` where needed, `parent=1` for cross-container edges
- **Labels:** Plain language on nodes (`AI Tool Gateway (MCP)`, `ERP Memory (Vector DB)`, `Company Knowledge (RAG)`) + footnote glossary verbatim (Q22) + 4-row legend bottom

## Implementation Steps

1. **Icons:** `search_shapes` for `azure virtual network`, `azure container apps`, `azure container apps environment`, `developer`, `laptop`, `web application`, `foundry models brain`, `database`, `book` — capture exact `style` strings
2. **B1 Overview:** `open_drawio_xml` — 6 zones via 4 containers + hub + brain + split Data&Knowledge + ERP + legend + P1-P4 badges; orthogonal edges with `①-④` + dev dash; verify URL renders
3. **B2 Team:** same nodes re-parented into 4 `swimlane;horizontal=0;startSize=110` lanes `P1 MCP/bridgectl/ERPBridge | P2 Model+RAG | P3 Pipeline+Vector | P4 Workflow FE/BE`
4. **Write `.drawio`:** `<mxfile>` wrapper around `mxGraphModel` for each B1/B2 to `static/img/`; export `.svg`/`.png` (diagram-only, `libavoid` safe)
5. **MDX:** Extend `architecture.mdx:225` with `## Proposed Azure deployment` + `:::note Proposed — Target` + `<img src="/img/architecture-azure-overview.svg" />` + downloads + legend footnote + small `Current verified` inset linking `docker.mdx`, `transports.mdx`, `mock-erp.mdx`, `plugins.mdx`
6. **Verify:** `npm run build` (MDX/links), `npx tsc --noEmit` (if needed), `opencode mcp list` still `✓ drawio`, view SVG at `/img/...`

## Risks

- Azure infra is aspirational — mitigated by `Proposed` label + inset, avoids `Report-code-vs-docs-audit.md` drift
- Chrome/edge crossing — mitigated by single MCP hub + `libavoid`
- Projector contrast — mitigated by Q10 light high-contrast + thick private line

## Verify Commands

```bash
npm run build                     # must pass (AGENTS.md:21)
ls static/img/architecture-azure-overview.{drawio,svg,png} static/img/architecture-azure-team.{drawio,svg,png}
opencode mcp list                 # still ✓ drawio
```
