# Contributing to Web Template

Thank you for your interest in contributing to this TypeScript web project! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Process](#development-process)
- [Code Guidelines](#code-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please read the full text to understand what actions will and will not be tolerated.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior** and what actually happened
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description** of the feature
- **Use cases** explaining why this enhancement would be useful
- **Possible implementation** approach if you have ideas

### Contributing Code

1. Check the [DEV.md](./DEV.md) for development setup instructions
2. Check the [GIT.md](./GIT.md) for git workflow using fork-based contributions
3. Pick an issue to work on or create one for discussion
4. Follow the code guidelines below
5. Submit a pull request

## Development Process

Please refer to [DEV.md](./DEV.md) for detailed development setup and workflow instructions.

## Code Guidelines

This project follows strict TypeScript and React best practices. Please adhere to the following:

### TypeScript Standards

- **Strict typing**: NEVER use `any`. Use `unknown` or `never` appropriately
- **Type definitions**: All functions must have explicit return types
- **Interfaces over types**: Use `interface` for object shapes unless union types are needed
- **Validation**: Validate all external data (API responses, user input) using Zod or similar

### React Standards

- **Functional Components only**: No class components
- **Hooks rules**: Follow Rules of Hooks strictly (no conditional hooks)
- **Dependencies**: Exhaustive dependency arrays for `useCallback`, `useMemo`, and `useEffect`
- **Performance**: Use `React.memo()` for expensive components
- **No inline functions**: Avoid anonymous functions in props to prevent re-renders

### Architecture

Follow the modular layering principle:

- **UI Layer (Components)**: Presentation only, no side effects
- **Hook Layer (Logic)**: Custom hooks for business logic and state orchestration  
- **Domain Layer (Models/Types)**: Pure TypeScript types and interfaces
- **Infrastructure Layer (API/State)**: External services and global state management

### Code Style

- Use **ES6+** features appropriately
- **Destructure** props at function signature level
- Keep functions **small and focused** (single responsibility)
- Use **meaningful variable names** (no abbreviations unless standard)
- Add **comments** only when necessary to explain "why", not "what"

### Testing

- Write unit tests for all new features
- Use Vitest/React Testing Library
- Maintain or improve code coverage
- Test edge cases and error scenarios

### Security

- **Sanitize inputs**: Use DOMPurify for HTML content
- **Validate data**: Use Zod schemas for runtime validation
- **No secrets**: Never commit API keys, tokens, or credentials
- **Flag risks**: Use `dangerouslySetInnerHTML` only when absolutely necessary and document why

## Commit Message Guidelines

We follow a strict commit message format for traceability and maintainability:

```
type(scope): description [WRCx]

WHY: (Business justification or logic behind the implementation)
WHAT: (Key changes: components added, hooks modified, files changed)
Performance Impact: (Re-render analysis, bundle size impact, or N/A)
Accessibility: (ARIA labels, keyboard navigation improvements, or N/A)
Testing: (Unit tests added/modified, or N/A)
```

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Scope

The scope should indicate the area affected (e.g., `auth`, `ui`, `api`, `hooks`).

### WRC (Web Risk Class)

- **WRC0**: Style changes, no functional impact
- **WRC1**: UI/UX changes
- **WRC2**: State/Logic changes
- **WRC3**: Critical changes (authentication, security, data integrity)

### Example

```
feat(auth): add JWT token refresh mechanism [WRC3]

WHY: Users were being logged out unexpectedly when tokens expired during active sessions
WHAT: Added useTokenRefresh hook, implemented refresh logic in API interceptor
Performance Impact: Minimal - refresh happens in background every 14 minutes
Accessibility: N/A
Testing: Added unit tests for useTokenRefresh hook and refresh interceptor
```

## Pull Request Process

1. **Fork and clone**: Follow the workflow described in [GIT.md](./GIT.md)
2. **Create a branch**: Use descriptive branch names (e.g., `feat/add-login`, `fix/token-refresh`)
3. **Make changes**: Follow code guidelines and commit message format
4. **Test thoroughly**: Run linter, build, and tests locally
5. **Push to your fork**: Push your branch to your forked repository
6. **Open PR**: Create a pull request to the organization repository
7. **Address feedback**: Respond to code review comments promptly
8. **Squash commits**: If requested, squash commits before merge

### PR Title

Use the same format as commit messages:

```
type(scope): description [WRCx]
```

### PR Description

Include:

- **Summary**: Brief overview of changes
- **Motivation**: Why this change is needed
- **Changes**: Detailed list of modifications
- **Testing**: How you tested the changes
- **Screenshots**: For UI changes
- **Related Issues**: Link to related issues (Closes #123)

## Questions?

If you have questions about contributing, please:

1. Check existing documentation (DEV.md, GIT.md)
2. Search existing issues
3. Create a new issue with the `question` label

Thank you for contributing! 🎉
