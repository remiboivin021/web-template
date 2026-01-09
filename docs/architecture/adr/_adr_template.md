# Architecture Decision Record (ADR)

## ADR Metadata

| Field            | Value                                         |
| ---------------- | --------------------------------------------- |
| ADR ID           | ADR-<YYYYMMDD>-<SEQ>                          |
| Title            | <SHORT_DECISION_TITLE>                        |
| Status           | Proposed / Accepted / Superseded / Deprecated |
| Date             | <YYYY-MM-DD>                                  |
| Decision Makers  | <NAMES / ROLE>                                |
| Related 4C Views | C1 / C2 / C3 / C4                             |
| Supersedes       | ADR-XXX (if any)                              |
| Superseded by    | ADR-XXX (if any)                              |

---

## 1. Context

### 1.1 Architectural Context

Describe **the situation that triggered this decision**.
This section must reference **existing architectural constraints**.

Explicitly mention:

* Which 4C view(s) are impacted
* Which constraints are already fixed

> Example:
> This decision impacts the C3 (Application Core) and C4 (Code View), where outbound persistence ports are currently undefined.

---

### 1.2 Problem Statement

Clearly state the **problem to be solved**, not the solution.

The problem must be:

* Specific
* Observable
* Architectural (not implementation trivia)

---

## 2. Decision Drivers

List the **forces** that influenced the decision.

Typical drivers:

* Business priority
* Safety / security
* Performance
* Maintainability
* Regulatory constraints

| Driver   | Description      |
| -------- | ---------------- |
| <DRIVER> | <WHY_IT_MATTERS> |

---

## 3. Considered Options

### Option 1 – <OPTION_NAME>

Description:

* <SUMMARY>

Pros:

* <PRO>

Cons:

* <CON>

---

### Option 2 – <OPTION_NAME>

Description:

* <SUMMARY>

Pros:

* <PRO>

Cons:

* <CON>

---

## 4. Decision

### 4.1 Chosen Option

**Selected option:** <OPTION_NAME>

### 4.2 Decision Statement

State the decision in one **clear, unambiguous sentence**.

> Example:
> We will expose persistence exclusively through outbound ports defined in the Application Core and implemented by infrastructure adapters.

---

## 5. Consequences

### 5.1 Positive Consequences

* <BENEFIT_1>
* <BENEFIT_2>

---

### 5.2 Negative Consequences / Trade-offs

* <COST_1>
* <LIMITATION_1>

---

### 5.3 Risks & Mitigations

| Risk   | Impact              | Mitigation |
| ------ | ------------------- | ---------- |
| <RISK> | Low / Medium / High | <STRATEGY> |

---

## 6. Impact on 4C Views

Explicitly describe **what must change** in the architecture documents.

| View            | Impact                   |
| --------------- | ------------------------ |
| C1 – Context    | <NONE / UPDATE_REQUIRED> |
| C2 – Containers | <NONE / UPDATE_REQUIRED> |
| C3 – Components | <NONE / UPDATE_REQUIRED> |
| C4 – Code       | <NONE / UPDATE_REQUIRED> |

If an update is required, reference the exact file:

* `docs/architecture/Cx-<name>.md`

---

## 7. Compliance & Enforcement

Describe **how this decision is enforced**.

Examples:

* Compile-time dependency rules
* CI checks
* Code review checklist

> Architecture decisions that are not enforceable are informational only.

---

## 8. Validation Criteria

Define **objective criteria** to verify the decision is respected.

* [ ] Criterion 1
* [ ] Criterion 2

---

## 9. References

* C1 – Context: [`docs/architecture/4C-C1-Context.md`]()
* C2 – Containers: `docs/architecture/4C-C2-Containers.md`
* C3 – Components: `docs/architecture/4C-C3-Components.md`
* C4 – Code: `docs/architecture/4C-C4-Code.md`

---

## 10. Notes

Additional information, assumptions, or future considerations.

---

> **Rule:** Any architectural change impacting C1–C4 MUST be accompanied by an ADR.
