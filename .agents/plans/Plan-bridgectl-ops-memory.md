# Plan: Document Bridgectl Operations Memory

## Goal

Update the public ERPBridge documentation to describe the `bridgectl-ops`
3.4.0 skill and its optional persistent operational knowledge system.
Document the separation between authoritative skill instructions, distilled
knowledge, append-only execution evidence, and gated skill evolution.

## Current State

- `docs/bridgectl/skills.mdx` describes `bridgectl-ops` as version 3.1.0 and
  covers onboarding, maintenance, authentication, operations, diagnosis, and
  plugins.
- The ERPBridge source skill is now version 3.4.0 and adds
  `references/knowledge.md`, project-local `.agents/skill-memory/` storage,
  bounded retrieval, redacted execution records, and gated proposals.
- The source skill remains authoritative. Memory is advisory and is not part
  of the bundled or installed skill tree.
- The site requires an Unreleased changelog entry and `npm run build` before
  completion.

## Decisions

1. Update the existing Skill usage page rather than add a second public page.
2. Document the memory system as optional and instruction-driven. Do not claim
   automatic runtime recording or retrieval.
3. Link the WikiSkill paper as a design reference while stating that current
   ERPBridge skill, schema, authorization, and safety rules remain authoritative.
4. Keep examples free of credentials, ERP records, plugin bodies, and personal
   data.

## Tasks

- [x] **Task 1: Update the skill usage page.** Document version 3.4.0,
  file-backed credential references, split generation, annotation/_meta hints,
  and the optional project-local operational memory workflow. Explain bounded
  retrieval, append-only evidence, consolidation, proposal gating, and the
  WikiSkill reference. **Seam:** `docs/bridgectl/skills.mdx`; **Verify:**
  relative links resolve and the page accurately reflects the source skill.
- [x] **Task 2: Update the documentation changelog.** Add an Unreleased entry
  for the public skill and operational-memory guidance. **Seam:**
  `CHANGELOG.md`; **Verify:** the entry is under the existing Unreleased
  section and contains no sensitive values.
- [x] **Task 3: Run the site quality gate.** Build the Docusaurus site and
  inspect the final diff. **Seam:** `npm run build`; **Verify:** the build
  passes and no generated artifacts are tracked.

## Verification

- Public docs identify `bridgectl-ops` 3.4.0.
- Memory is presented as optional advisory evidence, not authority.
- Credentials and sensitive operational content remain excluded.
- The WikiSkill paper is linked as a design reference.
- `npm run build` passes.

## Status

Complete.
