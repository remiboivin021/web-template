# Git Workflow with Fork

This guide explains the git workflow for contributing to this project using a **local fork** approach. This allows you to push changes to your own fork and then create pull requests to the organization repository.

## Table of Contents

- [Why Fork-Based Workflow?](#why-fork-based-workflow)
- [Initial Setup](#initial-setup)
- [Daily Workflow](#daily-workflow)
- [Working with Branches](#working-with-branches)
- [Creating Pull Requests](#creating-pull-requests)
- [Keeping Your Fork in Sync](#keeping-your-fork-in-sync)
- [Common Scenarios](#common-scenarios)
- [Best Practices](#best-practices)

## Why Fork-Based Workflow?

The fork-based workflow is used for contributing to organization repositories because:

- **Separation of concerns**: Your fork is your workspace; the organization repo remains clean
- **Permission control**: You don't need write access to the organization repository
- **Safe experimentation**: You can push freely to your fork without affecting others
- **Standard open-source practice**: Widely used and well-understood workflow

## Initial Setup

### 1. Fork the Repository

1. Navigate to the organization repository: `https://github.com/remiboivin021/web-template`
2. Click the **Fork** button in the top-right corner
3. Select your personal account as the destination
4. Wait for GitHub to create your fork

### 2. Clone Your Fork Locally

Clone **your fork** (not the organization repository):

```bash
# Replace YOUR_USERNAME with your GitHub username
git clone https://github.com/YOUR_USERNAME/web-template.git
cd web-template
```

### 3. Configure Git Remotes

Set up two remotes:
- **origin**: Your fork (where you push changes)
- **upstream**: Organization repository (where you pull updates)

```bash
# Verify origin points to your fork
git remote -v
# Should show:
# origin  https://github.com/YOUR_USERNAME/web-template.git (fetch)
# origin  https://github.com/YOUR_USERNAME/web-template.git (push)

# Add upstream pointing to the organization repository
git remote add upstream https://github.com/remiboivin021/web-template.git

# Verify both remotes
git remote -v
# Should now show:
# origin    https://github.com/YOUR_USERNAME/web-template.git (fetch)
# origin    https://github.com/YOUR_USERNAME/web-template.git (push)
# upstream  https://github.com/remiboivin021/web-template.git (fetch)
# upstream  https://github.com/remiboivin021/web-template.git (push)
```

### 4. Configure Git User

Ensure your git identity is configured:

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Daily Workflow

### Before Starting Work

**Always sync your fork with the organization repository before starting new work:**

```bash
# 1. Switch to main branch
git checkout main

# 2. Fetch latest changes from upstream
git fetch upstream

# 3. Merge upstream changes into your local main
git merge upstream/main

# 4. Push the updated main to your fork
git push origin main
```

### Starting New Work

1. **Create a feature branch** from the updated main:

```bash
git checkout -b feat/your-feature-name
```

Branch naming conventions:
- `feat/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/component-name` - Code refactoring
- `test/description` - Test additions/updates
- `chore/description` - Maintenance tasks

2. **Make your changes** following the guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md)

3. **Commit your changes** with proper commit messages:

```bash
git add .
git commit -m "feat(scope): description [WRCx]

WHY: Explain why this change is needed
WHAT: List key changes made
Performance Impact: Describe impact or N/A
Accessibility: Describe improvements or N/A
Testing: Describe tests added or N/A"
```

4. **Push to your fork**:

```bash
git push origin feat/your-feature-name
```

Note: You're pushing to `origin` (your fork), not `upstream` (organization repo).

## Working with Branches

### List Branches

```bash
# List local branches
git branch

# List all branches (local and remote)
git branch -a

# List remote branches only
git branch -r
```

### Switch Branches

```bash
# Switch to an existing branch
git checkout branch-name

# Create and switch to a new branch
git checkout -b new-branch-name
```

### Delete Branches

```bash
# Delete local branch (after it's merged)
git branch -d branch-name

# Force delete local branch
git branch -D branch-name

# Delete remote branch on your fork
git push origin --delete branch-name
```

### Update Feature Branch

If you need to update your feature branch with the latest changes from main:

```bash
# 1. Commit or stash your current work
git add .
git commit -m "wip: work in progress"

# 2. Fetch and merge main from upstream
git fetch upstream
git checkout main
git merge upstream/main
git push origin main

# 3. Rebase your feature branch onto updated main
git checkout feat/your-feature-name
git rebase main

# 4. If conflicts occur, resolve them and continue
# Edit conflicted files, then:
git add .
git rebase --continue

# 5. Force push to your fork (only safe for your own branches)
git push origin feat/your-feature-name --force-with-lease
```

## Creating Pull Requests

### 1. Push Your Branch

Ensure your branch is pushed to your fork:

```bash
git push origin feat/your-feature-name
```

### 2. Open Pull Request on GitHub

1. Navigate to your fork: `https://github.com/YOUR_USERNAME/web-template`
2. GitHub will show a yellow banner suggesting to create a PR
3. Click **"Compare & pull request"**
4. **Base repository**: `remiboivin021/web-template` (organization repo)
5. **Base branch**: `main`
6. **Head repository**: `YOUR_USERNAME/web-template` (your fork)
7. **Compare branch**: `feat/your-feature-name`

### 3. Fill PR Details

**Title**: Use the same format as commit messages
```
type(scope): description [WRCx]
```

**Description**: Include:
```markdown
## Summary
Brief overview of changes

## Motivation
Why is this change needed?

## Changes
- Added new component X
- Modified hook Y
- Updated tests for Z

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Linting passes
- [ ] Build succeeds

## Screenshots
(If UI changes, include before/after screenshots)

## Related Issues
Closes #123
Related to #456
```

### 4. Request Review

- Add reviewers (if you have permission)
- Add appropriate labels
- Link related issues
- Mark as draft if work is not complete

### 5. Address Review Feedback

When reviewers suggest changes:

```bash
# 1. Make the requested changes
# 2. Commit with descriptive message
git add .
git commit -m "fix(scope): address review feedback"

# 3. Push to your fork (updates the PR automatically)
git push origin feat/your-feature-name
```

### 6. After PR is Merged

Clean up your local and remote branches:

```bash
# 1. Switch to main
git checkout main

# 2. Pull the merged changes from upstream
git fetch upstream
git merge upstream/main

# 3. Push updated main to your fork
git push origin main

# 4. Delete the feature branch locally
git branch -d feat/your-feature-name

# 5. Delete the feature branch from your fork
git push origin --delete feat/your-feature-name
```

## Keeping Your Fork in Sync

### Regular Sync (Weekly)

Keep your fork's main branch synchronized with the organization repository:

```bash
# Fetch all changes from upstream
git fetch upstream

# Switch to main
git checkout main

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

### Automated Sync with GitHub

You can use GitHub's "Fetch upstream" feature:

1. Go to your fork on GitHub
2. Click **"Sync fork"** → **"Update branch"**
3. Pull the changes locally:
   ```bash
   git checkout main
   git pull origin main
   ```

## Common Scenarios

### Scenario 1: Merge Conflicts During Sync

```bash
# When syncing main, if conflicts occur:
git fetch upstream
git checkout main
git merge upstream/main

# If conflicts are reported:
# 1. Open conflicted files and resolve conflicts
# 2. Look for conflict markers: <<<<<<<, =======, >>>>>>>
# 3. Edit to keep the correct code
# 4. Mark as resolved:
git add .
git commit -m "chore: merge upstream changes"
git push origin main
```

### Scenario 2: Accidentally Committed to Main

```bash
# 1. Create a feature branch from current main
git branch feat/your-feature-name

# 2. Reset main to upstream
git checkout main
git reset --hard upstream/main

# 3. Push reset main to your fork
git push origin main --force-with-lease

# 4. Switch to feature branch and continue work
git checkout feat/your-feature-name
```

### Scenario 3: Need to Update PR Branch

```bash
# Your PR branch is outdated compared to main:

# 1. Sync main first
git checkout main
git fetch upstream
git merge upstream/main
git push origin main

# 2. Update your feature branch
git checkout feat/your-feature-name
git rebase main

# 3. If conflicts, resolve and continue
git add .
git rebase --continue

# 4. Force push to update PR
git push origin feat/your-feature-name --force-with-lease
```

### Scenario 4: Multiple Commits Need Squashing

```bash
# If you want to squash last 3 commits:
git rebase -i HEAD~3

# In the editor:
# - Keep 'pick' for the first commit
# - Change 'pick' to 'squash' (or 's') for others
# - Save and close

# Edit the commit message as desired
# Force push:
git push origin feat/your-feature-name --force-with-lease
```

## Best Practices

### Do's ✅

- **Always work on feature branches**, never commit directly to main
- **Sync your fork regularly** before starting new work
- **Write descriptive commit messages** following the guidelines
- **Keep commits focused** - one logical change per commit
- **Test before pushing** - run linter, build, and tests
- **Push to origin** (your fork), create PR to upstream
- **Use `--force-with-lease`** instead of `--force` when needed (safer)

### Don'ts ❌

- **Don't commit directly to main** - always use feature branches
- **Don't push to upstream** - you likely don't have permission
- **Don't use `git push --force`** - use `--force-with-lease` instead
- **Don't forget to sync** before starting new work
- **Don't include merge commits** - use rebase for cleaner history
- **Don't commit secrets** - API keys, tokens, passwords
- **Don't mix unrelated changes** - keep PRs focused

### Commit Message Quality

Good examples:
```
✅ feat(auth): add JWT token refresh mechanism [WRC3]
✅ fix(ui): correct button alignment in mobile view [WRC1]
✅ docs(readme): update installation instructions [WRC0]
```

Bad examples:
```
❌ fix stuff
❌ WIP
❌ changes
❌ update
```

### Branch Hygiene

- Delete merged branches promptly
- Keep your fork's main branch clean (no direct commits)
- Rebase feature branches regularly to avoid merge commits
- Use meaningful branch names

## Git Configuration Tips

### Useful Aliases

Add to `~/.gitconfig`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    cm = commit -m
    sync = !git fetch upstream && git checkout main && git merge upstream/main && git push origin main
    update-branch = !git fetch upstream && git rebase upstream/main
    force-push = push --force-with-lease
```

Usage:
```bash
git sync  # Sync your fork
git update-branch  # Update current branch
git force-push origin feat/my-feature  # Safe force push
```

### Auto-setup Remote Tracking

```bash
git config --global push.default current
git config --global push.autoSetupRemote true
```

This allows you to use `git push` without specifying remote and branch.

## Troubleshooting

### "Permission denied" when pushing

You're trying to push to upstream (organization repo). Push to origin (your fork) instead:

```bash
# Wrong:
git push upstream feat/my-feature  ❌

# Correct:
git push origin feat/my-feature  ✅
```

### Fork is behind upstream

Simply sync your fork:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Diverged branches

Your branch and remote have diverged:

```bash
# Option 1: Pull with rebase (if you haven't shared the branch)
git pull --rebase origin feat/my-feature

# Option 2: Force push if you've rebased (use with caution)
git push origin feat/my-feature --force-with-lease
```

## Summary

**Key Points to Remember:**

1. **Fork** the organization repository on GitHub
2. **Clone your fork** locally
3. Add **upstream** remote pointing to organization repo
4. Always work on **feature branches**
5. **Push to origin** (your fork)
6. Create **pull requests** from your fork to upstream
7. Keep your fork **synced** regularly

**Basic Commands Cheat Sheet:**

```bash
# Setup (one-time)
git clone https://github.com/YOUR_USERNAME/web-template.git
cd web-template
git remote add upstream https://github.com/remiboivin021/web-template.git

# Daily workflow
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
git checkout -b feat/my-feature
# ... make changes ...
git add .
git commit -m "feat(scope): description [WRCx]"
git push origin feat/my-feature
# ... create PR on GitHub ...

# After PR merged
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
git branch -d feat/my-feature
git push origin --delete feat/my-feature
```

Happy contributing! 🚀
