# Architecture Decision Records (ADRs)

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

## What is an ADR?

ADRs are short text documents that describe:
- **Context** - What forces are at play (technical, political, social, project)
- **Decision** - The architectural decision that was made
- **Status** - Proposed, accepted, deprecated, superseded
- **Consequences** - What becomes easier or harder because of this decision

## Why Use ADRs?

1. **Historical Record** - Understand why decisions were made
2. **Onboarding** - Help new team members understand the architecture
3. **Prevent Rehashing** - Avoid revisiting settled decisions
4. **Knowledge Sharing** - Share architectural thinking across the team
5. **Accountability** - Make decision-making transparent

## When to Write an ADR

Write an ADR when you make a decision that:
- Affects the structure, direction, or outcome of the project
- Is difficult or expensive to reverse
- Impacts multiple teams or components
- Involves significant trade-offs
- Needs to be communicated to stakeholders

## ADR Format

We use a lightweight format inspired by Michael Nygard's template:

```markdown
# [Number]. [Title]

Date: [YYYY-MM-DD]

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-XXXX]

## Context

[Describe the forces at play, including technical, political, social, and project context]

## Decision

[State the decision clearly]

## Consequences

[Describe the resulting context, including positive and negative consequences]
```

## Naming Convention

ADRs should be numbered sequentially and have descriptive titles:

```
0001-use-react-for-frontend.md
0002-adopt-microservices-architecture.md
0003-choose-postgresql-for-primary-database.md
0004-implement-event-driven-architecture.md
```

## Best Practices

### Do's ✅
- **Be concise** - ADRs should be short and to the point
- **Write when decided** - Capture decisions close to when they're made
- **Include trade-offs** - Explain what you're giving up
- **Version control** - Keep ADRs in git with the code
- **Immutable** - Don't edit old ADRs; supersede them with new ones
- **Use plain language** - Write for future readers

### Don'ts ❌
- **Don't document obvious decisions** - Focus on significant choices
- **Don't be too detailed** - ADRs are not implementation guides
- **Don't delete old ADRs** - Mark them as deprecated instead
- **Don't skip the consequences** - This is the most valuable part
- **Don't write alone** - Get team input before marking as "Accepted"

## ADR Lifecycle

1. **Proposed** - Decision is suggested and under discussion
2. **Accepted** - Team has agreed to the decision
3. **Deprecated** - Decision is no longer recommended (but not replaced)
4. **Superseded** - Decision has been replaced by a new ADR

## Example ADRs

See [template.md](./template.md) for a blank template.

## Tools

- **adr-tools** - Command-line tools for managing ADRs
- **log4brains** - Web UI for browsing ADRs
- **ADR Manager** - VS Code extension

## Additional Resources

- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) - Original blog post by Michael Nygard
- [ADR GitHub Organization](https://adr.github.io/) - Tools and resources
- [Architectural Decision Records: Overview](https://github.com/joelparkerhenderson/architecture-decision-record) - Comprehensive guide

## Starting Your First ADR

1. Copy the [template.md](./template.md) file
2. Name it with the next sequential number: `0001-your-decision.md`
3. Fill in the sections
4. Get team review
5. Mark as "Accepted" when team agrees
6. Commit to the repository

## Review Process

Before marking an ADR as "Accepted":
1. Share with the team for review
2. Discuss trade-offs and alternatives
3. Gather feedback and concerns
4. Update the ADR based on discussion
5. Get explicit approval from key stakeholders
6. Mark as "Accepted" and commit
