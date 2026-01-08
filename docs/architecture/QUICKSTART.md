# Quick Start Guide

Welcome! This guide will help you get started with documenting your software architecture using the C4 model.

## 🚀 Getting Started in 5 Minutes

### Step 1: Understand the C4 Model

The C4 model provides 4 levels of architectural diagrams:

1. **Context** (Level 1) - The big picture: your system and its external dependencies
2. **Container** (Level 2) - The deployable units: applications, databases, services
3. **Component** (Level 3) - The code structure: major components within containers
4. **Code** (Level 4) - The implementation: classes and interfaces (optional)

### Step 2: Start with Context

Create your first diagram:

1. Copy `01-context/system-context.md` to a new file
2. Replace the placeholders with your system's information
3. Update the PlantUML or Mermaid diagram
4. Commit to your repository

**Pro Tip:** Start simple! Just list your system, your users, and key external services.

### Step 3: Add Containers

Once you have context:

1. Copy `02-container/container-diagram.md`
2. Identify your major deployable units (web app, API, database, etc.)
3. Show how they communicate
4. Document technology choices

### Step 4: Document Decisions

Made an important architectural decision?

1. Copy `adr/template.md` to `adr/0001-your-decision.md`
2. Fill in the context, decision, and consequences
3. Get team review
4. Commit it!

## 📁 File Structure

```
docs/architecture/
├── 01-context/          ← Start here!
├── 02-container/        ← Then do this
├── 03-component/        ← Optional: for complex containers
├── 04-code/             ← Rarely needed
├── adr/                 ← Important decisions
└── diagrams/            ← Tools and examples
```

## 🛠️ Choosing Your Diagramming Tool

**New to diagramming?** → Start with [Mermaid](https://mermaid.live/)
- Works directly in GitHub/GitLab
- Simple syntax
- No installation needed

**Want full C4 support?** → Use [PlantUML with C4-PlantUML](https://github.com/plantuml-stdlib/C4-PlantUML)
- Industry standard for C4
- Text-based (great for git)
- Extensive examples provided

**Prefer visual tools?** → Try [Excalidraw](https://excalidraw.com/)
- Beautiful hand-drawn style
- Great for brainstorming
- Export to SVG/PNG

See [diagrams/README.md](diagrams/README.md) for detailed tool comparisons.

## 📝 Common Questions

### How often should I update diagrams?
Update diagrams when making significant architectural changes. They should reflect reality but don't need to be perfect.

### Do I need all 4 levels?
No! Most projects only need:
- Level 1 (Context) - Always
- Level 2 (Container) - Usually
- Level 3 (Component) - Sometimes (for complex containers)
- Level 4 (Code) - Rarely (can be auto-generated)

### What if my architecture is simple?
Perfect! Keep it simple. Even a single context diagram can be valuable for new team members.

### Should diagrams be in PRs?
Yes! Include diagram updates in the same PR as the code changes. This keeps documentation in sync.

## 🎯 Your First Task

**Create a System Context Diagram in 10 minutes:**

1. Open `01-context/system-context.md`
2. Replace `[Your System Name]` with your actual system name
3. List your users (customers, admins, etc.)
4. List external systems you integrate with
5. Draw simple boxes and arrows
6. Commit and push!

Done! You've just documented your architecture. 🎉

## 📚 Learn More

- **C4 Model Official Site:** https://c4model.com/
- **Detailed Examples:** See `diagrams/examples/` directory
- **ADR Guide:** See `adr/README.md`
- **Tool Comparison:** See `diagrams/README.md`

## 🤝 Contributing

Found a way to improve this boilerplate? Please contribute back:

1. Update the relevant templates
2. Add examples if helpful
3. Submit a PR

## 💡 Tips for Success

1. **Start simple** - Don't try to document everything at once
2. **Iterate** - Diagrams evolve with your system
3. **Get feedback** - Share early and often with your team
4. **Keep it current** - Outdated diagrams are worse than no diagrams
5. **Focus on value** - Document what helps understanding, not everything
6. **Use version control** - Treat diagrams like code
7. **Link to code** - Reference actual files and modules
8. **Document decisions** - Use ADRs for important choices

## 🎓 Next Steps

Once you're comfortable with the basics:

1. Explore component diagrams for complex containers
2. Set up automated diagram generation in CI/CD
3. Create a style guide for your organization
4. Use diagrams in onboarding documentation
5. Reference diagrams in technical discussions

Happy diagramming! 🚀
