# TODO / Future Improvements

This document tracks potential improvements and enhancements for the boilerplate.

## Optional Enhancements

### Code Organization
- [ ] **Split Vite and Vitest configurations**: Move test configuration from `vite.config.ts` to a separate `vitest.config.ts` file for better separation of concerns
  - Current: Works perfectly fine as-is (common Vite pattern)
  - Benefit: Slightly improved maintainability and test-specific optimizations

### Additional Components (Not Essential)
- [ ] Modal/Dialog component
- [ ] Dropdown/Select component
- [ ] Checkbox/Radio components
- [ ] Textarea component
- [ ] Table component
- [ ] Pagination component
- [ ] Tabs component

### Additional Hooks
- [ ] useDebounce hook
- [ ] useThrottle hook
- [ ] useClickOutside hook
- [ ] useKeyPress hook

### Testing
- [ ] Increase test coverage to 80%+
- [ ] Add E2E tests with Playwright
- [ ] Add visual regression tests

### Performance
- [ ] Add React.memo to expensive components
- [ ] Implement virtual scrolling for large lists
- [ ] Add service worker for PWA support
- [ ] Optimize bundle size analysis

### Documentation
- [ ] Add Storybook for component documentation
- [ ] Create architecture decision records (ADRs)
- [ ] Add inline code examples
- [ ] Create video tutorials

### DevOps
- [ ] Add Docker configuration
- [ ] CI/CD pipeline templates
- [ ] Deployment guides for popular platforms
- [ ] Environment-specific configurations

## Notes
- All items in this TODO are optional enhancements
- The boilerplate is production-ready as-is
- Prioritize based on your project needs
