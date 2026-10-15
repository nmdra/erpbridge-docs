# Plan: Connector response-body lifetime documentation sync

## Goal

Mirror the upstream connector response-body lifetime repair (ERPBridge PR #12,
issue #11) into the user-facing connectivity guide. Returned bodies keep the
connector context until EOF, a read error, or close; the 30-second connector
deadline, the 15-second HTTP-client timeout, parent cancellation, and
unsafe-method no-replay behavior are unchanged.

## Tasks

- [x] **Task 1: Document body ownership in the connectivity guide.** Add the
  response-body lifetime paragraph after the ERP retry paragraph in
  `docs/erpbridge/connectivity.mdx` and record the sync in `CHANGELOG.md`.
  (**Verify:** `npm run build`.)
