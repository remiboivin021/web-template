# Component Diagram: [Container Name]

**Last Updated:** [Date]  
**Status:** [Draft | Active | Deprecated]  
**Owner:** [Team/Person]  
**Container:** [Link to container in container diagram](../02-container/container-diagram.md)

## Overview

[Describe the internal structure of this container and the major components that comprise it]

## Diagram

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

LAYOUT_WITH_LEGEND()

title Component Diagram for [Container Name]

Container(externalContainer, "[External Container]", "[Technology]", "[Purpose]")

Container_Boundary(containerBoundary, "[This Container]") {
    
    ' Presentation Layer / Controllers
    Component(controller1, "[Controller 1]", "[Framework]", "[Handles specific requests]")
    Component(controller2, "[Controller 2]", "[Framework]", "[Handles specific requests]")
    
    ' Business Logic Layer
    Component(service1, "[Service 1]", "[Technology]", "[Business logic responsibilities]")
    Component(service2, "[Service 2]", "[Technology]", "[Business logic responsibilities]")
    
    ' Data Access Layer
    Component(repository1, "[Repository 1]", "[ORM/Technology]", "[Data access for domain X]")
    Component(repository2, "[Repository 2]", "[ORM/Technology]", "[Data access for domain Y]")
    
    ' Integration Layer
    Component(adapter1, "[Adapter 1]", "[Technology]", "[Integration with external system]")
    
    ' Cross-Cutting Concerns
    Component(validator, "[Validator]", "[Library]", "[Input validation]")
    Component(logger, "[Logger]", "[Library]", "[Logging]")
}

ContainerDb(database, "[Database]", "[Technology]", "[Purpose]")
System_Ext(externalSystem, "[External System]", "[Purpose]")

' Relationships
Rel(externalContainer, controller1, "Calls", "HTTPS/JSON")
Rel(externalContainer, controller2, "Calls", "HTTPS/JSON")

Rel(controller1, service1, "Uses")
Rel(controller2, service2, "Uses")

Rel(service1, repository1, "Uses")
Rel(service2, repository2, "Uses")

Rel(service1, adapter1, "Uses")

Rel(controller1, validator, "Validates with")
Rel(controller2, validator, "Validates with")

Rel(service1, logger, "Logs with")
Rel(service2, logger, "Logs with")

Rel(repository1, database, "Reads/Writes", "SQL")
Rel(repository2, database, "Reads/Writes", "SQL")

Rel(adapter1, externalSystem, "Integrates with", "HTTPS/REST")

@enduml
```

## Component Details

### Presentation Layer

#### [Controller 1]
**Path:** `[src/controllers/controller1.ts]`  
**Type:** [Controller | Handler | Route]  
**Framework:** [Express, NestJS, etc.]

**Responsibilities:**
- [Handle HTTP requests for domain X]
- [Validate input]
- [Transform responses]

**Endpoints:**
- `GET /api/[resource]` - [Description]
- `POST /api/[resource]` - [Description]
- `PUT /api/[resource]/:id` - [Description]
- `DELETE /api/[resource]/:id` - [Description]

**Dependencies:**
- [Service 1]: For business logic
- [Validator]: For input validation

**Example:**
```typescript
// Example code structure
class Controller1 {
  constructor(
    private service: Service1,
    private validator: Validator
  ) {}
  
  async handleRequest(req: Request): Promise<Response> {
    // Implementation
  }
}
```

---

### Business Logic Layer

#### [Service 1]
**Path:** `[src/services/service1.ts]`  
**Type:** [Service | Manager | Handler]

**Responsibilities:**
- [Core business logic for domain X]
- [Orchestrate operations across repositories]
- [Enforce business rules]

**Key Methods:**
```typescript
interface Service1 {
  createResource(data: ResourceData): Promise<Resource>;
  updateResource(id: string, data: Partial<ResourceData>): Promise<Resource>;
  deleteResource(id: string): Promise<void>;
  getResource(id: string): Promise<Resource>;
  listResources(criteria: SearchCriteria): Promise<Resource[]>;
}
```

**Business Rules:**
- [Rule 1: Description]
- [Rule 2: Description]

**Dependencies:**
- [Repository 1]: For data persistence
- [Adapter 1]: For external integrations

---

### Data Access Layer

#### [Repository 1]
**Path:** `[src/repositories/repository1.ts]`  
**Type:** [Repository | DAO]  
**ORM/Technology:** [Prisma, TypeORM, etc.]

**Responsibilities:**
- [Provide data access abstraction for domain X]
- [Handle database queries]
- [Map between domain objects and database entities]

**Key Methods:**
```typescript
interface Repository1 {
  findById(id: string): Promise<Entity | null>;
  findAll(criteria: FilterCriteria): Promise<Entity[]>;
  save(entity: Entity): Promise<Entity>;
  update(id: string, entity: Partial<Entity>): Promise<Entity>;
  delete(id: string): Promise<void>;
}
```

**Database Tables/Collections:**
- `[table_name]`: [Description]

**Indexes:**
- [Index description and columns]

---

### Integration Layer

#### [Adapter 1]
**Path:** `[src/adapters/adapter1.ts]`  
**Type:** [Adapter | Client | Connector]

**Responsibilities:**
- [Integrate with external system X]
- [Handle authentication with external system]
- [Transform data between internal and external formats]

**External System:** [System Name]  
**Protocol:** [REST, GraphQL, gRPC, etc.]  
**Authentication:** [API Key, OAuth, etc.]

**Key Methods:**
```typescript
interface Adapter1 {
  sendData(data: ExternalData): Promise<Response>;
  fetchData(id: string): Promise<ExternalData>;
}
```

**Error Handling:**
- [How errors from external system are handled]

**Retry Logic:**
- [Retry strategy if applicable]

---

### Cross-Cutting Concerns

#### [Validator]
**Path:** `[src/utils/validator.ts]`  
**Library:** [Zod, Joi, class-validator, etc.]

**Responsibilities:**
- [Validate input data]
- [Sanitize user input]
- [Ensure data integrity]

**Validation Schemas:**
- [Schema 1]: [Purpose]
- [Schema 2]: [Purpose]

---

#### [Logger]
**Path:** `[src/utils/logger.ts]`  
**Library:** [Winston, Pino, etc.]

**Responsibilities:**
- [Structured logging]
- [Log aggregation]
- [Error tracking]

**Log Levels:**
- ERROR: [When used]
- WARN: [When used]
- INFO: [When used]
- DEBUG: [When used]

## Architectural Patterns

### Layered Architecture
This container follows a layered architecture:
1. **Presentation Layer** (Controllers) - Handle HTTP requests
2. **Business Logic Layer** (Services) - Implement business rules
3. **Data Access Layer** (Repositories) - Abstract database operations
4. **Integration Layer** (Adapters) - Handle external system integration

**Dependencies flow:** Controllers → Services → Repositories/Adapters

### Dependency Injection
[Describe how dependency injection is implemented and managed]

### Error Handling Strategy
[Describe how errors are propagated and handled across layers]

## Data Flow

### Typical Request Flow
1. **Request arrives** at [Controller]
2. **Validation** performed by [Validator]
3. **Business logic** executed by [Service]
4. **Data access** via [Repository]
5. **Response** returned through layers

### Example: [Use Case Name]
```
[External Container] 
  → [Controller 1].handleRequest()
  → [Service 1].processData()
  → [Repository 1].save()
  → [Database]
```

## Testing Strategy

### Unit Tests
- [Which components have unit tests]
- [Testing approach]

### Integration Tests
- [Which integration points are tested]
- [Testing approach]

### Mocking Strategy
- [How external dependencies are mocked]

## Performance Considerations

- **Caching:** [Where and how caching is implemented]
- **Lazy Loading:** [If applicable]
- **Connection Pooling:** [Database connection management]
- **Batch Processing:** [If applicable]

## Security Considerations

- **Input Validation:** [How input is validated]
- **Authentication:** [How authentication is handled]
- **Authorization:** [How authorization is enforced]
- **Data Sanitization:** [How data is sanitized]

## Related Documentation

- [Link to Container Diagram](../02-container/container-diagram.md)
- [Link to Code-Level Documentation](../04-code/)
- [Link to API Documentation]
- [Link to relevant ADRs](../adr/)
