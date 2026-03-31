# Feature Implementation Plan

## Scope

Add three product features to NxtBuild:

1. A version history panel that can restore previous generated code revisions.
2. A share workflow that creates a public URL for a project preview.
3. Prompt templates on the dashboard to help users start faster.

## Backend Plan

1. Extend project actions with a restore endpoint that swaps the active code with a selected saved version.
2. Ensure code saves and restores preserve the previous active code in `versions` so history remains useful.
3. Replace the old share behavior with a proper public share token and a public read endpoint based on that token.

## Frontend Plan

1. Update the builder to:
   - show version history in a dedicated panel,
   - persist restores through the API,
   - generate and copy a public share URL,
   - allow saving edited code so manual updates are not lost.
2. Update routing so shared projects are accessible at `/share/:shareToken`.
3. Add a dashboard templates section that creates a new project and starts generation from a predefined prompt.

## Verification Plan

1. Build the client to catch React and route issues.
2. Validate the server loads with the updated route/service imports.
3. Smoke test these flows manually:
   - generate code twice and restore an earlier version,
   - create a share URL and open it without auth,
   - launch a project from each dashboard prompt template.
