# System Context Diagram

**Last Updated:** [Date]  
**Status:** [Draft | Active | Deprecated]  
**Owner:** [Team/Person]

## System Overview

[Provide a brief description of your system, its purpose, and its primary value proposition]

## Diagram

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

LAYOUT_WITH_LEGEND()

title System Context Diagram for [Your System Name]

' Define People (Users/Actors)
Person(user1, "[User Type 1]", "[Description of this user]")
Person(user2, "[User Type 2]", "[Description of this user]")

' Define Your System
System(yourSystem, "[Your System Name]", "[Brief description of what the system does]")

' Define External Systems
System_Ext(externalSystem1, "[External System 1]", "[What this system does]")
System_Ext(externalSystem2, "[External System 2]", "[What this system does]")

' Define Relationships
Rel(user1, yourSystem, "[Action/Purpose]", "[Protocol/Technology]")
Rel(user2, yourSystem, "[Action/Purpose]", "[Protocol/Technology]")
Rel(yourSystem, externalSystem1, "[Purpose]", "[Protocol/Technology]")
Rel(yourSystem, externalSystem2, "[Purpose]", "[Protocol/Technology]")

@enduml
```

## Actors / Users

### [User Type 1]
- **Role:** [Describe the role]
- **Responsibilities:** [What they do with the system]
- **Access Level:** [Authentication/Authorization requirements]

### [User Type 2]
- **Role:** [Describe the role]
- **Responsibilities:** [What they do with the system]
- **Access Level:** [Authentication/Authorization requirements]

## External Systems

### [External System 1]
- **Purpose:** [Why we integrate with this system]
- **Integration Type:** [API, Message Queue, File Transfer, etc.]
- **Protocol:** [HTTP/REST, SOAP, gRPC, etc.]
- **Criticality:** [Critical | High | Medium | Low]
- **SLA Requirements:** [If applicable]

### [External System 2]
- **Purpose:** [Why we integrate with this system]
- **Integration Type:** [API, Message Queue, File Transfer, etc.]
- **Protocol:** [HTTP/REST, SOAP, gRPC, etc.]
- **Criticality:** [Critical | High | Medium | Low]
- **SLA Requirements:** [If applicable]

## Key Interactions

1. **[User Type] → [System]**
   - [Describe the primary use case or interaction]

2. **[System] → [External System]**
   - [Describe what data or functionality is exchanged]

## Constraints and Assumptions

- [Any architectural constraints]
- [Assumptions about external systems]
- [Security or compliance requirements]
- [Performance requirements]

## Related Documentation

- [Link to Container Diagram](../02-container/container-diagram.md)
- [Link to relevant ADRs](../adr/)
- [Link to API documentation]
