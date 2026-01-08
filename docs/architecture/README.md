# Architecture Documentation

This directory contains the architecture documentation for the project using the **C4 Model** (Context, Container, Component, Code).

## What is the C4 Model?

The C4 model is a lean graphical notation technique for modeling the architecture of software systems. It was created by Simon Brown and provides a simple way to think about software architecture at different levels of abstraction.

The C4 model consists of four levels:

1. **Level 1: System Context** - The big picture, showing how the system fits into the world
2. **Level 2: Container** - The high-level technology choices, how responsibilities are distributed
3. **Level 3: Component** - The component-level detail within each container
4. **Level 4: Code** - Implementation details (optional, can be auto-generated from code)

## Directory Structure

```
docs/architecture/
├── README.md                           # This file
├── 01-context/                         # Level 1: System Context diagrams
│   ├── README.md                       # Context diagram guidelines
│   └── system-context.md               # System context diagram
├── 02-container/                       # Level 2: Container diagrams
│   ├── README.md                       # Container diagram guidelines
│   └── container-diagram.md            # Container architecture
├── 03-component/                       # Level 3: Component diagrams
│   ├── README.md                       # Component diagram guidelines
│   └── components/                     # Component diagrams per container
│       └── example-component.md        # Example component diagram
├── 04-code/                            # Level 4: Code diagrams (optional)
│   ├── README.md                       # Code diagram guidelines
│   └── README.md                       # Code-level diagrams
├── adr/                                # Architecture Decision Records
│   ├── README.md                       # ADR guidelines
│   └── template.md                     # ADR template
└── diagrams/                           # Diagram source files
    ├── README.md                       # Diagramming tools and guidelines
    └── examples/                       # Example diagram sources
```

## How to Use This Boilerplate

1. **Start with Context** - Define the system boundary and external actors
2. **Detail the Containers** - Break down the system into high-level containers
3. **Component Details** - For complex containers, create component diagrams
4. **Code Level** (Optional) - Generate or document critical code structures
5. **Document Decisions** - Use ADRs to record important architectural decisions

## Diagramming Tools

This boilerplate supports multiple diagramming approaches:

- **[PlantUML](https://plantuml.com/)** with [C4-PlantUML](https://github.com/plantuml-stdlib/C4-PlantUML)
- **[Structurizr](https://structurizr.com/)** (DSL or UI)
- **[Mermaid](https://mermaid.js.org/)** (for simpler diagrams)
- **[draw.io](https://draw.io)** / **[diagrams.net](https://diagrams.net)** (visual editor)
- **[Excalidraw](https://excalidraw.com/)** (sketching style)

See [diagrams/README.md](./diagrams/README.md) for more details on each tool.

## Best Practices

1. **Keep diagrams up-to-date** - Outdated diagrams are worse than no diagrams
2. **Use consistent notation** - Follow C4 model conventions
3. **Focus on value** - Don't diagram everything, focus on what adds clarity
4. **Version control** - Keep diagram sources in the repository
5. **Automate when possible** - Use tools that can generate diagrams from code or DSL
6. **Link to code** - Reference actual code files where relevant

## Resources

- [C4 Model Official Site](https://c4model.com/)
- [C4 Model FAQ](https://c4model.com/#faq)
- [The Art of Visualising Software Architecture](https://leanpub.com/visualising-software-architecture) (Simon Brown's book)
- [C4-PlantUML Examples](https://github.com/plantuml-stdlib/C4-PlantUML/tree/master/samples)

## Contributing

When adding or updating architecture documentation:

1. Follow the C4 model levels and conventions
2. Use the provided templates as starting points
3. Keep diagrams simple and focused
4. Document significant decisions in ADRs
5. Review with the team before merging major architectural changes
