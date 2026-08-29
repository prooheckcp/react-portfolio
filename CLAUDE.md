# react-portfolio

Personal portfolio site. Two projects in one repo:

- [front-end-react/](front-end-react/) — Create React App front end (SCSS, Framer Motion).
- [backend_sanity/](backend_sanity/) — Sanity CMS studio backing the site's content.

Dependencies are gitignored in both projects; run `npm install` in whichever one you're working on.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec

## GBrain Configuration (configured by /setup-gbrain)
- Mode: local-stdio
- Engine: pglite
- Config file: ~/.gbrain/config.json (mode 0600)
- Embedding model: ollama:nomic-embed-text (768d, local)
- Setup date: 2026-08-29
- MCP registered: yes (user scope)
- Artifacts sync: artifacts-only
- Current repo policy: read-write
- Code import: DEFERRED — PGLite is single-writer and the lock was held by
  another Claude Code session at setup time. Run `gbrain import <repo> --no-embed`
  followed by `gbrain embed --stale`, or just `/sync-gbrain --full`, once only one
  Claude Code window is open.
